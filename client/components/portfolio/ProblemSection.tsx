export default function ProblemSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 justify-between">
          {/* Text column */}
          <div className="flex flex-col gap-6 max-w-[678px]">
            <h2 className="font-poppins font-black text-[clamp(40px,5vw,64px)] text-black leading-[1.375]">
              The problem
            </h2>
            <p className="font-nunito-sans text-xl text-black leading-[1.3]">
              The chat helps users ask questions and get campaign recommendations—but the value drops when they have to leave the chat to create or edit a campaign.{" "}
              Switching between chat and form sheets disrupts the flow and limits the AI's ability to help optimize performance.
            </p>
          </div>

          {/* Mockup panels column */}
          <div className="w-full lg:w-auto flex-shrink-0 flex gap-4 items-start">
            {/* Panel 1: Marty chat */}
            <MartyPanel variant="chat" />
            {/* Panel 2: Campaign form */}
            <MartyPanel variant="form" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelHeader() {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#0071DC]">
      <div className="flex items-center gap-2">
        {/* Walmart spark */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L11.8 7.2H17.5L12.8 10.8L14.6 16L10 12.4L5.4 16L7.2 10.8L2.5 7.2H8.2L10 2Z" fill="white"/>
        </svg>
        <span className="text-white font-bold text-sm">Marty</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Sparkle icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L9.2 5.8L14 7L9.2 8.2L8 13L6.8 8.2L2 7L6.8 5.8L8 1Z" fill="white"/>
        </svg>
        <span className="text-white text-xs font-medium border-r border-white/40 pr-2">EN</span>
        <span className="text-white text-sm font-bold">—</span>
      </div>
    </div>
  );
}

function MartyPanel({ variant }: { variant: "chat" | "form" }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-xl border border-black/20 w-[280px] lg:w-[300px] flex-shrink-0">
      <PanelHeader />
      {variant === "chat" ? <ChatContent /> : <FormContent />}
    </div>
  );
}

function ChatContent() {
  return (
    <div className="bg-white flex flex-col">
      {/* Greeting area */}
      <div className="bg-[#EFF6FF] px-4 py-4 flex items-start justify-between">
        <div>
          <p className="font-bold text-sm text-gray-900 leading-5">Good morning Samrudha!</p>
          <p className="text-xs text-gray-600 leading-4 mt-1">
            Ready to make some campaign magic happen? Let's get started!
          </p>
        </div>
        <div className="flex-shrink-0 ml-2">
          {/* Marty character placeholder */}
          <div className="w-14 h-14 flex items-end justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="18" r="10" fill="#FFD700"/>
              <rect x="16" y="30" width="16" height="12" rx="2" fill="#1A5FAF"/>
              <circle cx="21" cy="16" r="2" fill="#333"/>
              <circle cx="27" cy="16" r="2" fill="#333"/>
              <path d="M21 21 Q24 23 27 21" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Action tiles */}
      <div className="flex gap-2 px-3 py-3">
        <div className="flex-1 border border-gray-200 rounded-lg p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10C3 6.13 6.13 3 10 3C13.87 3 17 6.13 17 10" stroke="#0071DC" strokeWidth="1.5"/>
              <path d="M7 13L10 10L13 13" stroke="#0071DC" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-800">New campaign</span>
        </div>
        <div className="flex-1 border border-gray-200 rounded-lg p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="#0071DC" strokeWidth="1.5"/>
              <path d="M10 9V14" stroke="#0071DC" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="7" r="0.75" fill="#0071DC"/>
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-800">Help &amp; FAQs</span>
        </div>
      </div>

      {/* Chat bubble */}
      <div className="px-3 pb-2">
        <div className="bg-[#0071DC] rounded-2xl rounded-tl-sm px-3 py-2">
          <p className="text-white text-xs leading-4">
            How is my latest campaign performing compared to other advertisers?
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-gray-100">
        <div className="border border-gray-200 rounded-full px-3 py-1.5">
          <span className="text-xs text-gray-400">Ask Marty anything...</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-1.5 text-center">
        <span className="text-[10px] text-gray-400">Disclaimer</span>
      </div>
    </div>
  );
}

function FormContent() {
  return (
    <div className="bg-white flex flex-col px-3 py-3 gap-3">
      {/* Campaign Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600">Campaign Name</label>
        <div className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-800">
          Tanye_April_Campaign01
        </div>
      </div>

      {/* Start / End dates */}
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs text-gray-600">Start date</label>
          <div className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-800 flex items-center justify-between">
            <span>Apr 22, 2024</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="9" rx="1" stroke="#666" strokeWidth="1"/>
              <path d="M4 1V3M8 1V3" stroke="#666" strokeWidth="1" strokeLinecap="round"/>
              <path d="M1 5H11" stroke="#666" strokeWidth="1"/>
            </svg>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs text-gray-600">End date</label>
          <div className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-400 flex items-center justify-between">
            <span>None</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="9" rx="1" stroke="#aaa" strokeWidth="1"/>
              <path d="M4 1V3M8 1V3" stroke="#aaa" strokeWidth="1" strokeLinecap="round"/>
              <path d="M1 5H11" stroke="#aaa" strokeWidth="1"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bidding strategy */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600">Bidding strategy</label>
        <div className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-800 flex items-center justify-between">
          <span>Dynamic Bidding</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 4L5 7L8 4" stroke="#666" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Item list */}
      <div className="border border-[#0071DC] rounded px-2 py-1.5 text-xs">
        <span className="text-gray-600">Item list: </span>
        <span className="font-bold text-gray-800">Top suggestions from your catalogue</span>
      </div>

      {/* Daily Budget */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600">Daily Budget</label>
        <div className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-800 flex items-center gap-1">
          <span className="text-gray-500">$</span>
          <span>100</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button className="flex-1 border border-gray-300 rounded-full py-1 text-xs font-medium text-gray-700">
          Cancel
        </button>
        <button className="flex-1 bg-[#0071DC] rounded-full py-1 text-xs font-medium text-white">
          Save
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-center">
        <span className="text-[10px] text-gray-400">Disclaimer</span>
      </div>
    </div>
  );
}
