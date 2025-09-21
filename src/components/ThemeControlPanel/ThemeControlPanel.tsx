import React, { useState } from 'react';
import {
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
} from '@mantine/core';
import QuickSetUp from '@/components/ThemeControlPanel/QuickSetUp/QuickSetUp';
import ColorControl from './ColorControls/ColorControl';
import ComponentControls from './ComponentControls/ComponentControls';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';
import TypographyControl from './TypographyControls/TypographyControls';
import classes from './ThemeControlPanel.module.css';
import { useTranslation } from 'react-i18next';
import {useMediaQuery} from "@mantine/hooks";

const ThemeControlPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('quick-set-up');
    const isMobile = useMediaQuery('(max-width: 768px)');

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
        <Box id="control-panel" h="100%">
            <Stack h="100%" gap="xs" pt={'lg'}>
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

                <ScrollArea
                    scrollbars="y"
                    type="hover"
                    className={classes.contentArea}
                    style={{
                        height: isMobile ? 'calc(100vh - 160px)' : undefined,
                        flex: 1
                    }}
                    p={'sm'}
                >
                    <Box>{renderContent()}</Box>
                </ScrollArea>
            </Stack>
        </Box>
    );
};

export default ThemeControlPanel;