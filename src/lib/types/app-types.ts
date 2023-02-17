// eslint-disable-next-line import/no-cycle
import Dispatcher from '../../renderer/dispatcher';
import { MAIN_MENU } from './app-defines';

export type Ele = JSX.Element;

export interface AppState {
  currentMainMenu: MainMenu;
}

export interface AppProps {
  readonly dispatcher: Dispatcher;
}
// ========== ./main.tsx ================

// =========== ./renderer/views/global/menu.tsx ===============
export interface GnbMenuProps {
  onClick: (mainMenu: MainMenu) => void;
}

export type MainMenu = typeof MAIN_MENU[keyof typeof MAIN_MENU];

// =======================================================================
// src/renderer/views/main/settings.tsx
type SettingItem = {
  key: string;
  title: string;
  subTitle: string;
  path: string;
};
export interface SettingProps {
  items: SettingItem[];
}
