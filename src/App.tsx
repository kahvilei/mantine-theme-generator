import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';
import './Fonts.css'
import './i18n'; // Import i18n configuration

import React, { useState } from 'react';
import { IconComponents, IconDashboard, IconForms, IconMoon, IconSun, IconSunMoon, IconTypography } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { Card, Center, createTheme, Group, MantineProvider, MantineThemeOverride, ScrollArea, SegmentedControl, Stack, Tabs, Tooltip } from '@mantine/core';
import Header from './components/Header/Header';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from "./data/appTheme.json";
import { useTranslation } from "react-i18next";

const App: React.FC = observer(() => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const [currentContent, setCurrentContent] = useState<string | null>('overview');
    const [currentColorScheme, setCurrentColorScheme] = useState<string>('dark');

    const toggleScheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Update to use new namespaces
    const { t } = useTranslation(['core', 'theme']);


    return (
        <MantineProvider
            forceColorScheme={mode}
            theme={createTheme(appTheme as unknown as MantineThemeOverride)}
        >
            <div className="app-container">
                {/* Header */}
                <div className="app-header">
                    <Header
                        lightMode={mode === 'light'}
                        toggleScheme={toggleScheme}
                    />
                </div>

                {/* Main layout */}
                <Card className="app-content" withBorder>
                    {/* Navbar / Sidebar */}
                    <div className="app-sidebar">
                        <ThemeControlPanel />
                    </div>
                    {/* Main Content */}
                    <div className="app-main">
                        <Stack align="center" justify="center" className="main-container">
                            <Card className="content-card">
                                {/* Custom Tab System */}
                                <div className="tab-container">
                                    {/* Tab Header */}
                                    <Group className="tab-header" justify="space-between" align="center">
                                        <Tabs value={currentContent} onChange={setCurrentContent}>
                                            <Tabs.List className="tab-header-list">
                                                <Tabs.Tab value="dashboard" leftSection={<IconDashboard size={16} />}>
                                                    {t('navigation.dashboard', { ns: 'core' })}
                                                </Tabs.Tab>
                                                <Tabs.Tab value="typography" leftSection={<IconTypography size={16} />}>
                                                    {t('navigation.typography', { ns: 'core' })}
                                                </Tabs.Tab>
                                                <Tabs.Tab value="components" leftSection={<IconComponents size={16} />}>
                                                    {t('navigation.components', { ns: 'core' })}
                                                </Tabs.Tab>
                                                <Tabs.Tab value="forms" leftSection={<IconForms size={16} />}>
                                                    {t('navigation.forms', { ns: 'core' })}
                                                </Tabs.Tab>
                                            </Tabs.List>
                                        </Tabs>
                                        <SegmentedControl
                                            value={currentColorScheme}
                                            onChange={setCurrentColorScheme}
                                            data={[
                                                {
                                                    value: 'dark',
                                                    label: (
                                                        <Tooltip label={t('display.darkMode', { ns: 'core' })}>
                                                            <Center>
                                                                <IconMoon size={12} />
                                                            </Center>
                                                        </Tooltip>
                                                    ),
                                                },
                                                {
                                                    value: 'dark-and-light',
                                                    label: (
                                                        <Tooltip label={t('display.sideBySide', { ns: 'core' })}>
                                                            <Center>
                                                                <IconSunMoon size={12} />
                                                            </Center>
                                                        </Tooltip>
                                                    ),
                                                },
                                                {
                                                    value: 'light',
                                                    label: (
                                                        <Tooltip label={t('display.lightMode', { ns: 'core' })}>
                                                            <Center>
                                                                <IconSun size={12} />
                                                            </Center>
                                                        </Tooltip>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </Group>

                                    {/* Tab Content */}
                                    <ScrollArea scrollbars="y" type="hover" className="tab-content-scroll">
                                        {/* Dark Tab Content */}
                                        {currentColorScheme === 'dark' && (
                                            <Group justify="center" grow className="theme-display-container">
                                                <ThemeDisplay
                                                    number={1}
                                                    mode="dark"
                                                    displayContent={currentContent ?? t('navigation.overview', { ns: 'core' })}
                                                />
                                            </Group>
                                        )}

                                        {/* Dark and Light Tab Content */}
                                        {currentColorScheme === 'dark-and-light' && (
                                            <Group gap={0} justify="center" grow className="theme-display-container">
                                                <ThemeDisplay
                                                    number={2}
                                                    mode="dark"
                                                    displayContent={currentContent ?? t('navigation.overview', { ns: 'core' })}
                                                />
                                                <ThemeDisplay
                                                    number={3}
                                                    mode="light"
                                                    displayContent={currentContent ?? t('navigation.overview', { ns: 'core' })}
                                                />
                                            </Group>
                                        )}

                                        {/* Light Tab Content */}
                                        {currentColorScheme === 'light' && (
                                            <Group justify="center" grow className="theme-display-container">
                                                <ThemeDisplay
                                                    number={4}
                                                    mode="light"
                                                    displayContent={currentContent ?? t('navigation.overview', { ns: 'core' })}
                                                />
                                            </Group>
                                        )}
                                    </ScrollArea>
                                </div>
                            </Card>
                        </Stack>
                    </div>
                </Card>
            </div>
        </MantineProvider>
    );
});

export default App;