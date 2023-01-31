import React from 'react';
import { MAIN_MENU, MAIN_MENU_ICON } from '../../../lib/types/app-defines';
import { GnbMenuProps, MainMenu } from '../../../lib/types/app-types';

export default class GnbMenu extends React.Component<GnbMenuProps> {
  public constructor(props: GnbMenuProps) {
    super(props);
  }

  private getMenues(): JSX.Element[] {
    return Object.keys(MAIN_MENU).map((mainMenuKey: string) => {
      const mainMenu: MainMenu = MAIN_MENU[mainMenuKey];
      return this.makeMainMenuItem(
        MAIN_MENU_ICON[mainMenu] ??
          'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
        mainMenu
      );
    });
  }

  private makeMainMenuItem(imgData: string, mainMenu: MainMenu): JSX.Element {
    const { onClick } = this.props;
    return (
      <li key={mainMenu}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            onClick(mainMenu);
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
              // fillRule="evenodd"
              d={imgData}
              // fill="#f9ef21"
              // stroke="#f9cf01"
              // strokeWidth="7"
              // strokeLinejoin="round"
              // clipRule="evenod"
            />
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </li>
    );
  }

  render(): JSX.Element {
    return (
      <nav className="w-full">
        <ul className="flex flex-col space-y-4 items-center">
          {this.getMenues()}
        </ul>
      </nav>
    );
  }
}
