import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@/data/ThemeState/themeSlice';
import { selectTheme } from '@/data/ThemeState/themeSelectors';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import {ActionIcon, Tooltip} from '@mantine/core';

const language = "json";

export const DownloadThemeButton = () => {
  const theme = useSelector(selectTheme);

  const downloadTheme = (language: "json" | "tsx") => {
    const themeString = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mantine-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
      <Tooltip label={`Download theme as ${language}`}>
    <ActionIcon
      onClick={() => downloadTheme(language)}
    >
      {language === "json" ? <IconDownload size={18} /> : <IconDownload size={18} />}
    </ActionIcon></Tooltip>
  );
};

export const UploadThemeButton = () => {
  const dispatch = useDispatch();

  const uploadTheme = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const theme = JSON.parse(e.target?.result as string);
        dispatch(setTheme(theme));
      };
      reader.readAsText(file);
    }
  };

  return (
       <Tooltip label={`Upload theme`}>
    <ActionIcon
      onClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            uploadTheme(file);
          }
        };
        input.click();
      }}
    >
      <IconUpload size={18} />
    </ActionIcon></Tooltip>
  );
};