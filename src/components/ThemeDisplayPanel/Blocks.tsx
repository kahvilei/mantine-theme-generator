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
];
