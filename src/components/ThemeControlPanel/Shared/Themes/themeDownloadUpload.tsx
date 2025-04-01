import { IconDownload, IconUpload } from '@tabler/icons-react';
import { ActionIcon, Tooltip, SegmentedControl, Group } from '@mantine/core';
import Store, { theme } from "@/data/Store";
import { observer } from "mobx-react-lite";
import { useState } from 'react';

// Helper function to convert theme object to TypeScript code with proper formatting
const themeToTypeScript = (themeObj: any): string => {
  // Custom formatter to produce TypeScript without unnecessary quotes on property names
  const formatObject = (obj: any, indent: number = 0): string => {
    if (obj === null) {return 'null';}
    if (obj === undefined) {return 'undefined';}

    if (typeof obj !== 'object') {
      // Handle primitives
      if (typeof obj === 'string') {return `'${obj.replace(/'/g, "\\'")}'`;}
      return String(obj);
    }

    if (Array.isArray(obj)) {
      // Handle arrays
      if (obj.length === 0) {return '[]';}

      const items = obj.map(item => formatObject(item, indent + 2)).join(`,\n${  ' '.repeat(indent + 2)}`);
      return `[\n${' '.repeat(indent + 2)}${items}\n${' '.repeat(indent)}]`;
    }

    // Handle objects
    const entries = Object.entries(obj);
    if (entries.length === 0) {return '{}';}

    const props = entries.map(([key, value]) => {
      // Check if key is a valid JS identifier or needs quotes
      const needsQuotes = !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ||
          key.includes('-') ||
          key.includes(' ') ||
          /^\d/.test(key);

      const formattedKey = needsQuotes ? `'${key}'` : key;
      return `${' '.repeat(indent + 2)}${formattedKey}: ${formatObject(value, indent + 2)}`;
    }).join(',\n');

    return `{\n${props}\n${' '.repeat(indent)}}`;
  };

  // Generate the TypeScript file content
  return `import { MantineThemeOverride } from '@mantine/core';\n\n` +
      `const theme: MantineThemeOverride = ${formatObject(themeObj)};\n\n` +
      `export default theme;`;
};

// Helper to process uploaded TypeScript file content
const processTypeScriptContent = (content: string): any => {
    // Simple approach: extract the theme object and evaluate it
    let themeObject;

    // Find the theme object - first try const theme = {...}
    const themeMatch = content.match(/const\s+theme\s*[^=]*=\s*({[\s\S]*?});/);
    if (themeMatch && themeMatch[1]) {
      const themeStr = themeMatch[1];
      // Use eval in a controlled way to convert the object string to a real object
        // eslint-disable-next-line no-eval
      themeObject = eval(`(${themeStr})`);
      return themeObject;
    }

    // If not found, try export default {...}
    const exportMatch = content.match(/export\s+default\s+({[\s\S]*?});/);
    if (exportMatch && exportMatch[1]) {
      const themeStr = exportMatch[1];
        // eslint-disable-next-line no-eval
      themeObject = eval(`(${themeStr})`);
      return themeObject;
    }

    // If exporting the theme variable
    if (content.includes('export default theme')) {
      const varMatch = content.match(/const\s+theme\s*[^=]*=\s*({[\s\S]*?});/);
      if (varMatch && varMatch[1]) {
        const themeStr = varMatch[1];
          // eslint-disable-next-line no-eval
        themeObject = eval(`(${themeStr})`);
        return themeObject;
      }
    }
};

// Individual components if you need them separately
export const DownloadThemeButton = observer(() => {
  const [fileFormat, setFileFormat] = useState<'json' | 'typescript'>('typescript');

  const downloadTheme = () => {
    let content: string;
    let fileName: string;
    let mimeType: string;

    // Create a timestamp in format MMDD_HHMM
    const now = new Date();
    const timestamp = `${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

    if (fileFormat === 'typescript') {
      content = themeToTypeScript(theme.compile());
      fileName = `${theme.name??`mantine-theme_${timestamp}` }.ts`;
      mimeType = 'text/typescript';
    } else {
      content = JSON.stringify(theme.compile(), null, 2);
      fileName = `${theme.name??`mantine-theme_${timestamp}` }.json`;
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
        <SegmentedControl
            value={fileFormat}
            onChange={(value: string) => setFileFormat(value as "json" | "typescript")}
            data={[
              { label: 'JSON', value: 'json' },
              { label: 'TS', value: 'typescript' }
            ]}
            size="xs"
        />
        <Tooltip label={`Download theme as ${fileFormat}`}>
          <ActionIcon onClick={downloadTheme}>
            <IconDownload size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
  );
});

export const UploadThemeButton = observer(() => {
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
          alert("Failed to process theme file. Make sure it's a valid JSON or TypeScript theme file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
      <Tooltip label="Upload theme (JSON or TypeScript)">
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