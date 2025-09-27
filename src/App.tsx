import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';
import './Fonts.css'
import './i18n'; // Import i18n configuration

import React, { useState } from 'react';
import { IconComponents, IconDashboard, IconForms, IconMoon, IconSun, IconSunMoon, IconTypography} from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import {
    Card,
    Center,
    createTheme,
    Group,
    MantineProvider,
    ScrollArea,
    SegmentedControl,
    Tabs,
    AppShell,
    Box,
    useMantineColorScheme,
} from '@mantine/core';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import { useTranslation } from "react-i18next";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { theme } from '@/data/Store';


const App: React.FC = observer(() => {
    const [currentContent, setCurrentContent] = useState<string | null>('overview');
    const [currentColorScheme, setCurrentColorScheme] = useState<string>('dark');
    const [opened, { toggle }] = useDisclosure();

    // Media query for responsive layout
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Update to use new namespaces
    const { t } = useTranslation(['core', 'theme']);

    return (
        <MantineProvider>
            <AppShell
                navbar={{
                    width: 430,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
            >
                    <AppShell.Navbar>
                        <ThemeControlPanel />
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <MantineProvider
                            cssVariablesSelector={`#display-panel`}
                        >
                            <Box pos={'relative'} id='display-panel' bg="var(--mantine-color-body)">
                                
                                {/* Tab Content */}
                                    <Card flex={1} pos={'fixed'} right={0} m={'lg'} p={'xs'} c={'primary'} style={{zIndex: 10}}>
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
                            </Box>
                        </MantineProvider>                 
                    </AppShell.Main>  
            </AppShell>
        </MantineProvider>
    );
});

export default App;