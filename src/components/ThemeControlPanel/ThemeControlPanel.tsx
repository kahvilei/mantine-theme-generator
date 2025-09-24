import React, { useEffect, useState } from 'react';
import {
    IconBrandGithub,
    IconBrandMantine,
    IconCube,
    IconPalette,
    IconResize,
    IconSettings,
    IconTypeface,
} from '@tabler/icons-react';
import {
    Box,
    Center,
    Group,
    ScrollArea,
    SegmentedControl,
    Tooltip,
    Stack,
    MantineProvider,
    createTheme,
    MantineThemeOverride,
    Card,
    ActionIcon,
    Text,
} from '@mantine/core';
import QuickSetUp from '@/components/ThemeControlPanel/QuickSetUp/QuickSetUp';
import ColorControl from './ColorControls/ColorControl';
import ComponentControls from './ComponentControls/ComponentControls';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';
import TypographyControl from './TypographyControls/TypographyControls';
import classes from './ThemeControlPanel.module.css';
import { useTranslation } from 'react-i18next';
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import appTheme from "../../data/appTheme.json";
import Header from '../Header/Header';
import { DownloadThemeButton } from './Shared/Themes/themeDownloadUpload';

const ThemeControlPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('quick-set-up');
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const [currentColorScheme, setCurrentColorScheme] = useState<string>('dark');
    const [opened, { toggle }] = useDisclosure();

    // Media query for responsive layout

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

    // Updated to use new namespaces
    const { t } = useTranslation(['core', 'theme']);

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
        <MantineProvider
            forceColorScheme={mode}
            theme={createTheme(appTheme as unknown as MantineThemeOverride)}
        >
            <Stack id="control-panel" h="100vh" gap="xs" p={0}>
                <Group align='center' justify='space-between'>
                    <Header
                        lightMode={mode === 'light'}
                        toggleScheme={toggleScheme}
                        openDrawer={toggle}
                        isMobile={isMobile}
                    />
                    <Group className={classes.header}>
                        {isMobile ? (
                            <SegmentedControl
                                size="xs"
                                value={activeTab}
                                onChange={setActiveTab}
                                data={[
                                    {
                                        value: 'quick-set-up',
                                        label: (
                                            <Center>
                                                <IconSettings size="1rem" />
                                            </Center>
                                        ),
                                    },
                                    {
                                        value: 'color',
                                        label: (
                                            <Center>
                                                <IconPalette size="1rem" />
                                            </Center>
                                        ),
                                    },
                                    {
                                        value: 'typography',
                                        label: (
                                            <Center>
                                                <IconTypeface size="1rem" />
                                            </Center>
                                        ),
                                    },
                                    {
                                        value: 'size-and-layout',
                                        label: (
                                            <Center>
                                                <IconResize size="1rem" />
                                            </Center>
                                        ),
                                    },
                                    {
                                        value: 'components',
                                        label: (
                                            <Center>
                                                <IconCube size="1rem" />
                                            </Center>
                                        ),
                                    },
                                ]}
                            />
                        ) : (
                            <SegmentedControl
                                value={activeTab}
                                onChange={setActiveTab}
                                data={[
                                    {
                                        value: 'quick-set-up',
                                        label: (
                                            <Tooltip label={t('tabs.quickSetup', { ns: 'theme' })}>
                                                <Center>
                                                    <IconSettings size="1.2rem" />
                                                </Center>
                                            </Tooltip>
                                        ),
                                    },
                                    {
                                        value: 'color',
                                        label: (
                                            <Tooltip label={t('tabs.color', { ns: 'theme' })}>
                                                <Center>
                                                    <IconPalette size="1.2rem" />
                                                </Center>
                                            </Tooltip>
                                        ),
                                    },
                                    {
                                        value: 'typography',
                                        label: (
                                            <Tooltip label={t('tabs.typography', { ns: 'theme' })}>
                                                <Center>
                                                    <IconTypeface size="1.2rem" />
                                                </Center>
                                            </Tooltip>
                                        ),
                                    },
                                    {
                                        value: 'size-and-layout',
                                        label: (
                                            <Tooltip label={t('tabs.sizeAndLayout', { ns: 'theme' })}>
                                                <Center>
                                                    <IconResize size="1.2rem" />
                                                </Center>
                                            </Tooltip>
                                        ),
                                    },
                                    {
                                        value: 'components',
                                        label: (
                                            <Tooltip label={t('tabs.components', { ns: 'theme' })}>
                                                <Center>
                                                    <IconCube size="1.2rem" />
                                                </Center>
                                            </Tooltip>
                                        ),
                                    },
                                ]}
                            />
                        )}
                    </Group>
                </Group>
                            
                <ScrollArea
                    scrollbars="y"
                    type="hover"
                    className={classes.contentArea}
                    style={{
                        height: isMobile ? 'calc(100vh - 160px)' : undefined,
                        flex: 1
                    }}
                >
                    {renderContent()}
                </ScrollArea>

                <Card pos={'fixed'} bottom={'1rem'} right={'1rem'}>
                    <DownloadThemeButton/>
                </Card>
            </Stack>
        </MantineProvider>
    );
};

export default ThemeControlPanel;