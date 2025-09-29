import ComponentsJson from "../../data/mantineProps.json";
import weatherWidget from './Blocks/WeatherWidget';
import liveStream from './Blocks/LiveStream';
import fileUpload from './Blocks/FileUpload';
import notificationCenter from './Blocks/NotificationCenter';
import cryptoCard from './Blocks/CryptoExchange';
import musicPlayer from './Blocks/musicPlayer';
import socialPost from './Blocks/SocialPost';
import taskCard from './Blocks/TaskCard';
import analyticsDashboard from './Blocks/AnalyticsDash';
import productCard from './Blocks/ProductCard';
import codeEditor from './Blocks/CodeEditor';
import calendarEvent from './Blocks/CalendarEvent';
import paymentMethod from './Blocks/PaymentMethod';
import fitnessTracker from './Blocks/FitnessTracker';
import subscriptionPlan from './Blocks/SubscriptionPlan';

type Components = typeof ComponentsJson;

type Component = keyof Components;

export interface ThemeBlock {
  id: string;
  title: string;
  tags?: string[];
  components?: Component[];
  render: () => React.ReactNode;
}

export const themeBlocks: ThemeBlock[] = [
    musicPlayer,
    socialPost,
    weatherWidget,
    notificationCenter,
    taskCard,
    subscriptionPlan,
    analyticsDashboard,
    productCard,
    codeEditor,
    calendarEvent,
    paymentMethod,
    fitnessTracker,
    fileUpload, 
    liveStream,
    cryptoCard,
];
