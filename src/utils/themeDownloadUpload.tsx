import { MantineThemeOverride } from '@mantine/core';

const downloadTheme = (theme: MantineThemeOverride) => {
    const themeString = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mantine-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const uploadTheme = (payload: File | null, updateTheme: Function) => {
    const file = payload;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const theme = JSON.parse(e.target?.result as string);
        updateTheme(theme);
      };
      reader.readAsText(file);
    }
  };

export { downloadTheme, uploadTheme };