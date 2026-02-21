import React, { useMemo } from 'react';
import {
  IconBrandGithub,
  IconBrandMantine,
  IconMenu2,
  IconMoon,
  IconPaint,
  IconSun,
  IconSunMoon,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Center,
  Group,
  Text,
  Tooltip,
  Menu,
  Badge,
  SegmentedControl,
} from '@mantine/core';
import classes from './Header.module.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { SUPPORTED_LANGUAGES } from '../../config/languages';

interface HeaderProps {
  previewMode: string;
  onPreviewModeChange: (mode: string) => void;
  openDrawer?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    previewMode,
    onPreviewModeChange,
    openDrawer,
    isMobile = false,
  }) => {
  const { t } = useTranslation(['core']);
  const currentLanguage = i18n.language;

  const availableLanguageCodes = useMemo(() =>
          Object.keys(i18n.options.resources || {}),
      []);

  const availableLanguages = useMemo(() =>
          SUPPORTED_LANGUAGES.filter(lang => availableLanguageCodes.includes(lang.code)),
      [availableLanguageCodes]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
  };

  const currentLanguageDetails = useMemo(() =>
          availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0],
      [availableLanguages, currentLanguage]);

  return (
      <Group align="center" justify="center">
        <Group p={isMobile ? "xs" : "md"} align="center" justify="space-between">
          {isMobile && openDrawer && (
              <ActionIcon onClick={openDrawer} variant="subtle" size="lg">
                <IconPaint/>
              </ActionIcon>
          )}
          <Group align="center" gap={isMobile ? "xs" : "md"} wrap="nowrap">
            <Menu position="bottom-end" withArrow withinPortal>
              <Menu.Target>
                <Tooltip label={t('app.language')}>
                  <ActionIcon size={isMobile ? "sm" : "md"}>
                    <Group gap={5}>
                      {currentLanguageDetails.code && currentLanguageDetails.code}
                    </Group>
                  </ActionIcon>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                {availableLanguages.map((lang) => (
                    <Menu.Item
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        rightSection={lang.code === currentLanguage ? <Badge size="xs">✓</Badge> : null}
                        leftSection={lang.flag && <Text>{lang.flag}</Text>}
                    >
                      {lang.nativeName}
                    </Menu.Item>
                ))}
                {availableLanguages.length === 0 && (
                    <Menu.Item disabled>
                      No languages configured
                    </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>

            <SegmentedControl
              size="xs"
              value={previewMode}
              onChange={onPreviewModeChange}
              data={[
                {
                  value: 'dark',
                  label: (
                    <Tooltip label="Dark">
                      <Center><IconMoon size={14} /></Center>
                    </Tooltip>
                  ),
                },
                {
                  value: 'dark-and-light',
                  label: (
                    <Tooltip label="Side by side">
                      <Center><IconSunMoon size={14} /></Center>
                    </Tooltip>
                  ),
                },
                {
                  value: 'light',
                  label: (
                    <Tooltip label="Light">
                      <Center><IconSun size={14} /></Center>
                    </Tooltip>
                  ),
                },
              ]}
            />

            {isMobile && (
                <Menu position="bottom-end" withArrow withinPortal>
                  <Menu.Target>
                    <ActionIcon variant="subtle" size="sm">
                      <IconMenu2 size="1.25rem" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                        leftSection={<IconBrandGithub size="1rem" />}
                        onClick={() => window.open('https://github.com/kahvilei/mantine-theme-generator', '_blank')}
                    >
                      {t('app.links.github')}
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<IconBrandMantine size="1rem" />}
                        onClick={() => window.open('https://mantine.dev/', '_blank')}
                    >
                      {t('app.links.docs')}
                    </Menu.Item>
                    <Menu.Item>
                      {t('app.version', { version: '7.17.0' })}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
            )}
          </Group>
        </Group>
      </Group>
  );
};

export default Header;
