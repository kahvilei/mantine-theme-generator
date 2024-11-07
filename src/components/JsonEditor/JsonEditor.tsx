import { CodeHighlight } from '@mantine/code-highlight';
import { Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/data/ThemeState/themeSelectors';

interface JsonEditorProps {
  onEdit?: (newTheme: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onEdit }) => {
  const theme = useSelector(selectTheme);

  return (
    <Stack gap="md">
      <CodeHighlight
        code={JSON.stringify(theme, null, 2)}
        language="json"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        maw={'100%'}
        style={{ height: 'calc(100vh - 220px)', overflowY: 'auto' }}
      />
    </Stack>
  );
};

export default JsonEditor;