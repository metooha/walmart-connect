import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MastHead } from "../components/ui/MastHead";
import SponsoredSearchSidebar from "../features/sponsored-search/SponsoredSearchSidebar";
import MartyFloatingPanel from "../features/marty/MartyFloatingPanel";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { MediaSolution } from "../components/ui/MediaSolutionsDropdown";
import { Button } from "../components/ui/Button";
import { Link } from "../components/ui/Link";
import { Tabs, TabList, Tab } from "../components/ui/Tab";
import { ChevronLeft, ChevronRight, ChevronDown, Download, Calendar } from "@/components/icons";
import DateRangePicker from "../components/DateRangePicker";

interface LaHistoriaEntry {
  id: string;
  campaignName: string;
  campaignId: string;
  date: string;
  time: string;
  user: string;
  interfaceType: string;
  changeCategory: string;
  from: string;
  to: string;
}

// Sample data matching the image
const historyData: LaHistoriaEntry[] = [
  {
    id: "1",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "1st Jan 2026",
    time: "11:30 AM",
    user: "name1",
    interfaceType: "Marty",
    changeCategory: "New campaign status",
    from: "Scheduled",
    to: "Live"
  },
  {
    id: "2",
    campaignName: "Test2",
    campaignId: "5678",
    date: "2nd Jan 2026",
    time: "12:30 PM",
    user: "name2",
    interfaceType: "Adcenter UI",
    changeCategory: "Daily Budget",
    from: "$0",
    to: "$100"
  },
  {
    id: "3",
    campaignName: "Test3",
    campaignId: "1111",
    date: "3rd Jan 2026",
    time: "1:00 PM",
    user: "name3",
    interfaceType: "Marty",
    changeCategory: "End Date",
    from: "1st Jan 2026",
    to: "27th Jan 2026"
  },
  {
    id: "4",
    campaignName: "Test4",
    campaignId: "2222",
    date: "4th Jan 2026",
    time: "2:00 PM",
    user: "name4",
    interfaceType: "Marty",
    changeCategory: "Total Budget",
    from: "$1,000",
    to: "$2,000"
  },
  {
    id: "5",
    campaignName: "Test5",
    campaignId: "3333",
    date: "5th Jan 2026",
    time: "3:00 PM",
    user: "name5",
    interfaceType: "Marty",
    changeCategory: "Campaign name",
    from: "Test555",
    to: "Test5"
  },
  {
    id: "6",
    campaignName: "Test6",
    campaignId: "4444",
    date: "6th Jan 2026",
    time: "4:00 PM",
    user: "name6",
    interfaceType: "Marty",
    changeCategory: "Expanded targeting",
    from: "BT enabled",
    to: "BT disabled"
  },
  {
    id: "7",
    campaignName: "Test7",
    campaignId: "5555",
    date: "7th Jan 2026",
    time: "5:00 PM",
    user: "name7",
    interfaceType: "Marty",
    changeCategory: "Campaign bidding strategy",
    from: "Fixed",
    to: "Dynamic"
  },
  {
    id: "8",
    campaignName: "Test8",
    campaignId: "6666",
    date: "8th Jan 2026",
    time: "6:00 PM",
    user: "name8",
    interfaceType: "Adcenter UI",
    changeCategory: "Bid multiplier",
    from: "desktop 0%",
    to: "desktop 5%"
  },
  {
    id: "9",
    campaignName: "Test9",
    campaignId: "7777",
    date: "9th Jan 2026",
    time: "7:00 PM",
    user: "name9",
    interfaceType: "Adcenter UI",
    changeCategory: "Offsite product ads",
    from: "enabled",
    to: "disabled"
  },
  {
    id: "10",
    campaignName: "Test10",
    campaignId: "8888",
    date: "10th Jan 2026",
    time: "8:00 PM",
    user: "name10",
    interfaceType: "Adcenter UI",
    changeCategory: "Adgroup creation",
    from: "NA",
    to: "adg1"
  },
  {
    id: "11",
    campaignName: "Test11",
    campaignId: "9999",
    date: "11th Jan 2026",
    time: "9:00 PM",
    user: "name11",
    interfaceType: "Adcenter UI",
    changeCategory: "Adgroup status",
    from: "enabled",
    to: "disabled"
  },
  {
    id: "12",
    campaignName: "Test12",
    campaignId: "11110",
    date: "12th Jan 2026",
    time: "10:00 PM",
    user: "name12",
    interfaceType: "Adcenter UI",
    changeCategory: "Items Section",
    from: "5 enabled + 8 disabled",
    to: "4 enabled + 7 disabled"
  },
  {
    id: "13",
    campaignName: "Test13",
    campaignId: "12221",
    date: "13th Jan 2026",
    time: "11:00 AM",
    user: "name13",
    interfaceType: "Web UI Recommendation",
    changeCategory: "Keywords section",
    from: "10 enabled + 8 disabled",
    to: "40 enabled + 6 disabled"
  },
  {
    id: "14",
    campaignName: "Test14",
    campaignId: "13332",
    date: "14th Jan 2026",
    time: "12:00 AM",
    user: "name14",
    interfaceType: "Web UI Recommendation",
    changeCategory: "Campaign status",
    from: "5 enabled + 8 disabled",
    to: "4 enabled + 7 disabled"
  },
  {
    id: "15",
    campaignName: "Test15",
    campaignId: "14443",
    date: "15th Jan 2026",
    time: "1:00 PM",
    user: "name15",
    interfaceType: "Adcenter UI",
    changeCategory: "Campaign status",
    from: "Live",
    to: "Paused"
  },
  {
    id: "16",
    campaignName: "Test16",
    campaignId: "15554",
    date: "16th Jan 2026",
    time: "2:00 AM",
    user: "name16",
    interfaceType: "Adcenter UI",
    changeCategory: "Campaign status",
    from: "Re-Scheduled",
    to: "Live"
  },
  {
    id: "17",
    campaignName: "Test17",
    campaignId: "16665",
    date: "17th Jan 2026",
    time: "3:00 AM",
    user: "name17",
    interfaceType: "Adcenter UI",
    changeCategory: "Campaign status",
    from: "5 enabled + 8 disabled",
    to: "30 enabled + 6 disabled"
  },
  {
    id: "18",
    campaignName: "Test18",
    campaignId: "17776",
    date: "18th Jan 2026",
    time: "4:00 AM",
    user: "name18",
    interfaceType: "API",
    changeCategory: "Keywords section",
    from: "10 enabled + 8 disabled",
    to: "40 enabled + 6 disabled"
  },
  {
    id: "19",
    campaignName: "Test19",
    campaignId: "18887",
    date: "19th Jan 2026",
    time: "5:00 AM",
    user: "name19",
    interfaceType: "Adcenter UI",
    changeCategory: "Target ROAS",
    from: "5",
    to: "7th Jan 2026"
  },
  {
    id: "20",
    campaignName: "Test20",
    campaignId: "19998",
    date: "20th Jan 2026",
    time: "6:00 AM",
    user: "name20",
    interfaceType: "Marty",
    changeCategory: "Target ROAS",
    from: "1st Jan 2026",
    to: "7th Jan 2026"
  },
  {
    id: "21",
    campaignName: "Test21",
    campaignId: "21109",
    date: "21st Jan 2026",
    time: "7:00 AM",
    user: "name21",
    interfaceType: "Adcenter UI",
    changeCategory: "Start Date",
    from: "14th Jan 2026",
    to: "20th Jan 2026"
  },
  {
    id: "22",
    campaignName: "Test22",
    campaignId: "22220",
    date: "22nd Jan 2026",
    time: "8:00 AM",
    user: "name22",
    interfaceType: "Marty",
    changeCategory: "Target ROAS",
    from: "$1.50",
    to: "$"
  },
  {
    id: "23",
    campaignName: "Test23",
    campaignId: "23331",
    date: "23rd Jan 2026",
    time: "9:00 AM",
    user: "name23",
    interfaceType: "Marty",
    changeCategory: "End Date",
    from: "1st Jan 2026",
    to: "7th Jan 2026"
  },
  {
    id: "24",
    campaignName: "Test24",
    campaignId: "24442",
    date: "24th Jan 2026",
    time: "10:00 AM",
    user: "name24",
    interfaceType: "Adcenter UI",
    changeCategory: "Item Bid",
    from: "$4.20",
    to: "$3.40"
  },
  {
    id: "25",
    campaignName: "Test25",
    campaignId: "25553",
    date: "25th Jan 2026",
    time: "11:00 AM",
    user: "name25",
    interfaceType: "Adcenter UI",
    changeCategory: "Keyword Bid",
    from: "$2.20",
    to: "$3.00"
  },
  {
    id: "26",
    campaignName: "Test26",
    campaignId: "26664",
    date: "26th Jan 2026",
    time: "12:00 PM",
    user: "name26",
    interfaceType: "API",
    changeCategory: "Placement inclusion",
    from: "Item buybox enabled, search carousel enabled",
    to: "Item buybox enabled, search carousel enabled, item buybox enabled, item buybox enabled"
  },
  {
    id: "27",
    campaignName: "Test27",
    campaignId: "27775",
    date: "27th Jan 2026",
    time: "1:00 PM",
    user: "name27",
    interfaceType: "Adcenter UI",
    changeCategory: "Item Suggested Bids apply",
    from: "$3.00",
    to: "$4.10"
  },
  {
    id: "28",
    campaignName: "Test28",
    campaignId: "28886",
    date: "28th Jan 2026",
    time: "2:00 PM",
    user: "name28",
    interfaceType: "Adcenter UI",
    changeCategory: "Keywords Suggested Bids apply",
    from: "$1.50",
    to: "$1.50"
  },
  {
    id: "29",
    campaignName: "Test29",
    campaignId: "29997",
    date: "29th Jan 2026",
    time: "3:00 PM",
    user: "name29",
    interfaceType: "Adcenter UI",
    changeCategory: "Negative keywords (alpha)",
    from: "5 enabled + 8 disabled",
    to: "4 enabled + 7 disabled"
  },
  {
    id: "30",
    campaignName: "Test30",
    campaignId: "31108",
    date: "30th Jan 2026",
    time: "4:00 PM",
    user: "name30",
    interfaceType: "Adcenter UI",
    changeCategory: "Brand name",
    from: "Walmart",
    to: "Walmart123"
  },
  {
    id: "31",
    campaignName: "Test31",
    campaignId: "32219",
    date: "31st Jan 2026",
    time: "5:00 PM",
    user: "name31",
    interfaceType: "Adcenter UI",
    changeCategory: "Ad Headline",
    from: "Everyday low prices",
    to: "Everyday low prices"
  },
  {
    id: "32",
    campaignName: "Test32",
    campaignId: "33330",
    date: "1st Feb 2026",
    time: "6:00 PM",
    user: "name32",
    interfaceType: "Adcenter UI",
    changeCategory: "Brand logo",
    from: "Image 1",
    to: "Image 2"
  },
  {
    id: "33",
    campaignName: "Test33",
    campaignId: "34441",
    date: "2nd Feb 2026",
    time: "7:00 PM",
    user: "name33",
    interfaceType: "Adcenter UI",
    changeCategory: "Brand link",
    from: "www.image1.com",
    to: "www.image2.com"
  },
  {
    id: "34",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "3rd Feb 2026",
    time: "8:00 AM",
    user: "name34",
    interfaceType: "Marty",
    changeCategory: "Adgroup name",
    from: "Ad Group 1",
    to: "Electronics - TV"
  },
  {
    id: "35",
    campaignName: "Test35",
    campaignId: "35552",
    date: "4th Feb 2026",
    time: "9:00 AM",
    user: "name35",
    interfaceType: "Adcenter UI",
    changeCategory: "Daily Budget",
    from: "$50",
    to: "$75"
  },
  {
    id: "36",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "5th Feb 2026",
    time: "10:00 AM",
    user: "name36",
    interfaceType: "Marty",
    changeCategory: "Campaign status",
    from: "Live",
    to: "Paused"
  },
  {
    id: "37",
    campaignName: "Test37",
    campaignId: "37774",
    date: "6th Feb 2026",
    time: "11:00 AM",
    user: "name37",
    interfaceType: "API",
    changeCategory: "Bid multiplier",
    from: "mobile 5%",
    to: "mobile 10%"
  },
  {
    id: "38",
    campaignName: "Test38",
    campaignId: "38885",
    date: "7th Feb 2026",
    time: "12:00 PM",
    user: "name38",
    interfaceType: "Marty",
    changeCategory: "Campaign bidding strategy",
    from: "Dynamic",
    to: "Fixed"
  },
  {
    id: "39",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "8th Feb 2026",
    time: "1:00 PM",
    user: "name39",
    interfaceType: "Adcenter UI",
    changeCategory: "Total Budget",
    from: "$5,000",
    to: "$7,500"
  },
  {
    id: "40",
    campaignName: "Test40",
    campaignId: "40006",
    date: "9th Feb 2026",
    time: "2:00 PM",
    user: "name40",
    interfaceType: "Marty",
    changeCategory: "Expanded targeting",
    from: "BT disabled",
    to: "BT enabled"
  },
  {
    id: "41",
    campaignName: "Test41",
    campaignId: "41117",
    date: "10th Feb 2026",
    time: "3:00 PM",
    user: "name41",
    interfaceType: "Adcenter UI",
    changeCategory: "Items section",
    from: "10 enabled + 5 disabled",
    to: "12 enabled + 3 disabled"
  },
  {
    id: "42",
    campaignName: "Test42",
    campaignId: "42228",
    date: "11th Feb 2026",
    time: "4:00 PM",
    user: "name42",
    interfaceType: "Web UI Recommendation",
    changeCategory: "Keywords section",
    from: "25 enabled + 10 disabled",
    to: "30 enabled + 5 disabled"
  },
  {
    id: "43",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "12th Feb 2026",
    time: "5:00 PM",
    user: "name43",
    interfaceType: "Marty",
    changeCategory: "End Date",
    from: "28th Feb 2026",
    to: "31st Mar 2026"
  },
  {
    id: "44",
    campaignName: "Test44",
    campaignId: "44440",
    date: "13th Feb 2026",
    time: "6:00 PM",
    user: "name44",
    interfaceType: "Adcenter UI",
    changeCategory: "Adgroup status",
    from: "disabled",
    to: "enabled"
  },
  {
    id: "45",
    campaignName: "Test45",
    campaignId: "45551",
    date: "14th Feb 2026",
    time: "7:00 PM",
    user: "name45",
    interfaceType: "Marty",
    changeCategory: "Campaign name",
    from: "Test Campaign 45",
    to: "Q1 Special Offer"
  },
  {
    id: "46",
    campaignName: "Test46",
    campaignId: "46662",
    date: "15th Feb 2026",
    time: "8:00 AM",
    user: "name46",
    interfaceType: "API",
    changeCategory: "Offsite product ads",
    from: "disabled",
    to: "enabled"
  },
  {
    id: "47",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "16th Feb 2026",
    time: "9:00 AM",
    user: "name47",
    interfaceType: "Adcenter UI",
    changeCategory: "Daily Budget",
    from: "$100",
    to: "$150"
  },
  {
    id: "48",
    campaignName: "Test48",
    campaignId: "48884",
    date: "17th Feb 2026",
    time: "10:00 AM",
    user: "name48",
    interfaceType: "Marty",
    changeCategory: "Adgroup creation",
    from: "NA",
    to: "adg5"
  },
  {
    id: "49",
    campaignName: "Test49",
    campaignId: "49995",
    date: "18th Feb 2026",
    time: "11:00 AM",
    user: "name49",
    interfaceType: "Adcenter UI",
    changeCategory: "Campaign status",
    from: "Paused",
    to: "Live"
  },
  {
    id: "50",
    campaignName: "Test50",
    campaignId: "50006",
    date: "19th Feb 2026",
    time: "12:00 PM",
    user: "name50",
    interfaceType: "Web UI Recommendation",
    changeCategory: "Bid multiplier",
    from: "tablet 0%",
    to: "tablet 8%"
  },
  {
    id: "51",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "20th Feb 2026",
    time: "1:00 PM",
    user: "name51",
    interfaceType: "Marty",
    changeCategory: "Adgroup name",
    from: "Electronics - TV",
    to: "Hisense TVs - Premium"
  },
  {
    id: "52",
    campaignName: "Test52",
    campaignId: "52228",
    date: "21st Feb 2026",
    time: "2:00 PM",
    user: "name52",
    interfaceType: "Adcenter UI",
    changeCategory: "Start Date",
    from: "1st Mar 2026",
    to: "15th Mar 2026"
  },
  {
    id: "53",
    campaignName: "Test53",
    campaignId: "53339",
    date: "22nd Feb 2026",
    time: "3:00 PM",
    user: "name53",
    interfaceType: "API",
    changeCategory: "Total Budget",
    from: "$2,500",
    to: "$3,000"
  },
  {
    id: "54",
    campaignName: "Test54",
    campaignId: "54440",
    date: "23rd Feb 2026",
    time: "4:00 PM",
    user: "name54",
    interfaceType: "Marty",
    changeCategory: "Campaign bidding strategy",
    from: "Fixed",
    to: "Dynamic"
  },
  {
    id: "55",
    campaignName: "Test55",
    campaignId: "55551",
    date: "24th Feb 2026",
    time: "5:00 PM",
    user: "name55",
    interfaceType: "Adcenter UI",
    changeCategory: "Expanded targeting",
    from: "BT enabled",
    to: "BT disabled"
  },
  {
    id: "56",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "25th Feb 2026",
    time: "6:00 PM",
    user: "name56",
    interfaceType: "Web UI Recommendation",
    changeCategory: "Items section",
    from: "20 enabled + 5 disabled",
    to: "25 enabled + 0 disabled"
  },
  {
    id: "57",
    campaignName: "Test57",
    campaignId: "57773",
    date: "26th Feb 2026",
    time: "7:00 PM",
    user: "name57",
    interfaceType: "Marty",
    changeCategory: "Keywords section",
    from: "15 enabled + 12 disabled",
    to: "20 enabled + 7 disabled"
  },
  {
    id: "58",
    campaignName: "Test58",
    campaignId: "58884",
    date: "27th Feb 2026",
    time: "8:00 AM",
    user: "name58",
    interfaceType: "Adcenter UI",
    changeCategory: "Adgroup status",
    from: "enabled",
    to: "disabled"
  },
  {
    id: "59",
    campaignName: "Test59",
    campaignId: "59995",
    date: "28th Feb 2026",
    time: "9:00 AM",
    user: "name59",
    interfaceType: "API",
    changeCategory: "Daily Budget",
    from: "$200",
    to: "$250"
  },
  {
    id: "60",
    campaignName: "SP - GTV - Hisense",
    campaignId: "1234",
    date: "1st Mar 2026",
    time: "10:00 AM",
    user: "name60",
    interfaceType: "Marty",
    changeCategory: "Campaign status",
    from: "Paused",
    to: "Live"
  },
  {
    id: "61",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "10th Jan 2026",
    time: "9:00 AM",
    user: "name1",
    interfaceType: "Adcenter UI",
    changeCategory: "New campaign status",
    from: "Paused",
    to: "Live"
  },
  {
    id: "62",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "15th Jan 2026",
    time: "11:30 AM",
    user: "name3",
    interfaceType: "Marty",
    changeCategory: "Daily Budget",
    from: "$500",
    to: "$750"
  },
  {
    id: "63",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "20th Jan 2026",
    time: "2:15 PM",
    user: "name5",
    interfaceType: "Adcenter UI",
    changeCategory: "End Date",
    from: "31st Jan 2026",
    to: "28th Feb 2026"
  },
  {
    id: "64",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "25th Jan 2026",
    time: "4:00 PM",
    user: "name2",
    interfaceType: "Web UI Recommendation",
    changeCategory: "Total Budget",
    from: "$10,000",
    to: "$15,000"
  },
  {
    id: "65",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "1st Feb 2026",
    time: "9:45 AM",
    user: "name7",
    interfaceType: "Marty",
    changeCategory: "Expanded targeting",
    from: "BT disabled",
    to: "BT enabled"
  },
  {
    id: "66",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "5th Feb 2026",
    time: "1:00 PM",
    user: "name4",
    interfaceType: "API",
    changeCategory: "Campaign bidding strategy",
    from: "Dynamic",
    to: "Target ROAS"
  },
  {
    id: "67",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "10th Feb 2026",
    time: "10:30 AM",
    user: "name6",
    interfaceType: "Adcenter UI",
    changeCategory: "Bid multiplier",
    from: "desktop 0%",
    to: "desktop 10%"
  },
  {
    id: "68",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "14th Feb 2026",
    time: "3:30 PM",
    user: "name9",
    interfaceType: "Marty",
    changeCategory: "Campaign status",
    from: "Live",
    to: "Paused"
  },
  {
    id: "69",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "18th Feb 2026",
    time: "8:00 AM",
    user: "name2",
    interfaceType: "Adcenter UI",
    changeCategory: "Target ROAS",
    from: "3",
    to: "5"
  },
  {
    id: "70",
    campaignName: "SP - GTV - HiSense - New SKUs - Category - Auto",
    campaignId: "4673120",
    date: "22nd Feb 2026",
    time: "5:15 PM",
    user: "name8",
    interfaceType: "Web UI Recommendation",
    changeCategory: "Keywords section",
    from: "12 enabled + 3 disabled",
    to: "18 enabled + 2 disabled"
  }
];

type SortColumn = keyof LaHistoriaEntry | null;
type SortDirection = 'ascending' | 'descending' | 'none';

export default function LaHistoria() {
  const navigate = useNavigate();
  const location = useLocation();
  const { campaignId } = useParams<{ campaignId?: string }>();
  const [showMartyPanel] = useState(true);
  const [isMartyMinimized, setIsMartyMinimized] = useLocalStorage('marty:minimized', false);
  const [mediaSolutionsOpen, setMediaSolutionsOpen] = useState(false);
  const [selectedMediaSolution, setSelectedMediaSolution] = useState('Sponsored Search');

  // Determine if we're in campaign-specific view
  const isCampaignView = !!campaignId;
  
  // Sorting state
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('none');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter state
  const [filterInterfaceType, setFilterInterfaceType] = useState<string>('');
  const [filterChangeCategory, setFilterChangeCategory] = useState<string>('');
  const [filterUser, setFilterUser] = useState<string>('');
  const [filterDateFrom, setFilterDateFrom] = useState<string>('');
  const [filterDateTo, setFilterDateTo] = useState<string>('');

  // Request Report modal state
  const [showRequestReportModal, setShowRequestReportModal] = useState(false);
  const [requestReportType, setRequestReportType] = useState('History Log');
  const [requestLogType, setRequestLogType] = useState('Campaign History');
  const [requestCampaignId, setRequestCampaignId] = useState('');
  const [requestPeriodStart, setRequestPeriodStart] = useState<Date | null>(new Date(2026, 2, 19));
  const [requestPeriodEnd, setRequestPeriodEnd] = useState<Date | null>(new Date(2026, 2, 26));
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  function formatRequestPeriod(): string {
    if (!requestPeriodStart && !requestPeriodEnd) return 'Select a date range';
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (requestPeriodStart && requestPeriodEnd) return `${fmt(requestPeriodStart)} - ${fmt(requestPeriodEnd)}`;
    if (requestPeriodStart) return fmt(requestPeriodStart);
    return '';
  }

  // Dropdown open state for compact inline dropdowns
  const [showInterfaceDropdown, setShowInterfaceDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Handle column sorting
  const handleSort = (column: keyof LaHistoriaEntry) => {
    if (sortColumn === column) {
      // Toggle direction: none -> ascending -> descending -> none
      if (sortDirection === 'none') {
        setSortDirection('ascending');
      } else if (sortDirection === 'ascending') {
        setSortDirection('descending');
      } else {
        setSortDirection('none');
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('ascending');
    }
  };

  // Get sort state for a column
  const getSortState = (column: keyof LaHistoriaEntry): SortDirection => {
    return sortColumn === column ? sortDirection : 'none';
  };

  // Get unique values for filters
  const uniqueInterfaceTypes = useMemo(() => {
    const types = new Set(historyData.map(entry => entry.interfaceType));
    return Array.from(types).sort();
  }, []);

  const uniqueChangeCategories = useMemo(() => {
    const categories = new Set(historyData.map(entry => entry.changeCategory));
    return Array.from(categories).sort();
  }, []);

  const uniqueUsers = useMemo(() => {
    const users = new Set(historyData.map(entry => entry.user));
    return Array.from(users).sort();
  }, []);

  // Sort and paginate data
  const sortedAndPaginatedData = useMemo(() => {
    let filtered = [...historyData];

    // Filter by campaign if campaignId param exists — fall back to all data if no match
    if (campaignId) {
      const byId = filtered.filter(entry => entry.campaignId === campaignId);
      if (byId.length > 0) filtered = byId;
    }

    if (filterInterfaceType) {
      filtered = filtered.filter(entry => entry.interfaceType === filterInterfaceType);
    }

    if (filterChangeCategory) {
      filtered = filtered.filter(entry => entry.changeCategory === filterChangeCategory);
    }

    if (filterUser) {
      filtered = filtered.filter(entry => entry.user === filterUser);
    }

    // Apply sorting
    if (sortColumn && sortDirection !== 'none') {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        // Handle string comparison
        const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true, sensitivity: 'base' });

        return sortDirection === 'ascending' ? comparison : -comparison;
      });
    }

    // Paginate
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filtered.slice(startIndex, endIndex);
  }, [campaignId, filterInterfaceType, filterChangeCategory, filterUser, sortColumn, sortDirection, currentPage]);

  // Get filtered data count for pagination
  const filteredDataCount = useMemo(() => {
    let filtered = [...historyData];

    if (campaignId) {
      const byId = filtered.filter(entry => entry.campaignId === campaignId);
      if (byId.length > 0) filtered = byId;
    }

    if (filterInterfaceType) {
      filtered = filtered.filter(entry => entry.interfaceType === filterInterfaceType);
    }

    if (filterChangeCategory) {
      filtered = filtered.filter(entry => entry.changeCategory === filterChangeCategory);
    }

    if (filterUser) {
      filtered = filtered.filter(entry => entry.user === filterUser);
    }

    return filtered.length;
  }, [campaignId, filterInterfaceType, filterChangeCategory, filterUser]);

  // Calculate pagination info
  const totalPages = Math.ceil(filteredDataCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredDataCount);

  // Get campaign name for page title when in campaign view
  const campaignName = useMemo(() => {
    if (campaignId) {
      // First try navigation state (passed from AllCampaigns or Campaign page)
      if (location.state?.campaignName) return location.state.campaignName;
      // Fall back to searching history data
      const campaign = historyData.find(e => e.campaignId === campaignId);
      return campaign?.campaignName;
    }
    return null;
  }, [campaignId, location.state?.campaignName]);

  // Reset pagination when campaign or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [campaignId, filterInterfaceType, filterChangeCategory, filterUser, filterDateFrom, filterDateTo]);

  return (
    <div className="min-h-screen bg-background">
      <MastHead
        userName="Lisa Kellman"
        mediaSolution={selectedMediaSolution as MediaSolution}
        onMediaSolutionChange={(solution) => setSelectedMediaSolution(solution)}
        mediaSolutionsOpen={mediaSolutionsOpen}
        onMediaSolutionsOpenChange={setMediaSolutionsOpen}
      />

      <div className="flex h-[calc(100vh-54px)]">
        <SponsoredSearchSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          {/* Campaign-specific header with tabs */}
          {isCampaignView && (
            <div className="bg-background border-b border-[var(--ld-semantic-color-separator)] px-6 pt-6">
              <div className="flex items-center gap-3 flex-wrap pb-2">
                <h1 className="text-2xl font-bold text-[var(--ld-semantic-color-text)]">
                  {campaignName}
                </h1>
                <span className="inline-flex items-center h-5 px-2 text-xs font-semibold border border-[#1D5F02] text-[#1D5F02] rounded">
                  Live
                </span>
              </div>
              <div className="flex items-center gap-2 py-2 text-sm text-[var(--ld-semantic-color-text)] border-t border-[var(--ld-semantic-color-separator)]">
                <span className="font-semibold text-[var(--ld-semantic-color-text-subtle)] text-xs uppercase tracking-wide mr-1">Campaign information:</span>
                <span>Start date: <strong>{location.state?.campaignData?.startDate || '-'}</strong></span>
                <span className="text-[var(--ld-semantic-color-separator)]">|</span>
                <span>End date: <strong>{location.state?.campaignData?.endDate || '-'}</strong></span>
                <span className="text-[var(--ld-semantic-color-separator)]">|</span>
                <span>Total budget: <strong>{location.state?.campaignData?.totalBudget || '-'}</strong></span>
                <span className="text-[var(--ld-semantic-color-separator)]">|</span>
                <span>Available budget: <strong>{location.state?.campaignData?.dailyBudget || '-'}</strong></span>
              </div>
              <Tabs defaultValue="history-log">
                <TabList>
                  <Tab value="reports" onClick={() => navigate('/campaign', { state: { campaignName, campaignId } })}>
                    Reports
                  </Tab>
                  <Tab value="edit" onClick={() => navigate('/campaign', { state: { campaignName, campaignId } })}>
                    Settings
                  </Tab>
                  <Tab value="history-log">
                    History log
                  </Tab>
                </TabList>
              </Tabs>
            </div>
          )}

          <div className="p-6">
            {/* Page Header - only show full header for non-campaign views */}
            {!isCampaignView && (
              <div className="mb-6">
                <h1 className="text-[32px] font-bold text-foreground leading-10 mb-2">
                  History log
                </h1>
                <p className="text-sm text-muted-foreground">
                  View all changes made to campaigns, keywords, and settings. Track who made changes and when.
                </p>
              </div>
            )}

            {/* PX-style Table with embedded filters */}
            <div className="bg-background rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">

              {/* Compact filter controls bar — inside the card */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border flex-wrap">

                {/* Date from */}
                <div className="flex items-center gap-1.5 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground">
                  <Calendar className="w-4 h-4 text-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Date from</span>
                  <input
                    type="date"
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                    className="text-[13px] border-none outline-none bg-transparent text-foreground w-[110px]"
                  />
                </div>

                {/* Date to */}
                <div className="flex items-center gap-1.5 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground">
                  <Calendar className="w-4 h-4 text-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Date to</span>
                  <input
                    type="date"
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                    className="text-[13px] border-none outline-none bg-transparent text-foreground w-[110px]"
                  />
                </div>

                {/* Interface type dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setShowInterfaceDropdown(v => !v); setShowCategoryDropdown(false); setShowUserDropdown(false); }}
                    className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    <span>Interface type: <span className="font-medium">{filterInterfaceType || 'All'}</span></span>
                  </button>
                  {showInterfaceDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowInterfaceDropdown(false)} />
                      <div className="absolute top-full mt-1 left-0 min-w-[180px] bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                        <button onClick={() => { setFilterInterfaceType(''); setShowInterfaceDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${!filterInterfaceType ? 'font-medium' : ''}`}>All</button>
                        {uniqueInterfaceTypes.map(val => (
                          <button key={val} onClick={() => { setFilterInterfaceType(val); setShowInterfaceDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${filterInterfaceType === val ? 'font-medium' : ''}`}>{val}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Change category dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setShowCategoryDropdown(v => !v); setShowInterfaceDropdown(false); setShowUserDropdown(false); }}
                    className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                  >
                    <span>Change category: <span className="font-medium">{filterChangeCategory || 'All'}</span></span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  </button>
                  {showCategoryDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowCategoryDropdown(false)} />
                      <div className="absolute top-full mt-1 left-0 min-w-[220px] max-h-[280px] overflow-y-auto bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                        <button onClick={() => { setFilterChangeCategory(''); setShowCategoryDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${!filterChangeCategory ? 'font-medium' : ''}`}>All</button>
                        {uniqueChangeCategories.map(val => (
                          <button key={val} onClick={() => { setFilterChangeCategory(val); setShowCategoryDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${filterChangeCategory === val ? 'font-medium' : ''}`}>{val}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setShowUserDropdown(v => !v); setShowInterfaceDropdown(false); setShowCategoryDropdown(false); }}
                    className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                  >
                    <span>User: <span className="font-medium">{filterUser || 'All'}</span></span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  </button>
                  {showUserDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserDropdown(false)} />
                      <div className="absolute top-full mt-1 left-0 min-w-[160px] max-h-[280px] overflow-y-auto bg-background border border-[var(--ld-semantic-color-separator)] rounded shadow-md z-50 py-1">
                        <button onClick={() => { setFilterUser(''); setShowUserDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${!filterUser ? 'font-medium' : ''}`}>All</button>
                        {uniqueUsers.map(val => (
                          <button key={val} onClick={() => { setFilterUser(val); setShowUserDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-muted ${filterUser === val ? 'font-medium' : ''}`}>{val}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Clear filters */}
                {(filterInterfaceType || filterChangeCategory || filterUser || filterDateFrom || filterDateTo) && (
                  <button
                    onClick={() => { setFilterInterfaceType(''); setFilterChangeCategory(''); setFilterUser(''); setFilterDateFrom(''); setFilterDateTo(''); }}
                    className="flex items-center gap-1 h-8 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-[13px] text-foreground hover:bg-muted transition-colors"
                  >
                    Clear filters
                  </button>
                )}

                {/* Download icon — pushed to the right */}
                <button
                  aria-label="Download"
                  className="ml-auto flex items-center justify-center w-8 h-8 border border-[rgba(46,47,50,1)] rounded-full bg-background hover:bg-muted transition-colors flex-shrink-0"
                  onClick={() => setShowRequestReportModal(true)}
                >
                  <Download width={16} height={16} className="text-foreground" />
                </button>
              </div>

              {/* Scrollable table area */}
              <div className="overflow-x-auto">
              <div className="flex w-full">
                {/* Campaign name — sticky */}
                {!isCampaignView && (
                <div className="flex flex-col flex-[2] sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.05)]" style={{ minWidth: '220px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">Campaign name</span>
                    <button
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      onClick={() => handleSort('campaignName')}
                      aria-label="Sort by campaign name"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <Link href={`/reports/la-historia/${entry.campaignId}`} className="text-sm truncate">
                        {entry.campaignName}
                      </Link>
                    </div>
                  ))}
                </div>
                )}

                {/* Campaign ID */}
                {!isCampaignView && (
                <div className="flex flex-col flex-1" style={{ minWidth: '120px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">Campaign ID</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('campaignId')} aria-label="Sort by campaign ID">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <span className="text-sm text-foreground">{entry.campaignId}</span>
                    </div>
                  ))}
                </div>
                )}

                {/* Date */}
                <div className="flex flex-col flex-1" style={{ minWidth: '140px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">Date</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('date')} aria-label="Sort by date">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <span className="text-sm text-foreground whitespace-nowrap">{entry.date}</span>
                    </div>
                  ))}
                </div>

                {/* Time */}
                <div className="flex flex-col flex-1" style={{ minWidth: '110px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">Time</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('time')} aria-label="Sort by time">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <span className="text-sm text-foreground whitespace-nowrap">{entry.time}</span>
                    </div>
                  ))}
                </div>

                {/* User */}
                <div className="flex flex-col flex-1" style={{ minWidth: '120px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">User</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('user')} aria-label="Sort by user">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <span className="text-sm text-foreground whitespace-nowrap">{entry.user}</span>
                    </div>
                  ))}
                </div>

                {/* Interface type */}
                <div className="flex flex-col flex-1" style={{ minWidth: '180px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">Interface type</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('interfaceType')} aria-label="Sort by interface type">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background gap-1.5">
                      {entry.interfaceType === 'Marty' && (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0 text-[var(--ld-semantic-color-action-fill-primary)]">
                          <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="currentColor"/>
                        </svg>
                      )}
                      <span className="text-sm text-foreground whitespace-nowrap">{entry.interfaceType}</span>
                    </div>
                  ))}
                </div>

                {/* Change category */}
                <div className="flex flex-col flex-[2]" style={{ minWidth: '220px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">Change category</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('changeCategory')} aria-label="Sort by change category">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <span className="text-sm text-foreground whitespace-nowrap">{entry.changeCategory}</span>
                    </div>
                  ))}
                </div>

                {/* From */}
                <div className="flex flex-col flex-1" style={{ minWidth: '180px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">From</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('from')} aria-label="Sort by from">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <span className="text-sm text-foreground whitespace-nowrap">{entry.from}</span>
                    </div>
                  ))}
                </div>

                {/* To */}
                <div className="flex flex-col flex-1" style={{ minWidth: '180px' }}>
                  <div className="flex items-center h-[52px] px-4 gap-1 border-t border-b border-border bg-muted">
                    <span className="text-sm font-bold text-foreground leading-5">To</span>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={() => handleSort('to')} aria-label="Sort by to">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L8 13" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 10L8 13L11 10" stroke="#2E2F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                  {sortedAndPaginatedData.map((entry) => (
                    <div key={entry.id} className="flex items-center h-[52px] px-4 border-b border-border bg-background">
                      <span className="text-sm text-foreground whitespace-nowrap">{entry.to}</span>
                    </div>
                  ))}
                </div>
              </div>

              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--ld-semantic-color-separator)]">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex}-{endIndex} of {filteredDataCount} entries
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? 'primary' : 'secondary'}
                        size="small"
                        onClick={() => setCurrentPage(pageNumber)}
                        UNSAFE_className="min-w-[32px]"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}

                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showMartyPanel && (
        <MartyFloatingPanel
          isMinimized={isMartyMinimized}
          onMinimize={() => setIsMartyMinimized(true)}
          onExpand={() => setIsMartyMinimized(false)}
        />
      )}

      {/* Request Report Modal */}
      {showRequestReportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowRequestReportModal(false); }}
        >
          <div className="bg-background rounded-xl shadow-xl w-[540px] max-w-[95vw] p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-bold text-[var(--ld-semantic-color-text)]">Request Report</h2>
              <button
                onClick={() => setShowRequestReportModal(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>

            {/* Report Type */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-[var(--ld-semantic-color-text)] mb-1.5">Report Type</label>
              <div className="relative">
                <select
                  value={requestReportType}
                  onChange={(e) => setRequestReportType(e.target.value)}
                  className="w-full h-11 px-3 pr-10 border border-[var(--ld-semantic-color-separator)] rounded bg-background text-sm text-[var(--ld-semantic-color-text)] appearance-none focus:outline-none focus:border-[var(--ld-semantic-color-action-fill-primary)]"
                >
                  <option>History Log</option>
                  <option>Keyword Performance</option>
                  <option>Placement Performance</option>
                  <option>Item Keyword Performance</option>
                  <option>Item Performance</option>
                  <option>Campaign Snapshot</option>
                  <option>Item Recommendations</option>
                  <option>Keyword Recommendations</option>
                  <option>Sponsored Videos Campaigns performance</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-[var(--ld-semantic-color-text)]" viewBox="0 0 20 20" fill="none">
                  <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </div>
            </div>

            {/* Request Period */}
            <div className="mb-6" style={{ position: 'relative' }}>
              <div className="flex items-center gap-1 mb-1.5">
                <label className="text-sm font-bold text-[var(--ld-semantic-color-text)]">Request Period</label>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--ld-semantic-color-text-subtle)]">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setShowDateRangePicker(!showDateRangePicker)}
                className="flex items-center gap-2 w-full h-11 px-3 border border-[var(--ld-semantic-color-separator)] rounded bg-background cursor-pointer hover:border-[var(--ld-semantic-color-action-fill-primary)] transition-colors"
                style={{ textAlign: 'left' }}
              >
                <Calendar className="w-4 h-4 text-[var(--ld-semantic-color-text-subtle)] flex-shrink-0" />
                <span className="text-sm text-[var(--ld-semantic-color-text)]">{formatRequestPeriod()}</span>
              </button>
              {showDateRangePicker && (
                <div
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -20%)',
                    zIndex: 100,
                  }}
                >
                  <DateRangePicker
                    value={{ startDate: requestPeriodStart, endDate: requestPeriodEnd }}
                    onChange={(range) => {
                      setRequestPeriodStart(range.startDate);
                      setRequestPeriodEnd(range.endDate);
                      setShowDateRangePicker(false);
                    }}
                    onCancel={() => setShowDateRangePicker(false)}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="medium"
                onClick={() => setShowRequestReportModal(false)}
              >
                Request Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
