import React, { useMemo } from 'react';
import {
  IconBrandGithub,
  IconBrandMantine,
  IconSunMoon,
  IconLanguage,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Group,
  Text,
  Title,
  Tooltip,
  Menu,
  Badge,
} from '@mantine/core';
import classes from './Header.module.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { SUPPORTED_LANGUAGES } from '../../config/languages';

interface HeaderProps {
  toggleScheme: () => void;
  lightMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
                                         toggleScheme,
                                       }) => {
  const { t } = useTranslation(['core']);
  const currentLanguage = i18n.language;

  // Get available languages from i18n resources
  const availableLanguageCodes = useMemo(() =>
          Object.keys(i18n.options.resources || {}),
      []);

  // Filter language configs to only include languages available in i18n resources
  const availableLanguages = useMemo(() =>
          SUPPORTED_LANGUAGES.filter(lang => availableLanguageCodes.includes(lang.code)),
      [availableLanguageCodes]);

  // Function to change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
  };

  // Get current language details
  const currentLanguageDetails = useMemo(() =>
          availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0],
      [availableLanguages, currentLanguage]);

  return (
      <Group p='md' h="100%" align="center" justify="center">
        <Group p='md' h="100%" align="center" justify="space-between" w="100%" maw="2100px">
          <Group align="flex-end">
            <Title size="1.4rem" className={classes.title}>
              {t('app.title')}
            </Title>
            <Text size="xs" c="dimmed">
              {t('app.version', { version: '7.17.0' })}
            </Text>
          </Group>
          <Group align="center">
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

            {/* Language Menu */}
            <Menu position="bottom-end" withArrow>
              <Menu.Target>
                <Tooltip label={t('app.language')}>
                  <ActionIcon variant="outline">
                    <Group gap={5}>
                      {currentLanguageDetails.code && currentLanguageDetails.code}
                    </Group>
                  </ActionIcon>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                {/* Dynamically generate language options from shared config */}
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

                {/* If no languages are found, show a message */}
                {availableLanguages.length === 0 && (
                    <Menu.Item disabled>
                      No languages configured
                    </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>

            <Tooltip label={t('app.theme')}>
              <ActionIcon variant="outline" onClick={toggleScheme}>
                <IconSunMoon size="1.25rem" />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Group>
  );
};

export default Header;