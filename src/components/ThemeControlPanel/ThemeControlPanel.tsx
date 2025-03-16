import { IconCube, IconPalette, IconResize, IconSettings, IconTypeface } from '@tabler/icons-react';
import { ActionIcon, Box, ScrollArea, Stack, Tabs, Tooltip } from '@mantine/core';
import ColorControl from './ColorControls/ColorControl';
import ComponentControls from './ComponentControls/ComponentControls';
import GeneralControls from './GeneralControls/GeneralControls';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';
import TypographyControl from './TypographyControls/TypographyControls';
import classes from './ThemeControlPanel.module.css';


const ThemeControlPanel = () => {
  return (
    <Box id="control-panel" p="0">
        <Stack>
          <Tabs variant="pills" defaultValue="color" >
            <Tabs.List variant="filled" className={classes.tabList}>
              <Tabs.Tab value="color" p=".2rem">
                <Tooltip label="Color">
                <ActionIcon component='div' variant="transparent" radius="xl">
                  <IconPalette size="1.5rem" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="typography" p=".2rem">
                <Tooltip label="Typography">
                <ActionIcon component='div' variant="transparent" radius="xl">
                  <IconTypeface size="1.5rem" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="size-and-layout" p=".2rem">
                <Tooltip label="Size and Layout">
                <ActionIcon component='div'  variant="transparent" radius="xl">
                  <IconResize size="1.5rem" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="general" p=".2rem">
                <Tooltip label="General">
                <ActionIcon component='div' variant="transparent" radius="xl">
                  <IconSettings size="1.5rem" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="components" p=".2rem">
                <Tooltip label="Components">
                <ActionIcon component='div' variant="transparent" radius="xl">
                  <IconCube size="1.5rem" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
            </Tabs.List>
            <ScrollArea scrollbarSize={6} scrollbars="y" type={'hover'} className="sidebar-scroll">
            <Tabs.Panel className={classes.tabPanel} value="color">
              <ScrollArea scrollbarSize={6} scrollbars="y" type={'hover'} className="sidebar-scroll">
              <ColorControl/>
                </ScrollArea>
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
            <Tabs.Panel className={classes.tabPanel} value="components">
              <ComponentControls/>
            </Tabs.Panel>M
            </ScrollArea>
          </Tabs>
        </Stack>
    </Box>
  );
};

export default ThemeControlPanel;
