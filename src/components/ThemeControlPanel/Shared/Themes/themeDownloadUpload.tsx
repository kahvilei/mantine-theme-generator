import { useState } from 'react';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ActionIcon, Group, SegmentedControl, Text, Tooltip } from '@mantine/core';
import Store, { theme } from '@/data/Store';
import { processTypeScriptContent } from "@/utils/processTypescriptFile";
import { themeToTypeScript } from "@/utils/themeToTypeScript";
import { useTranslation } from "react-i18next";

// Individual components if you need them separately
export const DownloadThemeButton = observer(() => {
  const [fileFormat, setFileFormat] = useState<'json' | 'typescript'>('typescript');
  const { t } = useTranslation(['app', 'theme']);

  const downloadTheme = () => {
    let content: string;
    let fileName: string;
    let mimeType: string;

    // Create a timestamp in format MMDD_HHMM
    const now = new Date();
    const timestamp = `${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

    if (fileFormat === 'typescript') {
      content = themeToTypeScript(theme.compile(true));
      fileName = `${theme.name ?? `mantine-theme_${timestamp}`}.ts`;
      mimeType = 'text/typescript';
    } else {
      content = JSON.stringify(theme.compile(), null, 2);
      fileName = `${theme.name ?? `mantine-theme_${timestamp}`}.json`;
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
      <Group gap="xs">
        <Text size='sm'>
          Export as:
        </Text>
        <SegmentedControl
            value={fileFormat}
            c="primary"
            onChange={(value: string) => setFileFormat(value as 'json' | 'typescript')}
            data={[
              { label: 'JSON', value: 'json' },
              { label: 'TS', value: 'typescript' },
            ]}
            size="xs"
        />
        <Tooltip label={t('panel.download', { format: fileFormat.toUpperCase(), ns: 'theme' })}>
          <ActionIcon onClick={downloadTheme}>
            <IconDownload size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
  );
});

export const UploadThemeButton = observer(() => {
  const { t } = useTranslation(['app', 'common']);

  const uploadTheme = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let themeData;
          const content = e.target?.result as string;

          if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
            themeData = processTypeScriptContent(content);
          } else {
            themeData = JSON.parse(content);
          }

          const prettyName = file.name.replace(/\.(ts|tsx|json)$/, '');
          Store.setTheme(prettyName, themeData);
        } catch (error) {
          // eslint-disable-next-line no-alert
          alert(
              t('theme.upload.error', { error, ns: 'app' })
          );
        }
      };
      reader.readAsText(file);
    }
  };

  return (
      <Tooltip label={t('panel.upload', { ns: 'theme' })}>
        <ActionIcon
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.json,.ts,.tsx,.txt';
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
        </ActionIcon>
      </Tooltip>
  );
});