
import { ActionIcon, Box, Stack, Tabs, Tooltip } from '@mantine/core';
import ColorControl from './ColorControls/ColorControl';
import GeneralControls from './GeneralControls';
import TypographyControl from './TypographyControls/TypographyControls';
import { IconPalette, IconResize, IconSettings, IconTypeface } from '@tabler/icons-react';
import classes from './ThemeControlPanel.module.css';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';

const ThemeControlPanel = () => {

  return (
    <Box id="control-panel" p={'0'}>
        <Stack>
          <Tabs variant="pills" defaultValue="color" orientation="vertical" >
            <Tabs.List variant="filled" p="sm" className={classes.tabList}>
              <Stack pos={'fixed'}>
              <Tabs.Tab value="color">
                <Tooltip label="Color">
                <ActionIcon component='div' size="md" variant="transparent" radius="xl">
                  <IconPalette size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="typography">
                <Tooltip label="Typography">
                <ActionIcon component='div' size="md" variant="transparent" radius="xl">
                  <IconTypeface size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="size-and-layout">
                <Tooltip label="Size and Layout">
                <ActionIcon component='div' size="md" variant="transparent" radius="xl">
                  <IconResize size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="general">
                <Tooltip label="General">
                <ActionIcon component='div'size="md" variant="transparent" radius="xl">
                  <IconSettings size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab></Stack>
            </Tabs.List>
            <Tabs.Panel className={classes.tabPanel} value="color">
              <ColorControl/>
            </Tabs.Panel>
            <Tabs.Panel className={classes.tabPanel} value="typography">
              <TypographyControl/>
            </Tabs.Panel>
            <Tabs.Panel className={classes.tabPanel} value="size-and-layout">
               <SizeAndLayoutControls/>
            </Tabs.Panel>
            <Tabs.Panel className={classes.tabPanel} value="general">
              <GeneralControls/>
            </Tabs.Panel>
          </Tabs>
        </Stack>
    </Box>
  );
};

export default ThemeControlPanel;
