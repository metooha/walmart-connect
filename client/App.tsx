import "./global.css";
import "./i18n";

import { createRoot } from "react-dom/client";
import { SnackbarContainer } from "@/components/ui/SnackbarContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MartyProvider } from "@/contexts/MartyContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import SponsoredSearch from "./pages/SponsoredSearch";
import Campaign from "./pages/Campaign";
import AllCampaigns from "./pages/AllCampaigns";
import AllKeywords from "./pages/AllKeywords";
import KeywordsPlanner from "./pages/KeywordsPlanner";
import HistoryLog from "./pages/HistoryLog";
import LaHistoria from "./pages/LaHistoria";
import ItemHealth from "./pages/ItemHealth";
import OmniROAS from "./pages/OmniROAS";
import DisplayAdvertisingCampaigns from "./pages/DisplayAdvertisingCampaigns";
import AdvertiserReport from "./pages/AdvertiserReport";
import SellerCenter from "./pages/SellerCenter";
import StoreAds from "./pages/StoreAds";
import Settings from "./pages/Settings";
import AllRecommendations from "./pages/AllRecommendations";
import Portfolio from "./pages/Portfolio";
import CampaignReports from "./pages/CampaignReports";
import OnDemandReports from "./pages/OnDemandReports";
import NotFound from "./pages/NotFound";
import { ComponentLibraryLayout } from "./components/ComponentLibraryLayout";

// Component library pages
import React from 'react';
import ComponentLibraryOverview from "./pages/component-library/Overview";
import ComponentTester from "./pages/component-library/ComponentTester";
import IconsPage from "./pages/component-library/Icons";
import ButtonsPage from "./pages/component-library/Buttons";
import BadgesPage from "./pages/component-library/Badges";
import BreadcrumbsPage from "./pages/component-library/Breadcrumbs";
import LinksPage from "./pages/component-library/Links";
import LinkButtonsPage from "./pages/component-library/LinkButtons";
import IconButtonsPage from "./pages/component-library/IconButtons";
import CheckboxesPage from "./pages/component-library/Checkboxes";
import RadioButtonsPage from "./pages/component-library/RadioButtons";
import SelectPage from "./pages/component-library/Select";
import FormGroupsPage from "./pages/component-library/FormGroups";
import ChipsPage from "./pages/component-library/Chips";
import FilterChipsPage from "./pages/component-library/FilterChips";
import CalloutsPage from "./pages/component-library/Callouts";
import CardsPage from "./pages/component-library/Cards";
import AlertsPage from "./pages/component-library/Alerts";
import ContentMessagesPage from "./pages/component-library/ContentMessages";
import DateFieldsPage from "./pages/component-library/DateFields";
import DatePickersPage from "./pages/component-library/DatePickers";
import DividersPage from "./pages/component-library/Dividers";
import ListsPage from "./pages/component-library/Lists";
import MagicBoxPage from "./pages/component-library/MagicBox";
import MenuPage from "./pages/component-library/Menu";
import MetricsPage from "./pages/component-library/Metrics";
import ModalsPage from "./pages/component-library/Modals";
import NudgesPage from "./pages/component-library/Nudges";
import PanelsPage from "./pages/component-library/Panels";
import GuidelinesPage from "./pages/component-library/Guidelines";

// Shadcn/Radix component pages (lazy loaded to avoid blocking initial render)
const AccordionPage = React.lazy(() => import("./pages/component-library/Accordion"));
const AlertDialogPage = React.lazy(() => import("./pages/component-library/AlertDialog"));
const AvatarPage = React.lazy(() => import("./pages/component-library/Avatar"));
const BottomSheetPage = React.lazy(() => import("./pages/component-library/BottomSheet"));
const CalendarPage = React.lazy(() => import("./pages/component-library/Calendar"));
const DateRangePickerPage = React.lazy(() => import("./pages/component-library/DateRangePicker"));
const CarouselPage = React.lazy(() => import("./pages/component-library/Carousel"));
const ChartPage = React.lazy(() => import("./pages/component-library/Chart"));
const CollapsiblePage = React.lazy(() => import("./pages/component-library/Collapsible"));
const CommandPage = React.lazy(() => import("./pages/component-library/Command"));
const ContextMenuPage = React.lazy(() => import("./pages/component-library/ContextMenu"));
const DialogPage = React.lazy(() => import("./pages/component-library/Dialog"));
const DrawerPage = React.lazy(() => import("./pages/component-library/Drawer"));
const DropdownMenuPage = React.lazy(() => import("./pages/component-library/DropdownMenu"));
const FormPage = React.lazy(() => import("./pages/component-library/Form"));
const MenubarPage = React.lazy(() => import("./pages/component-library/Menubar"));
const NavigationMenuPage = React.lazy(() => import("./pages/component-library/NavigationMenu"));
const PaginationPage = React.lazy(() => import("./pages/component-library/Pagination"));
const PopoverPage = React.lazy(() => import("./pages/component-library/Popover"));
const ProgressIndicatorPage = React.lazy(() => import("./pages/component-library/ProgressIndicator"));
const ProgressTrackerPage = React.lazy(() => import("./pages/component-library/ProgressTracker"));
const ScrollAreaPage = React.lazy(() => import("./pages/component-library/ScrollArea"));
const SkeletonPage = React.lazy(() => import("./pages/component-library/Skeleton"));
const SliderPage = React.lazy(() => import("./pages/component-library/Slider"));
const SnackbarsPage = React.lazy(() => import("./pages/component-library/Snackbars"));
const SpinnersPage = React.lazy(() => import("./pages/component-library/Spinners"));
const SpotIconsPage = React.lazy(() => import("./pages/component-library/SpotIcons"));
const SwitchesPage = React.lazy(() => import("./pages/component-library/Switches"));
const TablePage = React.lazy(() => import("./pages/component-library/Table"));
const TabsPage = React.lazy(() => import("./pages/component-library/Tabs"));
const TagsPage = React.lazy(() => import("./pages/component-library/Tags"));
import TextAreaPage from "./pages/component-library/TextArea";
import TextFieldsPage from "./pages/component-library/TextFields";
const ThemesPage = React.lazy(() => import("./pages/component-library/Themes"));
const TogglePage = React.lazy(() => import("./pages/component-library/Toggle"));

const LazyFallback = <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>Loading...</div>;

const queryClient = new QueryClient();

// Main App component with routing
const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <SnackbarContainer />
      <MartyProvider>
          <BrowserRouter
            basename={
              import.meta.env.BASE_URL === "/"
                ? undefined
                : import.meta.env.BASE_URL.replace(/\/$/, "")
            }
          >
            <Routes>
              {/* Component Library with nested routes */}
              <Route path="/component-library" element={<ComponentLibraryLayout />}>
                <Route index element={<ComponentLibraryOverview />} />
                <Route path="themes" element={
                  <React.Suspense fallback={<div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>}>
                    <ThemesPage />
                  </React.Suspense>
                } />
                <Route path="component-tester" element={
                  <React.Suspense fallback={<div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>}>
                    <ComponentTester />
                  </React.Suspense>
                } />
                <Route path="icons" element={<IconsPage />} />
                <Route path="buttons" element={<ButtonsPage />} />
                <Route path="badges" element={<BadgesPage />} />
                <Route path="breadcrumbs" element={<BreadcrumbsPage />} />
                <Route path="links" element={<LinksPage />} />
                <Route path="link-buttons" element={<LinkButtonsPage />} />
                <Route path="icon-buttons" element={<IconButtonsPage />} />
                <Route path="checkboxes" element={<CheckboxesPage />} />
                <Route path="radio-buttons" element={<RadioButtonsPage />} />
                <Route path="select" element={<SelectPage />} />
                <Route path="form-groups" element={<FormGroupsPage />} />
                <Route path="chips" element={<ChipsPage />} />
                <Route path="filter-chips" element={<FilterChipsPage />} />
                <Route path="callouts" element={<CalloutsPage />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="content-messages" element={<ContentMessagesPage />} />
                <Route path="date-fields" element={<DateFieldsPage />} />
                <Route path="date-pickers" element={<DatePickersPage />} />
                <Route path="date-range-picker" element={<React.Suspense fallback={LazyFallback}><DateRangePickerPage /></React.Suspense>} />
                <Route path="dividers" element={<DividersPage />} />
                <Route path="lists" element={<ListsPage />} />
                <Route path="magic-box" element={<MagicBoxPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="metrics" element={<MetricsPage />} />
                <Route path="modals" element={<ModalsPage />} />
                <Route path="nudges" element={<NudgesPage />} />
                <Route path="panels" element={<PanelsPage />} />
                <Route path="text-fields" element={<TextFieldsPage />} />
                <Route path="textarea" element={<TextAreaPage />} />
                <Route path="guidelines" element={<GuidelinesPage />} />
                {/* Shadcn/Radix Components (lazy loaded) */}
                <Route path="accordion" element={<React.Suspense fallback={LazyFallback}><AccordionPage /></React.Suspense>} />
                <Route path="alert-dialog" element={<React.Suspense fallback={LazyFallback}><AlertDialogPage /></React.Suspense>} />
                <Route path="avatar" element={<React.Suspense fallback={LazyFallback}><AvatarPage /></React.Suspense>} />
                <Route path="bottom-sheet" element={<React.Suspense fallback={LazyFallback}><BottomSheetPage /></React.Suspense>} />
                <Route path="calendar" element={<React.Suspense fallback={LazyFallback}><CalendarPage /></React.Suspense>} />
                <Route path="carousel" element={<React.Suspense fallback={LazyFallback}><CarouselPage /></React.Suspense>} />
                <Route path="chart" element={<React.Suspense fallback={LazyFallback}><ChartPage /></React.Suspense>} />
                <Route path="collapsible" element={<React.Suspense fallback={LazyFallback}><CollapsiblePage /></React.Suspense>} />
                <Route path="command" element={<React.Suspense fallback={LazyFallback}><CommandPage /></React.Suspense>} />
                <Route path="context-menu" element={<React.Suspense fallback={LazyFallback}><ContextMenuPage /></React.Suspense>} />
                <Route path="dialog" element={<React.Suspense fallback={LazyFallback}><DialogPage /></React.Suspense>} />
                <Route path="drawer" element={<React.Suspense fallback={LazyFallback}><DrawerPage /></React.Suspense>} />
                <Route path="dropdown-menu" element={<React.Suspense fallback={LazyFallback}><DropdownMenuPage /></React.Suspense>} />
                <Route path="form" element={<React.Suspense fallback={LazyFallback}><FormPage /></React.Suspense>} />
                <Route path="menubar" element={<React.Suspense fallback={LazyFallback}><MenubarPage /></React.Suspense>} />
                <Route path="navigation-menu" element={<React.Suspense fallback={LazyFallback}><NavigationMenuPage /></React.Suspense>} />
                <Route path="pagination" element={<React.Suspense fallback={LazyFallback}><PaginationPage /></React.Suspense>} />
                <Route path="popover" element={<React.Suspense fallback={LazyFallback}><PopoverPage /></React.Suspense>} />
                <Route path="progress-indicator" element={<React.Suspense fallback={LazyFallback}><ProgressIndicatorPage /></React.Suspense>} />
                <Route path="progress-tracker" element={<React.Suspense fallback={LazyFallback}><ProgressTrackerPage /></React.Suspense>} />
                <Route path="scroll-area" element={<React.Suspense fallback={LazyFallback}><ScrollAreaPage /></React.Suspense>} />
                <Route path="skeleton" element={<React.Suspense fallback={LazyFallback}><SkeletonPage /></React.Suspense>} />
                <Route path="slider" element={<React.Suspense fallback={LazyFallback}><SliderPage /></React.Suspense>} />
                <Route path="snackbars" element={<React.Suspense fallback={LazyFallback}><SnackbarsPage /></React.Suspense>} />
                <Route path="spinners" element={<React.Suspense fallback={LazyFallback}><SpinnersPage /></React.Suspense>} />
                <Route path="spot-icons" element={<React.Suspense fallback={LazyFallback}><SpotIconsPage /></React.Suspense>} />
                <Route path="switches" element={<React.Suspense fallback={LazyFallback}><SwitchesPage /></React.Suspense>} />
                <Route path="table" element={<React.Suspense fallback={LazyFallback}><TablePage /></React.Suspense>} />
                <Route path="tabs" element={<React.Suspense fallback={LazyFallback}><TabsPage /></React.Suspense>} />
                <Route path="tags" element={<React.Suspense fallback={LazyFallback}><TagsPage /></React.Suspense>} />
                <Route path="toggle" element={<React.Suspense fallback={LazyFallback}><TogglePage /></React.Suspense>} />
              </Route>

              <Route path="/" element={<Index />} />
              <Route path="/sponsored-search" element={<SponsoredSearch />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/campaign-reports" element={<CampaignReports />} />
              <Route path="/all-campaigns" element={<AllCampaigns />} />
              <Route path="/all-keywords" element={<AllKeywords />} />
              <Route path="/keywords-planner" element={<KeywordsPlanner />} />
              <Route path="/history-log" element={<HistoryLog />} />
              <Route path="/reports/item-health" element={<ItemHealth />} />
              <Route path="/reports/omni-roas" element={<OmniROAS />} />
              <Route path="/reports/advertiser" element={<AdvertiserReport />} />
              <Route path="/reports/la-historia/:campaignId" element={<LaHistoria />} />
              <Route path="/reports/la-historia" element={<LaHistoria />} />
              <Route path="/reports/on-demand" element={<OnDemandReports />} />
              <Route path="/display-advertising/campaigns" element={<DisplayAdvertisingCampaigns />} />
              <Route path="/seller-center" element={<SellerCenter />} />
              <Route path="/store-ads" element={<StoreAds />} />
              <Route path="/store-ads/campaigns" element={<StoreAds />} />
              <Route path="/store-ads/performance" element={<StoreAds />} />
              <Route path="/store-ads/inventory" element={<StoreAds />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/recommendations" element={<AllRecommendations />} />
              <Route path="/portfolio" element={<Portfolio />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MartyProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

const rootElement = document.getElementById("root")!;

// Store the root on the DOM element to persist across HMR
if (!(rootElement as any)._reactRoot) {
  (rootElement as any)._reactRoot = createRoot(rootElement);
}

(rootElement as any)._reactRoot.render(<App />);
