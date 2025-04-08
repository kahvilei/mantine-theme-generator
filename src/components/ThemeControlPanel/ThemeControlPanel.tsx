import React, { useState } from 'react';
import {
    IconCube,
    IconPalette,
    IconResize,
    IconSettings,
    IconTrash,
    IconTypeface,
     IconX, IconRestore,
} from '@tabler/icons-react';
import {
    ActionIcon,
    Box,
    Button,
    Center,
    Group,
    Popover,
    ScrollArea,
    SegmentedControl,
    Text,
    Tooltip,
    Stack,
} from '@mantine/core';
import QuickSetUp from '@/components/ThemeControlPanel/QuickSetUp/QuickSetUp';
import { theme } from '@/data/Store';
import ColorControl from './ColorControls/ColorControl';
import ComponentControls from './ComponentControls/ComponentControls';
import { DownloadThemeButton, UploadThemeButton } from './Shared/Themes/themeDownloadUpload';
import SizeAndLayoutControls from './SizeAndLayoutControls/SizeAndLayoutControls';
import TypographyControl from './TypographyControls/TypographyControls';
import classes from './ThemeControlPanel.module.css';
import { useTranslation } from 'react-i18next';
import {useMediaQuery} from "@mantine/hooks";

const ThemeControlPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('quick-set-up');
    const [opened, setOpened] = useState(false);
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
            <Stack h="100%" gap="xs">
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
                    <Group gap="xs" wrap='nowrap'>
                        <DownloadThemeButton />
                        <UploadThemeButton />
                        <Popover opened={opened} onClose={() => setOpened(false)} position="bottom" withArrow>
                            <Popover.Target>
                                <Tooltip label={t('panel.resetTheme', { ns: 'theme' })}>
                                    <ActionIcon
                                        variant="light"
                                        color="red"
                                        onClick={() => setOpened(true)}
                                        size={isMobile ? "sm" : "md"}
                                    >
                                        <IconRestore size={isMobile ? "1rem" : "1.25rem"} />
                                    </ActionIcon>
                                </Tooltip>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Text size="sm">
                                    {t('panel.resetConfirmation', { ns: 'theme' })}
                                </Text>
                                <Group mt="md">
                                    <Button
                                        variant="filled"
                                        color="red"
                                        leftSection={<IconTrash size="1.25rem" />}
                                        onClick={() => {
                                            theme.reset();
                                            setOpened(false);
                                        }}
                                    >
                                        {t('panel.deleteChanges', { ns: 'theme' })}
                                    </Button>
                                    <Button
                                        variant="filled"
                                        leftSection={<IconX size="1.25rem" />}
                                        onClick={() => {
                                            setOpened(false);
                                        }}
                                    >
                                        {t('panel.cancelReset', { ns: 'theme' })}
                                    </Button>
                                </Group>
                            </Popover.Dropdown>
                        </Popover>
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
                    <Box>{renderContent()}</Box>
                </ScrollArea>
            </Stack>
        </Box>
    );
};

export default ThemeControlPanel;