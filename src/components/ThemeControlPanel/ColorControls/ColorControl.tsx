import EditorPage from '@/components/ThemeControlPanel/Shared/Layout/EditorPage';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import GradientControls from './GradientControls';
import PrimaryColorSettings from './PrimaryColorSettings';

const ColorPanel = () => {
  return (
    <EditorPage title="Color Controls">
      <PrimaryColorSettings />
      <ColorPalette />
      <GradientControls />
      <ColorDefaults />
    </EditorPage>
  );
};

export default ColorPanel;
