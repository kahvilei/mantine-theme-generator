import {
  SegmentedControl,
  Stack,
  Switch,
  Text,
} from '@mantine/core';

import ThemeContext from './ThemeContext/ThemeContext';
import { useContext } from 'react';

const GeneralControls = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack mt="md">
      <Text size="sm">Focus Ring</Text>
      <SegmentedControl
        data={[
          { value: 'auto', label: 'Auto' },
          { value: 'always', label: 'Always' },
          { value: 'never', label: 'Never' },
        ]}
        value={theme.getFocusRing()}
        onChange={(value) => theme.setFocusRing(value as 'auto' | 'always' | 'never')}
      />

      <Switch
        label="Respect Reduced Motion"
        checked={theme.getRespectReducedMotion()}
        onChange={(event) => theme.setRespectReducedMotion(event.currentTarget.checked)}
      />

      <Text size="sm">Cursor Type</Text>
      <SegmentedControl
        data={[
          { label: 'Default', value: 'default' },
          { label: 'Pointer', value: 'pointer' },
        ]}
        value={theme.getCursorType()}
        onChange={(value) => theme.setCursorType(value as 'default' | 'pointer')}
      />
    </Stack>
  );
};

export default GeneralControls;
