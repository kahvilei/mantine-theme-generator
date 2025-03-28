import React from 'react';
import { IconPencil, IconSelector, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { ActionIcon, Card, darken, Stack } from '@mantine/core';
import { RootState } from '@/data/OldReduxJunk/store';
import { selectMainColorShade } from '@/data/OldReduxJunk/themeSelectors';
import classes from './ColorSwatch.module.css';

interface ColorItemProps {
  name: string;
  type?: 'display' | 'edit' | 'select' | 'delete';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const ColorSwatch: React.FC<ColorItemProps> = ({ name, type, size = 'md' }) => {
  const colorLight = useSelector((state: RootState) => selectMainColorShade(state, name, 'light'));
  const colorDark = useSelector((state: RootState) => selectMainColorShade(state, name, 'dark'));

  const sizeResolver = () => {
    switch (size) {
      case 'xs':
        return '1rem';
      case 'sm':
        return '2rem';
      case 'md':
        return '3rem';
      case 'lg':
        return '4rem';
      case 'xl':
        return '8rem';
      default:
        return '3rem';
    }
  };

  const icon = () => {
    switch (type) {
      case 'edit':
        return <IconPencil />;
      case 'select':
        return <IconSelector />;
      case 'delete':
        return <IconTrash />;
      default:
        return <IconPencil />;
    }
  };

  return (
    <Card
      bg={`-moz-linear-gradient(45deg, ${colorDark} 50%, ${colorLight} 50%)`}
      className={`${classes.colorItem} ${size}`}
      w={sizeResolver()}
      h={sizeResolver()}
      tabIndex={0}
    >
      {type && type !== 'display' && (
        <Stack align="flex-end" justify="start">
          <ActionIcon component="div" color={darken(colorLight, 0.3)} size="xs">
            {icon()}
          </ActionIcon>
        </Stack>
      )}
    </Card>
  );
};

export default ColorSwatch;
