import React from 'react';
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
} from '@mantine/core';
import classes from './Header.module.css';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  toggleScheme: () => void;
  lightMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
                                         toggleScheme,
                                       }) => {
  // Updated to use new namespace
  const { t, i18n } = useTranslation(['core']);

  // Function to change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
            <Menu position="bottom-end" withArrow>
              <Menu.Target>
                <Tooltip label={t('app.language')}>
                  <ActionIcon variant="outline">
                    <IconLanguage size="1.25rem" />
                  </ActionIcon>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => changeLanguage('en')}>
                  English
                </Menu.Item>
                <Menu.Item onClick={() => changeLanguage('fr')}>
                  Français
                </Menu.Item>
                <Menu.Item onClick={() => changeLanguage('es')}>
                  Español
                </Menu.Item>
                <Menu.Item onClick={() => changeLanguage('de')}>
                  Deutsch
                </Menu.Item>
                <Menu.Item onClick={() => changeLanguage('zh')}>
                  中文
                </Menu.Item>
                <Menu.Item onClick={() => changeLanguage('ja')}>
                  日本語
                </Menu.Item>
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