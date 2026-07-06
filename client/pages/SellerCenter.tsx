import { useState } from "react";
import { ChevronDown, Upload, Download } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import { Button } from "../components/ui/Button";
import { MastHead } from "../components/ui/MastHead";
import { Link } from "../components/ui/Link";
import { MediaSolution } from "../components/ui/MediaSolutionsDropdown";

export default function SellerCenter() {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("listing-quality");
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Display Advertising');

  // Mock data for the table
  const items = [
    {
      name: "Clorox Disinfecting Wipes, Bleach Free Cleaning Wipes",
      sku: "CLX001",
      condition: "New",
      priority: "High",
      listingQuality: 65,
      pageViews: 1250,
      gMV: "$3,450"
    },
    {
      name: "Tide Laundry Detergent Liquid Soap",
      sku: "TDE002",
      condition: "New",
      priority: "Medium",
      listingQuality: 82,
      pageViews: 890,
      gMV: "$2,100"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MastHead
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-ld-main border-b border-ld-subtlest flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-ld-primary">Seller Center</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-10 px-4 border-ld-subtlest rounded bg-ld-main gap-2 text-sm text-ld-primary">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* Banner Alert */}
            <div className="bg-[#FFF4E5] border border-[#FFD591] rounded-lg p-4 flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5">
                <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#663C00" strokeWidth="1.5"/>
                <path d="M10 6V10" stroke="#663C00" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 14H10.01" stroke="#663C00" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="flex-1">
                <p className="text-sm text-[var(--ld-semantic-color-text-caution,#663C00)]">
                  The overall quality of listings across your catalog is currently <span className="font-bold">Poor</span>.{" "}
                  <Link href="#">Learn more</Link> about how you can improve the health of your listings.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Listing Quality Section */}
              <div className="bg-ld-main rounded-lg border border-ld-subtlest p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-ld-primary">Listing quality</h2>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#515357"/>
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#515357"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#515357"/>
                  </svg>
                </div>

                <div className="flex items-center gap-8 mb-6">
                  {/* Circular Progress */}
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#F0F1F2"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#C41E2E"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56 * 0.48} ${2 * Math.PI * 56 * 0.52}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-foreground">48%</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-foreground mb-2">Your listing quality is: <span className="font-bold text-[#C41E2E]">Poor</span></p>
                    <Link href="#" className="text-sm">Learn more</Link>
                    <span className="text-sm text-foreground"> about how you can improve listing quality.</span>
                    <br />
                    <Link href="#" className="text-sm">Learn more</Link>
                  </div>
                </div>

                {/* Listing Score Breakdown */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-foreground mb-3">Listing score breakdown</h3>
                  
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">Category</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-foreground w-16 text-right">Score</span>
                      <span className="text-sm text-foreground w-20 text-right">Performance</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">Price competitiveness</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-16 justify-end">
                        <span className="text-sm text-foreground">N/A</span>
                      </div>
                      <span className="text-sm text-[var(--ld-semantic-color-text-negative,#C41E2E)] w-20 text-right">Poor</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">Shipping</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#515357"/>
                        <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#515357"/>
                        <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#515357"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-foreground w-16 text-right">39.86%</span>
                      <span className="text-sm text-[var(--ld-semantic-color-text-negative,#C41E2E)] w-20 text-right">Poor</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">Published and in stock</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-foreground w-16 text-right">42.52%</span>
                      <span className="text-sm text-[var(--ld-semantic-color-text-negative,#C41E2E)] w-20 text-right">Poor</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">Ratings & Reviews</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#515357"/>
                        <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#515357"/>
                        <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#515357"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-foreground w-16 text-right">47.1%</span>
                      <span className="text-sm text-[var(--ld-semantic-color-text-negative,#C41E2E)] w-20 text-right">Poor</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">Content quality</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#515357"/>
                        <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#515357"/>
                        <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#515357"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-foreground w-16 text-right">80.07%</span>
                      <span className="text-sm text-[#2A8703] w-20 text-right">Excellent</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Performance Section */}
              <div className="bg-ld-main rounded-lg border border-ld-subtlest p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-ld-primary">Items performance</h2>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#515357"/>
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#515357"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#515357"/>
                  </svg>
                </div>

                <p className="text-sm text-foreground mb-6">See how your items are ranked and unlock growth opportunities.</p>

                <div className="grid grid-cols-4 gap-4">
                  {/* Typical Card */}
                  <div className="bg-background border border-border rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Typical</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#74767C"/>
                        <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#74767C"/>
                        <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#74767C"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">49</div>
                    <div className="text-xs text-muted-foreground">$2,00.00</div>
                    <div className="text-xs text-muted-foreground">Last 30-day GMV</div>
                  </div>

                  {/* Poor Card */}
                  <div className="bg-background border border-border rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Poor</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#74767C"/>
                        <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#74767C"/>
                        <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#74767C"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">33</div>
                    <div className="text-xs text-muted-foreground">$1,393.00</div>
                    <div className="text-xs text-muted-foreground">Last 30-day GMV</div>
                  </div>

                  {/* Good Card */}
                  <div className="bg-background border border-border rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Good</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#74767C"/>
                        <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#74767C"/>
                        <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#74767C"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">15</div>
                    <div className="text-xs text-muted-foreground">$11,152.00</div>
                    <div className="text-xs text-muted-foreground">Last 30-day GMV</div>
                  </div>

                  {/* Excellent Card */}
                  <div className="bg-background border border-border rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Excellent</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#74767C"/>
                        <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#74767C"/>
                        <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#74767C"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">3</div>
                    <div className="text-xs text-muted-foreground">$11,352.00</div>
                    <div className="text-xs text-muted-foreground">Last 30-day GMV</div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="#" className="text-sm">Get more insights with Listing quality analytics</Link>
                </div>
              </div>
            </div>

            {/* Bulk Content Improvements Section */}
            <div className="bg-background rounded-lg border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-2">Make bulk content improvements in less time with spreadsheet edits</h2>
              <p className="text-sm text-foreground mb-4">
                Simply use our filters to populate your spreadsheet, make the appropriate edits, then upload the updated version.{" "}
                <Link href="#">Learn more</Link>
              </p>

              <div className="flex gap-4 mb-6">
                <Button variant="outline" className="h-10 px-4 border-ld-subtlest rounded bg-ld-main gap-2 text-sm text-ld-primary">
                  <Upload className="w-4 h-4" />
                  Upload spreadsheet
                </Button>
                <Button className="h-10 px-4 rounded bg-[#0071E3] text-white hover:bg-[#0060C0] text-sm font-bold">
                  Create spreadsheet
                </Button>
              </div>

              {/* Filters and Table */}
              <div className="space-y-4">
                {/* Filters Row */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm text-foreground">Search by</span>
                    <select className="h-10 px-3 border border-[#BABBBE] rounded text-sm text-foreground bg-background">
                      <option>Title</option>
                      <option>SKU</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Search"
                      className="h-10 px-3 border border-[#BABBBE] rounded text-sm flex-1 max-w-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="h-10 px-4 bg-background border border-[#BABBBE] rounded text-sm text-foreground flex items-center gap-2 hover:bg-gray-50">
                      Customer Favorites
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="h-10 px-4 bg-background border border-[#BABBBE] rounded text-sm text-foreground flex items-center gap-2 hover:bg-gray-50">
                      Listing Quality
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="h-10 px-4 bg-background border border-[#BABBBE] rounded text-sm text-foreground flex items-center gap-2 hover:bg-gray-50">
                      Priority
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="h-10 px-4 bg-background border border-[#BABBBE] rounded text-sm text-foreground flex items-center gap-2 hover:bg-gray-50">
                      Filters
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="h-10 px-4 bg-background border border-[#BABBBE] rounded text-sm text-foreground flex items-center gap-2 hover:bg-gray-50">
                      Configure
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="h-10 px-4 bg-background border border-[#BABBBE] rounded text-sm text-foreground flex items-center gap-2 hover:bg-gray-50">
                      Download
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-border rounded overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">Item name</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">SKU</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">Condition</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">Priority</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">Listing quality ⓘ</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">Page views ⓘ</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">GMV ⓘ</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-foreground">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{item.sku}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{item.condition}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{item.priority}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${item.listingQuality >= 70 ? 'bg-green-500' : 'bg-red-500'}`}
                                  style={{ width: `${item.listingQuality}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-foreground">{item.listingQuality}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{item.pageViews.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{item.gMV}</td>
                          <td className="px-4 py-3">
                            <button className="text-sm underline hover:no-underline">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>

      <MartyFloatingPanel />
    </div>
  );
}
