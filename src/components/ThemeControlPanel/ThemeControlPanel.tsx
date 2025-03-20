import {
  IconCube,
  IconLayoutSidebar,
  IconPalette,
  IconResize,
  IconSettings,
  IconTrash,
  IconTypeface
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  createTheme,
  Group, MantineThemeOverride,
  Popover,
  ScrollArea,
  Select, SelectProps,
  Stack,
  Tabs,
  Text,
  Tooltip
} from '@mantine/core';
import ColorControl from './ColorControls/ColorControl';
import ComponentControls from './ComponentControls/ComponentControls';
import GeneralControls from './GeneralControls/GeneralControls';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';
import TypographyControl from './TypographyControls/TypographyControls';
import classes from './ThemeControlPanel.module.css';
import {DownloadThemeButton, UploadThemeButton} from "@/components/Header/themeDownloadUpload";
import {setTheme} from "@/data/ThemeState/themeSlice";
import React, {useState} from "react";
import appTheme from "@/data/appTheme.json";
import premadeThemes from "@/data/premadeThemes.json";
import {useDispatch} from "react-redux";
import ThemePreview from "@/components/Header/ThemePreview";


const ThemeControlPanel = () => {
  const defaultTheme = createTheme(appTheme as unknown as MantineThemeOverride);
  const [mode] = useState<'light' | 'dark'>('dark');

  const [currentThemeName, setCurrentThemeName] = useState('');
  const [opened, setOpened] = useState(false);
  const themes = JSON.parse(JSON.stringify(premadeThemes));

  const dispatch = useDispatch();

  const handlePreMadeThemeSelect = (value: string | null) => {
    setCurrentThemeName(value as string);
    const newTheme = createTheme(themes[value as string]);
    dispatch(setTheme(newTheme));
  };

  const themeOptions: SelectProps['renderOption'] = ({ option }) => (
      <ThemePreview lightMode={mode==='light'} theme={themes[option.value]} name={option.value} />
  );

  const themeData = Object.keys(themes).map((themeName) => ({ value: themeName, label: themeName }));
  return (
    <Box id="control-panel" p="0">
        <Stack>
          <Tabs variant="pills" defaultValue="color" >
            <Tabs.List variant="filled" className={classes.tabList} p=".7rem">
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
            <ScrollArea scrollbarSize={6} scrollbars="y" type="hover" className="sidebar-scroll">
            <Tabs.Panel className={classes.tabPanel} value="color">
              <ScrollArea scrollbarSize={6} scrollbars="y" type="hover" className="sidebar-scroll">
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
            </Tabs.Panel>
            </ScrollArea>
          </Tabs>
          <Group className={classes.bottomPanel}>
            <Select
                placeholder="Select a pre-made theme"
                data={themeData}
                renderOption={themeOptions}
                value={currentThemeName? currentThemeName : 'mantine'}
                onChange={handlePreMadeThemeSelect}
                allowDeselect = {false}
                style={{ width: '200px' }}
                classNames={{option: classes.themePreviewOption, dropdown: classes.themePreviewDropdown, options: classes.themePreviewOptions}}
                comboboxProps={{ width: '500px' }}
            />
            <DownloadThemeButton/>
            <UploadThemeButton />
            <Popover opened={opened} onClose={() => setOpened(false)} position="bottom" withArrow>
              <Popover.Target>
                <Tooltip label="Reset Theme">
                  <ActionIcon variant="outline" color="red" onClick={() => setOpened(true)}>
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
                        setTheme(defaultTheme);
                        setOpened(false);
                      }}
                  >
                    <IconTrash size="1.25rem" />
                  </ActionIcon>
                  <ActionIcon variant="outline" onClick={() => setOpened(false)}>
                    <IconLayoutSidebar size="1.25rem" />
                  </ActionIcon>
                </Group>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Stack>
    </Box>
  );
};

export default ThemeControlPanel;
