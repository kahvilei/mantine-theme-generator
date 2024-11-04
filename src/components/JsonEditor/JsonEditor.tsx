import { CodeHighlight } from '@mantine/code-highlight';
import { ScrollArea, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';


interface JsonEditorProps {
  theme: string;
  onEdit?: (newTheme: string) => void;
}

function JsonEditor ({ theme, onEdit }: JsonEditorProps) {

  const [currentEditorContent, setCurrentEditorContent] = useState(theme);
  const [validationError, setValidationError] = useState(false);

  const handleUpdate = (newContent: string) => {
    setCurrentEditorContent(newContent);
    try {
      //test to see if current content can be used to create a new Mantine theme
      JSON.parse(newContent);
      if (onEdit) {
        onEdit(newContent);
        setValidationError(false);
      }
    } catch (error) {
      setValidationError(true);
    }
  };

  return (
    <Stack gap="md">
      <CodeHighlight
        code={`${theme}`}
        language="json"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        contentEditable
        onKeyUp={(value) => {
          handleUpdate(value.currentTarget.textContent || '');
        }}
        maw={'100%'}
        style={{ height: 'calc(100vh - 220px)', overflowY: 'auto' }}
      />
      {validationError && <Text c="red">JSON can not be converted to theme</Text>}
    </Stack>
    
  );
}

export default JsonEditor;