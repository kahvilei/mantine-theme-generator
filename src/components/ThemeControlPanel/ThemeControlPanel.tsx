import React, { useState } from 'react';
import {
    IconCube,
    IconPalette,
    IconResize,
    IconSettings,
    IconTypeface,
} from '@tabler/icons-react';
import {
    Center,
    Group,
    ScrollArea,
    SegmentedControl,
    Tooltip,
    Stack,
    MantineProvider,
    createTheme,
    Card,
    useMantineColorScheme,
} from '@mantine/core';
import ThemeSetUp from '@/components/ThemeControlPanel/ThemeSetUp/ThemeSetUp';
import ColorControl from './ColorControls/ColorControl';
import ComponentControls from './ComponentControls/ComponentControls';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';
import TypographyControl from './TypographyControls/TypographyControls';
import classes from './ThemeControlPanel.module.css';
import { useTranslation } from 'react-i18next';
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import appTheme from "../../data/appTheme";
import Header from '../Header/Header';
import { DownloadThemeButton } from './Shared/Themes/themeDownloadUpload';

interface ThemeControlPanelProps {
    previewMode: string;
    onPreviewModeChange: (mode: string) => void;
}

const ThemeControlPanel: React.FC<ThemeControlPanelProps> = ({ previewMode, onPreviewModeChange }) => {
    const [activeTab, setActiveTab] = useState('quick-set-up');
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { setColorScheme } = useMantineColorScheme();
    const [, { toggle }] = useDisclosure();

    const handlePreviewModeChange = (mode: string) => {
        onPreviewModeChange(mode);
        if (mode === 'dark') setColorScheme('dark');
        else if (mode === 'light') setColorScheme('light');
        // 'dark-and-light': keep current control panel scheme
    };

    const { t } = useTranslation(['core', 'theme']);

    const renderContent = () => {
        switch (activeTab) {
            case 'quick-set-up':
                return <ThemeSetUp />;
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
            theme={createTheme(appTheme)}
        >
            <Stack id="control-panel" h="100vh" gap="xs" p={0}>
                <Group align='center' justify='space-between'>
                    <Header
                        previewMode={previewMode}
                        onPreviewModeChange={handlePreviewModeChange}
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
                        flex: 1,
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
