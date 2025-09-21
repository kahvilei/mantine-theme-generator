import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';
import './Fonts.css'
import './i18n'; // Import i18n configuration

import React, { useState, useEffect } from 'react';
import { IconBrandGithub, IconBrandMantine, IconComponents, IconDashboard, IconForms, IconMoon, IconSun, IconSunMoon, IconTypography, IconX } from '@tabler/icons-react';
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
    Tabs,
    ActionIcon,
    AppShell,
    Box,
    Tooltip,
    Text,
    Button,
    Popover
} from '@mantine/core';
import Header from './components/Header/Header';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from "./data/appTheme.json";
import { useTranslation } from "react-i18next";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { theme } from '@/data/Store';
import { DownloadThemeButton } from './components/ThemeControlPanel/Shared/Themes/themeDownloadUpload';
import { ResetCurrentThemeButton } from './components/ThemeControlPanel/Shared/Themes/themeReset';

const App: React.FC = observer(() => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const [currentContent, setCurrentContent] = useState<string | null>('overview');
    const [currentColorScheme, setCurrentColorScheme] = useState<string>('dark');
     const [opened, { toggle }] = useDisclosure();

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
            <AppShell
                aside={{
                    width: 450,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
            >
                    <AppShell.Aside p={'md'}>
                        <Header
                            lightMode={mode === 'light'}
                            toggleScheme={toggleScheme}
                            openDrawer={toggle}
                            isMobile={isMobile}
                        />
                        <ThemeControlPanel />
                        <Group justify='space-between'>
                            <Group align="center" gap={isMobile ? "xs" : "md"} wrap="nowrap">
                                {!isMobile && (
                                    <>
                                    <Tooltip label={t('app.links.github')}>
                                        <ActionIcon variant="filled" onClick={() => window.open('https://github.com/kahvilei/mantine-theme-generator', '_blank')}>
                                        <IconBrandGithub size="1.25rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label={t('app.links.docs')}>
                                        <ActionIcon variant="filled" onClick={() => window.open('https://mantine.dev/', '_blank')}>
                                        <IconBrandMantine size="1.25rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                    </>
                                )}
                            </Group>
                            <Group align="center" gap={isMobile ? "xs" : "md"} wrap="nowrap">
                                <DownloadThemeButton/>
                                <ResetCurrentThemeButton/>
                            </Group>
                        </Group>    
                        <Text size="xs" c="dimmed">
                            {t('app.version', { version: '8.3.1' })}
                        </Text>
                    </AppShell.Aside>
                    <AppShell.Main>
                        <MantineProvider
                            theme={createTheme(theme.compile())}
                            cssVariablesSelector={`#display-panel`}
                        >
                            <Box pos={'relative'} id='display-panel' bg="var(--mantine-color-body)">
                                
                                {/* Tab Content */}
                                <ScrollArea scrollbars="y" type="hover" className="tab-content-scroll">
                                    <Card flex={1} pos={'fixed'} m={'lg'} p={'xs'} style={{zIndex: 10}}>
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
                                                            <IconMoon size={16} />
                                                        </Center>
                                                    ),
                                                },
                                                {
                                                    value: 'dark-and-light',
                                                    label: (
                                                        <Center>
                                                            <IconSunMoon size={16} />
                                                        </Center>
                                                    ),
                                                },
                                                {
                                                    value: 'light',
                                                    label: (
                                                        <Center>
                                                            <IconSun size={16} />
                                                        </Center>
                                                    ),
                                                },
                                            ]}
                                        />
                                    )}
                                </Group>

                                    </Card>
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
                            </Box>
                        </MantineProvider>                 
                    </AppShell.Main>  
            </AppShell>
        </MantineProvider>
    );
});

export default App;