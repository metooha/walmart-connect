import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import { MastHead } from "../components/ui/MastHead";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { Card } from "../components/ui/Card";
import { CardHeader } from "../components/ui/CardHeader";
import { CardContent } from "../components/ui/CardContent";
import { Button } from "../components/ui/Button";

export default function KeywordsPlanner() {
  const navigate = useNavigate();
  const [showMartyPanel] = useState(true);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Sponsored Search');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-muted">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-ld-primary mb-2">Keywords Planner</h1>
              <p className="text-ld-subtle">
                Plan and discover new keywords for your campaigns
              </p>
            </div>

            {/* Placeholder content */}
            <div className="bg-ld-main rounded-lg shadow p-8 text-center mb-6">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Keywords Planner
                </h2>
                <p className="text-gray-600 mb-6">
                  This feature is coming soon. Use the Keywords Planner to discover new keyword opportunities and plan your keyword strategy.
                </p>
              </div>
            </div>

            {/* Living Design Card with CardHeader */}
            <Card size="large">
              <CardHeader
                leadingIcon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6m-6 4h6" />
                  </svg>
                }
                title="Keyword Research Tools"
                trailing={
                  <Button variant="primary" size="small">
                    Get Started
                  </Button>
                }
              />
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Discover high-performing keywords for your Walmart Sponsored Search campaigns.
                  Our keyword research tools help you identify trending search terms, analyze competition,
                  and optimize your keyword strategy for better campaign performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Keyword Discovery</h4>
                    <p className="text-sm text-gray-600">
                      Find new keyword opportunities based on search volume and relevance
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Competition Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Analyze keyword difficulty and competitive landscape
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Tracking</h4>
                    <p className="text-sm text-gray-600">
                      Monitor keyword performance and ROI across campaigns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
