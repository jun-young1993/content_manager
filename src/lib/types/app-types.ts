// eslint-disable-next-line import/no-cycle
import Dispatcher from '../../renderer/dispatcher';
import { MAIN_MENU } from './app-defines';

type Ele = JSX.Element;

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
// export interface GnbState {
//   onClick: (mainMenu: MainMenu) => void;
// }
interface MainMenuItems {
  [key: MainMenu]: Ele;
}
export interface MainProps {
  mainMenu: MainMenu;
  items: MainMenuItems;
  onClick: () => void;
}

export type MainMenu = typeof MAIN_MENU[keyof typeof MAIN_MENU];
// =======================================================================
