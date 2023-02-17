import React from 'react';

import AppStore from '../lib/store/app-store';
import { AppProps, AppState, Ele, MainMenu } from '../lib/types/app-types';
import { MAIN_MENU } from '../lib/types/app-defines';
import Dispatcher from './dispatcher';
import GnbMenu from './views/global/menu';
import Setting from './views/main/setting';
import FlexContainer from './views/layout/flex-container';

type MainRenderView = Ele | Setting;
export default class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = this.getAppStore().getState();
    this.getAppStore().onDidUpdate((state: AppState) => {
      this.setState(state);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private onClickMainMenu(mainMenu: MainMenu): void {
    this.getDispather().mainMenuChange(mainMenu);
  }

  private getDispather(): Dispatcher {
    const { dispatcher } = this.props;
    return dispatcher;
  }

  private getAppStore(): AppStore {
    return this.getDispather().getAppStore();
  }

  private settingComponent(): Setting {
    return <Setting />;
  }

  private renderMainView(): MainRenderView {
    const { currentMainMenu } = this.state;

    switch (currentMainMenu) {
      case MAIN_MENU.HOME:
        return <div>{MAIN_MENU.HOME}</div>;
      case MAIN_MENU.MAIN:
        return <div>{MAIN_MENU.MAIN}</div>;
      case MAIN_MENU.SETTING:
        return this.settingComponent();
      default:
        return <div>[{currentMainMenu}] not found page</div>;
    }
  }

  private renderMain(): JSX.Element {
    return (
      <FlexContainer
        flex="row"
        elements={[
          {
            size: '20',
            element: (
              <GnbMenu
                onClick={(mainMenu: MainMenu) => {
                  this.onClickMainMenu(mainMenu);
                }}
              />
            ),
          },
          {
            size: 'full',
            element: this.renderMainView() as JSX.Element,
          },
        ]}
      />
    );
  }

  /**
   *
   *
   * @returns JSX.Element
   * @memberof App
   */
  public render(): JSX.Element {
    return this.renderMain();
  }
}
