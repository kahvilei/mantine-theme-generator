import { useDispatch } from 'react-redux';
import { setTheme } from '@/data/ThemeState/themeSlice';
import { RootState } from '@/data/store';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/data/ThemeState/themeSelectors';

const downloadTheme = (language: "json" | "tsx") => {
  const theme = useSelector(selectTheme);
  const themeString = JSON.stringify(theme, null, 2);
  const blob = new Blob([themeString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mantine-theme.json';
  a.click();
  URL.revokeObjectURL(url);
};

const uploadTheme = (file: File) => {
  const dispatch = useDispatch();
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const theme = JSON.parse(e.target?.result as string);
      dispatch(setTheme(theme));
    };
    reader.readAsText(file);
  }
};

export { downloadTheme, uploadTheme };