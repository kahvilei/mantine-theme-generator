import InteractionAndAccessibilityControls from '@/components/ThemeControlPanel/GeneralControls/InteractionAndAccessibility';
import RadiusControls from '@/components/ThemeControlPanel/GeneralControls/RadiusControls';
import BreakpointControls from './BreakpointControls';
import Scale from './Scale';
import SpacingControls from './SpacingControls';
import EditorPage from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";

const SizeAndLayoutControls = () => {
  return (
    <EditorPage title="Scale and Layout Controls">
      <Scale />
      <SpacingControls />
      <BreakpointControls />
      <RadiusControls />
      <InteractionAndAccessibilityControls />
    </EditorPage>
  );
};

export default SizeAndLayoutControls;
