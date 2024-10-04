import React, { useState } from 'react';
import {
  MantineProvider,
  MantineThemeOverride,
  Container,
  Stack,
  Card,
  Title,
  Text,
  Divider,
  Button,
  Group,
  ActionIcon,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Checkbox,
  Radio,
  Switch,
  Slider,
  ColorPicker,
  Badge,
  Alert,
  Progress,
  Tooltip,
  Chip,
  Tabs,
  Accordion,
  Menu,
  Loader,
  Paper,
  Notification,
  List,
  Avatar,
  Image,
  Timeline,
  Stepper,
  Breadcrumbs,
  Modal,
  Table,
  Anchor,
  Box,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {
  IconPhoto,
  IconSettings,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconMessageCircle,
  IconTrash,
  IconChevronDown,
  IconHome,
  IconCalendar,
  IconUser,
  IconBook,
  IconPackage,
  IconGitBranch,
  IconHammer,
} from '@tabler/icons-react';

export interface ThemeDisplayProps {
  number: number;
  mode: 'light' | 'dark';
  theme: Partial<MantineThemeOverride>;
}

import GitHubRepoDemo from './Demo Pages/GithubRepo';

const ThemeDisplay: React.FC<ThemeDisplayProps> = ({ number, mode, theme }) => {
  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider
      theme={{ ...theme}}
      forceColorScheme= {mode}
      getRootElement={() =>
        document.querySelector<HTMLElement>(`#display-panel-${mode}-${number}`) ?? undefined
      }
      cssVariablesSelector={`#display-panel-${mode}-${number}`}
    >
      <Box h={'100%'} p={'xl'} id={`display-panel-${mode}-${number}`} bg={'var(--mantine-color-body)'}>
        <GitHubRepoDemo />
      </Box>
    </MantineProvider>
  );
};

export default ThemeDisplay;