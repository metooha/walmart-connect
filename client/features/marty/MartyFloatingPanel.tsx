import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import Reports from "@/components/icons/Reports";
import { Button } from "@/components/ui/Button";
import { DateField } from "@/components/ui/DateField";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";
import { TextField } from "@/components/ui/TextField";
import martyAnimation from "@/marty-thinking.json";
import martyGlassesAnimation from "@/marty-glasses.json";
import { useMarty } from "@/contexts/MartyContext";

type ViewState = 'welcome' | 'chat' | 'campaignSetup' | 'campaignForm' | 'campaignReady' | 'campaignScheduled' | 'addItemsDetail' | 'addItemsNewCampaign';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isAction?: boolean;
  feedback?: 'up' | 'down' | null;
}

export default function MartyFloatingPanel() {
  const { isMinimized, setIsMinimized, isDocked, setIsDocked, initialPosition, setInitialPosition } = useMarty();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [userMessage, setUserMessage] = useState<string>('');
  const [activeCard, setActiveCard] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [showSelectError, setShowSelectError] = useState(false);
  const [addItemsApplied, setAddItemsApplied] = useState(false);
  const [dailyBudget, setDailyBudget] = useState('');
  const [selectedNewItems, setSelectedNewItems] = useState<Set<number>>(new Set());
  const [showNewCampaignError, setShowNewCampaignError] = useState('');
  const [addNewCampaignApplied, setAddNewCampaignApplied] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDraggingRef = useRef(false);

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };
  const [campaignData, setCampaignData] = useState({
    campaignType: 'Sponsored Products Automatic',
    campaignName: 'Free Rein Coffee Campaign Fall 2025',
    startDate: '10/01/2025',
    dailyBudget: '50',
    endDate: '03/01/2024',
    biddingStrategy: 'dynamic' as 'dynamic' | 'fixed',
    brandTermTargeting: true,
    complementaryTargeting: true
  });
  const [isAdditionalSettingsOpen, setIsAdditionalSettingsOpen] = useState(false);

  // FAB drag state
  const [fabPosition, setFabPosition] = useState(initialPosition || { x: 0, y: 0 });

  // Update position when initialPosition changes (undocking)
  useEffect(() => {
    if (initialPosition) {
      setFabPosition(initialPosition);
      setHasMoved(true);
    }
  }, [initialPosition]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'left' | 'right' | 'bottom'>('top');
  const fabButtonRef = useRef<HTMLButtonElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // When on campaign page, don't show campaign type selection
  useEffect(() => {
    if (location.pathname === '/campaign' && viewState === 'campaignSetup') {
      setViewState('campaignReady');
    }
  }, [location.pathname, viewState]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 152) + 'px';
    }
  }, [userMessage]);

  // Calculate tooltip position based on FAB location to avoid clipping
  useEffect(() => {
    if (hasMoved && fabButtonRef.current) {
      const rect = fabButtonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const spaceTop = rect.top;
      const spaceBottom = windowHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = windowWidth - rect.right;

      // Find the direction with most space (prefer top, then right, then left, then bottom)
      const tooltipHeight = 60; // Approximate height of tooltip
      const tooltipWidth = 200; // Approximate width of tooltip

      if (spaceTop >= tooltipHeight) {
        setTooltipPosition('top');
      } else if (spaceRight >= tooltipWidth) {
        setTooltipPosition('right');
      } else if (spaceLeft >= tooltipWidth) {
        setTooltipPosition('left');
      } else {
        setTooltipPosition('bottom');
      }
    }
  }, [fabPosition, hasMoved]);

  // Track mouse movement to make eyes follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (fabButtonRef.current) {
        const rect = fabButtonRef.current.getBoundingClientRect();
        const fabCenterX = rect.left + rect.width / 2;
        const fabCenterY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate angle from Marty to cursor
        const deltaX = mouseX - fabCenterX;
        const deltaY = mouseY - fabCenterY;

        // Limit eye movement range (max 3px in each direction)
        const maxMove = 3;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const limitedX = distance > 0 ? (deltaX / distance) * Math.min(distance / 20, maxMove) : 0;
        const limitedY = distance > 0 ? (deltaY / distance) * Math.min(distance / 20, maxMove) : 0;

        setEyePosition({ x: limitedX, y: limitedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection while dragging
    setIsDragging(true);
    isDraggingRef.current = false; // Reset - will be set to true if actual movement occurs

    // Get the button element to calculate its center offset
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const offsetX = buttonRect.width / 2;
    const offsetY = buttonRect.height / 2;

    setDragStart({ x: offsetX, y: offsetY });
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    // Calculate distance from start position
    const deltaX = Math.abs(e.clientX - dragStartPos.x);
    const deltaY = Math.abs(e.clientY - dragStartPos.y);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Only consider it a drag if moved more than 3 pixels
    if (distance > 3) {
      isDraggingRef.current = true; // Mark as dragged

      // Center the FAB on the cursor
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      setFabPosition({ x: newX, y: newY });
      setHasMoved(true);

      // Check if dragging into masthead area (top 54px + some buffer)
      if (isDocked && e.clientY > 100) {
        // Dragging out of masthead - undock
        setIsDocked(false);
      }
    }
  };

  const handleMouseUp = (e?: MouseEvent) => {
    setIsDragging(false);

    // Check if we should dock (in masthead area)
    if (!isDocked && hasMoved && e && e.clientY < 80) {
      // Snap to docked position
      setIsDocked(true);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleExpand = (e?: React.MouseEvent) => {
    setIsMinimized(false);
  };

  const generateMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Campaign-related questions
    if (input.includes('campaign') && (input.includes('create') || input.includes('make') || input.includes('start'))) {
      return "I can help you create a campaign! I'll guide you through setting up a new campaign with the right targeting, budget, and items. Would you like to start creating a Sponsored Products or Display campaign?";
    }
    
    if (input.includes('budget')) {
      return "Campaign budgets are important for controlling your ad spend. I recommend starting with a daily budget of at least $50-100 for Display campaigns to gather enough data. You can adjust this at any time based on performance. Would you like help setting up a campaign with a specific budget?";
    }
    
    if (input.includes('targeting')) {
      return "There are several targeting strategies available:\n\n• **Contextual targeting** - Shows ads based on page content\n• **Behavioral targeting** - Targets based on user behavior\n• **Run of site** - Shows ads across all available placements\n\nEach has different performance characteristics. What type of campaign are you planning?";
    }
    
    if (input.includes('recommend') || input.includes('suggestion')) {
      return "Based on your account activity, I recommend:\n\n1. **Optimize high-performing campaigns** - I noticed 3 campaigns with 113%+ pacing that could use budget increases\n2. **Review paused campaigns** - You have 4 paused campaigns that might be ready to reactivate\n3. **Add negative keywords** - This could reduce wasted spend by 8-12%\n\nWhich would you like to explore first?";
    }
    
    if (input.includes('pacing') || input.includes('pace')) {
      return "Campaign pacing shows how quickly your budget is being spent. A pacing of 100% means you're on track. Above 100% means you're spending faster than planned, and below 100% means slower.\n\nGreen indicators (100-115%) are generally good. Orange (115%+) means you might exhaust your budget early. Would you like me to help adjust any campaign budgets?";
    }
    
    if (input.includes('impression')) {
      return "Impressions are the number of times your ad was displayed. Your campaigns are currently generating strong impression volume. To increase impressions, consider:\n\n• Increasing daily budget\n• Expanding targeting criteria\n• Adding more items to your campaigns\n• Using broader match types\n\nWhat would you like to focus on?";
    }
    
    if (input.includes('performance') || input.includes('metrics')) {
      return "I can show you key performance metrics! Your current overview:\n\n• **Total Impressions**: 156M+ across all active campaigns\n• **Average CTR**: Data shows strong engagement on contextual targeting\n• **Top Performers**: Campaigns with behavioral targeting are showing 10-15% better results\n\nWould you like a detailed breakdown of any specific campaign?";
    }
    
    if (input.includes('help') || input.includes('?')) {
      return "I'm here to help! I can assist with:\n\n• **Creating campaigns** - I'll guide you through the setup\n• **Optimizing performance** - Get recommendations for your active campaigns\n• **Understanding metrics** - Learn what your data means\n• **Managing budgets** - Adjust spending across campaigns\n• **Answering questions** - Ask me anything about Walmart advertising\n\nWhat would you like help with?";
    }
    
    if (input.includes('status') || input.includes('live') || input.includes('pause')) {
      return "Campaign statuses indicate their current state:\n\n• **Live** - Currently running and serving ads\n• **Scheduled** - Set to start on a future date\n• **Paused** - Temporarily stopped (you can resume anytime)\n• **Completed** - Reached end date or budget limit\n\nYou can change status anytime from the campaign manager. Need help with a specific campaign?";
    }
    
    if (input.includes('item') || input.includes('product')) {
      return "I can help you select the best items to advertise! I analyze:\n\n• Sales performance\n• Inventory levels\n• Competitive positioning\n• Seasonal trends\n\nFor best results, I recommend advertising items with high margins, good reviews, and strong conversion rates. Would you like me to suggest items for a new campaign?";
    }
    
    if (input.includes('report') || input.includes('analytics')) {
      return "I can help you access detailed reports and analytics. Available reports include:\n\n• Campaign performance over time\n• Item-level metrics\n• Audience insights\n• Budget utilization\n• Attribution analysis\n\nWhat specific metrics are you interested in tracking?";
    }
    
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! I'm always here to help. Feel free to ask me anything about your campaigns, or I can help you create a new one whenever you're ready! 😊";
    }
    
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hi there! 👋 I'm Marty, your advertising assistant. I'm here to help you create campaigns, optimize performance, and answer any questions you have about Walmart advertising. What can I help you with today?";
    }

    // Birthday message (easter egg from original)
    if (input.includes('birthday')) {
      return "🎉 Happy Birthday! 🎂 While I can't help with party planning, I can definitely help make your campaigns more successful! Want to create a special promotional campaign to celebrate? 🎈";
    }
    
    // Default response
    return "That's a great question! While I'm still learning, I can help you with:\n\n• Creating and managing campaigns\n• Understanding your performance metrics\n• Optimizing your advertising strategy\n• Answering questions about Walmart advertising\n\nCould you rephrase your question or let me know which of these areas you'd like to explore?";
  };

  const simulateTyping = async (response: string): Promise<void> => {
    // Simulate realistic typing delay (50-150ms per character burst)
    const baseDelay = 800; // Initial delay
    const chunkSize = 15; // Characters per chunk
    const delayBetweenChunks = 50;
    
    await new Promise(resolve => setTimeout(resolve, baseDelay));
    
    const chunks = [];
    for (let i = 0; i < response.length; i += chunkSize) {
      chunks.push(response.slice(i, i + chunkSize));
    }
    
    let fullResponse = '';
    for (let i = 0; i < chunks.length; i++) {
      fullResponse += chunks[i];
      
      // Update the last message incrementally
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].role === 'assistant') {
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: fullResponse
          };
        }
        return newMessages;
      });
      
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenChunks));
      }
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage.trim(),
      timestamp: new Date()
    };
    
    // Add user message
    setMessages(prev => [...prev, userMsg]);
    setUserMessage('');
    setIsTyping(true);
    
    // Switch to chat view if not already there
    if (viewState === 'welcome') {
      setViewState('chat');
    }
    
    // Check for special commands
    if (userMsg.content.toLowerCase().includes('create campaign') || 
        userMsg.content.toLowerCase().includes('create a campaign')) {
      setIsTyping(false);
      
      // Add response message
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Great! Let me help you create a campaign. I'll guide you through the process...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMsg]);
      
      // Transition to campaign setup
      setTimeout(() => {
        setViewState('campaignSetup');
      }, 1000);
      return;
    }
    
    // Generate mock response
    const response = generateMockResponse(userMsg.content);
    
    // Create assistant message placeholder
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMsg]);
    
    // Simulate typing
    await simulateTyping(response);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStopGeneration = () => {
    setIsTyping(false);
  };

  const handleQuickAction = async (action: string) => {
    if (action === 'create') {
      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: 'Create campaign',
        timestamp: new Date()
      };
      setMessages([userMsg]);
      setViewState('chat');
      setIsTyping(true);
      
      // Show typing animation
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Add assistant response with options
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Great! I'd love to help you create a campaign. To get started, what type of campaign would you like to create?",
        timestamp: new Date(),
        isAction: true
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      
      // Show campaign setup view
      setTimeout(() => {
        setViewState('campaignSetup');
      }, 800);
      
    } else if (action === 'help') {
      setUserMessage('Help & FAQs');
      setTimeout(() => handleSendMessage(), 100);
    }
  };

  const handleCampaignTypeSelection = async (type: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    
    // Set campaign type
    setCampaignData(prev => ({ ...prev, campaignType: type }));
    
    // Show typing animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add assistant response
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Perfect! I'll help you set up a ${type} campaign. Let me gather some details...`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
    
    // Transition to form
    setTimeout(() => {
      setViewState('campaignForm');
    }, 800);
  };

  const handleBack = () => {
    if (viewState === 'campaignForm') {
      setViewState('campaignSetup');
    } else if (viewState === 'campaignSetup') {
      setViewState('chat');
    } else if (viewState === 'addItemsDetail') {
      setViewState('welcome');
    } else if (viewState === 'addItemsNewCampaign') {
      setViewState('welcome');
    } else {
      setViewState('chat');
    }
  };

  const handleSaveAndReview = () => {
    setViewState('campaignReady');
    navigate('/campaign');
  };

  const handleLaunchCampaign = () => {
    setViewState('campaignScheduled');
  };

  // When docked and minimized, don't render here - will be rendered in header
  if (isDocked && isMinimized) {
    return null;
  }

  // Minimized "Ask Marty" button
  if (isMinimized) {
    return (
      <div
        className="fixed z-30"
        style={{
          bottom: hasMoved ? 'auto' : '32px',
          right: hasMoved ? 'auto' : '32px',
          top: hasMoved ? `${fabPosition.y}px` : 'auto',
          left: hasMoved ? `${fabPosition.x}px` : 'auto',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <button
          ref={fabButtonRef}
          onMouseDown={handleMouseDown}
          onClick={(e) => {
            e.stopPropagation();
            // Only expand if this was a click (not a drag)
            if (!isDraggingRef.current) {
              handleExpand(e);
            }
            // Reset the ref after handling click
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
          }}
          className={`inline-flex p-0.5 justify-end items-center gap-2 rounded-full shadow-[0_-1px_3px_0_rgba(0,0,0,0.10),0_3px_5px_2px_rgba(0,0,0,0.15)] relative group transition-all duration-200 ease-out ${
            hasMoved ? 'overflow-visible' : 'overflow-hidden'
          }`}
        >
          {/* Gradient Border Background */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(134deg, #993EF4 10.5%, #4DBDF5 71.77%, #00D0CD 102.41%)'
            }}
          />

          {/* Content */}
          <div className={`flex items-center rounded-full bg-background relative z-10 transition-all duration-200 ease-out ${
            hasMoved ? 'w-[50px] h-[50px] justify-center p-0' : 'gap-2 py-2 pl-2 pr-4'
          }`}>
            {/* Marty Mascot Logo */}
            <div className={`flex justify-center items-center rounded-full bg-background flex-shrink-0 relative ${
              hasMoved ? 'w-[50px] h-[50px]' : 'w-[38px] h-[38px] overflow-hidden'
            }`}>
              <div className={`rounded-full ${hasMoved ? '' : 'overflow-hidden'} w-full h-full flex items-center justify-center`}>
                <div
                  style={{
                    width: hasMoved ? 42 : 38,
                    height: hasMoved ? 42 : 38,
                    transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <Lottie
                    animationData={hasMoved ? martyGlassesAnimation : martyAnimation}
                    loop={true}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              </div>

              {/* Speech Bubble Tooltip - Shows on hover when collapsed */}
              {hasMoved && (
                <div
                  className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[60] ${
                    tooltipPosition === 'top' ? '-top-16 left-1/2 -translate-x-1/2' :
                    tooltipPosition === 'right' ? 'top-1/2 -translate-y-1/2 -right-52' :
                    tooltipPosition === 'left' ? 'top-1/2 -translate-y-1/2 -left-52' :
                    'top-full left-1/2 -translate-x-1/2 mt-2'
                  }`}
                >
                  <div className="bg-background rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] px-3 py-2 relative whitespace-nowrap">
                    <span className="text-sm text-foreground font-normal">I have something to show you</span>
                    {/* Speech bubble arrow - position changes based on tooltip location */}
                    {tooltipPosition === 'top' && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white drop-shadow-sm" />
                    )}
                    {tooltipPosition === 'right' && (
                      <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white drop-shadow-sm" />
                    )}
                    {tooltipPosition === 'left' && (
                      <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-white drop-shadow-sm" />
                    )}
                    {tooltipPosition === 'bottom' && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white drop-shadow-sm" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Text - Hidden when moved unless hovered */}
            <div className={`text-foreground text-right text-base leading-6 whitespace-nowrap flex items-center gap-0.5 transition-all duration-200 ease-out ${
              hasMoved ? 'max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 overflow-hidden' : ''
            }`}>
              {!hasMoved ? (
                <>
                  <span className="inline-block max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 font-normal overflow-hidden transition-all duration-200 ease-out">Have a question?</span>
                  <span className="font-bold">Ask Marty</span>
                </>
              ) : (
                <span className="font-normal whitespace-nowrap">Have a question? <span className="font-bold">Ask Marty</span></span>
              )}
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Full Panel - New Figma Design
  return (
    <div className="fixed bottom-0 right-4 z-30 w-[425px] h-[752px] rounded-t-2xl shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] bg-background flex flex-col border border-border animate-slide-up-panel">
      {/* Navbar */}
      <div className="flex w-full h-[60px] px-4 py-3 justify-between items-center rounded-t-2xl border-b border-border bg-background flex-shrink-0">
        {(viewState === 'campaignForm' || viewState === 'campaignSetup' || viewState === 'addItemsDetail' || viewState === 'addItemsNewCampaign') ? (
          <div className="flex h-9 items-center gap-3">
            <button onClick={handleBack} className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex pb-0.5 justify-center items-center">
              <div className="text-foreground font-bold text-lg leading-6">{viewState === 'addItemsDetail' || viewState === 'addItemsNewCampaign' ? 'View details' : 'Create campaign'}</div>
            </div>
          </div>
        ) : (
          <div className="flex h-9 items-center gap-1.5 bg-background">
            {/* Marty Mascot Animation */}
            <div className="flex w-8 h-8 justify-center items-center">
              <Lottie
                animationData={martyAnimation}
                loop={true}
                style={{ width: 32, height: 32 }}
              />
            </div>

            <div className="text-foreground font-bold text-lg leading-6">Marty</div>

            {/* Beta Tag */}
            <div className="flex px-2 py-1 items-start gap-1 rounded border border-[#515357] bg-background">
              <span className="text-muted-foreground text-xs leading-4">Beta</span>
            </div>
          </div>
        )}

        <div className="flex justify-end items-center gap-4">
          {/* Reports Icon with Notification */}
          <button className="flex w-6 h-6 justify-center items-center relative rounded transition-colors hover:[background:var(--ld-primitive-color-gray-10)] active:[background:var(--ld-primitive-color-gray-20)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19.5V4C2 3.44772 2.44772 3 3 3H7.08579C7.351 3 7.60536 3.10536 7.79289 3.29289L10.2071 5.70711C10.3946 5.89464 10.649 6 10.9142 6H21.5C22.0523 6 22.5 6.44772 22.5 7V19.5C22.5 20.0523 22.0523 20.5 21.5 20.5H3C2.44772 20.5 2 20.0523 2 19.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 9H22.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            {/* Notification Dot */}
            <svg
              className="absolute -right-0.5 top-0.5"
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3.5" cy="3.5" r="4.25" fill="#EA1100" stroke="white" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* Expand Icon */}
          <button className="flex w-6 h-6 justify-center items-center rounded transition-colors hover:[background:var(--ld-primitive-color-gray-10)] active:[background:var(--ld-primitive-color-gray-20)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 4H20V10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 10L20 4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 20L4 20L4 14" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 14L4 20" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* Minimize Icon */}
          <button
            onClick={handleMinimize}
            className="flex w-6 h-6 justify-center items-center rounded transition-colors hover:[background:var(--ld-primitive-color-gray-10)] active:[background:var(--ld-primitive-color-gray-20)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content - Changes based on viewState */}
      <div className="transition-all duration-300 ease-in-out flex-1 flex flex-col overflow-hidden">
      {viewState === 'welcome' && (
        <div className="flex flex-col flex-1 bg-background overflow-y-auto">
          <div className="flex flex-col gap-4 px-4 py-4">
            {/* Greeting */}
            <div className="flex flex-col gap-2">
              <h1
                className="font-bold text-2xl leading-8"
                style={{
                  background: 'linear-gradient(134deg, #993EF4 10.5%, #3F7FCF 71.77%, #00AD9F 102.41%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Hi, Gabriela
              </h1>
              <p className="text-foreground text-sm leading-5">
                I'm your smart assistant, here to help you launch campaigns, get insights and find answers. What can I help you with today?
              </p>
            </div>

            {/* All Campaigns Metrics Card */}
            <div className="rounded-xl border border-border bg-background p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-foreground text-lg font-bold leading-6" style={{ fontFamily: 'Bogle, var(--ld-semantic-font-family-sans, "Everyday Sans UI"), -apple-system, Roboto, Helvetica, sans-serif' }}>All campaigns</span>
                <span className="text-xs text-muted-foreground">Last week (May 1 – 7) vs. previous week</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Sales</span>
                  <span className="font-bold text-xl text-foreground">$2,520</span>
                  <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)]">↑ 7%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">ROAS</span>
                  <span className="font-bold text-xl text-foreground">5.8x</span>
                  <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)]">↑ 10%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Conv. rate</span>
                  <span className="font-bold text-xl text-foreground">1.50%</span>
                  <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)]">↑ 8%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Ad spend</span>
                  <span className="font-bold text-xl text-foreground">$6,500</span>
                  <span className="text-xs text-muted-foreground">→ 0%</span>
                </div>
              </div>
            </div>

            {/* Recommendations Count */}
            <p className="text-sm text-foreground">
              You have 5 personalized recommendations that can help you improve your campaign set-up and performance.
            </p>

            {/* Recommendation Cards Carousel */}
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden">
                {/* Left Arrow */}
                {activeCard > 0 && (
                  <button
                    onClick={() => setActiveCard(activeCard - 1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="Previous recommendation"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}

                {/* Right Arrow */}
                {activeCard < 4 && (
                  <button
                    onClick={() => setActiveCard(activeCard + 1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="Next recommendation"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}

                {/* Cards wrapper - slides based on activeCard */}
                <div
                  className="flex transition-transform duration-300 ease-in-out gap-3"
                  style={{ transform: `translateX(-${activeCard * 334}px)` }}
                >
                  {/* Card 1: Update daily budget */}
                  <div className="flex-shrink-0 w-[322px] rounded-xl border border-border bg-background p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FBD0CC] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3.9C8.29823 3.9 8.54565 4.11759 8.59215 4.40268L8.6 4.5V9.6407C8.6 9.97207 8.33137 10.2407 8 10.2407C7.70177 10.2407 7.45435 10.0231 7.40785 9.73802L7.4 9.6407V4.5C7.4 4.16863 7.66863 3.9 8 3.9Z" fill="#EA1100"/>
                          <path d="M8 12.1016C8.33224 12.1016 8.60157 11.8322 8.60157 11.5C8.60157 11.1678 8.33224 10.8984 8 10.8984C7.66776 10.8984 7.39843 11.1678 7.39843 11.5C7.39843 11.8322 7.66776 12.1016 8 12.1016Z" fill="#EA1100"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8Z" fill="#EA1100"/>
                        </svg>
                      </div>
                      <span className="font-bold text-sm text-foreground">Update daily budget</span>
                    </div>
                    <p className="text-sm text-foreground leading-5">
                      <span className="underline cursor-pointer">Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747</span> has run out of <strong>daily budget</strong>. Applying our recommendation could help keep your ads running all day. <span className="underline cursor-pointer hover:no-underline">Learn more</span>
                    </p>
                    <div className="flex gap-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">Daily budget</span>
                        <span className="font-bold text-lg text-foreground">$200</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">Cap-out time</span>
                        <span className="font-bold text-lg text-foreground">2:00 pm</span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-3 flex items-center justify-end gap-3 mt-auto">
                      <button className="text-sm underline hover:no-underline text-foreground">See details</button>
                      <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors">Apply</button>
                    </div>
                  </div>

                  {/* Card 2: Switch bidding strategy */}
                  <div className="flex-shrink-0 w-[322px] rounded-xl border border-border bg-background p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5D5E9] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                        </svg>
                      </div>
                      <span className="font-bold text-sm text-foreground">Switch your bidding strategy</span>
                    </div>
                    <p className="text-sm text-foreground leading-5">
                      Switching <span className="underline cursor-pointer">Walmart|Sponsored Product|Cross Device|Auto|All Postions FY2020|3747</span> to <strong>ROAS</strong> bidding could increase sales with our recommended targets.
                    </p>
                    <div className="flex gap-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">ROAS target</span>
                        <span className="font-bold text-lg text-foreground">2.50</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)]">Est. sales increase</span>
                        <span className="font-bold text-lg text-[var(--ld-semantic-color-text-positive,#2A8703)]">$10-20k</span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-3 flex items-center justify-end gap-3 mt-auto">
                      <button className="text-sm underline hover:no-underline text-foreground">See details</button>
                      <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors">Apply</button>
                    </div>
                  </div>

                  {/* Card 3: Add items to existing campaign */}
                  <div className="flex-shrink-0 w-[322px] rounded-xl border border-border bg-background p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5D5E9] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                        </svg>
                      </div>
                      <span className="font-bold text-sm text-foreground">Add items to existing campaign</span>
                    </div>
                    <p className="text-sm text-foreground leading-5">
                      Adding items that you're not advertising to <span className="underline cursor-pointer">Walmart|Sponsored Product|Cross Device|Auto|All Positions FY2020|3747</span> has the potential to drive sales. <span className="underline cursor-pointer hover:no-underline">Learn more</span>
                    </p>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">Number of items</span>
                        <span className="font-bold text-lg text-foreground">93</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">Average listing quality</span>
                        <span className="font-bold text-lg text-foreground">51.5%</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)] leading-4">Combined potential increase in sales/week</span>
                        <span className="font-bold text-lg text-[var(--ld-semantic-color-text-positive,#2A8703)]">$12-14k</span>
                      </div>
                    </div>
                    {addItemsApplied ? (
                      <div className="border-t border-border pt-3 flex items-start gap-2 mt-auto">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 8.5L6 12L13.5 4" stroke="var(--ld-semantic-color-text-positive, #2A8703)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-[var(--ld-semantic-color-text-positive,#2A8703)] leading-5">
                          Recommendation applied. This may take a few hours. <span className="underline cursor-pointer hover:no-underline">View status.</span>
                        </span>
                      </div>
                    ) : (
                      <div className="border-t border-border pt-3 flex items-center justify-end gap-3 mt-auto">
                        <button className="text-sm underline hover:no-underline text-foreground">Request report</button>
                        <button className="text-sm underline hover:no-underline text-foreground" onClick={() => { setViewState('addItemsDetail'); setSelectedItems(new Set()); setShowSelectError(false); }}>See details</button>
                        <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors">Apply</button>
                      </div>
                    )}
                  </div>

                  {/* Card 4: Add items to new campaign */}
                  <div className="flex-shrink-0 w-[322px] rounded-xl border border-border bg-background p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5D5E9] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                        </svg>
                      </div>
                      <span className="font-bold text-sm text-foreground">Add items to new campaign</span>
                    </div>
                    <p className="text-sm text-foreground leading-5">
                      We found items that you're not advertising that have the potential to drive sales in a Sponsored Products automatic campaign. <span className="underline cursor-pointer hover:no-underline">Learn more</span>
                    </p>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">Number of items</span>
                        <span className="font-bold text-lg text-foreground">93</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">Average listing quality</span>
                        <span className="font-bold text-lg text-foreground">51.5%</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)] leading-4">Combined potential increase in sales/week</span>
                        <span className="font-bold text-lg text-[var(--ld-semantic-color-text-positive,#2A8703)]">$12-14k</span>
                      </div>
                    </div>
                    {addNewCampaignApplied ? (
                      <div className="border-t border-border pt-3 flex items-start gap-2 mt-auto">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 8.5L6 12L13.5 4" stroke="var(--ld-semantic-color-text-positive, #2A8703)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-[var(--ld-semantic-color-text-positive,#2A8703)] leading-5">
                          Recommendation applied. This may take a few hours. <span className="underline cursor-pointer hover:no-underline">View status.</span>
                        </span>
                      </div>
                    ) : (
                      <div className="border-t border-border pt-3 flex items-center justify-end gap-3 mt-auto">
                        <button className="text-sm underline hover:no-underline text-foreground">Request report</button>
                        <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors" onClick={() => { setViewState('addItemsNewCampaign'); setSelectedNewItems(new Set()); setShowNewCampaignError(''); setDailyBudget(''); }}>View details</button>
                      </div>
                    )}
                  </div>

                  {/* Card 5: Increase bids for top keywords */}
                  <div className="flex-shrink-0 w-[322px] rounded-xl border border-border bg-background p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FBD0CC] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3.9C8.29823 3.9 8.54565 4.11759 8.59215 4.40268L8.6 4.5V9.6407C8.6 9.97207 8.33137 10.2407 8 10.2407C7.70177 10.2407 7.45435 10.0231 7.40785 9.73802L7.4 9.6407V4.5C7.4 4.16863 7.66863 3.9 8 3.9Z" fill="#EA1100"/>
                          <path d="M8 12.1016C8.33224 12.1016 8.60157 11.8322 8.60157 11.5C8.60157 11.1678 8.33224 10.8984 8 10.8984C7.66776 10.8984 7.39843 11.1678 7.39843 11.5C7.39843 11.8322 7.66776 12.1016 8 12.1016Z" fill="#EA1100"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8Z" fill="#EA1100"/>
                        </svg>
                      </div>
                      <span className="font-bold text-sm text-foreground">Increase bids for top keywords</span>
                    </div>
                    <p className="text-sm text-foreground leading-5">
                      Increasing bids on your top-performing keywords could help capture more impressions and drive more sales.
                    </p>
                    <div className="flex gap-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">Keywords</span>
                        <span className="font-bold text-lg text-foreground">12</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-[var(--ld-semantic-color-text-positive,#2A8703)]">Est. impression lift</span>
                        <span className="font-bold text-lg text-[var(--ld-semantic-color-text-positive,#2A8703)]">+25%</span>
                      </div>
                    </div>
                    <div className="border-t border-border pt-3 flex items-center justify-end gap-3 mt-auto">
                      <button className="text-sm underline hover:no-underline text-foreground">See details</button>
                      <button className="h-8 px-4 border border-foreground rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors">Apply</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === activeCard
                        ? 'w-5 h-2 bg-foreground'
                        : 'w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'addItemsDetail' && (
        <div className="flex flex-col flex-1 bg-background overflow-hidden">
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Header row */}
            <div className="flex items-start gap-2 px-4 pt-4 pb-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5D5E9] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                </svg>
              </div>
              <span className="font-bold text-sm text-foreground">Add items to existing campaign</span>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground leading-5 px-4 pb-4">
              Adding these items has the potential to drive sales to the existing campaign. <span className="underline cursor-pointer hover:no-underline">Learn more</span>
            </p>

            {/* Error Banner */}
            {showSelectError && (
              <div className="mx-4 mb-4 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#FFF1F0] border border-[#EA1100]/20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 4.9C8.33137 4.9 8.6 5.16863 8.6 5.5V8.5C8.6 8.83137 8.33137 9.1 8 9.1C7.66863 9.1 7.4 8.83137 7.4 8.5V5.5C7.4 5.16863 7.66863 4.9 8 4.9ZM8 11.5C8.33137 11.5 8.6 11.2314 8.6 10.9C8.6 10.5686 8.33137 10.3 8 10.3C7.66863 10.3 7.4 10.5686 7.4 10.9C7.4 11.2314 7.66863 11.5 8 11.5Z" fill="#EA1100"/>
                </svg>
                <span className="text-sm text-[#EA1100] font-medium">Select items to continue.</span>
              </div>
            )}

            {/* Items Table */}
            <div className="border border-border rounded-xl mx-4 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[32px_1fr_auto_auto] items-center px-3 py-2.5 border-b border-border bg-background">
                <Checkbox
                  checked={
                    selectedItems.size === 4 ? true :
                    selectedItems.size > 0 ? 'indeterminate' :
                    false
                  }
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setSelectedItems(new Set([0, 1, 2, 3]));
                      setShowSelectError(false);
                    } else {
                      setSelectedItems(new Set());
                    }
                  }}
                  aria-label="Select all items"
                />
                <span className="text-sm font-bold text-foreground">Item name</span>
                <span className="text-sm font-bold text-foreground w-20 text-left">Item ID</span>
                <span className="text-sm font-bold text-foreground w-24 text-right">Sugg. Bid
                  <button className="inline-flex items-center justify-center w-4 h-4 ml-1 align-middle">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1"/>
                      <path d="M7 6.5V10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      <circle cx="7" cy="4.5" r="0.75" fill="currentColor"/>
                    </svg>
                  </button>
                </span>
              </div>

              {/* Table Rows */}
              {[
                { id: 0, name: 'Clorox wipes', itemId: '13246752', bid: '$3.91' },
                { id: 1, name: 'Clorox tilex', itemId: '18972432', bid: '$3.91' },
                { id: 2, name: 'Clorox tabs',  itemId: '15372431', bid: '$3.91' },
                { id: 3, name: 'Clorox soap',  itemId: '13246752', bid: '$4.23' },
              ].map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[32px_1fr_auto_auto] items-center px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted transition-colors"
                >
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={(checked) => {
                      const next = new Set(selectedItems);
                      if (checked) {
                        next.add(item.id);
                        setShowSelectError(false);
                      } else {
                        next.delete(item.id);
                      }
                      setSelectedItems(next);
                    }}
                    aria-label={`Select ${item.name}`}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm text-foreground w-20 text-left">{item.itemId}</span>
                  <div className="flex items-center gap-1.5 w-24 justify-end">
                    <span className="text-sm text-foreground underline">{item.bid}</span>
                    <button className="flex items-center justify-center w-5 h-5 text-muted-foreground hover:text-foreground transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9.5 2.5L11.5 4.5L4.5 11.5H2.5V9.5L9.5 2.5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-border px-4 py-3 flex items-center justify-between gap-3 bg-background">
            <Button
              variant="secondary"
              size="medium"
              onClick={() => setViewState('welcome')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={() => {
                if (selectedItems.size === 0) {
                  setShowSelectError(true);
                } else {
                  setShowSelectError(false);
                  setAddItemsApplied(true);
                  setViewState('welcome');
                }
              }}
            >
              Apply selected
            </Button>
          </div>
        </div>
      )}

      {viewState === 'addItemsNewCampaign' && (
        <div className="flex flex-col flex-1 bg-background overflow-hidden">
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Header row */}
            <div className="flex items-start gap-2 px-4 pt-4 pb-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5D5E9] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                </svg>
              </div>
              <span className="font-bold text-sm text-foreground">Add items to new campaign</span>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground leading-5 px-4 pb-4">
              Adding these items has the potential to drive sales to a new campaign. <span className="underline cursor-pointer hover:no-underline">Learn more</span>
            </p>

            {/* Error Banner */}
            {showNewCampaignError && (
              <div className="px-4 pb-4">
                <Alert variant="error">
                  {showNewCampaignError}
                </Alert>
              </div>
            )}

            {/* Daily budget field */}
            <div className="px-4 pb-4">
              <TextField
                label="Enter daily budget"
                type="number"
                value={dailyBudget}
                onChange={(e) => {
                  setDailyBudget(e.target.value);
                  setShowNewCampaignError('');
                }}
                size="small"
                leadingIcon={<span className="text-sm text-muted-foreground">$</span>}
                inputProps={{
                  min: '0',
                  step: '0.01',
                }}
              />
            </div>

            {/* Select items section */}
            <div className="px-4 pb-3">
              <span className="font-bold text-sm text-foreground">Select items</span>
            </div>

            {/* Items Table */}
            <div className="border border-border rounded-xl mx-4 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[32px_1fr_auto_auto] items-center px-3 py-2.5 border-b border-border bg-background">
                <Checkbox
                  checked={
                    selectedNewItems.size === 4 ? true :
                    selectedNewItems.size > 0 ? 'indeterminate' :
                    false
                  }
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setSelectedNewItems(new Set([0, 1, 2, 3]));
                      setShowNewCampaignError('');
                    } else {
                      setSelectedNewItems(new Set());
                    }
                  }}
                  aria-label="Select all items"
                />
                <span className="text-sm font-bold text-foreground">Item name</span>
                <span className="text-sm font-bold text-foreground w-20 text-left">Item ID</span>
                <span className="text-sm font-bold text-foreground w-24 text-right">Sugg. Bid
                  <button className="inline-flex items-center justify-center w-4 h-4 ml-1 align-middle">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1"/>
                      <path d="M7 6.5V10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      <circle cx="7" cy="4.5" r="0.75" fill="currentColor"/>
                    </svg>
                  </button>
                </span>
              </div>

              {/* Table Rows */}
              {[
                { id: 0, name: 'Clorox wipes', itemId: '13246752', bid: '$3.91' },
                { id: 1, name: 'Clorox tilex', itemId: '18972432', bid: '$3.91' },
                { id: 2, name: 'Clorox tabs',  itemId: '15372431', bid: '$3.91' },
                { id: 3, name: 'Clorox soap',  itemId: '13246752', bid: '$4.23' },
              ].map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[32px_1fr_auto_auto] items-center px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted transition-colors"
                >
                  <Checkbox
                    checked={selectedNewItems.has(item.id)}
                    onCheckedChange={(checked) => {
                      const next = new Set(selectedNewItems);
                      if (checked) {
                        next.add(item.id);
                        setShowNewCampaignError('');
                      } else {
                        next.delete(item.id);
                      }
                      setSelectedNewItems(next);
                    }}
                    aria-label={`Select ${item.name}`}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm text-foreground w-20 text-left">{item.itemId}</span>
                  <div className="flex items-center gap-1.5 w-24 justify-end">
                    <span className="text-sm text-foreground underline">{item.bid}</span>
                    <button className="flex items-center justify-center w-5 h-5 text-muted-foreground hover:text-foreground transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9.5 2.5L11.5 4.5L4.5 11.5H2.5V9.5L9.5 2.5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-border px-4 py-3 flex items-center justify-between gap-3 bg-background">
            <Button
              variant="secondary"
              size="medium"
              onClick={() => setViewState('welcome')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={() => {
                const hasItems = selectedNewItems.size > 0;
                const hasBudget = dailyBudget.trim() !== '';

                if (!hasItems && !hasBudget) {
                  setShowNewCampaignError('Select items and enter daily budget to continue.');
                } else if (!hasItems) {
                  setShowNewCampaignError('Select items to continue.');
                } else if (!hasBudget) {
                  setShowNewCampaignError('Enter daily budget to continue.');
                } else {
                  setShowNewCampaignError('');
                  setAddNewCampaignApplied(true);
                  setViewState('welcome');
                }
              }}
            >
              Apply selected
            </Button>
          </div>
        </div>
      )}

      {viewState === 'chat' && (
        <div className="flex w-full flex-col flex-1 bg-background overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-start gap-4 h-full justify-center">
                <h1 
                  className="self-stretch font-bold text-2xl leading-8"
                  style={{
                    background: 'linear-gradient(134deg, #993EF4 10.5%, #3F7FCF 71.77%, #00AD9F 102.41%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Hi, Gabriela
                </h1>
                <p className="self-stretch text-foreground text-sm leading-5">
                  I'm your smart assistant, here to help you launch campaigns, get insights and find answers. What can I help you with today?
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex w-full flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`flex max-w-[85%] flex-col items-start gap-2 ${
                      message.role === 'user'
                        ? '[background:var(--ld-semantic-color-background-subtle)] rounded-[28px] px-4 py-2'
                        : 'bg-background rounded-lg'
                    }`}
                    >
                      <div className="text-foreground text-sm leading-5 whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleFeedback(message.id, 'up')}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#f1f1f2] active:bg-[#e3e4e5]"
                        >
                          {message.feedback === 'up' ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.1035 6C11.8808 6 11.7094 5.68176 11.7842 5.47205C11.8968 5.15649 12 4.6814 12 4V3.49988C12 2.11914 10.8807 1 9.5 1C8.94772 1 8.5 1.44775 8.5 2V3.58008C8.5 4.16394 8.24487 4.71863 7.80157 5.09863L5.69843 6.90137C5.25513 7.28137 5 7.83606 5 8.41992V10.5C5 12.7091 6.79086 14.5 9 14.5H11.9296C12.5983 14.5 13.2228 14.1658 13.5937 13.6094L13.8321 13.252C13.9416 13.0876 14 12.8947 14 12.6973V12.2361C14 12.1364 14.0149 12.0375 14.044 11.9427C14.0602 11.89 14.0807 11.8385 14.1056 11.7888L14.1295 11.741C14.3667 11.2665 14.4058 10.7173 14.238 10.2141L14.1867 10.0601C14.0736 9.7207 14.1751 9.3468 14.4442 9.11133C15.6779 8.03186 14.9144 6 13.2752 6H12.1035Z" fill="#2E2F32"/>
                              <path d="M2.70001 7C1.76111 7 1 7.76111 1 8.69995V12.3C1 13.2389 1.76111 14 2.70001 14H3.9996V13H2.70001C2.31342 13 2 12.6866 2 12.3V8.69995C2 8.31335 2.31342 8 2.70001 8H3.9996V7H2.70001Z" fill="#2E2F32"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.1035 6C11.8808 6 11.7094 5.68176 11.7842 5.47205C11.8968 5.15649 12 4.6814 12 4V3.49988C12 2.11914 10.8807 1 9.5 1C8.94772 1 8.5 1.44775 8.5 2V3.58008C8.5 4.16394 8.24487 4.71863 7.80157 5.09863L5.69843 6.90137C5.25513 7.28137 5 7.83606 5 8.41992V10.5C5 12.7091 6.79086 14.5 9 14.5H11.9296C12.5983 14.5 13.2228 14.1658 13.5937 13.6094L13.8321 13.252C13.9416 13.0876 14 12.8947 14 12.6973V12.2361C14 12.1364 14.0149 12.0375 14.044 11.9427C14.0602 11.89 14.0807 11.8385 14.1056 11.7888L14.1295 11.741C14.3667 11.2665 14.4058 10.7173 14.238 10.2141L14.1867 10.0601C14.0736 9.7207 14.1751 9.3468 14.4442 9.11133C15.6779 8.03186 14.9144 6 13.2752 6H12.1035ZM13.2351 11.2937L13.2112 11.3417C13.0723 11.6194 13 11.9255 13 12.2361V12.6973L12.7617 13.0547C12.5762 13.3329 12.264 13.5 11.9296 13.5H9C7.34314 13.5 6 12.1569 6 10.5V8.41992C6 8.12793 6.12756 7.85059 6.34921 7.66064L8.45236 5.85791C9.11731 5.28796 9.5 4.45593 9.5 3.58008V2C10.3285 2 11 2.67151 11 3.49988V4C11 4.57935 10.9125 4.93933 10.8424 5.13586C10.6786 5.59497 10.8051 6.03687 10.9673 6.31641C11.1247 6.58777 11.4966 7 12.1035 7H13.2752C13.9911 7 14.3245 7.88733 13.7857 8.35876C13.2134 8.8595 12.9975 9.65479 13.238 10.3762L13.2893 10.5303C13.3732 10.7819 13.3537 11.0565 13.2351 11.2937Z" fill="#2E2F32"/>
                              <path d="M2.70001 7C1.76111 7 1 7.76111 1 8.69995V12.3C1 13.2389 1.76111 14 2.70001 14H3.9996V13H2.70001C2.31342 13 2 12.6866 2 12.3V8.69995C2 8.31335 2.31342 8 2.70001 8H3.9996V7H2.70001Z" fill="#2E2F32"/>
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, 'down')}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#f1f1f2] active:bg-[#e3e4e5]"
                        >
                          {message.feedback === 'down' ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.1035 10.0117C11.8808 10.0117 11.7094 10.33 11.7842 10.5397C11.8968 10.8552 12 11.3303 12 12.0117V12.5118C12 13.8926 10.8807 15.0117 9.5 15.0117C8.94772 15.0117 8.5 14.564 8.5 14.0117V12.4316C8.5 11.8478 8.24487 11.2931 7.80157 10.9131L5.69843 9.11035C5.25513 8.73035 5 8.17566 5 7.5918V5.51172C5 3.30261 6.79086 1.51172 9 1.51172H11.9296C12.5983 1.51172 13.2228 1.84595 13.5937 2.40234L13.8321 2.75977C13.9416 2.92407 14 3.11707 14 3.31445V3.77563C14 3.87537 14.0149 3.97424 14.044 4.06897C14.0602 4.1217 14.0807 4.17322 14.1056 4.2229L14.1295 4.27075C14.3667 4.74524 14.4058 5.29443 14.238 5.79761L14.1867 5.95166C14.0736 6.29102 14.1751 6.66492 14.4442 6.90039C15.6779 7.97986 14.9144 10.0117 13.2752 10.0117H12.1035Z" fill="#2E2F32"/>
                              <path d="M2.70001 9.01172C1.76111 9.01172 1 8.25061 1 7.31177V3.71167C1 2.77283 1.76111 2.01172 2.70001 2.01172H3.9996V3.01172H2.70001C2.31342 3.01172 2 3.32507 2 3.71167V7.31177C2 7.69836 2.31342 8.01172 2.70001 8.01172H3.9996V9.01172H2.70001Z" fill="#2E2F32"/>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.1035 10.0117C11.8808 10.0117 11.7094 10.33 11.7842 10.5397C11.8968 10.8552 12 11.3303 12 12.0117V12.5118C12 13.8926 10.8807 15.0117 9.5 15.0117C8.94772 15.0117 8.5 14.564 8.5 14.0117V12.4316C8.5 11.8478 8.24487 11.2931 7.80157 10.9131L5.69843 9.11035C5.25513 8.73035 5 8.17566 5 7.5918V5.51172C5 3.30261 6.79086 1.51172 9 1.51172H11.9296C12.5983 1.51172 13.2228 1.84595 13.5937 2.40234L13.8321 2.75977C13.9416 2.92407 14 3.11707 14 3.31445V3.77563C14 3.87537 14.0149 3.97424 14.044 4.06897C14.0602 4.1217 14.0807 4.17322 14.1056 4.2229L14.1295 4.27075C14.3667 4.74524 14.4058 5.29443 14.238 5.79761L14.1867 5.95166C14.0736 6.29102 14.1751 6.66492 14.4442 6.90039C15.6779 7.97986 14.9144 10.0117 13.2752 10.0117H12.1035ZM13.2351 4.71802L13.2112 4.67004C13.0723 4.39233 13 4.08618 13 3.77563V3.31445L12.7617 2.95703C12.5762 2.67883 12.264 2.51172 11.9296 2.51172H9C7.34314 2.51172 6 3.85486 6 5.51172V7.5918C6 7.88379 6.12756 8.16113 6.34921 8.35107L8.45236 10.1538C9.11731 10.7238 9.5 11.5558 9.5 12.4316V14.0117C10.3285 14.0117 11 13.3402 11 12.5118V12.0117C11 11.4324 10.9125 11.0724 10.8424 10.8759C10.6786 10.4167 10.8051 9.97485 10.9673 9.69531C11.1247 9.42395 11.4966 9.01172 12.1035 9.01172H13.2752C13.9911 9.01172 14.3245 8.12439 13.7857 7.65295C13.2134 7.15222 12.9975 6.35693 13.238 5.6355L13.2893 5.48145C13.3732 5.22986 13.3537 4.9552 13.2351 4.71802Z" fill="#2E2F32"/>
                              <path d="M2.70001 9.01172C1.76111 9.01172 1 8.25061 1 7.31177V3.71167C1 2.77283 1.76111 2.01172 2.70001 2.01172H3.9996V3.01172H2.70001C2.31342 3.01172 2 3.32507 2 3.71167V7.31177C2 7.69836 2.31342 8.01172 2.70001 8.01172H3.9996V9.01172H2.70001Z" fill="#2E2F32"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Thinking Indicator */}
                {isTyping && (
                  <div className="flex w-full items-center gap-1.5 py-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <path d="M11.6786 0.242428C13.0883 1.95515 14.4645 4.10004 16.1422 5.5576C18.2759 7.41066 22.7618 8.11712 21.974 11.828C21.6009 13.5838 19.1051 15.4321 17.9904 16.9056C16.3862 19.0265 15.8567 21.5271 13.6672 23.2318C13.3275 23.4965 12.94 23.8952 12.4759 23.8697C10.052 23.4567 9.48425 21.5685 7.77631 20.0599C6.93749 19.32 5.58677 18.3647 4.61081 17.8162C2.28093 16.5069 -0.500249 15.987 0.0770371 12.4101C0.36568 10.6272 3.62049 8.3643 4.8851 6.72653C6.13694 5.10471 7.26122 1.86903 8.59759 0.902638C9.75854 0.0622249 9.859 0.0111936 11.0327 3.06028e-05C11.3373 -0.00315882 11.5542 0.244022 11.6786 0.240833V0.242428ZM9.92439 4.52583C9.08557 4.35041 8.3217 5.19879 8.1718 5.9515C8.37752 6.14765 10.3358 4.91653 9.92439 4.52583ZM15.6638 5.63096C16.1326 4.93885 13.192 5.13501 13.4471 5.77927C13.6991 6.05197 14.2237 6.08067 14.3848 6.18752C14.4853 6.25449 15.3735 7.7902 15.7419 8.17293C17.0528 9.52844 17.0687 8.45679 16.4898 7.27032C16.2506 6.77915 15.7499 6.0711 15.1853 5.94831L15.6622 5.63096H15.6638ZM9.84465 6.11256C9.26099 6.51284 9.40132 7.41863 9.48744 8.05173C9.55282 8.53015 10.0775 10.4486 10.7967 10.2317C11.5159 10.0148 10.7457 6.46021 9.84465 6.11256ZM20.1305 10.2317C20.6122 9.74532 17.3908 6.78553 18.783 9.6002C16.3941 12.2091 12.4408 12.316 9.12703 12.4531L9.05208 11.3384C8.57207 10.6415 8.11917 12.0226 8.0506 12.4101C7.99638 12.7195 7.85764 14.0048 8.40941 13.8788L8.90856 13.0735C11.744 13.5375 16.0672 13.1676 18.303 11.1869C19.0206 10.5506 19.0127 9.80273 20.1321 10.2317H20.1305Z" fill="#A88BFF"/>
                      <path d="M12.4759 23.8713C12.94 23.8952 13.3275 23.4981 13.6672 23.2334C15.8567 21.5287 16.3862 19.0281 17.9905 16.9072C19.1052 15.4337 21.6009 13.5838 21.9741 11.8296C22.7618 8.11872 18.2759 7.41226 16.1422 5.5592C14.4661 4.10164 13.0899 1.95675 11.6786 0.244025C13.243 0.204157 15.0785 3.0252 16.2187 4.05379C16.7227 4.50829 17.4435 5.06484 18.0064 5.44757C20.113 6.87803 23.6995 7.551 23.9627 10.4661C24.2433 13.5647 22.2165 14.0207 20.4431 15.8595C19.507 16.8322 18.4768 18.2547 17.8134 19.4284C16.7769 21.2607 16.5967 23.1154 14.2636 23.8266C13.3977 24.0914 13.2845 24.0084 12.4744 23.8713H12.4759Z" fill="#9170FE"/>
                      <path d="M20.1305 10.2317C19.0111 9.80272 19.019 10.5506 18.3014 11.1869C16.0656 13.1692 11.744 13.5375 8.90696 13.0735L8.40782 13.8788C7.85764 14.0048 7.99478 12.7179 8.049 12.4101C8.11758 12.0226 8.57048 10.6415 9.05048 11.3384L9.12544 12.4531C12.4392 12.316 16.3925 12.2091 18.7814 9.60019C17.3892 6.78553 20.6106 9.74531 20.129 10.2317H20.1305Z" fill="#011B56"/>
                      <path d="M15.6638 5.63098L15.187 5.94832C15.7499 6.07112 16.2506 6.77757 16.4914 7.27034C17.0703 8.45681 17.0544 9.52845 15.7435 8.17295C15.3751 7.79181 14.4869 6.25451 14.3864 6.18753C14.2253 6.08068 13.7007 6.05039 13.4487 5.77928C13.1936 5.13502 16.1326 4.93887 15.6654 5.63098H15.6638Z" fill="#011B56"/>
                      <path d="M9.8447 6.11255C10.7457 6.4586 11.5191 10.0148 10.7967 10.2317C10.0743 10.4486 9.55286 8.53013 9.48748 8.05172C9.40137 7.42021 9.26263 6.51441 9.8447 6.11255Z" fill="#011B56"/>
                      <path d="M9.92434 4.52583C10.3358 4.91494 8.37747 6.14766 8.17175 5.95151C8.32166 5.1988 9.08552 4.35042 9.92434 4.52583Z" fill="#011B56"/>
                    </svg>
                    <div className="text-foreground text-sm leading-5">
                      Thinking<span className="inline-flex">
                        <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}>.</span>
                        <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }}>.</span>
                        <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }}>.</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      )}

      {viewState === 'campaignSetup' && (
        <div className="flex w-full flex-col flex-1 bg-background overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex max-w-[85%] flex-col items-start gap-2 ${
                      message.role === 'user'
                        ? '[background:var(--ld-semantic-color-background-subtle)] rounded-[28px] px-4 py-2'
                        : 'bg-background rounded-lg'
                    }`}
                  >
                    <div className="text-foreground text-sm leading-5 whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleFeedback(message.id, 'up')}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#f1f1f2] active:bg-[#e3e4e5]"
                      >
                        {message.feedback === 'up' ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 6C11.8808 6 11.7094 5.68176 11.7842 5.47205C11.8968 5.15649 12 4.6814 12 4V3.49988C12 2.11914 10.8807 1 9.5 1C8.94772 1 8.5 1.44775 8.5 2V3.58008C8.5 4.16394 8.24487 4.71863 7.80157 5.09863L5.69843 6.90137C5.25513 7.28137 5 7.83606 5 8.41992V10.5C5 12.7091 6.79086 14.5 9 14.5H11.9296C12.5983 14.5 13.2228 14.1658 13.5937 13.6094L13.8321 13.252C13.9416 13.0876 14 12.8947 14 12.6973V12.2361C14 12.1364 14.0149 12.0375 14.044 11.9427C14.0602 11.89 14.0807 11.8385 14.1056 11.7888L14.1295 11.741C14.3667 11.2665 14.4058 10.7173 14.238 10.2141L14.1867 10.0601C14.0736 9.7207 14.1751 9.3468 14.4442 9.11133C15.6779 8.03186 14.9144 6 13.2752 6H12.1035Z" fill="#2E2F32"/>
                            <path d="M2.70001 7C1.76111 7 1 7.76111 1 8.69995V12.3C1 13.2389 1.76111 14 2.70001 14H3.9996V13H2.70001C2.31342 13 2 12.6866 2 12.3V8.69995C2 8.31335 2.31342 8 2.70001 8H3.9996V7H2.70001Z" fill="#2E2F32"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 6C11.8808 6 11.7094 5.68176 11.7842 5.47205C11.8968 5.15649 12 4.6814 12 4V3.49988C12 2.11914 10.8807 1 9.5 1C8.94772 1 8.5 1.44775 8.5 2V3.58008C8.5 4.16394 8.24487 4.71863 7.80157 5.09863L5.69843 6.90137C5.25513 7.28137 5 7.83606 5 8.41992V10.5C5 12.7091 6.79086 14.5 9 14.5H11.9296C12.5983 14.5 13.2228 14.1658 13.5937 13.6094L13.8321 13.252C13.9416 13.0876 14 12.8947 14 12.6973V12.2361C14 12.1364 14.0149 12.0375 14.044 11.9427C14.0602 11.89 14.0807 11.8385 14.1056 11.7888L14.1295 11.741C14.3667 11.2665 14.4058 10.7173 14.238 10.2141L14.1867 10.0601C14.0736 9.7207 14.1751 9.3468 14.4442 9.11133C15.6779 8.03186 14.9144 6 13.2752 6H12.1035ZM13.2351 11.2937L13.2112 11.3417C13.0723 11.6194 13 11.9255 13 12.2361V12.6973L12.7617 13.0547C12.5762 13.3329 12.264 13.5 11.9296 13.5H9C7.34314 13.5 6 12.1569 6 10.5V8.41992C6 8.12793 6.12756 7.85059 6.34921 7.66064L8.45236 5.85791C9.11731 5.28796 9.5 4.45593 9.5 3.58008V2C10.3285 2 11 2.67151 11 3.49988V4C11 4.57935 10.9125 4.93933 10.8424 5.13586C10.6786 5.59497 10.8051 6.03687 10.9673 6.31641C11.1247 6.58777 11.4966 7 12.1035 7H13.2752C13.9911 7 14.3245 7.88733 13.7857 8.35876C13.2134 8.8595 12.9975 9.65479 13.238 10.3762L13.2893 10.5303C13.3732 10.7819 13.3537 11.0565 13.2351 11.2937Z" fill="#2E2F32"/>
                            <path d="M2.70001 7C1.76111 7 1 7.76111 1 8.69995V12.3C1 13.2389 1.76111 14 2.70001 14H3.9996V13H2.70001C2.31342 13 2 12.6866 2 12.3V8.69995C2 8.31335 2.31342 8 2.70001 8H3.9996V7H2.70001Z" fill="#2E2F32"/>
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'down')}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#f1f1f2] active:bg-[#e3e4e5]"
                      >
                        {message.feedback === 'down' ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 10.0117C11.8808 10.0117 11.7094 10.33 11.7842 10.5397C11.8968 10.8552 12 11.3303 12 12.0117V12.5118C12 13.8926 10.8807 15.0117 9.5 15.0117C8.94772 15.0117 8.5 14.564 8.5 14.0117V12.4316C8.5 11.8478 8.24487 11.2931 7.80157 10.9131L5.69843 9.11035C5.25513 8.73035 5 8.17566 5 7.5918V5.51172C5 3.30261 6.79086 1.51172 9 1.51172H11.9296C12.5983 1.51172 13.2228 1.84595 13.5937 2.40234L13.8321 2.75977C13.9416 2.92407 14 3.11707 14 3.31445V3.77563C14 3.87537 14.0149 3.97424 14.044 4.06897C14.0602 4.1217 14.0807 4.17322 14.1056 4.2229L14.1295 4.27075C14.3667 4.74524 14.4058 5.29443 14.238 5.79761L14.1867 5.95166C14.0736 6.29102 14.1751 6.66492 14.4442 6.90039C15.6779 7.97986 14.9144 10.0117 13.2752 10.0117H12.1035Z" fill="#2E2F32"/>
                            <path d="M2.70001 9.01172C1.76111 9.01172 1 8.25061 1 7.31177V3.71167C1 2.77283 1.76111 2.01172 2.70001 2.01172H3.9996V3.01172H2.70001C2.31342 3.01172 2 3.32507 2 3.71167V7.31177C2 7.69836 2.31342 8.01172 2.70001 8.01172H3.9996V9.01172H2.70001Z" fill="#2E2F32"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1035 10.0117C11.8808 10.0117 11.7094 10.33 11.7842 10.5397C11.8968 10.8552 12 11.3303 12 12.0117V12.5118C12 13.8926 10.8807 15.0117 9.5 15.0117C8.94772 15.0117 8.5 14.564 8.5 14.0117V12.4316C8.5 11.8478 8.24487 11.2931 7.80157 10.9131L5.69843 9.11035C5.25513 8.73035 5 8.17566 5 7.5918V5.51172C5 3.30261 6.79086 1.51172 9 1.51172H11.9296C12.5983 1.51172 13.2228 1.84595 13.5937 2.40234L13.8321 2.75977C13.9416 2.92407 14 3.11707 14 3.31445V3.77563C14 3.87537 14.0149 3.97424 14.044 4.06897C14.0602 4.1217 14.0807 4.17322 14.1056 4.2229L14.1295 4.27075C14.3667 4.74524 14.4058 5.29443 14.238 5.79761L14.1867 5.95166C14.0736 6.29102 14.1751 6.66492 14.4442 6.90039C15.6779 7.97986 14.9144 10.0117 13.2752 10.0117H12.1035ZM13.2351 4.71802L13.2112 4.67004C13.0723 4.39233 13 4.08618 13 3.77563V3.31445L12.7617 2.95703C12.5762 2.67883 12.264 2.51172 11.9296 2.51172H9C7.34314 2.51172 6 3.85486 6 5.51172V7.5918C6 7.88379 6.12756 8.16113 6.34921 8.35107L8.45236 10.1538C9.11731 10.7238 9.5 11.5558 9.5 12.4316V14.0117C10.3285 14.0117 11 13.3402 11 12.5118V12.0117C11 11.4324 10.9125 11.0724 10.8424 10.8759C10.6786 10.4167 10.8051 9.97485 10.9673 9.69531C11.1247 9.42395 11.4966 9.01172 12.1035 9.01172H13.2752C13.9911 9.01172 14.3245 8.12439 13.7857 7.65295C13.2134 7.15222 12.9975 6.35693 13.238 5.6355L13.2893 5.48145C13.3732 5.22986 13.3537 4.9552 13.2351 4.71802Z" fill="#2E2F32"/>
                            <path d="M2.70001 9.01172C1.76111 9.01172 1 8.25061 1 7.31177V3.71167C1 2.77283 1.76111 2.01172 2.70001 2.01172H3.9996V3.01172H2.70001C2.31342 3.01172 2 3.32507 2 3.71167V7.31177C2 7.69836 2.31342 8.01172 2.70001 8.01172H3.9996V9.01172H2.70001Z" fill="#2E2F32"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Campaign Type Options - Hidden when on campaign page or after selection */}
              {!isTyping && location.pathname !== '/campaign' && messages.length <= 2 && (
                <div className="flex w-full justify-start">
                  <div className="flex flex-col gap-2 max-w-[85%]">
                    <Button
                      onClick={() => handleCampaignTypeSelection('Sponsored Products Automatic')}
                      variant="tertiary"
                      UNSAFE_className="text-sm"
                    >
                      Sponsored Products Automatic
                    </Button>
                    <Button
                      onClick={() => handleCampaignTypeSelection('Sponsored Products Manual')}
                      variant="tertiary"
                      UNSAFE_className="text-sm"
                    >
                      Sponsored Products Manual
                    </Button>
                    <Button
                      onClick={() => handleCampaignTypeSelection('Display Campaign')}
                      variant="tertiary"
                      UNSAFE_className="text-sm"
                    >
                      Display Campaign
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Thinking Indicator */}
              {isTyping && (
                <div className="flex w-full items-center gap-1.5 py-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M11.6786 0.242428C13.0883 1.95515 14.4645 4.10004 16.1422 5.5576C18.2759 7.41066 22.7618 8.11712 21.974 11.828C21.6009 13.5838 19.1051 15.4321 17.9904 16.9056C16.3862 19.0265 15.8567 21.5271 13.6672 23.2318C13.3275 23.4965 12.94 23.8952 12.4759 23.8697C10.052 23.4567 9.48425 21.5685 7.77631 20.0599C6.93749 19.32 5.58677 18.3647 4.61081 17.8162C2.28093 16.5069 -0.500249 15.987 0.0770371 12.4101C0.36568 10.6272 3.62049 8.3643 4.8851 6.72653C6.13694 5.10471 7.26122 1.86903 8.59759 0.902638C9.75854 0.0622249 9.859 0.0111936 11.0327 3.06028e-05C11.3373 -0.00315882 11.5542 0.244022 11.6786 0.240833V0.242428ZM9.92439 4.52583C9.08557 4.35041 8.3217 5.19879 8.1718 5.9515C8.37752 6.14765 10.3358 4.91653 9.92439 4.52583ZM15.6638 5.63096C16.1326 4.93885 13.192 5.13501 13.4471 5.77927C13.6991 6.05197 14.2237 6.08067 14.3848 6.18752C14.4853 6.25449 15.3735 7.7902 15.7419 8.17293C17.0528 9.52844 17.0687 8.45679 16.4898 7.27032C16.2506 6.77915 15.7499 6.0711 15.1853 5.94831L15.6622 5.63096H15.6638ZM9.84465 6.11256C9.26099 6.51284 9.40132 7.41863 9.48744 8.05173C9.55282 8.53015 10.0775 10.4486 10.7967 10.2317C11.5159 10.0148 10.7457 6.46021 9.84465 6.11256ZM20.1305 10.2317C20.6122 9.74532 17.3908 6.78553 18.783 9.6002C16.3941 12.2091 12.4408 12.316 9.12703 12.4531L9.05208 11.3384C8.57207 10.6415 8.11917 12.0226 8.0506 12.4101C7.99638 12.7195 7.85764 14.0048 8.40941 13.8788L8.90856 13.0735C11.744 13.5375 16.0672 13.1676 18.303 11.1869C19.0206 10.5506 19.0127 9.80273 20.1321 10.2317H20.1305Z" fill="#A88BFF"/>
                    <path d="M12.4759 23.8713C12.94 23.8952 13.3275 23.4981 13.6672 23.2334C15.8567 21.5287 16.3862 19.0281 17.9905 16.9072C19.1052 15.4337 21.6009 13.5838 21.9741 11.8296C22.7618 8.11872 18.2759 7.41226 16.1422 5.5592C14.4661 4.10164 13.0899 1.95675 11.6786 0.244025C13.243 0.204157 15.0785 3.0252 16.2187 4.05379C16.7227 4.50829 17.4435 5.06484 18.0064 5.44757C20.113 6.87803 23.6995 7.551 23.9627 10.4661C24.2433 13.5647 22.2165 14.0207 20.4431 15.8595C19.507 16.8322 18.4768 18.2547 17.8134 19.4284C16.7769 21.2607 16.5967 23.1154 14.2636 23.8266C13.3977 24.0914 13.2845 24.0084 12.4744 23.8713H12.4759Z" fill="#9170FE"/>
                    <path d="M20.1305 10.2317C19.0111 9.80272 19.019 10.5506 18.3014 11.1869C16.0656 13.1692 11.744 13.5375 8.90696 13.0735L8.40782 13.8788C7.85764 14.0048 7.99478 12.7179 8.049 12.4101C8.11758 12.0226 8.57048 10.6415 9.05048 11.3384L9.12544 12.4531C12.4392 12.316 16.3925 12.2091 18.7814 9.60019C17.3892 6.78553 20.6106 9.74531 20.129 10.2317H20.1305Z" fill="#011B56"/>
                    <path d="M15.6638 5.63098L15.187 5.94832C15.7499 6.07112 16.2506 6.77757 16.4914 7.27034C17.0703 8.45681 17.0544 9.52845 15.7435 8.17295C15.3751 7.79181 14.4869 6.25451 14.3864 6.18753C14.2253 6.08068 13.7007 6.05039 13.4487 5.77928C13.1936 5.13502 16.1326 4.93887 15.6654 5.63098H15.6638Z" fill="#011B56"/>
                    <path d="M9.8447 6.11255C10.7457 6.4586 11.5191 10.0148 10.7967 10.2317C10.0743 10.4486 9.55286 8.53013 9.48748 8.05172C9.40137 7.42021 9.26263 6.51441 9.8447 6.11255Z" fill="#011B56"/>
                    <path d="M9.92434 4.52583C10.3358 4.91494 8.37747 6.14766 8.17175 5.95151C8.32166 5.1988 9.08552 4.35042 9.92434 4.52583Z" fill="#011B56"/>
                  </svg>
                  <div className="text-foreground text-sm leading-5">
                    Thinking<span className="inline-flex">
                      <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}>.</span>
                      <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }}>.</span>
                      <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }}>.</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex w-full px-4 py-4 flex-col items-center gap-3 bg-background border-t border-border">
            {/* Input Field */}
            <div className="flex max-h-44 px-4 py-3 items-end justify-start gap-6 self-stretch rounded-[30px] border border-[#4A4A4A] bg-background transition-colors focus-within:border-[#0053E2] focus-within:shadow-[0_0_0_1px_#0053E2]">
              <textarea
                ref={textareaRef}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Marty anything..."
                rows={1}
                className="flex-1 text-foreground text-sm leading-5 outline-none bg-transparent placeholder:text-muted-foreground resize-none overflow-y-auto max-h-[152px] py-0.5 self-stretch my-auto"
              disabled={isTyping}
              style={{ minHeight: '20px', height: 'auto' }}
              />
              <button
                onClick={isTyping ? handleStopGeneration : handleSendMessage}
                disabled={!isTyping && !userMessage.trim()}
                className="flex p-2 flex-shrink-0 items-center justify-center rounded-full border border-transparent transition-colors"
                style={{
                  backgroundColor: isTyping || userMessage.trim()
                    ? 'var(--ld-semantic-color-action-fill-primary)'
                    : 'var(--ld-primitive-color-gray-50)'
                }}
                onMouseEnter={(e) => {
                  if (isTyping || userMessage.trim()) {
                    e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary-hovered)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isTyping || userMessage.trim()) {
                    e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary)';
                  }
                }}
              >
                {isTyping ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="12" height="12" rx="2" fill="white"/>
                  </svg>
                ) : userMessage.trim() ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="10" height="10" rx="2" fill="white"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Disclaimer */}
            <div className="w-full text-muted-foreground text-center text-xs leading-4">
              This smart assistant is powered by AI. It may make mistakes or use data from outside Walmart. Never share personally sensitive info. View <span className="underline hover:no-underline cursor-pointer">Disclaimer</span>.
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignForm' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0">
          <div className="flex px-4 py-4 flex-col items-center gap-4 flex-1 self-stretch overflow-y-auto">
            {/* Campaign Type */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-foreground text-xs font-bold leading-4">
                  Campaign type
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-background focus-within:border-[#0053E2] transition-colors">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.campaignType}
                    onChange={(e) => setCampaignData({...campaignData, campaignType: e.target.value})}
                    className="w-full text-foreground text-sm leading-5 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Campaign Name */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-foreground text-xs font-bold leading-4">
                  Campaign name
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-background focus-within:border-[#0053E2] transition-colors">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.campaignName}
                    onChange={(e) => setCampaignData({...campaignData, campaignName: e.target.value})}
                    className="w-full text-foreground text-sm leading-5 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="self-stretch text-foreground text-xs font-bold leading-4">
                Start date (mm/dd/yyyy)
              </div>
              <div className="flex h-10 px-3 py-0 pr-1 items-center gap-3 self-stretch rounded-lg border border-[#909196] bg-background focus-within:border-[#0053E2] transition-colors">
                <input
                  type="text"
                  value={campaignData.startDate}
                  onChange={(e) => setCampaignData({...campaignData, startDate: e.target.value})}
                  placeholder="mm/dd/yyyy"
                  className="flex-1 text-foreground text-sm leading-5 outline-none bg-transparent"
                />
                <button className="flex p-2 flex-col items-start rounded-full border border-transparent bg-transparent hover:[background:var(--ld-primitive-color-gray-10)] active:[background:var(--ld-primitive-color-gray-20)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 6H13" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M11 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Daily Budget */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-foreground text-xs font-bold leading-4">
                  Daily budget
                </div>
              </div>
              <div className="flex h-10 px-3 py-2 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-background focus-within:border-[#0053E2] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-shrink-0">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.75 1.75C8.75 1.33579 8.41421 1 8 1C7.58579 1 7.25 1.33579 7.25 1.75V2.25C6.14924 2.31595 5.24291 2.59963 4.58058 3.10296C3.86609 3.64503 3.5 4.41052 3.5 5.25C3.5 6.08948 3.86609 6.85497 4.58058 7.39704C5.24291 7.90037 6.14924 8.18405 7.25 8.25V11.75C6.69238 11.7149 6.21735 11.6125 5.84467 11.4528C5.46842 11.2915 5.25 11.1018 5.25 10.75C5.25 10.3358 4.91421 10 4.5 10C4.08579 10 3.75 10.3358 3.75 10.75C3.75 11.5895 4.11609 12.355 4.83058 12.897C5.49291 13.4004 6.39924 13.684 7.5 13.75V14.25C7.5 14.6642 7.83579 15 8.25 15C8.66421 15 9 14.6642 9 14.25V13.75C10.1008 13.684 11.0071 13.4004 11.6694 12.897C12.3839 12.355 12.75 11.5895 12.75 10.75C12.75 9.91052 12.3839 9.14503 11.6694 8.60296C11.0071 8.09963 10.1008 7.81595 9 7.75V4.25C9.55762 4.28514 10.0327 4.38754 10.4053 4.54721C10.7816 4.70848 11 4.89824 11 5.25C11 5.66421 11.3358 6 11.75 6C12.1642 6 12.5 5.66421 12.5 5.25C12.5 4.41052 12.1339 3.64503 11.4194 3.10296C10.7571 2.59963 9.85076 2.31595 8.75 2.25V1.75ZM7.25 6.75C6.30762 6.71486 5.71735 6.48754 5.33058 6.16046C5.00891 5.89503 5 5.62552 5 5.25C5 4.87448 5.00891 4.60497 5.33058 4.33954C5.71735 4.01246 6.30762 3.78514 7.25 3.75V6.75ZM8.75 9.25C9.69238 9.28514 10.2827 9.51246 10.6694 9.83954C10.9911 10.105 11 10.3745 11 10.75C11 11.1255 10.9911 11.395 10.6694 11.6605C10.2827 11.9875 9.69238 12.2149 8.75 12.25V9.25Z" fill="#74767C"/>
                </svg>
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <input
                    type="text"
                    value={campaignData.dailyBudget}
                    onChange={(e) => setCampaignData({...campaignData, dailyBudget: e.target.value})}
                    className="w-full text-foreground text-sm leading-5 outline-none bg-transparent"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* Item List */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex pb-1 items-center gap-1 self-stretch">
                <div className="flex-1 text-foreground text-xs font-bold leading-4">
                  Item list
                </div>
              </div>
              <div className="flex h-10 pl-3 pr-3 items-center gap-2 self-stretch rounded-lg border border-[#909196] bg-background">
                <div className="flex h-6 py-0.5 justify-center items-center flex-1">
                  <div className="w-full text-foreground text-sm leading-5">
                    Top suggestions from your catalog
                  </div>
                </div>
                <button className="text-sm leading-5 underline hover:no-underline">
                  Edit
                </button>
              </div>
            </div>

            {/* Additional Settings Accordion */}
            <div className="flex flex-col items-start gap-4 self-stretch">
              <button
                onClick={() => setIsAdditionalSettingsOpen(!isAdditionalSettingsOpen)}
                className="flex items-center gap-3 self-stretch bg-background w-full"
              >
                <div className="flex flex-col justify-center items-start gap-1 flex-1">
                  <div className="flex items-center self-stretch">
                    <div className="text-foreground font-bold text-base leading-6">
                      Additional settings
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: isAdditionalSettingsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease-in-out'
                    }}
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              {isAdditionalSettingsOpen && (
                <div className="flex flex-col items-start gap-4 self-stretch">
                  {/* Expanded Targeting */}
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div className="flex pb-1 items-center gap-1 self-stretch">
                      <div className="flex-1 text-foreground text-xs font-bold leading-4">
                        Expanded targeting
                      </div>
                    </div>
                    <div className="text-[#000] text-xs leading-4">
                      Choose when customers see your ads. <span className="underline hover:no-underline cursor-pointer">Learn more</span>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex flex-col items-start gap-2 mt-2">
                      <Checkbox
                        label="Brand term targeting"
                        checked={campaignData.brandTermTargeting}
                        onCheckedChange={(checked) => setCampaignData({...campaignData, brandTermTargeting: !!checked})}
                      />
                      <Checkbox
                        label="Complementary targeting"
                        checked={campaignData.complementaryTargeting}
                        onCheckedChange={(checked) => setCampaignData({...campaignData, complementaryTargeting: !!checked})}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <DateField
                    label="End date"
                    value={campaignData.endDate}
                    onChange={(e) => setCampaignData({...campaignData, endDate: e.target.value})}
                    showCalendarIcon
                  />

                  {/* Bidding Strategy */}
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div className="flex pb-1 items-center gap-1 self-stretch">
                      <div className="flex-1 text-foreground text-xs font-bold leading-4">
                        Bidding strategy
                      </div>
                    </div>
                    <div className="text-[#000] text-xs leading-4">
                      Choose the strategy that best suits your business goals. <span className="underline hover:no-underline cursor-pointer">Learn more</span>
                    </div>

                    {/* Info Alert */}
                    <div className="flex px-3 py-2 items-start gap-2 self-stretch rounded border border-[#0053E2] bg-[#E9F1FE] relative justify-start">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0053E2] rounded-l"></div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <circle cx="8" cy="8" r="7" stroke="#0053E2" strokeWidth="1.5"/>
                        <path d="M8 4V9" stroke="#0053E2" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="8" cy="11.5" r="0.75" fill="#0053E2"/>
                      </svg>
                      <div className="flex-1 text-[#002E99] text-sm leading-5">
                        When you switch to Dynamic or Fixed bidding we will apply the platform suggested bids to your items. You can change your bids at any time
                      </div>
                    </div>

                    {/* Radio Buttons */}
                    <div className="flex flex-col items-start gap-2 mt-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-6 h-6">
                          <div
                            className="w-6 h-6 rounded-full border-2 transition-colors"
                            style={{
                              borderColor: '#2E2F32',
                              backgroundColor: campaignData.biddingStrategy === 'dynamic' ? '#2E2F32' : 'white'
                            }}
                          ></div>
                          {campaignData.biddingStrategy === 'dynamic' && (
                            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-background"></div>
                          )}
                        </div>
                        <input
                          type="radio"
                          name="biddingStrategy"
                          value="dynamic"
                          checked={campaignData.biddingStrategy === 'dynamic'}
                          onChange={(e) => setCampaignData({...campaignData, biddingStrategy: 'dynamic'})}
                          className="sr-only"
                        />
                        <span className="text-foreground text-sm font-bold leading-5">Dynamic bidding</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-6 h-6">
                          <div
                            className="w-6 h-6 rounded-full border-2 transition-colors"
                            style={{
                              borderColor: '#2E2F32',
                              backgroundColor: campaignData.biddingStrategy === 'fixed' ? '#2E2F32' : 'white'
                            }}
                          ></div>
                          {campaignData.biddingStrategy === 'fixed' && (
                            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-background"></div>
                          )}
                        </div>
                        <input
                          type="radio"
                          name="biddingStrategy"
                          value="fixed"
                          checked={campaignData.biddingStrategy === 'fixed'}
                          onChange={(e) => setCampaignData({...campaignData, biddingStrategy: 'fixed'})}
                          className="sr-only"
                        />
                        <span className="text-foreground text-sm leading-5">Fixed bidding</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Footer Section */}
          <div className="flex flex-col items-start self-stretch bg-background">
            <div className="flex h-6 px-4 justify-center items-center gap-2.5 self-stretch">
              <div className="flex-1 text-muted-foreground text-center text-xs leading-4">
                Click "Save and review" to view item list and all campaign creation options
              </div>
            </div>
            <div className="flex px-4 py-4 flex-col justify-center items-end gap-3 self-stretch border-t border-border bg-background">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleSaveAndReview}
                  variant="secondary"
                  UNSAFE_className="text-base"
                >
                  Save and review
                </Button>
                <Button
                  onClick={handleLaunchCampaign}
                  variant="primary"
                  UNSAFE_className="text-base"
                >
                  Launch campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignReady' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0 overflow-y-auto">
          <div className="flex pb-80 flex-col items-center flex-1 self-stretch overflow-y-auto">
            <div className="flex w-full flex-col items-center gap-4">
              {/* System Message */}
              <div className="flex px-4 pt-4 flex-col items-start gap-6 self-stretch bg-background">
                <div className="flex w-full flex-col items-start gap-1 bg-background">
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div className="self-stretch text-foreground text-sm leading-5">
                      I have added your selections and <span className="font-bold">your campaign is ready to launch.</span> You can still take a moment to review your campaign and make and final changes. When you're ready, click the<span className="font-bold"> "Launch campaign"</span> button in the top-right corner.
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Suggestions */}
              <div className="flex w-full flex-col items-start gap-2 bg-background px-4">
                <Button variant="tertiary" UNSAFE_className="max-w-[393px] text-sm">
                  What can Marty help me do on this page?
                </Button>
                <Button variant="tertiary" UNSAFE_className="max-w-[393px] text-sm">
                  How do I set up a Sponsored Products campaign?
                </Button>
                <Button variant="tertiary" UNSAFE_className="max-w-[393px] text-sm">
                  Which items do you recommend I advertise?
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-start gap-3 self-stretch border-t border-border bg-background">
            <div className="flex px-4 py-4 flex-col items-center gap-3 self-stretch bg-background">
              {/* Input Field */}
              <div className="flex max-h-44 px-4 py-3 items-end justify-start gap-6 self-stretch rounded-[30px] border border-[#4A4A4A] bg-background transition-colors focus-within:border-[#0053E2] focus-within:shadow-[0_0_0_1px_#0053E2]">
                <div className="flex flex-col justify-center flex-1 self-stretch text-muted-foreground text-sm leading-5">
                  Ask Marty anything...
                </div>
                <button disabled className="flex p-2 flex-shrink-0 items-center justify-center rounded-full border border-transparent" style={{ backgroundColor: 'var(--ld-primitive-color-gray-50)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="w-full text-muted-foreground text-center text-xs leading-4">
                This smart assistant is powered by AI. It may make mistakes or use data from outside Walmart. Never share personally sensitive info. View <span className="underline hover:no-underline cursor-pointer">Disclaimer</span>.
              </div>
            </div>
          </div>
        </div>
      )}

      {viewState === 'campaignScheduled' && (
        <div className="flex w-full h-[692px] flex-col items-start flex-shrink-0">
          <div className="flex px-4 py-4 flex-col items-start gap-6 flex-1 self-stretch overflow-y-auto">
            {/* User Message */}
            <div className="flex w-full pl-20 flex-col items-end gap-1">
              <div className="flex max-w-[608px] px-4 py-2 flex-col items-start gap-2 rounded-lg [background:var(--ld-semantic-color-background-subtle)]">
                <div className="self-stretch text-foreground text-sm leading-5">
                  Launch campaign
                </div>
              </div>
            </div>

            {/* Campaign Scheduled Success Content */}
            <div className="flex flex-col justify-center items-start gap-3 self-stretch">
              {/* Flag Icon */}
              <svg width="169" height="128" viewBox="0 0 169 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M92.6836 37.9863C92.6836 37.9863 111.078 42.4516 122.406 42.1449C135.168 41.7993 152.882 37.9863 152.882 37.9863L141.783 59.9654L161.159 80.073C161.159 80.073 143.445 83.886 130.684 84.2316C119.355 84.5383 100.961 80.073 100.961 80.073L92.6836 37.9863Z" fill="url(#paint0_linear_flag)"/>
                <path d="M29.0664 18.9955C29.0664 18.9955 50.8668 10.6244 65.4895 10.2304C81.9617 9.78659 106.769 18.9955 106.769 18.9955L117.453 73.0471C117.453 73.0471 92.6459 63.8381 76.1736 64.2819C61.5509 64.6759 39.7505 73.0471 39.7505 73.0471L29.0664 18.9955Z" fill="url(#paint1_linear_flag)"/>
                <path d="M88.4052 33.3566C89.6356 32.1228 89.6356 30.1226 88.4052 28.8889C87.1748 27.6551 85.1799 27.6551 83.9495 28.8889L68.3546 44.5258L62.9442 39.1007C61.7138 37.867 59.7189 37.867 58.4885 39.1007C57.2581 40.3345 57.2581 42.3347 58.4885 43.5684L68.3546 53.4612L88.4052 33.3566Z" fill="white"/>
                <path d="M30.6367 11.8164L52.24 128.001" stroke="#909196" strokeWidth="6.80019" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear_flag" x1="93.0641" y1="37.9863" x2="138.461" y2="102.496" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1" stopColor="#993EF4"/>
                    <stop offset="0.7" stopColor="#3F7FCF"/>
                    <stop offset="1" stopColor="#00AD9F"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_flag" x1="29.5575" y1="10.2148" x2="92.2133" y2="94.8279" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1" stopColor="#993EF4"/>
                    <stop offset="0.7" stopColor="#4DBDF5"/>
                    <stop offset="1" stopColor="#00D0CD"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Title and Message */}
              <div className="flex items-start self-stretch">
                <div className="flex-1 text-[#000] font-bold text-[32px] leading-10">
                  Campaign scheduled
                </div>
              </div>

              <div className="flex min-w-[393px] flex-col items-start gap-1 self-stretch bg-background">
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <div className="self-stretch text-foreground text-sm leading-5">
                    <span className="font-extrabold">Free Rein Coffee Campaign Fall 2025</span> is scheduled to start Oct 1, 2025. You can make changes anytime before it goes live.
                  </div>
                </div>
              </div>
            </div>

            {/* View Campaign Button */}
            <div className="flex w-full flex-col items-start gap-2 bg-background">
              <Button
                onClick={() => navigate('/all-campaigns')}
                variant="tertiary"
                UNSAFE_className="max-w-[318px] text-sm"
              >
                View campaign
              </Button>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex flex-col items-start gap-3 self-stretch border-t border-border bg-background">
              <div className="flex px-4 py-4 flex-col items-center gap-3 self-stretch bg-background">
              {/* Input Field */}
              <div className="flex max-h-44 px-4 py-3 items-end justify-start gap-6 self-stretch rounded-[30px] border border-[#4A4A4A] bg-background transition-colors focus-within:border-[#0053E2] focus-within:shadow-[0_0_0_1px_#0053E2]">
                <div className="flex flex-col justify-center flex-1 self-stretch text-muted-foreground text-sm leading-5">
                  Ask Marty anything...
                </div>
                <button className="flex p-2 flex-shrink-0 items-center justify-center rounded-full border border-transparent" style={{ backgroundColor: 'var(--ld-primitive-color-gray-50)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3L8 13" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8L8 3L13 8" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="w-full text-muted-foreground text-center text-xs leading-4">
                This smart assistant is powered by AI. It may make mistakes or use data from outside Walmart. Never share personally sensitive info. View <span className="underline hover:no-underline cursor-pointer">Disclaimer</span>.
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Input for welcome and chat views */}
      {(viewState === 'welcome' || viewState === 'chat') && (
        <div className="flex w-full px-4 py-4 flex-col items-center gap-3 bg-background border-t border-border max-h-[187px]">
          {/* Input Field */}
          <div className="flex max-h-44 px-4 py-3 items-end justify-start gap-6 self-stretch rounded-[30px] border border-[#4A4A4A] bg-background transition-colors focus-within:border-[#0053E2] focus-within:shadow-[0_0_0_1px_#0053E2]">
            <textarea
              ref={textareaRef}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Marty anything..."
              rows={1}
              className="flex-1 text-foreground text-sm leading-5 outline-none bg-transparent placeholder:text-muted-foreground resize-none overflow-y-auto max-h-[152px] py-0.5 self-stretch my-auto"
              disabled={isTyping}
              style={{ minHeight: '20px', height: 'auto' }}
            />
            <button
              onClick={isTyping ? handleStopGeneration : handleSendMessage}
              disabled={!isTyping && !userMessage.trim()}
              className="flex p-2 flex-shrink-0 items-center justify-center rounded-full border border-transparent transition-colors"
              style={{
                backgroundColor: isTyping || userMessage.trim()
                  ? 'var(--ld-semantic-color-action-fill-primary)'
                  : 'var(--ld-primitive-color-gray-50)'
              }}
              onMouseEnter={(e) => {
                if (isTyping || userMessage.trim()) {
                  e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary-hovered)';
                }
              }}
              onMouseLeave={(e) => {
                if (isTyping || userMessage.trim()) {
                  e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-action-fill-primary)';
                }
              }}
            >
              {isTyping ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="12" height="12" rx="2" fill="white"/>
                </svg>
              ) : userMessage.trim() ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="10" height="10" rx="2" fill="white"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3L8 13" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 8L8 3L13 8" stroke="#74767C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>

          {/* Disclaimer */}
          <div className="w-full text-muted-foreground text-center text-xs leading-4">
            This smart assistant is powered by AI. It may make mistakes or use data from outside Walmart. Never share personally sensitive info. View <span className="underline hover:no-underline cursor-pointer">Disclaimer</span>.
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
