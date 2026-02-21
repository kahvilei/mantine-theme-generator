import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';
import './Fonts.css'
import './i18n'; // Import i18n configuration

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Group,
    MantineProvider,
    AppShell,
    Box,
    createTheme
} from '@mantine/core';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { theme } from '@/data/Store';


const App: React.FC = observer(() => {
    const [previewMode, setPreviewMode] = useState<string>('dark');
    const [opened] = useDisclosure();

    const isMobile = useMediaQuery('(max-width: 768px)');

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
                    <ThemeControlPanel
                        previewMode={previewMode}
                        onPreviewModeChange={setPreviewMode}
                    />
                </AppShell.Navbar>
                <AppShell.Main>
                    <MantineProvider
                        theme={createTheme(theme.compiled)}
                        cssVariablesSelector={`#display-panel`}
                    >
                        <Box pos={'relative'} id='display-panel' bg="var(--mantine-color-body)">
                            {previewMode === 'dark' && (
                                <Group justify="center" grow className="theme-display-container">
                                    <ThemeDisplay number={1} mode="dark" />
                                </Group>
                            )}

                            {previewMode === 'dark-and-light' && (
                                <Group gap={0} justify="center" grow className="theme-display-container" wrap={isMobile ? "wrap" : "nowrap"}>
                                    <ThemeDisplay number={2} mode="dark" />
                                    <ThemeDisplay number={3} mode="light" />
                                </Group>
                            )}

                            {previewMode === 'light' && (
                                <Group justify="center" grow className="theme-display-container">
                                    <ThemeDisplay number={4} mode="light" />
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
