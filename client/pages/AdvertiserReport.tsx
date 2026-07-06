import React, { useState } from "react";
import { MastHead } from "../components/ui/MastHead";
import { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import AdvertiserReportDashboard from "../features/advertiser-report/AdvertiserReportDashboard";

export default function AdvertiserReport() {
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
        <main className="flex-1 overflow-y-auto">
          <AdvertiserReportDashboard />
        </main>
      </div>
    </div>
  );
}
