import MainRepository from '../repository/main-repository';
import { AppState, MainMenu } from '../types/app-types';
import TypedBaseStore from './typed-base-store';

export default class AppStore extends TypedBaseStore<AppState> {
  // repositoryes
  private mainRepository: MainRepository = new MainRepository();

  private emitQueued: boolean = false;

  public constructor() {
    super();
  }

  public getState(): AppState {
    return {
      currentMainMenu: this.mainRepository.getCurrentMainMenu(),
    };
  }

  protected emitUpdate(): void {
    if (this.emitQueued) {
      return;
    }
    this.emitQueued = true;
    this.emitUpdateNow();
  }

  private emitUpdateNow(): void {
    this.emitQueued = false;
    const state = this.getState();
    super.emitUpdate(state);
  }

  // events
  public onChangeMainMenu(mainMenu: MainMenu): void {
    this.mainRepository.setMainMenu(mainMenu);
    this.emitUpdate();
  }
}
