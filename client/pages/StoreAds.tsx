import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import StoreAdsSidebar from "../features/store-ads/StoreAdsSidebar";
import { Button } from "../components/ui/Button";
import { MastHead } from "../components/ui/MastHead";
import { Link } from "../components/ui/Link";
import { Tag } from "../components/ui/Tag";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

export default function StoreAds() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Store Ads');
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleCreateCampaign = () => {
    // Marty panel will handle the campaign creation flow
    // Marty state is now managed by MartyContext
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      <div className="flex h-[calc(100vh-54px)]">
        {/* Sidebar */}
        <StoreAdsSidebar
          activeMenuItem={activeMenuItem}
          onMenuItemClick={handleMenuItemClick}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-muted flex flex-col">
          {/* Hero Section */}
          <div className="px-8 py-16" style={{ backgroundColor: 'var(--ld-semantic-color-fill-info-subtle, #E5F0FF)' }}>
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-foreground mb-4">
                Reach more customers with Store Ads
              </h1>
              <p className="text-xl text-foreground mb-8">
                Show off your brand with digital ads across 4,700 stores.
              </p>
              <Button
                variant="primary"
                size="medium"
                onClick={handleCreateCampaign}
              >
                Create campaign
              </Button>
            </div>
          </div>

          {/* Feature Cards Section */}
          <div className="bg-background px-8 py-12 flex-1">
            <div className="max-w-6xl mx-auto">
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Your products, seen by millions */}
                <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F337917ac2c704b869b9656001daf6a8b" alt="" width="48" height="48" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Your products, seen by millions
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Don't miss billions of online traffic. Multiply your growth with online advertising.
                      </p>
                      <Link href="#" className="text-sm">
                        Start advertising
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 2: Brand experiences */}
                <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fabedae4e18b740e6b7363e567a29025e" alt="" width="48" height="48" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Brand experiences, built your way
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Create immersive pages that tell your story, reach more customers.
                      </p>
                      <Link href="#" className="text-sm">
                        Create your shop
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 3: Walmart Luminate */}
                <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F6e21134081ba4af78d47ef97edc3f514" alt="" width="48" height="48" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground">
                          Walmart Luminate
                        </h3>
                        <Tag variant="primary" color="green">New</Tag>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Gain deeper insights and opportunities that help optimizing your Store Ads campaigns.
                      </p>
                      <Link href="#" className="text-sm">
                        Discover more
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 4: Helpful how-to's */}
                <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe663bb9ecfe245cd8c1cdb8a20fd945c" alt="" width="48" height="48" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Helpful how-to's
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Don't miss billions of online traffic. Multiply your growth with online advertising.
                      </p>
                      <Link href="#" className="text-sm">
                        Get guidance
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 5: On-demand instruction */}
                <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc45dfecd03a74adc86aa29aef3ac80c6" alt="" width="48" height="48" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        On-demand instruction
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Access our Seller Academy on Youtube for video walkthroughs.
                      </p>
                      <Link href="#" className="text-sm">
                        Subscribe
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 6: What makes an eye-catching video */}
                <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F79811e74b3944cd393f419f8e43539a4" alt="" width="48" height="48" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        What makes an eye-catching video
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing eli.
                      </p>
                      <Link href="#" className="text-sm">
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  © 2000–2023 Wal-Mart Stores, Inc. All Rights reserved. <Link href="#" underline={false}>Privacy</Link> and <Link href="#" underline={false}>Terms</Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
