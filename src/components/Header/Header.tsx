
import React from 'react';
import {
  IconBrandGithub,
  IconBrandMantine,
  IconSunMoon,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Group,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import classes from './Header.module.css';


interface HeaderProps {
  toggleAside: () => void;
  toggleScheme: () => void;
  lightMode: boolean;
  updateDisplayContent: (content: string) => void;
  currentContent: string;
}

const Header: React.FC<HeaderProps> = ({
  toggleScheme,
}) => {

  return (
    <Group p='md' h="100%" align="center" justify="space-between">
      <Group align={'flex-end'}>
        <Title size={'1.4rem'} className={classes.title}>
          Mantine Theme Editor
        </Title>
        <Text size="xs" c="dimmed">
          Running on Mantine v7.17.0
        </Text>
      </Group>
      <Group align="center">
        <Tooltip label="View on GitHub">
          <ActionIcon variant="filled" onClick={() => window.open('https://github.com/kahvilei/mantine-theme-generator', '_blank')}>
            <IconBrandGithub size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="View Mantine Documentation">
          <ActionIcon variant="filled" onClick={() => window.open('https://mantine.dev/', '_blank')}>
            <IconBrandMantine size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Toggle Light/Dark Mode">
          <ActionIcon variant="outline" onClick={toggleScheme}>
            <IconSunMoon size="1.25rem" />
          </ActionIcon>
        </Tooltip>

      </Group>
    </Group>
  );
};

export default Header;