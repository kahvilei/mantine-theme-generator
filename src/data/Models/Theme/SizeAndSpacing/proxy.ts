import { createThemeComponentProxy } from '@/data/Proxy/Proxy';
import { RemoraidStore } from '@/data/Store';

export function createSizesProxy(store: RemoraidStore) {
  return createThemeComponentProxy(store, (s) => s.theme.sizes, {
    framingProps: [
        'spacing.xs',
        'spacing.sm',
        'spacing.md',
        'spacing.lg',
        'spacing.xl',
        'radius.xs',
        'radius.sm',
        'radius.md',
        'radius.lg',
        'radius.xl',
        'breakpoint.xs',
        'breakpoint.sm',
        'breakpoint.md',
        'breakpoint.lg',
        'breakpoint.xl',
    ],
    unframingMethods: ['getSpacingSize', 'getRadiusSize'],
  });
}
