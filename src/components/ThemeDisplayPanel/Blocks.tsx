import ComponentsJson from "../../data/mantineProps.json";
import weatherWidget from './Blocks/WeatherWidget';
import socialPost from './Blocks/SocialPost';
import taskCard from './Blocks/TaskCard';
import settingsCard from './Blocks/SettingsCard';
import activityFeed from './Blocks/ActivityFeed';
import statusAlerts from './Blocks/StatusAlerts';
import packageManager from './Blocks/PackageManager';
import codeEditor from './Blocks/CodeEditor';
import dataTable from './Blocks/DataTable';
import userProfileCard from './Blocks/UserProfileCard';
import pricingCard from './Blocks/PricingCard';
import onboardingStepper from './Blocks/OnboardingStepper';
import notificationPanel from './Blocks/NotificationPanel';
import signupForm from './Blocks/SignupForm';
import faqAccordion from './Blocks/FaqAccordion';
import productReviews from './Blocks/ProductReviews';
import loadingCard from './Blocks/LoadingCard';
import appNavigation from './Blocks/AppNavigation';
import segmentedStats from './Blocks/SegmentedStats';
import supportForm from './Blocks/SupportForm';
import shortcutsGuide from './Blocks/ShortcutsGuide';
import mediaGrid from './Blocks/MediaGrid';
import otpVerification from './Blocks/OTPVerification';
import tagManager from './Blocks/TagManager';

type Components = typeof ComponentsJson;

type Component = keyof Components;

export interface ThemeBlock {
  id: string;
  title: string;
  tags?: string[];
  category?: string;
  colSpan?: 1 | 2;
  components?: Component[];
  render: () => React.ReactNode;
}

export const themeBlocks: ThemeBlock[] = [
    weatherWidget,
    socialPost,
    taskCard,
    settingsCard,
    activityFeed,
    statusAlerts,
    packageManager,
    codeEditor,
    dataTable,
    userProfileCard,
    pricingCard,
    onboardingStepper,
    notificationPanel,
    signupForm,
    faqAccordion,
    productReviews,
    loadingCard,
    appNavigation,
    segmentedStats,
    supportForm,
    shortcutsGuide,
    mediaGrid,
    otpVerification,
    tagManager,
];
