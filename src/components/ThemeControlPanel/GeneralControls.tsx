import {
  SegmentedControl,
  Stack,
  Switch,
  Text,
} from '@mantine/core';
import { useThemeContext } from './ThemeContext/ThemeContext';



const GeneralControls = () => {
  const { setFocusRing, getFocusRing, setRespectReducedMotion, getRespectReducedMotion, setCursorType, getCursorType } = useThemeContext();

  return (
    <Stack mt="md">
      <Text size="sm">Focus Ring</Text>
      <SegmentedControl
        data={[
          { value: 'auto', label: 'Auto' },
          { value: 'always', label: 'Always' },
          { value: 'never', label: 'Never' },
        ]}
        value={getFocusRing()}
        onChange={(value) => setFocusRing(value as 'auto' | 'always' | 'never')}
      />

      <Switch
        label="Respect Reduced Motion"
        checked={getRespectReducedMotion()}
        onChange={(event) => setRespectReducedMotion(event.currentTarget.checked)}
      />

      <Text size="sm">Cursor Type</Text>
      <SegmentedControl
        data={[
          { label: 'Default', value: 'default' },
          { label: 'Pointer', value: 'pointer' },
        ]}
        value={getCursorType()}
        onChange={(value) => setCursorType(value as 'default' | 'pointer')}
      />
    </Stack>
  );
};

export default GeneralControls;
