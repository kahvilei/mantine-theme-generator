import { CodeHighlight } from '@mantine/code-highlight';
import { Stack} from '@mantine/core';

import { useThemeContext } from '../ThemeControlPanel/ThemeContext/ThemeContext';


interface JsonEditorProps {
  onEdit?: (newTheme: string) => void;
}

function JsonEditor ({ onEdit }: JsonEditorProps) {
  const { theme } = useThemeContext();

  return (
    <Stack gap="md">
      <CodeHighlight
        code={`${theme}`}
        language="json"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        maw={'100%'}
        style={{ height: 'calc(100vh - 220px)', overflowY: 'auto' }}
      />
    </Stack>
    
  );
}

export default JsonEditor;