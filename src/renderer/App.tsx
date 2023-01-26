import React from 'react';

import { current } from 'tailwindcss/colors';
import AppStore from '../lib/store/app-store';
import { AppProps, AppState, MainMenu } from '../lib/types/app-types';
import { MAIN_MENU } from '../lib/types/app-defines';
import Dispatcher from './dispatcher';

export default class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = this.getAppStore().getState();
    this.getAppStore().onDidUpdate((state: AppState) => {
      this.setState(state);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private onClickMainMenu(): void {}

  private getDispather(): Dispatcher {
    const { dispatcher } = this.props;
    return dispatcher;
  }

  private getAppStore(): AppStore {
    return this.getDispather().getAppStore();
  }

  private makeMainMenuItem(imgData: string, mainMenu: MainMenu): JSX.Element {
    return (
      <li>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            this.getDispather().mainMenuChange(mainMenu);
          }}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 place-content-center"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d={imgData}
              fill="#f9ef21"
              stroke="#f9cf01"
              strokeWidth="7"
              strokeLinejoin="round"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </li>
    );
  }

  private renderMainView(): JSX.Element {
    const { currentMainMenu } = this.state;

    switch (currentMainMenu) {
      case MAIN_MENU.HOME:
        return <div>{MAIN_MENU.HOME}</div>;
      case MAIN_MENU.MAIN:
        return <div>{MAIN_MENU.MAIN}</div>;
      default:
        return <div>not found page</div>;
    }
  }

  private renderMain(): JSX.Element {
    return (
      <main className="w-full h-full flex flex-row">
        <div className="border-1 border-indigo-1000 basis-20 flex">
          <nav className="w-full">
            <ul className="flex flex-col space-y-4 items-center">
              {this.makeMainMenuItem(
                'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
                MAIN_MENU.HOME
              )}
              {this.makeMainMenuItem(
                'M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z',
                MAIN_MENU.MAIN
              )}
            </ul>
          </nav>
        </div>
        <div className="border-1 border-indigo-1000 basis-full">
          {this.renderMainView()}
        </div>
      </main>
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
