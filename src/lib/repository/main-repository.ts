import { MainMenu } from '../types/app-types';
import { MAIN_MENU } from '../types/app-defines';

export default class MainRepository {
  private currentMainMenu: MainMenu | null = null;

  public constructor() {}

  public getCurrentMainMenu(): MainMenu {
    return this.currentMainMenu ?? MAIN_MENU.HOME;
  }

  public setMainMenu(mainMenu: MainMenu): void {
    this.currentMainMenu = mainMenu;
  }
}
