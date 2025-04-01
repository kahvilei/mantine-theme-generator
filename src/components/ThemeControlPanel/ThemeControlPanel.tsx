import React, { useState } from 'react';
import {
  IconCube,
  IconPalette,
  IconResize,
  IconSettings,
  IconTrash,
  IconTypeface,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Center,
  Group,
  Popover,
  ScrollArea,
  SegmentedControl,
  Text,
  Tooltip,
} from '@mantine/core';
import QuickSetUp from '@/components/ThemeControlPanel/QuickSetUp/QuickSetUp';
import { theme } from '@/data/Store';
import ColorControl from './ColorControls/ColorControl';
import ComponentControls from './ComponentControls/ComponentControls';
import { DownloadThemeButton, UploadThemeButton } from './Shared/Themes/themeDownloadUpload';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';
import TypographyControl from './TypographyControls/TypographyControls';
import classes from './ThemeControlPanel.module.css';

const ThemeControlPanel = () => {
  const [activeTab, setActiveTab] = useState('quick-set-up');
  const [opened, setOpened] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'quick-set-up':
        return <QuickSetUp />;
      case 'color':
        return <ColorControl />;
      case 'typography':
        return <TypographyControl />;
      case 'size-and-layout':
        return <SizeAndLayoutControls />;
      case 'components':
        return <ComponentControls />;
      default:
        return <ColorControl />;
    }
  };

  return (
    <Box id="control-panel">
      <Group className={classes.header} wrap='nowrap'>
        <SegmentedControl
          value={activeTab}
          onChange={setActiveTab}
          data={[
            {
              value: 'quick-set-up',
              label: (
                <Tooltip label="Quick Setup">
                  <Center>
                    <IconSettings size="1.2rem" />
                  </Center>
                </Tooltip>
              ),
            },
            {
              value: 'color',
              label: (
                <Tooltip label="Color">
                  <Center>
                    <IconPalette size="1.2rem" />
                  </Center>
                </Tooltip>
              ),
            },
            {
              value: 'typography',
              label: (
                <Tooltip label="Typography">
                  <Center>
                    <IconTypeface size="1.2rem" />
                  </Center>
                </Tooltip>
              ),
            },
            {
              value: 'size-and-layout',
              label: (
                <Tooltip label="Size and Layout">
                  <Center>
                    <IconResize size="1.2rem" />
                  </Center>
                </Tooltip>
              ),
            },
            {
              value: 'components',
              label: (
                <Tooltip label="Components">
                  <Center>
                    <IconCube size="1.2rem" />
                  </Center>
                </Tooltip>
              ),
            },
          ]}
        />
        <Group gap="xs" wrap='nowrap'>
          <DownloadThemeButton />
          <UploadThemeButton />
          <Popover opened={opened} onClose={() => setOpened(false)} position="bottom" withArrow>
            <Popover.Target>
              <Tooltip label="Reset Theme">
                <ActionIcon variant="light" color="red" onClick={() => setOpened(true)}>
                  <IconTrash size="1.25rem" />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm">
                Are you sure you want to reset the theme? This will delete all current changes.
              </Text>
              <Group mt="md">
                <ActionIcon
                  variant="filled"
                  color="red"
                  onClick={() => {
                    theme.reset();
                    setOpened(false);
                  }}
                >
                  <IconTrash size="1.25rem" />
                </ActionIcon>
              </Group>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Group>
      <ScrollArea scrollbars="y" type="hover" className={classes.contentArea}>
        <Box>{renderContent()}</Box>
      </ScrollArea>
    </Box>
  );
};

export default ThemeControlPanel;
