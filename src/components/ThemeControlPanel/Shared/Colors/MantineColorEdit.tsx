import React from 'react';
import {Group} from '@mantine/core';
import DefaultColorItem from './ColorEditor/ColorEdit';
import {Colors} from "@/data/Models/Theme/Colors";
import {colors} from '@/data/Store';

interface MantineColorEditProps {
  group: "content" | "mantine" | "custom" | "situation" | "all" | "other"
  colorInstance?: Colors
}
const MantineColorEdit: React.FC<MantineColorEditProps> = ({group, colorInstance = colors}: MantineColorEditProps) => {
  const colors =() => {switch (group) {
    case "all":
      return colorInstance.getAllColors();
    case "mantine":
      return colorInstance.getMantineColors();
    case "custom":
      return colorInstance.getCustomColors();
    case "content":
      return colorInstance.getLayoutColors();
    case "other":
      return colorInstance.getTheRest();
    case "situation":
      return colorInstance.getSituationColors();
    default:
        return colorInstance.getAllColors();
  }}


  // const descriptions: { [key: string]: string } = {
  //   dark: 'used in dark mode as the background color and text color for most components. ',
  //   gray: 'used for borders, dividers, and other elements in light mode.',
  //   blue: 'the default primary color set by mantine.',
  //   red: 'commonly used for error messages and destructive actions.',
  //   green: 'commonly used for success messages and constructive actions.',
  //   yellow: 'commonly used for warning messages.',
  // };

  return (
      <Group gap="xs">
      {colors().map((color) => (
          (color!==undefined) && <DefaultColorItem
            key={color.name}
            name={color.name}
          />
      ))}
      </Group>
  );
};

export default MantineColorEdit;
