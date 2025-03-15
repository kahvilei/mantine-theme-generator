
import { ActionIcon, Box, Stack, Tabs, Tooltip } from '@mantine/core';
import ColorControl from './ColorControls/ColorControl';
import GeneralControls from './GeneralControls/GeneralControls';
import TypographyControl from './TypographyControls/TypographyControls';
import ComponentControls from './ComponentControls/ComponentControls';
import { IconCube, IconPalette, IconResize, IconSettings, IconTypeface } from '@tabler/icons-react';
import classes from './ThemeControlPanel.module.css';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';

const ThemeControlPanel = () => {
  return (
    <Box id="control-panel" p="0">
        <Stack>
          <Tabs variant="pills" defaultValue="color" orientation="vertical" >
            <Tabs.List variant="filled" className={classes.tabList}>
              <Stack pos="fixed" p=".4rem 0" justify="space-between" align="center">
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
              </Stack>
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
            <Tabs.Panel className={classes.tabPanel} value="components">
              <ComponentControls/>
            </Tabs.Panel>
          </Tabs>
        </Stack>
    </Box>
  );
};

export default ThemeControlPanel;
