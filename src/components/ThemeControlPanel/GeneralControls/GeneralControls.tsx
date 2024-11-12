import {
  SegmentedControl,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFocusRing,
  selectRespectReducedMotion,
  selectCursorType,
} from '@/data/ThemeState/themeSelectors';
import {
  setFocusRing,
  setRespectReducedMotion,
  setCursorType,
} from '@/data/ThemeState/themeSlice';
import RadiusControls from './RadiusControls';

const GeneralControls = () => {
  const dispatch = useDispatch();

  const focusRing = useSelector(selectFocusRing);
  const respectReducedMotion = useSelector(selectRespectReducedMotion);
  const cursorType = useSelector(selectCursorType);

  const handleFocusRingChange = (value: 'auto' | 'always' | 'never') => {
    dispatch(setFocusRing(value));
  };

  const handleRespectReducedMotionChange = (checked: boolean) => {
    dispatch(setRespectReducedMotion(checked));
  };

  const handleCursorTypeChange = (value: 'default' | 'pointer') => {
    dispatch(setCursorType(value));
  };

  return (
    <Stack mt="md">
      <RadiusControls />
      <Title order={4}>Interaction and Accessibility</Title>
      <Text size="sm">Focus Ring</Text>
      <SegmentedControl
        data={[
          { value: 'auto', label: 'Auto' },
          { value: 'always', label: 'Always' },
          { value: 'never', label: 'Never' },
        ]}
        value={focusRing}
        onChange={(value) => handleFocusRingChange(value as 'auto' | 'always' | 'never')}
      />

      <Switch
        label="Respect Reduced Motion"
        checked={respectReducedMotion}
        onChange={(event) => handleRespectReducedMotionChange(event.currentTarget.checked)}
      />

      <Text size="sm">Cursor Type</Text>
      <SegmentedControl
        data={[
          { label: 'Default', value: 'default' },
          { label: 'Pointer', value: 'pointer' },
        ]}
        value={cursorType}
        onChange={(value) => handleCursorTypeChange(value as 'default' | 'pointer')}
      />
    </Stack>
  );
};

export default GeneralControls;