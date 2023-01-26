import { MainMenu } from '../lib/types/app-types';
import AppStore from '../lib/store/app-store';

export default class Dispatcher {
  public constructor(private readonly appStore: AppStore) {}

  public getAppStore(): AppStore {
    return this.appStore;
  }

  public mainMenuChange(mainMenu: MainMenu): void {
    this.appStore.onChangeMainMenu(mainMenu);
  }
}
