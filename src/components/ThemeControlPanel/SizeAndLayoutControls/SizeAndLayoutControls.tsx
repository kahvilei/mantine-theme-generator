import InteractionAndAccessibilityControls from '@/components/ThemeControlPanel/GeneralControls/InteractionAndAccessibility';
import RadiusControls from '@/components/ThemeControlPanel/GeneralControls/RadiusControls';
import BreakpointControls from './BreakpointControls';
import Scale from './Scale';
import SpacingControls from './SpacingControls';
import EditorPage from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import { useTranslation } from 'react-i18next';

const SizeAndLayoutControls = () => {
    const { t } = useTranslation(['theme']);

    return (
        <EditorPage title={t('layout.title')}>
            <Scale />
            <SpacingControls />
            <BreakpointControls />
            <RadiusControls />
            <InteractionAndAccessibilityControls />
        </EditorPage>
    );
};

export default SizeAndLayoutControls;