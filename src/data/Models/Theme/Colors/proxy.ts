import { createThemeComponentProxy } from '@/data/Proxy/Proxy';
import { RemoraidStore } from '@/data/Store';

export function createColorsProxy(store: RemoraidStore) {
  return createThemeComponentProxy(store, (s) => s.theme.colors);
}
