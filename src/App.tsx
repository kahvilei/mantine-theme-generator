import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';
import './Fonts.css'
import './i18n'; // Import i18n configuration

import React, { useState, useEffect } from 'react';
import { IconComponents, IconDashboard, IconForms, IconMoon, IconSun, IconSunMoon, IconTypography, IconX } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import {
    Card,
    Center,
    createTheme,
    Drawer,
    Group,
    MantineProvider,
    MantineThemeOverride,
    ScrollArea,
    SegmentedControl,
    Stack,
    Tabs,
    ActionIcon,
} from '@mantine/core';
import Header from './components/Header/Header';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from "./data/appTheme.json";
import { useTranslation } from "react-i18next";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const App: React.FC = observer(() => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const [currentContent, setCurrentContent] = useState<string | null>('overview');
    const [currentColorScheme, setCurrentColorScheme] = useState<string>('dark');
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

    // Media query for responsive layout
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Set default color scheme for mobile
    useEffect(() => {
        if (isMobile && currentColorScheme === 'dark-and-light') {
            setCurrentColorScheme('dark');
        }
    }, [isMobile]);

    const toggleScheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
        if (isMobile) {
            setCurrentColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        }
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
                        openDrawer={openDrawer}
                        isMobile={isMobile}
                    />
                </div>

                {/* Main layout */}
                <Card className="app-content" withBorder>
                    {/* Navbar / Sidebar - Show in drawer on mobile */}
                    {isMobile ? (
                        <Drawer
                            opened={drawerOpened}
                            onClose={closeDrawer}
                            title={
                                <Group justify="space-between" w="100%">
                                    <div>{t('panel.title', { ns: 'theme' })}</div>
                                    <ActionIcon onClick={closeDrawer} variant="subtle">
                                        <IconX size="1.1rem" />
                                    </ActionIcon>
                                </Group>
                            }
                            size="100%"
                            position="left"
                            withCloseButton={false}
                        >
                            <ThemeControlPanel onApplyChanges={closeDrawer} />
                        </Drawer>
                    ) : (
                        <div className="app-sidebar">
                            <ThemeControlPanel />
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="app-main">
                        <Stack align="center" justify="center" className="main-container">
                            <Card className="content-card">
                                {/* Custom Tab System */}
                                <div className="tab-container">
                                    {/* Tab Header */}
                                    <Group className="tab-header" justify="space-between" align="center" wrap="nowrap">
                                        <Tabs value={currentContent} onChange={setCurrentContent} style={{ overflow: 'auto' }}>
                                            <Tabs.List className="tab-header-list">
                                                <Tabs.Tab value="dashboard" leftSection={isMobile ? null : <IconDashboard size={16} />}>
                                                    {isMobile ? <IconDashboard size={16} /> : t('navigation.dashboard', { ns: 'core' })}
                                                </Tabs.Tab>
                                                <Tabs.Tab value="typography" leftSection={isMobile ? null : <IconTypography size={16} />}>
                                                    {isMobile ? <IconTypography size={16} /> : t('navigation.typography', { ns: 'core' })}
                                                </Tabs.Tab>
                                                <Tabs.Tab value="components" leftSection={isMobile ? null : <IconComponents size={16} />}>
                                                    {isMobile ? <IconComponents size={16} /> : t('navigation.components', { ns: 'core' })}
                                                </Tabs.Tab>
                                                <Tabs.Tab value="forms" leftSection={isMobile ? null : <IconForms size={16} />}>
                                                    {isMobile ? <IconForms size={16} /> : t('navigation.forms', { ns: 'core' })}
                                                </Tabs.Tab>
                                            </Tabs.List>
                                        </Tabs>

                                        {/* Only show SegmentedControl on desktop */}
                                        {!isMobile && (
                                            <SegmentedControl
                                                size="sm"
                                                value={currentColorScheme}
                                                onChange={setCurrentColorScheme}
                                                data={[
                                                    {
                                                        value: 'dark',
                                                        label: (
                                                            <Center>
                                                                <IconMoon size={12} />
                                                            </Center>
                                                        ),
                                                    },
                                                    {
                                                        value: 'dark-and-light',
                                                        label: (
                                                            <Center>
                                                                <IconSunMoon size={12} />
                                                            </Center>
                                                        ),
                                                    },
                                                    {
                                                        value: 'light',
                                                        label: (
                                                            <Center>
                                                                <IconSun size={12} />
                                                            </Center>
                                                        ),
                                                    },
                                                ]}
                                            />
                                        )}
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
                                            <Group gap={0} justify="center" grow className="theme-display-container" wrap={isMobile ? "wrap" : "nowrap"}>
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