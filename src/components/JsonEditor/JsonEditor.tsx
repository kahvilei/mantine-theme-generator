import { CodeHighlight } from '@mantine/code-highlight';
import { Stack} from '@mantine/core';


interface JsonEditorProps {
  theme: string;
  onEdit?: (newTheme: string) => void;
}

function JsonEditor ({ theme, onEdit }: JsonEditorProps) {

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