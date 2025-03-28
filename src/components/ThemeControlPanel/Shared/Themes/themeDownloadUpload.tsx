import { IconDownload, IconUpload } from '@tabler/icons-react';
import {ActionIcon, Tooltip} from '@mantine/core';
import Store, {theme} from "@/data/Store";
import {observer} from "mobx-react-lite";

const language = "json";

export const DownloadThemeButton = observer(() => {
  
  const downloadTheme = () => {
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
      onClick={() => downloadTheme()}
    >
      <IconDownload size={18} />
    </ActionIcon></Tooltip>
  );
});

export const UploadThemeButton= observer(() => {
  
  const uploadTheme = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const theme = JSON.parse(e.target?.result as string);
        Store.setTheme("Uploaded", theme);
      };
      reader.readAsText(file);
    }
  };

  return (
       <Tooltip label="Upload theme">
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
});