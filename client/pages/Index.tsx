import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, ChevronUp, Search, Settings, Download, MoreHorizontal, Eye, Sliders, X } from "@/components/icons";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import DisplayDashboard from "../features/advertising/DisplayDashboard";
import DisplayAdvertisingSidebar from "../features/advertising/DisplayAdvertisingSidebar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "../components/ui/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { Menu } from "../components/ui/Menu";
import { MenuItem } from "../components/ui/MenuItem";
import { MastHead } from "../components/ui/MastHead";
import { Link } from "../components/ui/Link";
import { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { Breadcrumb, BreadcrumbItem } from "../components/ui/Breadcrumb";
import { Checkbox } from "../components/ui/Checkbox";
import { Divider } from "../components/ui/Divider";
import { Scrim } from "../components/ui/Scrim";
import { Tabs, TabList, Tab } from "../components/ui/tabs";

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: "Live" | "Scheduled" | "Paused" | "Completed";
  recommendations: number;
  startDate?: string;
  endDate?: string;
  eCPM?: string;
  baseBid?: string;
  maxBid?: string;
  dailyBudget?: string;
  totalBudget?: string;
  targetingStrategy?: string;
  impressions?: string;
  pacing?: { value: string; color: string };
  children?: Campaign[];
  expanded?: boolean;
}

const mockCampaigns: Campaign[] = [
  {
    id: "10004",
    name: "Walmart|Display|Auction|Cross Device|very very very very long campaign name 01295938_FY27_",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$200,553.22",
    targetingStrategy: "Contextual targeting",
    impressions: "1,223,112",
    pacing: { value: "113%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-2",
    name: "H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$213,443.33",
    targetingStrategy: "Contextual targeting",
    impressions: "3,200,332",
    pacing: { value: "123%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-3",
    name: "H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_508390",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$100,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,245,664",
    pacing: { value: "102%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-4",
    name: "Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    targetingStrategy: "Contextual targeting",
    expanded: false,
    children: [
      {
        id: "creative-1",
        name: "Creative 1 video",
        type: "creative",
        status: "Live",
        recommendations: 2
      },
      {
        id: "creative-2",
        name: "Creative 2 banner",
        type: "creative",
        status: "Live",
        recommendations: 2
      }
    ]
  },
  {
    id: "10004-5",
    name: "Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$45,000.32",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,443,412",
    pacing: { value: "109%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-6",
    name: "Campaign 100",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$9,009.24",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,334,221",
    pacing: { value: "102%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-7",
    name: "Campaign 100",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$3,009.34",
    targetingStrategy: "Run of site",
    impressions: "99,042",
    pacing: { value: "113%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-8",
    name: "Campaign 100",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$200,494.44",
    targetingStrategy: "22,000",
    impressions: "22,000",
    pacing: { value: "102%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-9",
    name: "Campaign 100",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$192,032.22",
    targetingStrategy: "3,412,009",
    impressions: "3,412,009",
    pacing: { value: "89%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-10",
    name: "Spring Sale 2024 Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$150,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,500,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-11",
    name: "Holiday Promotions Q4",
    type: "campaign",
    status: "Scheduled",
    recommendations: 3,
    totalBudget: "$300,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "5,000,000",
    pacing: { value: "98%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-12",
    name: "Back to School Campaign 2024",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$75,500.00",
    targetingStrategy: "Run of site",
    impressions: "1,800,000",
    pacing: { value: "110%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-13",
    name: "Summer Electronics Sale",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$220,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,200,000",
    pacing: { value: "103%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-14",
    name: "Home & Garden Spring Collection",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$95,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,500,000",
    pacing: { value: "107%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-15",
    name: "Fashion Week Exclusive Deals",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$50,000.00",
    targetingStrategy: "Run of site",
    impressions: "900,000",
    pacing: { value: "85%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-16",
    name: "Grocery Essentials Promotion",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$180,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,800,000",
    pacing: { value: "112%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-17",
    name: "Tech Gadgets Flash Sale",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$275,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "5,500,000",
    pacing: { value: "108%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-18",
    name: "Kids Toys & Games Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$120,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,100,000",
    pacing: { value: "101%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-19",
    name: "Fitness & Wellness January",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$65,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,200,000",
    pacing: { value: "115%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-20",
    name: "Pet Supplies Awareness Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$85,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,600,000",
    pacing: { value: "104%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-21",
    name: "Beauty & Cosmetics Spring Launch",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$110,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,300,000",
    pacing: { value: "106%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-22",
    name: "Outdoor & Camping Gear Summer",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$95,500.00",
    targetingStrategy: "Run of site",
    impressions: "1,700,000",
    pacing: { value: "99%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-23",
    name: "Kitchen Appliances Mega Sale",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$200,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "4,100,000",
    pacing: { value: "111%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-24",
    name: "Books & Media Fall Collection",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$45,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "800,000",
    pacing: { value: "97%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-25",
    name: "Baby Products Essentials",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$130,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,800,000",
    pacing: { value: "109%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-26",
    name: "Automotive Parts & Accessories",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$88,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,400,000",
    pacing: { value: "92%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-27",
    name: "Office Supplies Back to Work",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$72,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,100,000",
    pacing: { value: "103%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-28",
    name: "Sports Equipment Winter Sports",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$145,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,200,000",
    pacing: { value: "114%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-29",
    name: "Jewelry & Watches Valentine's",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$165,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,600,000",
    pacing: { value: "118%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-30",
    name: "Smart Home Devices Campaign",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$210,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "4,500,000",
    pacing: { value: "107%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-31",
    name: "Furniture Clearance Event",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$190,000.00",
    targetingStrategy: "Run of site",
    impressions: "3,900,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-32",
    name: "Bedding & Bath Refresh Sale",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$78,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,300,000",
    pacing: { value: "100%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-33",
    name: "Musical Instruments Promotion",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$55,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "900,000",
    pacing: { value: "96%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-34",
    name: "Gaming Consoles & Accessories",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$280,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "5,800,000",
    pacing: { value: "116%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-35",
    name: "Lighting & Decor Collection",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$92,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,800,000",
    pacing: { value: "102%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-36",
    name: "Party Supplies & Decorations",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$48,000.00",
    targetingStrategy: "Run of site",
    impressions: "750,000",
    pacing: { value: "94%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-37",
    name: "Tools & Hardware Spring",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$125,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,600,000",
    pacing: { value: "110%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-38",
    name: "Garden & Patio Seasonal",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$105,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,200,000",
    pacing: { value: "88%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-39",
    name: "Pharmacy & Health Care",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$155,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,300,000",
    pacing: { value: "108%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-40",
    name: "Watches & Accessories Luxury",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$225,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,700,000",
    pacing: { value: "112%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-41",
    name: "Shoes & Footwear Collection",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$175,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,700,000",
    pacing: { value: "106%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-42",
    name: "Handbags & Wallets Premium",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$135,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,900,000",
    pacing: { value: "101%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-43",
    name: "Wine & Spirits Collection",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$98,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,950,000",
    pacing: { value: "99%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-44",
    name: "Arts & Crafts Supplies",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$62,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,050,000",
    pacing: { value: "104%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-45",
    name: "Vitamins & Supplements Health",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$118,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,450,000",
    pacing: { value: "113%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-46",
    name: "Laptops & Computers Back to School",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$350,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "7,200,000",
    pacing: { value: "119%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-47",
    name: "Tablets & E-readers Sale",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$195,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,000,000",
    pacing: { value: "111%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-48",
    name: "Headphones & Audio Equipment",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$142,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,100,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-49",
    name: "Cameras & Photography Gear",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$168,000.00",
    targetingStrategy: "Run of site",
    impressions: "3,500,000",
    pacing: { value: "109%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-50",
    name: "Streaming Devices & Media Players",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$88,500.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,850,000",
    pacing: { value: "107%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-51",
    name: "Winter Clothing Collection",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$145,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,950,000",
    pacing: { value: "108%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-52",
    name: "Smart Watches & Wearables",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$185,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,800,000",
    pacing: { value: "111%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-53",
    name: "Kitchen Essentials Sale",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$92,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,750,000",
    pacing: { value: "98%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-54",
    name: "Board Games & Puzzles",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$58,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,100,000",
    pacing: { value: "104%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-55",
    name: "Outdoor Furniture Spring Sale",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$175,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,500,000",
    pacing: { value: "109%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-56",
    name: "Skincare & Beauty Products",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$128,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,650,000",
    pacing: { value: "112%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-57",
    name: "Bicycles & Cycling Gear",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$95,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,850,000",
    pacing: { value: "91%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-58",
    name: "Cleaning Supplies & Essentials",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$72,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,450,000",
    pacing: { value: "106%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-59",
    name: "Premium Coffee & Tea Collection",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$68,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,350,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-60",
    name: "Printer & Office Electronics",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$115,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,350,000",
    pacing: { value: "103%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-61",
    name: "Wireless Speakers & Audio",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$158,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,250,000",
    pacing: { value: "117%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-62",
    name: "Luxury Bedding Collection",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$138,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,850,000",
    pacing: { value: "110%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-63",
    name: "Power Tools Professional",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$195,000.00",
    targetingStrategy: "Run of site",
    impressions: "4,050,000",
    pacing: { value: "108%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-64",
    name: "Organic Foods & Snacks",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$105,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,150,000",
    pacing: { value: "107%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-65",
    name: "Luggage & Travel Accessories",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$88,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,750,000",
    pacing: { value: "100%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-66",
    name: "Smart Home Security Systems",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$225,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "4,650,000",
    pacing: { value: "114%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-67",
    name: "Outdoor Grills & BBQ",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$142,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,950,000",
    pacing: { value: "109%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-68",
    name: "Craft Beer & Brewing Kits",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$54,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,050,000",
    pacing: { value: "87%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-69",
    name: "Yoga & Meditation Essentials",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$78,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,550,000",
    pacing: { value: "106%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-70",
    name: "Desktop Computers & Monitors",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$285,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "5,950,000",
    pacing: { value: "111%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-71",
    name: "Camping Equipment & Tents",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$118,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,450,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-72",
    name: "Wall Art & Decorations",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$62,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,250,000",
    pacing: { value: "102%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-73",
    name: "Electric Scooters & Bikes",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$205,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,250,000",
    pacing: { value: "113%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-74",
    name: "Protein & Nutrition Supplements",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$138,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,850,000",
    pacing: { value: "116%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-75",
    name: "Swimming Pool Supplies",
    type: "campaign",
    status: "Scheduled",
    recommendations: 1,
    totalBudget: "$95,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,950,000",
    pacing: { value: "99%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-76",
    name: "Board Game Night Collection",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$48,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "950,000",
    pacing: { value: "104%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-77",
    name: "Hair Care & Styling Products",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$85,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,750,000",
    pacing: { value: "107%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-78",
    name: "Dog & Cat Food Premium",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$125,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,550,000",
    pacing: { value: "110%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-79",
    name: "Mattresses & Sleep Comfort",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$245,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "5,150,000",
    pacing: { value: "112%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-80",
    name: "Fishing Gear & Tackle",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$68,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,350,000",
    pacing: { value: "89%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-81",
    name: "Sunglasses & Eyewear",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$92,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,850,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-82",
    name: "Baby Monitors & Safety",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$108,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "2,250,000",
    pacing: { value: "108%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-83",
    name: "Cocktail & Bar Supplies",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$58,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "1,150,000",
    pacing: { value: "103%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-84",
    name: "Area Rugs & Floor Coverings",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$125,000.00",
    targetingStrategy: "Run of site",
    impressions: "2,650,000",
    pacing: { value: "106%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-85",
    name: "Electric Guitars & Instruments",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$78,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,550,000",
    pacing: { value: "98%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-86",
    name: "Vacuum Cleaners & Floor Care",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$148,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,050,000",
    pacing: { value: "111%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-87",
    name: "Drone Photography & Video",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$195,000.00",
    targetingStrategy: "Run of site",
    impressions: "4,050,000",
    pacing: { value: "113%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-88",
    name: "Candles & Home Fragrance",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$52,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,050,000",
    pacing: { value: "104%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-89",
    name: "Running & Athletic Shoes",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    totalBudget: "$168,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "3,450,000",
    pacing: { value: "118%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-90",
    name: "Craft Supplies & DIY Kits",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$72,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,450,000",
    pacing: { value: "107%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-91",
    name: "Window Treatments & Blinds",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$88,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,750,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-92",
    name: "Bluetooth Speakers Portable",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$115,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,350,000",
    pacing: { value: "109%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-93",
    name: "Bird Watching Equipment",
    type: "campaign",
    status: "Paused",
    recommendations: 0,
    totalBudget: "$42,000.00",
    targetingStrategy: "Run of site",
    impressions: "850,000",
    pacing: { value: "86%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-94",
    name: "Kitchen Cutlery & Knives",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$68,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,350,000",
    pacing: { value: "106%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-95",
    name: "Artificial Christmas Trees",
    type: "campaign",
    status: "Scheduled",
    recommendations: 2,
    totalBudget: "$125,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,550,000",
    pacing: { value: "100%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-96",
    name: "Emergency Preparedness Kits",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$85,000.00",
    targetingStrategy: "Run of site",
    impressions: "1,750,000",
    pacing: { value: "108%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-97",
    name: "Fashion Jewelry & Accessories",
    type: "campaign",
    status: "Live",
    recommendations: 3,
    totalBudget: "$155,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "3,250,000",
    pacing: { value: "114%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "10004-98",
    name: "Water Filtration Systems",
    type: "campaign",
    status: "Live",
    recommendations: 2,
    totalBudget: "$105,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "2,150,000",
    pacing: { value: "110%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-99",
    name: "Model Trains & Collectibles",
    type: "campaign",
    status: "Live",
    recommendations: 0,
    totalBudget: "$48,000.00",
    targetingStrategy: "Run of site",
    impressions: "950,000",
    pacing: { value: "101%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "10004-100",
    name: "Outdoor Hammocks & Swings",
    type: "campaign",
    status: "Live",
    recommendations: 1,
    totalBudget: "$55,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "1,100,000",
    pacing: { value: "103%", color: "text-walmart-green" },
    expanded: false,
    children: []
  }
];

const archivedCampaigns: Campaign[] = [
  {
    id: "arch-10001",
    name: "Black Friday 2023 Campaign",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "11/20/2023",
    endDate: "11/27/2023",
    totalBudget: "$500,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "12,500,000",
    pacing: { value: "100%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10002",
    name: "Holiday Season 2023 - Electronics",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "12/01/2023",
    endDate: "12/25/2023",
    totalBudget: "$750,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "18,200,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10003",
    name: "New Year Sale 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "12/26/2023",
    endDate: "01/15/2024",
    totalBudget: "$300,000.00",
    targetingStrategy: "Run of site",
    impressions: "8,500,000",
    pacing: { value: "98%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10004",
    name: "Valentine's Day 2024 Campaign",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "02/01/2024",
    endDate: "02/14/2024",
    totalBudget: "$150,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "4,200,000",
    pacing: { value: "102%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10005",
    name: "Spring Fashion Collection 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "03/01/2024",
    endDate: "04/30/2024",
    totalBudget: "$425,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "11,800,000",
    pacing: { value: "107%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10006",
    name: "Easter Sale 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "03/20/2024",
    endDate: "04/01/2024",
    totalBudget: "$180,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "5,600,000",
    pacing: { value: "103%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10007",
    name: "Mother's Day Gift Guide 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "04/25/2024",
    endDate: "05/12/2024",
    totalBudget: "$220,000.00",
    targetingStrategy: "Run of site",
    impressions: "6,900,000",
    pacing: { value: "99%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10008",
    name: "Summer Outdoor Living 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "05/15/2024",
    endDate: "07/31/2024",
    totalBudget: "$550,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "15,300,000",
    pacing: { value: "104%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10009",
    name: "Father's Day Gifts 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "06/01/2024",
    endDate: "06/16/2024",
    totalBudget: "$195,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "5,800,000",
    pacing: { value: "101%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10010",
    name: "Independence Day Sale 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "06/28/2024",
    endDate: "07/06/2024",
    totalBudget: "$275,000.00",
    targetingStrategy: "Run of site",
    impressions: "8,100,000",
    pacing: { value: "106%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10011",
    name: "Back to School 2024 - Essentials",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "07/15/2024",
    endDate: "09/15/2024",
    totalBudget: "$680,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "19,500,000",
    pacing: { value: "108%", color: "text-walmart-yellow" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10012",
    name: "Labor Day Weekend Deals 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "08/29/2024",
    endDate: "09/02/2024",
    totalBudget: "$320,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "9,200,000",
    pacing: { value: "103%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10013",
    name: "Fall Home Decor Collection 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "09/15/2024",
    endDate: "11/15/2024",
    totalBudget: "$410,000.00",
    targetingStrategy: "Run of site",
    impressions: "12,100,000",
    pacing: { value: "105%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10014",
    name: "Halloween Spooky Savings 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "10/15/2024",
    endDate: "10/31/2024",
    totalBudget: "$225,000.00",
    targetingStrategy: "Behavioral targeting",
    impressions: "7,400,000",
    pacing: { value: "102%", color: "text-walmart-green" },
    expanded: false,
    children: []
  },
  {
    id: "arch-10015",
    name: "Thanksgiving Feast Essentials 2024",
    type: "campaign",
    status: "Completed",
    recommendations: 0,
    startDate: "11/15/2024",
    endDate: "11/28/2024",
    totalBudget: "$340,000.00",
    targetingStrategy: "Contextual targeting",
    impressions: "10,200,000",
    pacing: { value: "100%", color: "text-walmart-green" },
    expanded: false,
    children: []
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedTab, setSelectedTab] = useState<"onsite" | "archive">("onsite");
  const [showPopover, setShowPopover] = useState(false);
  const [showRecommendationPopover, setShowRecommendationPopover] = useState<string | null>(null);
  const [popoverOpenAbove, setPopoverOpenAbove] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [panelClosing, setPanelClosing] = useState(false);
  const [panelOpening, setPanelOpening] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [keywordsExpanded, setKeywordsExpanded] = useState(false);
  const [showApplyAlert, setShowApplyAlert] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const recPopoverRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 50;

  // Column widths state
  const [columnWidths, setColumnWidths] = useState({
    checkbox: 56,
    campaign: 280,
    status: 120,
    recommendations: 160,
    totalBudget: 130,
    targetingStrategy: 170,
    impressions: 130,
    pacing: 100,
    actions: 80
  });
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // Marty panel state
  const [showMartyPanel] = useState(true);
  const [tempStatusFilter, setTempStatusFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllFiltersPopover, setShowAllFiltersPopover] = useState(false);
  const [searchScope, setSearchScope] = useState<string>('Campaign name');
  const [showSearchScopeDropdown, setShowSearchScopeDropdown] = useState(false);
  const [showLiveFilterPopover, setShowLiveFilterPopover] = useState(false);
  const [livePacingFilter, setLivePacingFilter] = useState<string[]>([]);
  const [tempLivePacingFilter, setTempLivePacingFilter] = useState<string[]>([]);
  const [completedFilterSelected, setCompletedFilterSelected] = useState(false);
  const allFiltersPopoverRef = useRef<HTMLDivElement>(null);
  const liveFilterPopoverRef = useRef<HTMLDivElement>(null);

  // Selected recommendations state
  const [selectedRecommendations, setSelectedRecommendations] = useState<{[key: string]: number}>({});

  // Checked recommendations state (for checkboxes)
  const [checkedRecommendations, setCheckedRecommendations] = useState<Set<string>>(new Set());

  const toggleRecommendationCheck = (campaignId: string, recIdx: number) => {
    const key = `${campaignId}-${recIdx}`;
    const newChecked = new Set(checkedRecommendations);
    if (newChecked.has(key)) {
      newChecked.delete(key);
    } else {
      newChecked.add(key);
    }
    setCheckedRecommendations(newChecked);
  };

  // Selected rows state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Sidebar state
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  // Media solution state (for MastHead)
  const [selectedMediaSolution, setSelectedMediaSolution] = useState<MediaSolution>('Display Advertising');

  const handleResizeStart = (e: React.MouseEvent, column: string, currentWidth: number) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(column);
    setStartX(e.clientX);
    setStartWidth(currentWidth);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedCampaigns = () => {
    // First filter by status
    let filtered = campaigns;
    if (statusFilter.length > 0) {
      filtered = campaigns.filter(campaign => statusFilter.includes(campaign.status));
    }

    // Then filter by Completed toggle
    if (completedFilterSelected) {
      filtered = filtered.filter(campaign => campaign.status === 'Completed');
    }

    // Then filter by live pacing (on track / at risk)
    if (livePacingFilter.length > 0) {
      filtered = filtered.filter(campaign => {
        if (!campaign.pacing) return false;
        const pacingColor = campaign.pacing.color;
        if (livePacingFilter.includes('on-track') && pacingColor === 'text-walmart-green') {
          return true;
        }
        if (livePacingFilter.includes('at-risk') && pacingColor === 'text-walmart-yellow') {
          return true;
        }
        return false;
      });
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Then sort if a column is selected
    let sorted = filtered;
    if (sortColumn) {
      sorted = [...filtered].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortColumn) {
          case 'campaign':
            aValue = a.name?.toLowerCase() || '';
            bValue = b.name?.toLowerCase() || '';
            break;
          case 'status':
            aValue = a.status?.toLowerCase() || '';
            bValue = b.status?.toLowerCase() || '';
            break;
          case 'recommendations':
            aValue = a.recommendations || 0;
            bValue = b.recommendations || 0;
            break;
          case 'totalBudget':
            aValue = parseFloat(a.totalBudget?.replace(/[$,]/g, '') || '0');
            bValue = parseFloat(b.totalBudget?.replace(/[$,]/g, '') || '0');
            break;
          case 'targetingStrategy':
            aValue = a.targetingStrategy?.toLowerCase() || '';
            bValue = b.targetingStrategy?.toLowerCase() || '';
            break;
          case 'impressions':
            aValue = parseFloat(a.impressions?.replace(/,/g, '') || '0');
            bValue = parseFloat(b.impressions?.replace(/,/g, '') || '0');
            break;
          case 'pacing':
            aValue = parseFloat(a.pacing?.value?.replace(/%/g, '') || '0');
            bValue = parseFloat(b.pacing?.value?.replace(/%/g, '') || '0');
            break;
          default:
            return 0;
        }

        if (typeof aValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }

    return sorted;
  };

  const getPaginatedCampaigns = () => {
    const sorted = getSortedCampaigns();
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return sorted.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const sorted = getSortedCampaigns();
    return Math.ceil(sorted.length / resultsPerPage);
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const currentPageCampaigns = getPaginatedCampaigns();
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      // Add all current page campaign IDs to selected rows
      currentPageCampaigns.forEach(campaign => {
        newSelectedRows.add(campaign.id);
      });
    } else {
      // Remove all current page campaign IDs from selected rows
      currentPageCampaigns.forEach(campaign => {
        newSelectedRows.delete(campaign.id);
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (campaignId: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(campaignId);
    } else {
      newSelectedRows.delete(campaignId);
    }

    setSelectedRows(newSelectedRows);
  };

  const isAllSelected = () => {
    const currentPageCampaigns = getPaginatedCampaigns();
    if (currentPageCampaigns.length === 0) return false;
    return currentPageCampaigns.every(campaign => selectedRows.has(campaign.id));
  };

  const isSomeSelected = () => {
    const currentPageCampaigns = getPaginatedCampaigns();
    if (currentPageCampaigns.length === 0) return false;
    const selectedCount = currentPageCampaigns.filter(campaign => selectedRows.has(campaign.id)).length;
    return selectedCount > 0 && selectedCount < currentPageCampaigns.length;
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3ZM8 13L12 9H4L8 13Z" fill="currentColor"/>
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="var(--ld-semantic-color-border, #BABBBE)"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 3L4 7H12L8 3Z" fill="var(--ld-semantic-color-border, #BABBBE)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 13L12 9H4L8 13Z" fill="currentColor"/>
        </svg>
      );
    }
  };

  // Switch campaigns data based on selected tab
  useEffect(() => {
    if (selectedTab === "archive") {
      setCampaigns(archivedCampaigns);
    } else {
      setCampaigns(mockCampaigns);
    }
    // Reset selections when switching tabs
    setSelectedRows(new Set());
  }, [selectedTab]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingColumn) return;

      const diff = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + diff);

      setColumnWidths(prev => ({
        ...prev,
        [resizingColumn]: newWidth
      }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    if (resizingColumn) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn, startX, startWidth]);


  // Reset to page 1 when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const selectAllCheckedState: boolean | 'indeterminate' =
    isAllSelected() ? true : isSomeSelected() ? 'indeterminate' : false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
      if (recPopoverRef.current && !recPopoverRef.current.contains(event.target as Node)) {
        setShowRecommendationPopover(null);
      }
      if (liveFilterPopoverRef.current && !liveFilterPopoverRef.current.contains(event.target as Node)) {
        setShowLiveFilterPopover(false);
      }
    };

    if (showPopover || showRecommendationPopover || showLiveFilterPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover, showRecommendationPopover, showLiveFilterPopover]);

  useEffect(() => {
    if (showPanel && !panelClosing) {
      setPanelOpening(true);
      const timer = setTimeout(() => {
        setPanelOpening(false);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [showPanel, panelClosing]);

  const openPanel = (campaign: Campaign | null) => {
    setSelectedCampaign(campaign);
    setShowPanel(true);
    setPanelClosing(false);
    setPanelOpening(true);
    setShowRecommendationPopover(null);
  };

  const openPanelWithDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowPanel(true);
    setPanelClosing(false);
    setPanelOpening(true);
    setShowRecommendationPopover(null);
    // Use setTimeout to ensure panel opens before switching to detail view
    setTimeout(() => {
      setShowDetailView(true);
    }, 50);
  };

  const closePanel = () => {
    setPanelClosing(true);
    setTimeout(() => {
      setShowPanel(false);
      setPanelClosing(false);
      setSelectedCampaign(null);
      setShowDetailView(false);
      setShowApplyAlert(false);
      setShowConfirmation(false);
    }, 300);
  };

  const showDetails = () => {
    setShowDetailView(true);
    setShowApplyAlert(false);
    setShowConfirmation(false);
  };

  const backToList = () => {
    setShowDetailView(false);
    setShowApplyAlert(false);
    setShowConfirmation(false);
  };

  const handleApplyClick = () => {
    if (showDetailView) {
      if (!showApplyAlert) {
        setShowApplyAlert(true);
      } else {
        setShowApplyAlert(false);
        setShowConfirmation(true);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === id ? { ...c, expanded: !c.expanded } : c
    ));
  };

  const handleRecommendationClick = (e: React.MouseEvent, campaignId: string) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const popoverHeight = 400; // Approximate height of the popover

    // Open above if there's not enough space below
    const shouldOpenAbove = spaceBelow < popoverHeight;
    setPopoverOpenAbove(shouldOpenAbove);
    setShowRecommendationPopover(showRecommendationPopover === campaignId ? null : campaignId);
  };

  const handleDismissRecommendation = (campaignId: string, isChild: boolean = false) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === campaignId && !isChild) {
        // Remove campaign recommendation tag completely
        return { ...campaign, recommendations: 0 };
      } else if (campaign.children) {
        // Check if dismiss is for a child
        const updatedChildren = campaign.children.map(child =>
          child.id === campaignId ? { ...child, recommendations: 0 } : child
        );
        return { ...campaign, children: updatedChildren };
      }
      return campaign;
    }));
    setShowRecommendationPopover(null);
  };

  const getStatusBadge = (status: Campaign["status"]) => {
    const styles = {
      Live: "bg-walmart-green-bg text-walmart-green",
      Scheduled: "bg-walmart-blue-bg text-primary",
      Paused: "bg-walmart-purple-bg text-walmart-purple",
      Completed: "bg-muted text-muted-foreground"
    };

    // Show "Archived" for all campaigns in archive tab
    const displayStatus = selectedTab === "archive" ? "Archived" : status;
    const styleClass = selectedTab === "archive" ? styles.Completed : styles[status];

    return (
      <span className={`inline-flex px-2 py-1 rounded-sm text-xs font-normal ${styleClass}`}>
        {displayStatus}
      </span>
    );
  };

  const handleOpenAllFilters = () => {
    setTempStatusFilter([...statusFilter]);
    setTempLivePacingFilter([...livePacingFilter]);
    setShowAllFiltersPopover(true);
  };

  const handleToggleStatusFilter = (status: string) => {
    setTempStatusFilter(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const handleClearAllFilters = () => {
    setTempStatusFilter([]);
    setTempLivePacingFilter([]);
  };

  const handleApplyFilters = () => {
    setStatusFilter([...tempStatusFilter]);
    setLivePacingFilter([...tempLivePacingFilter]);
    setShowAllFiltersPopover(false);
  };

  const handleOpenLiveFilter = () => {
    setTempLivePacingFilter([...livePacingFilter]);
    setShowLiveFilterPopover(true);
  };

  const handleToggleLivePacingFilter = (option: string) => {
    setTempLivePacingFilter(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleClearLivePacingFilter = () => {
    setTempLivePacingFilter([]);
  };

  const handleApplyLivePacingFilter = () => {
    setLivePacingFilter([...tempLivePacingFilter]);
    setShowLiveFilterPopover(false);
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
        <DisplayAdvertisingSidebar
          activeMenuItem={activeMenuItem}
          onMenuItemClick={setActiveMenuItem}
        />

        {/* Main Content */}
        <main className="flex-1 h-auto self-stretch flex flex-col">
          {activeMenuItem === 'dashboard' ? (
            <DisplayDashboard />
          ) : (
            <>
              {/* Page Header */}
              <div className="px-6 pt-8 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-foreground">Display Advertising</h1>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => navigate('/campaign')}
                  >
                    Create campaign
                  </Button>
                </div>

                {/* Tabs */}
                <div>
                  <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "onsite" | "archive")}>
                    <TabList>
                      <Tab value="onsite">
                        Onsite auction
                      </Tab>
                      <Tab value="archive">
                        Archive
                      </Tab>
                    </TabList>
                  </Tabs>
                </div>
              </div>

              {/* Data Table Container */}
          <div className="mx-3 mb-6 rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col flex-1">
            {/* Table Controls */}
            <div className="flex items-center justify-end gap-2 p-4 border-b border-border bg-background">
              {/* Search Bar */}
              <div className="flex items-center gap-2 flex-1 min-w-[360px] max-w-[600px] px-3 h-8 border border-foreground rounded-full bg-background relative">
                <Search className="w-4 h-4 text-foreground" />
                <span className="text-sm text-muted-foreground">Search by</span>
                <Popover open={showSearchScopeDropdown} onOpenChange={setShowSearchScopeDropdown}>
                  <PopoverTrigger asChild>
                    <button
                      className="flex items-center gap-1 text-sm font-bold text-foreground hover:bg-muted px-1 rounded"
                    >
                      {searchScope}
                      {showSearchScopeDropdown ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Menu isOpen={showSearchScopeDropdown} onClose={() => setShowSearchScopeDropdown(false)}>
                      <MenuItem
                        selected={searchScope === 'Campaign name'}
                        onClick={() => {
                          setSearchScope('Campaign name');
                          setShowSearchScopeDropdown(false);
                        }}
                      >
                        Campaign name
                      </MenuItem>
                      <MenuItem
                        selected={searchScope === 'ID'}
                        onClick={() => {
                          setSearchScope('ID');
                          setShowSearchScopeDropdown(false);
                        }}
                      >
                        ID
                      </MenuItem>
                    </Menu>
                  </PopoverContent>
                </Popover>
                <input
                  type="text"
                  placeholder=""
                  className="flex-1 text-sm border-none outline-none bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 hover:bg-muted rounded-full transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2 relative">
                {/* All Filters Button */}
                <button
                  className={`flex items-center justify-center h-8 w-8 px-1.5 border rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#0053E2] focus:ring-opacity-50 ${
                    showAllFiltersPopover || statusFilter.length > 0 || livePacingFilter.length > 0 || completedFilterSelected || searchQuery.trim()
                      ? 'border-2 border-primary bg-walmart-blue-bg'
                      : 'border-foreground bg-background hover:bg-muted'
                  }`}
                  onClick={handleOpenAllFilters}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2" y1="5" x2="5.5" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="7.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <line x1="9.5" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="11" x2="9.5" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="11.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <line x1="13.5" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Live Filter Button with Popover */}
                <div className="relative">
                  <button
                    className={`flex items-center gap-1 h-8 pl-3 pr-2 border rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#0053E2] focus:ring-opacity-50 ${
                      livePacingFilter.length > 0 || showLiveFilterPopover
                        ? 'border-2 border-primary bg-walmart-blue-bg'
                        : 'border-foreground bg-background hover:bg-muted'
                    }`}
                    onClick={handleOpenLiveFilter}
                  >
                    <span className="text-sm text-foreground">Pace</span>
                    <span className="text-sm text-foreground">({showLiveFilterPopover ? tempLivePacingFilter.length : livePacingFilter.length})</span>
                    {showLiveFilterPopover ? (
                      <ChevronUp className="w-4 h-4 text-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-foreground" />
                    )}
                  </button>

                  {/* Live Filter Popover */}
                  {showLiveFilterPopover && (
                    <div
                      ref={liveFilterPopoverRef}
                      className="absolute left-0 top-full mt-2 w-[220px] bg-background rounded border border-[#D5D6D8] shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50"
                    >
                      {/* Nubbin (Arrow) */}
                      <div className="absolute -top-[9px] left-4 w-4 h-4 bg-background border-t border-l border-[#D5D6D8] transform rotate-45"></div>

                      {/* Header */}
                      <div className="flex items-center justify-between p-3 pb-2">
                        <h3 className="text-lg font-bold text-foreground">Pace Options</h3>
                        <button
                          onClick={() => setShowLiveFilterPopover(false)}
                          className="p-0.5 hover:bg-muted rounded-full transition-colors"
                        >
                          <X className="w-6 h-6 text-foreground" />
                        </button>
                      </div>

                      {/* Checkbox Options */}
                      <div className="px-3 pb-2 space-y-2">
                        <Checkbox
                          label="On track"
                          checked={tempLivePacingFilter.includes('on-track')}
                          onCheckedChange={() => handleToggleLivePacingFilter('on-track')}
                        />
                        <Checkbox
                          label="At risk"
                          checked={tempLivePacingFilter.includes('at-risk')}
                          onCheckedChange={() => handleToggleLivePacingFilter('at-risk')}
                        />
                      </div>

                      {/* Divider */}
                      <Divider />

                      {/* Footer Buttons */}
                      <div className="flex items-center justify-end gap-4 p-2 pr-3">
                        <button
                          className="text-sm underline hover:no-underline"
                          onClick={handleClearLivePacingFilter}
                        >
                          Clear All
                        </button>
                        <button
                          className="px-4 h-8 text-sm font-bold text-white bg-[#0053E2] rounded-full hover:bg-[#0046c7] transition-colors"
                          onClick={handleApplyLivePacingFilter}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Completed Toggle Button */}
                <button
                  className={`flex items-center gap-1 h-8 px-3 border rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#0053E2] focus:ring-opacity-50 ${
                    completedFilterSelected
                      ? 'border-2 border-primary bg-walmart-blue-bg'
                      : 'border-foreground bg-background hover:bg-muted'
                  }`}
                  onClick={() => setCompletedFilterSelected(!completedFilterSelected)}
                >
                  <span className="text-sm text-foreground">Completed</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center w-8 h-8 border border-foreground rounded-full hover:bg-muted transition-colors">
                  <Settings className="w-4 h-4 text-foreground" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 border border-foreground rounded-full hover:bg-muted transition-colors">
                  <Download className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* All Filters Panel */}
              {showAllFiltersPopover && (
                <>
                  {/* Scrim/Backdrop */}
                  <Scrim onClick={() => setShowAllFiltersPopover(false)} />

                  {/* Side Panel */}
                  <div
                    ref={allFiltersPopoverRef}
                    className="fixed right-0 top-0 h-full w-[320px] bg-background shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col transition-transform duration-300 ease-out"
                    style={{
                      animation: 'slideInRight 0.3s ease-out'
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-2 p-4">
                      <div className="flex-1">
                        <h3 className="text-[20px] font-bold text-foreground leading-7">All Filters</h3>
                      </div>
                      <button
                        onClick={() => setShowAllFiltersPopover(false)}
                        className="p-2 hover:bg-muted rounded-full transition-colors -mt-1 -mr-1"
                      >
                        <X className="w-6 h-6 text-foreground" />
                      </button>
                    </div>

                    {/* Divider */}
                    <Divider />

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto self-stretch p-4">
                      <div className="mb-3">
                        <div className="space-y-3">
                          <Checkbox label="Live" checked={tempStatusFilter.includes('Live')} onCheckedChange={() => handleToggleStatusFilter('Live')} />
                          <Checkbox label="Scheduled" checked={tempStatusFilter.includes('Scheduled')} onCheckedChange={() => handleToggleStatusFilter('Scheduled')} />
                          <Checkbox label="Paused" checked={tempStatusFilter.includes('Paused')} onCheckedChange={() => handleToggleStatusFilter('Paused')} />
                          <Checkbox label="Complete" checked={tempStatusFilter.includes('Completed')} onCheckedChange={() => handleToggleStatusFilter('Completed')} />
                        </div>
                      </div>

                      {/* Pace Filter Section */}
                      <div className="mb-3 mt-6">
                        <div className="text-sm font-bold text-foreground mb-3">Pace</div>
                        <div className="space-y-3">
                          <Checkbox label="On track" checked={tempLivePacingFilter.includes('on-track')} onCheckedChange={() => handleToggleLivePacingFilter('on-track')} />
                          <Checkbox label="At risk" checked={tempLivePacingFilter.includes('at-risk')} onCheckedChange={() => handleToggleLivePacingFilter('at-risk')} />
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <Divider />

                    {/* Footer */}
                    <div className="p-4">
                      <div className="flex items-center justify-end gap-4">
                        <button
                          className="text-sm underline hover:no-underline"
                          onClick={handleClearAllFilters}
                        >
                          Clear All
                        </button>
                        <button
                          className="px-4 h-8 text-sm font-bold text-white bg-[#0053E2] rounded-full hover:bg-[#0046c7] transition-colors"
                          onClick={handleApplyFilters}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-background flex-1">
              <table className="w-full text-sm relative" style={{ minWidth: '1218px' }}>
                <thead className="bg-muted sticky top-0 z-20">
                  <tr>
                    <th className="p-2 text-left relative group sticky left-0 bg-muted z-30 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.checkbox }}>
                      <Checkbox
                        checked={selectAllCheckedState}
                        onCheckedChange={(checked) => handleSelectAll(checked === true)}
                        aria-label="Select all campaigns"
                      />
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'checkbox', columnWidths.checkbox)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group" style={{ width: columnWidths.campaign }}>
                      <div
                        className="flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        onClick={() => handleSort('campaign')}
                      >
                        Campaign/Ad group/Creative
                        {renderSortIcon('campaign')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'campaign', columnWidths.campaign)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group" style={{ width: columnWidths.status }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('status')}>
                        Status
                        {renderSortIcon('status')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'status', columnWidths.status)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group" style={{ width: columnWidths.recommendations }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('recommendations')}>
                        Recommendations
                        {renderSortIcon('recommendations')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'recommendations', columnWidths.recommendations)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group" style={{ width: columnWidths.totalBudget }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('totalBudget')}>
                        Total budget
                        {renderSortIcon('totalBudget')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'totalBudget', columnWidths.totalBudget)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group" style={{ width: columnWidths.targetingStrategy }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('targetingStrategy')}>
                        Targeting Strategy
                        {renderSortIcon('targetingStrategy')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'targetingStrategy', columnWidths.targetingStrategy)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group" style={{ width: columnWidths.impressions }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('impressions')}>
                        Impressions
                        {renderSortIcon('impressions')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'impressions', columnWidths.impressions)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group" style={{ width: columnWidths.pacing }}>
                      <div className="flex items-center gap-1 whitespace-nowrap cursor-pointer" onClick={() => handleSort('pacing')}>
                        Pacing
                        {renderSortIcon('pacing')}
                      </div>
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#0053E2] group-hover:bg-[#0053E2]/20"
                        onMouseDown={(e) => handleResizeStart(e, 'pacing', columnWidths.pacing)}
                      />
                    </th>
                    <th className="p-2 text-left font-bold text-foreground relative group sticky right-0 bg-muted z-30 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.actions }}>
                      <div className="whitespace-nowrap">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedCampaigns().map((campaign, idx) => (
                    <React.Fragment key={campaign.id}>
                      <tr className={`border-b border-border hover:bg-muted group ${
                        searchQuery.trim() && (campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || campaign.id.toLowerCase().includes(searchQuery.toLowerCase()))
                          ? 'bg-[hsl(var(--walmart-yellow)/0.15)]'
                          : ''
                      }`}>
                        <td className={`p-2 sticky left-0 group-hover:bg-muted z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] ${
                          searchQuery.trim() && (campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || campaign.id.toLowerCase().includes(searchQuery.toLowerCase()))
                            ? 'bg-[hsl(var(--walmart-yellow)/0.15)]'
                            : 'bg-background'
                        }`} style={{ width: columnWidths.checkbox }}>
                          <Checkbox
                            checked={selectedRows.has(campaign.id)}
                            onCheckedChange={(checked) => handleSelectRow(campaign.id, !!checked)}
                            aria-label={`Select campaign ${campaign.name}`}
                          />
                        </td>
                        <td className="p-2" style={{ width: columnWidths.campaign }}>
                          <div className="flex items-start gap-1">
                            {campaign.children && campaign.children.length > 0 && (
                              <button
                                onClick={() => toggleExpand(campaign.id)}
                                className="mt-0.5 flex-shrink-0"
                              >
                                {campaign.expanded ? (
                                  <ChevronDown className="w-6 h-6" />
                                ) : (
                                  <ChevronRight className="w-6 h-6" />
                                )}
                              </button>
                            )}
                            {!campaign.children && <div className="w-6"></div>}
                            <div className="flex-1">
                              <div className="underline hover:no-underline cursor-pointer">
                                {campaign.name}
                              </div>
                              {campaign.type === "campaign" && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  ID: {campaign.id}
                                </div>
                              )}
                              {campaign.type === "creative" && campaign.targetingStrategy && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {campaign.targetingStrategy}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-2" style={{ width: columnWidths.status }}>
                          {getStatusBadge(campaign.status)}
                        </td>
                        <td className="p-2 text-foreground relative" style={{ width: columnWidths.recommendations }}>
                          {campaign.recommendations > 0 ? (
                            <>
                              <button
                                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FDE7F3] text-[#8C1E64] text-xs font-normal rounded cursor-pointer hover:bg-[#FCD4EC] focus:bg-[#FCD4EC] focus:outline-none focus:ring-2 focus:ring-[#8C1E64] focus:ring-opacity-50 active:bg-[#FCBFE0] transition-all"
                                onClick={(e) => handleRecommendationClick(e, campaign.id)}
                              >
                                {campaign.recommendations} recommendation{campaign.recommendations === 1 ? '' : 's'}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.5 2.25L8.25 6L4.5 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>

                              {/* Recommendation Popover */}
                              {showRecommendationPopover === campaign.id && (
                                <div
                                  ref={recPopoverRef}
                                  className={`absolute left-0 w-[432px] bg-background rounded shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 ${
                                    popoverOpenAbove ? 'bottom-full mb-2' : 'top-full mt-2'
                                  }`}
                                >
                                  {/* Nubbin (Arrow) */}
                                  {popoverOpenAbove ? (
                                    <svg className="absolute -bottom-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M8 8L0 0H16L8 8Z" fill="white"/>
                                    </svg>
                                  ) : (
                                    <svg className="absolute -top-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M8 0L16 8H0L8 0Z" fill="white"/>
                                    </svg>
                                  )}

                                  <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-1">
                                      <h3 className="text-lg font-bold text-foreground">
                                        Recommendations
                                      </h3>
                                      <div className="flex items-center gap-1 px-2 py-1 bg-walmart-blue-bg rounded">
                                        <Eye className="w-4 h-4 text-primary" />
                                        <span className="text-xs text-primary">Awareness</span>
                                      </div>
                                    </div>

                                    {/* Divider */}
                                    <Divider UNSAFE_className="my-4" />

                                    {/* Recommendations with radio buttons */}
                                    <div className="space-y-0">
                                      {Array.from({ length: campaign.recommendations }).map((_, recIdx) => {
                                        const recommendations = [
                                          { text: "Add 15 keywords", percent: "14k-16k", impact: "Potential increase in reach" },
                                          { text: "Increase budget by $5,000", percent: "18-22%", impact: "Potential increase in conversions" },
                                          { text: "Optimize ad schedule", percent: "12-16%", impact: "Potential cost savings" },
                                          { text: "Add negative keywords", percent: "8-12%", impact: "Reduction in wasted spend" },
                                          { text: "Expand audience targeting", percent: "15-20%", impact: "Potential increase in impressions" },
                                        ];
                                        const rec = recommendations[recIdx % recommendations.length];
                                        const checkKey = `${campaign.id}-${recIdx}`;
                                        const isChecked = checkedRecommendations.has(checkKey);

                                        return (
                                          <div key={checkKey}>
                                            <div className="flex items-start gap-3 py-2.5">
                                              {/* Checkbox */}
                                              <div className="mt-0.5" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                  checked={isChecked}
                                                  onCheckedChange={() => toggleRecommendationCheck(campaign.id, recIdx)}
                                                  aria-label={`Select recommendation: ${rec.text}`}
                                                />
                                              </div>

                                              {/* Content */}
                                              <div className="flex-1">
                                                <p className="text-sm text-foreground mb-1">{rec.text}</p>
                                                <div className="flex items-end gap-1 mb-2">
                                                  <span className="text-base font-bold text-walmart-green">{rec.percent}</span>
                                                  <span className="text-base font-bold text-foreground">{rec.impact}</span>
                                                </div>

                                                {/* Action links */}
                                                <div className="flex items-center justify-end gap-4">
                                                  <button
                                                    className="text-sm underline hover:no-underline"
                                                    onClick={() => handleDismissRecommendation(campaign.id)}
                                                  >
                                                    Dismiss
                                                  </button>
                                                  <button
                                                    className="text-sm underline hover:no-underline"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      openPanelWithDetails(campaign);
                                                    }}
                                                  >
                                                    View details
                                                  </button>
                                                </div>
                                              </div>
                                            </div>

                                            {recIdx < campaign.recommendations - 1 && (
                                              <Divider />
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Divider */}
                                    <Divider UNSAFE_className="my-4" />

                                    {/* Apply button */}
                                    <div className="flex justify-end">
                                      <button
                                        className="px-4 h-8 text-sm font-bold text-foreground bg-background border border-[#2E2F32] rounded-full hover:bg-muted"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openPanelWithDetails(campaign);
                                        }}
                                      >
                                        Apply selected
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-2 text-foreground" style={{ width: columnWidths.totalBudget }}>
                          {campaign.totalBudget || "-"}
                        </td>
                        <td className="p-2 text-foreground" style={{ width: columnWidths.targetingStrategy }}>
                          {campaign.targetingStrategy || "-"}
                        </td>
                        <td className="p-2 text-foreground" style={{ width: columnWidths.impressions }}>
                          {campaign.impressions || "-"}
                        </td>
                        <td className="p-2" style={{ width: columnWidths.pacing }}>
                          {campaign.pacing ? (
                            <span className={campaign.pacing.color}>{campaign.pacing.value}</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className={`p-2 sticky right-0 group-hover:bg-muted z-10 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)] ${
                          searchQuery.trim() && (campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || campaign.id.toLowerCase().includes(searchQuery.toLowerCase()))
                            ? 'bg-[hsl(var(--walmart-yellow)/0.15)]'
                            : 'bg-background'
                        }`} style={{ width: columnWidths.actions }}>
                          <button className="p-2 hover:bg-muted rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      {campaign.expanded && campaign.children?.map((child, childIdx) => (
                        <tr key={child.id} className="border-b border-border bg-background hover:bg-muted group">
                          <td className="p-2 sticky left-0 bg-background group-hover:bg-muted z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.checkbox }}></td>
                          <td className="p-2 pl-12" style={{ width: columnWidths.campaign }}>
                            <div className="flex items-center gap-2">
                              {child.type === "creative" && child.name.includes("video") && (
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M3 5H10C10.5523 5 11 5.44772 11 6V7.12328V9.15348V10C11 10.5523 10.5523 11 10 11H3C2.44772 11 2 10.5523 2 10V6C2 5.44772 2.44772 5 3 5ZM12 9.87498V10C12 11.1046 11.1046 12 10 12H3C1.89543 12 1 11.1046 1 10V6C1 4.89543 1.89543 4 3 4H10C11.1046 4 12 4.89543 12 6V6.34998L14.2948 5.31732C14.6257 5.16842 15 5.41045 15 5.77328V10.2785C15 10.6276 14.6513 10.8692 14.3244 10.7466L12 9.87498ZM12 8.80698L14 9.55698V6.54657L12 7.44657V8.80698Z" fill="currentColor"/>
                                </svg>
                              )}
                              {child.type === "creative" && child.name.includes("banner") && (
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 7.99976C8 8.55204 7.55228 8.99976 7 8.99976C6.44772 8.99976 6 8.55204 6 7.99976C6 7.44747 6.44772 6.99976 7 6.99976C7.55228 6.99976 8 7.44747 8 7.99976Z" fill="currentColor"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M11.6742 1.74875L12.5453 4.99982H14.0001C14.5524 4.99982 15.0001 5.44753 15.0001 5.99982V13.9998C15.0001 14.5521 14.5524 14.9998 14.0001 14.9998H5.00012C4.44784 14.9998 4.00012 14.5521 4.00012 13.9998V13.061C3.59247 13.026 3.23153 12.7412 3.11952 12.3232L1.04897 4.59576C0.906029 4.0623 1.22261 3.51396 1.75608 3.37102L10.4494 1.04165C10.9829 0.898705 11.5312 1.21529 11.6742 1.74875ZM2.0149 4.33694L10.7082 2.00757L11.51 4.99982H5.00012C4.44784 4.99982 4.00012 5.44753 4.00012 5.99982V11.7459L2.0149 4.33694ZM14.0001 5.99982H5.00012L5.00012 11.2926L5.83985 10.4528C6.19174 10.1009 6.74884 10.0613 7.14696 10.3599L8.42909 11.3215L11.2718 8.0727C11.6527 7.63736 12.3225 7.61506 12.7315 8.0241L14.0001 9.29272V5.99982ZM14.0001 10.7069L12.0244 8.7312L9.18167 11.98C8.83721 12.3737 8.24756 12.4354 7.82909 12.1215L6.54696 11.1599L5.00012 12.7068V13.9998H14.0001V10.7069Z" fill="currentColor"/>
                                </svg>
                              )}
                              <span className="underline hover:no-underline cursor-pointer">
                                {child.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-2" style={{ width: columnWidths.status }}>{getStatusBadge(child.status)}</td>
                          <td className="p-2 text-foreground relative" style={{ width: columnWidths.recommendations }}>
                            {child.recommendations > 0 ? (
                              <>
                                <button
                                  className="inline-flex items-center px-2 py-1 bg-[#FDE7F3] text-[#8C1E64] text-xs font-normal rounded cursor-pointer hover:bg-[#FCD4EC] focus:bg-[#FCD4EC] focus:outline-none focus:ring-2 focus:ring-[#8C1E64] focus:ring-opacity-50 active:bg-[#FCBFE0] transition-all"
                                  onClick={(e) => handleRecommendationClick(e, child.id)}
                                >
                                  {child.recommendations} recommendation{child.recommendations === 1 ? '' : 's'}
                                </button>

                                {/* Recommendation Popover */}
                                {showRecommendationPopover === child.id && (
                                  <div
                                    ref={recPopoverRef}
                                    className={`absolute left-0 w-[432px] bg-background rounded shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 ${
                                      popoverOpenAbove ? 'bottom-full mb-2' : 'top-full mt-2'
                                    }`}
                                  >
                                    {/* Nubbin (Arrow) */}
                                    {popoverOpenAbove ? (
                                      <svg className="absolute -bottom-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 8L0 0H16L8 8Z" fill="white"/>
                                      </svg>
                                    ) : (
                                      <svg className="absolute -top-2 left-6" width="16" height="8" viewBox="0 0 16 8" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 0L16 8H0L8 0Z" fill="white"/>
                                      </svg>
                                    )}

                                    <div className="p-4">
                                      {/* Header */}
                                      <div className="flex items-start justify-between mb-1">
                                        <h3 className="text-lg font-bold text-foreground">
                                          Recommendations
                                        </h3>
                                        <div className="flex items-center gap-1 px-2 py-1 bg-walmart-blue-bg rounded">
                                          <Eye className="w-4 h-4 text-primary" />
                                          <span className="text-xs text-primary">Awareness</span>
                                        </div>
                                      </div>

                                      {/* Divider */}
                                      <Divider UNSAFE_className="my-4" />

                                      {/* Recommendations with radio buttons */}
                                      <div className="space-y-0">
                                        {Array.from({ length: child.recommendations }).map((_, recIdx) => {
                                          const recommendations = [
                                            { text: "Add 15 keywords", percent: "14k-16k", impact: "Potential increase in reach" },
                                            { text: "Update video thumbnails", percent: "8-14%", impact: "Potential increase in CTR" },
                                            { text: "Refresh ad copy", percent: "6-10%", impact: "Potential increase in relevance" },
                                            { text: "Test new CTA buttons", percent: "10-15%", impact: "Potential increase in clicks" },
                                            { text: "Add captions to videos", percent: "5-8%", impact: "Potential increase in watch time" },
                                          ];
                                          const rec = recommendations[recIdx % recommendations.length];
                                          const checkKey = `${child.id}-${recIdx}`;
                                          const isChecked = checkedRecommendations.has(checkKey);

                                          return (
                                            <div key={checkKey}>
                                              <div className="flex items-start gap-3 py-2.5">
                                                {/* Checkbox */}
                                                <div className="mt-0.5" onClick={(e) => e.stopPropagation()}>
                                                  <Checkbox
                                                    checked={isChecked}
                                                    onCheckedChange={() => toggleRecommendationCheck(child.id, recIdx)}
                                                    aria-label={`Select recommendation: ${rec.text}`}
                                                  />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                  <p className="text-sm text-foreground mb-1">{rec.text}</p>
                                                  <div className="flex items-end gap-1 mb-2">
                                                    <span className="text-base font-bold text-walmart-green">{rec.percent}</span>
                                                    <span className="text-base font-bold text-foreground">{rec.impact}</span>
                                                  </div>

                                                  {/* Action links */}
                                                  <div className="flex items-center justify-end gap-4">
                                                    <button
                                                      className="text-sm underline hover:no-underline"
                                                      onClick={() => handleDismissRecommendation(child.id, true)}
                                                    >
                                                      Dismiss
                                                    </button>
                                                    <button
                                                      className="text-sm underline hover:no-underline"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        openPanelWithDetails(campaign);
                                                      }}
                                                    >
                                                      View details
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>

                                              {recIdx < child.recommendations - 1 && (
                                                <Divider />
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>

                                      {/* Divider */}
                                      <Divider UNSAFE_className="my-4" />

                                      {/* Apply button */}
                                      <div className="flex justify-end">
                                        <button
                                          className="px-4 h-8 text-sm font-bold text-foreground bg-background border border-[#2E2F32] rounded-full hover:bg-muted"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            openPanelWithDetails(campaign);
                                          }}
                                        >
                                          Apply selected
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-2 text-foreground" style={{ width: columnWidths.totalBudget }}>{child.totalBudget || "-"}</td>
                          <td className="p-2 text-foreground" style={{ width: columnWidths.targetingStrategy }}>{child.targetingStrategy || "-"}</td>
                          <td className="p-2 text-foreground" style={{ width: columnWidths.impressions }}>{child.impressions || "-"}</td>
                          <td className="p-2" style={{ width: columnWidths.pacing }}>
                            {child.pacing ? (
                              <span className={child.pacing.color}>{child.pacing.value}</span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-2 sticky right-0 bg-background group-hover:bg-muted z-10 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]" style={{ width: columnWidths.actions }}>
                            <button className="p-2 hover:bg-muted rounded-full">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-border bg-background">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <span>Results per page: {resultsPerPage}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <button
                  className={`p-1 rounded ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-muted'}`}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  title="First page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.64645 7.64645C3.4662 7.82669 3.45234 8.1103 3.60485 8.30645L3.64645 8.35355L8.14645 12.8536C8.34171 13.0488 8.65829 13.0488 8.85355 12.8536C9.0338 12.6733 9.04766 12.3897 8.89515 12.1936L8.85355 12.1464L4.7075 8L8.85355 3.85355C9.0338 3.67331 9.04766 3.3897 8.89515 3.19355L8.85355 3.14645C8.67331 2.9662 8.3897 2.95234 8.19355 3.10485L8.14645 3.14645L3.64645 7.64645Z" fill={currentPage === 1 ? '#BABBBE' : '#2E2F32'}/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.14645 7.64645C6.9662 7.82669 6.95234 8.1103 7.10485 8.30645L7.14645 8.35355L11.6464 12.8536C11.8417 13.0488 12.1583 13.0488 12.3536 12.8536C12.5338 12.6733 12.5477 12.3897 12.3951 12.1936L12.3536 12.1464L8.2075 8L12.3536 3.85355C12.5338 3.67331 12.5477 3.3897 12.3951 3.19355L12.3536 3.14645C12.1733 2.9662 11.8897 2.95234 11.6936 3.10485L11.6464 3.14645L7.14645 7.64645Z" fill={currentPage === 1 ? '#BABBBE' : '#2E2F32'}/>
                  </svg>
                </button>
                <button
                  className={`p-1 rounded ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-muted'}`}
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  title="Previous page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.39645 7.64645C5.2162 7.82669 5.20234 8.1103 5.35485 8.30645L5.39645 8.35355L9.89645 12.8536C10.0917 13.0488 10.4083 13.0488 10.6036 12.8536C10.7838 12.6733 10.7977 12.3897 10.6451 12.1936L10.6036 12.1464L6.4575 8L10.6036 3.85355C10.7838 3.67331 10.7977 3.3897 10.6451 3.19355L10.6036 3.14645C10.4233 2.9662 10.1397 2.95234 9.94355 3.10485L9.89645 3.14645L5.39645 7.64645Z" fill={currentPage === 1 ? '#BABBBE' : '#2E2F32'}/>
                  </svg>
                </button>
                <span>Page</span>
                <div className="w-7 h-6 flex items-center justify-center border border-[#74767C] rounded text-center">
                  {currentPage}
                </div>
                <span>of {getTotalPages()}</span>
                <button
                  className={`p-1 rounded ${currentPage >= getTotalPages() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-muted'}`}
                  onClick={handleNextPage}
                  disabled={currentPage >= getTotalPages()}
                  title="Next page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6036 7.64645C10.7838 7.82669 10.7977 8.1103 10.6451 8.30645L10.6036 8.35355L6.10355 12.8536C5.90829 13.0488 5.59171 13.0488 5.39645 12.8536C5.2162 12.6733 5.20234 12.3897 5.35485 12.1936L5.39645 12.1464L9.5425 8L5.39645 3.85355C5.2162 3.67331 5.20234 3.3897 5.35485 3.19355L5.39645 3.14645C5.57669 2.9662 5.8603 2.95234 6.05645 3.10485L6.10355 3.14645L10.6036 7.64645Z" fill={currentPage >= getTotalPages() ? '#BABBBE' : '#2E2F32'}/>
                  </svg>
                </button>
                <button
                  className={`p-1 rounded ${currentPage >= getTotalPages() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-muted'}`}
                  onClick={() => setCurrentPage(getTotalPages())}
                  disabled={currentPage >= getTotalPages()}
                  title="Last page"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.85355 7.64645C9.0338 7.82669 9.04766 8.1103 8.89515 8.30645L8.85355 8.35355L4.35355 12.8536C4.15829 13.0488 3.84171 13.0488 3.64645 12.8536C3.4662 12.6733 3.45234 12.3897 3.60485 12.1936L3.64645 12.1464L7.7925 8L3.64645 3.85355C3.4662 3.67331 3.45234 3.3897 3.60485 3.19355L3.64645 3.14645C3.82669 2.9662 4.1103 2.95234 4.30645 3.10485L4.35355 3.14645L8.85355 7.64645Z" fill={currentPage >= getTotalPages() ? '#BABBBE' : '#2E2F32'}/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.3536 7.64645C12.5338 7.82669 12.5477 8.1103 12.3951 8.30645L12.3536 8.35355L7.85355 12.8536C7.65829 13.0488 7.34171 13.0488 7.14645 12.8536C6.9662 12.6733 6.95234 12.3897 7.10485 12.1936L7.14645 12.1464L11.2925 8L7.14645 3.85355C6.9662 3.67331 6.95234 3.3897 7.10485 3.19355L7.14645 3.14645C7.32669 2.9662 7.6103 2.95234 7.80645 3.10485L7.85355 3.14645L12.3536 7.64645Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
            </>
          )}
        </main>
      </div>

      {/* Scrim Overlay */}
      {showPanel && (
        <Scrim
          isOpen={!panelClosing}
          isClosing={panelClosing}
          onClick={closePanel}
        />
      )}

      {/* Recommendations Panel */}
      {showPanel && (
        <div
          ref={panelRef}
          className={`fixed top-0 right-0 h-full w-[420px] bg-background shadow-[0_-1px_4px_0_rgba(0,0,0,0.10),0_5px_10px_3px_rgba(0,0,0,0.15)] z-50 flex flex-col transition-transform duration-300 ${
            panelClosing || panelOpening ? "translate-x-full" : "translate-x-0"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <h2 className="text-xl font-bold text-foreground">Recommendations</h2>
            <button
              onClick={closePanel}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <Divider />

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {showDetailView ? (
              <>
                {/* Breadcrumb */}
                <div className="mb-5">
                  <Breadcrumb aria-label="Breadcrumb navigation">
                    <BreadcrumbItem onClick={backToList}>
                      Recommendations
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrent>
                      Recommendation details
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>

                {/* Recommendation Detail */}
                <div className="flex flex-col gap-5">
                  {/* Impact Statement */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end gap-1">
                      <span className="text-base font-bold text-walmart-green">15k-18k</span>
                      <span className="text-base font-bold text-foreground">Potential increase in reach</span>
                    </div>
                    <p className="text-base text-foreground">by adding 15 keywords</p>
                  </div>

                  <Divider />

                  {/* Campaign Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Campaign</span>
                    <Link href="#" className="text-sm line-clamp-1">
                      H&H_FY25_Always On_North Atlantic_Blackstone_Display_In-Market_50839
                    </Link>
                  </div>

                  {/* Ad Group Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Ad group</span>
                    <Link href="#" className="text-sm line-clamp-1">
                      Walmart|Display|Auction|Cross Device|Behavioral Targeting|Past Purchasers of Tapatio
                    </Link>
                  </div>

                  {/* Recommended Keywords */}
                  <div className="border border-border rounded-lg">
                    <div className="p-4 border-b border-border">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-foreground">Recommended keywords</span>
                        <p className={`text-sm text-muted-foreground ${keywordsExpanded ? '' : 'line-clamp-4'}`}>
                          Coca-Cola freestyle machine, Coke vending machine, Coca-Cola sponsorship deals, Coke tasting event, Coca-Cola heritage tour, Coke glassware, Coca-Cola recipe pairing, Coke float dessert, Coca-Cola ice cream soda, Coke recipe hacks, Coca-Cola themed café, Coke and popcorn combo, Coca-Cola holiday truck tour, Coke art installation, Coca-Cola fan club, Coke TikTok challenge, Coca-Cola merch giveaway
                        </p>
                        <button
                          onClick={() => setKeywordsExpanded(!keywordsExpanded)}
                         
                          className="text-sm underline hover:no-underline self-start"
                        >
                          {keywordsExpanded ? 'View less' : 'View more'}
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted">
                      <span className="text-sm font-bold text-foreground">Current</span>
                      <ChevronDown className="w-4 h-4 text-foreground" />
                    </div>
                  </div>

                  {/* Why we recommend this */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Why we recommend this</span>
                    <p className="text-sm text-foreground">
                      Based on your campaign performance, we've identified that adding keywords could significantly increase your reach. Similar campaigns saw an average 12% increase in impressions while maintaining conversion quality. This recommendation uses machine learning to find users with similar characteristics to your best-performing audience segments.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Campaign Info */}
                {selectedCampaign && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-foreground">Campaign</span>
                      <div className="flex items-center gap-1 px-2 py-1 bg-walmart-blue-bg rounded">
                        <Eye className="w-4 h-4 text-primary" />
                        <span className="text-xs text-primary">Awareness</span>
                      </div>
                    </div>
                    <a href="#" className="text-sm underline hover:no-underline line-clamp-1">
                      {selectedCampaign.name}
                    </a>
                  </div>
                )}

                <Divider UNSAFE_className="mb-6" />

                {/* Campaign Level Recommendations */}
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-base font-bold text-foreground">Campaign level recommendations</span>
                    <span className="text-base text-foreground">(1)</span>
                  </div>

                  <div className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Checkbox onCheckedChange={() => showDetails()} aria-label="Select campaign recommendation" />
                      </div>
                      <div className="flex-1">
                        <Link href="#" className="text-sm line-clamp-1 block mb-4">
                          Coca Cola Summer Campaign
                        </Link>

                        <div className="mb-4">
                          <p className="text-sm text-foreground mb-2">Add 15 keywords</p>
                          <div className="flex items-end gap-1">
                            <span className="text-sm font-bold text-walmart-green">14-16%</span>
                            <span className="text-sm font-bold text-foreground">Potential increase in reach</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Affected ad groups</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded">Ad group name....</span>
                            <span className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded">Ad group name....</span>
                            <span className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded">Ad group name....</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                          <button className="text-sm underline hover:no-underline">
                            Dismiss
                          </button>
                          <button onClick={showDetails} className="text-sm underline hover:no-underline">
                            View details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Divider UNSAFE_className="mb-6" />

                {/* Ad Group Recommendations */}
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-base font-bold text-foreground">Ad group recommendations</span>
                    <span className="text-base text-foreground">(3)</span>
                  </div>

                  <div className="space-y-4">
                    {/* Ad group 01 - single recommendation */}
                    <div className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Checkbox onCheckedChange={() => showDetails()} aria-label="Select ad group 01 recommendation" />
                        </div>
                        <div className="flex-1">
                          <Link href="#" className="text-sm line-clamp-1 block mb-4">
                            Ad group 01 name goes here
                          </Link>

                          <div className="mb-4">
                            <p className="text-sm text-foreground mb-2">Add 15 keywords</p>
                            <div className="flex items-end gap-1">
                              <span className="text-sm font-bold text-walmart-green">14-16%</span>
                              <span className="text-sm font-bold text-foreground">Potential increase in reach</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-4">
                            <button className="text-sm underline hover:no-underline">
                              Dismiss
                            </button>
                            <button onClick={showDetails} className="text-sm underline hover:no-underline">
                              View details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ad group 02 - multiple recommendations with radio buttons */}
                    <div className="p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Checkbox onCheckedChange={() => showDetails()} aria-label="Select ad group 02 recommendation" />
                        </div>
                        <div className="flex-1">
                          <Link href="#" className="text-sm line-clamp-1 block mb-4">
                            Ad group 02 name goes here
                          </Link>

                          <div className="space-y-4">
                            {/* First recommendation option */}
                            <div>
                              <div className="flex items-start gap-3 mb-4">
                                <input type="radio" name="rec-adgroup-02" className="mt-0.5 w-5 h-5" />
                                <div className="flex-1">
                                  <p className="text-sm text-foreground mb-2">Add 15 keywords</p>
                                  <div className="flex items-end gap-1">
                                    <span className="text-sm font-bold text-walmart-green">14-16%</span>
                                    <span className="text-sm font-bold text-foreground">Potential increase in reach</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <button className="text-sm underline hover:no-underline">
                                  Dismiss
                                </button>
                                <button onClick={showDetails} className="text-sm underline hover:no-underline">
                                  View details
                                </button>
                              </div>
                            </div>

                            {/* Second recommendation option */}
                            <div>
                              <div className="flex items-start gap-3 mb-4">
                                <input type="radio" name="rec-adgroup-02" className="mt-0.5 w-5 h-5" />
                                <div className="flex-1">
                                  <p className="text-sm text-foreground mb-2">Add 15 keywords</p>
                                  <div className="flex items-end gap-1">
                                    <span className="text-sm font-bold text-walmart-green">14-16%</span>
                                    <span className="text-sm font-bold text-foreground">Potential increase in reach</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-end gap-4">
                                <button className="text-sm underline hover:no-underline">
                                  Dismiss
                                </button>
                                <button onClick={showDetails} className="text-sm underline hover:no-underline">
                                  View details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Divider />

          {/* Footer Actions */}
          <div className="p-6 flex flex-col gap-4">
            {showApplyAlert && showDetailView && (
              <div className="flex items-start gap-2 p-2 px-3 border border-[#FFC220] bg-[hsl(var(--walmart-yellow)/0.15)] rounded">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M8.86602 2.5C8.48112 1.83333 7.51887 1.83333 7.13397 2.5L1.33974 12.5C0.954843 13.1667 1.43597 14 2.20577 14H13.7942C14.564 14 15.0451 13.1667 14.6603 12.5L8.86602 2.5Z" fill="#662B0D"/>
                  <path d="M8 5.5V9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11.5" r="0.75" fill="white"/>
                </svg>
                <p className="text-sm text-foreground flex-1">
                  Applying this recommendation will reconfigure your ad group and disable any other recommendations that affect the same ad group.
                </p>
              </div>
            )}
            <div className="flex items-center justify-end gap-4">
              {showConfirmation && showDetailView ? (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#2A8703"/>
                    <path d="M6 10L8.5 12.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-bold text-walmart-green">Recommendation applied</span>
                </div>
              ) : (
                <button
                  onClick={handleApplyClick}
                  className="h-8 px-4 bg-[#0053E2] text-white text-sm font-bold rounded-full hover:bg-[#0046c7] transition-colors"
                >
                  {showDetailView ? 'Apply recommendation' : 'Apply selected'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Marty Floating Panel */}
      {showMartyPanel && <MartyFloatingPanel />}
    </div>
  );
}
