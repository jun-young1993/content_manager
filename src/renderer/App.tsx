import React from 'react';
import { AppState, AppProps } from '../@types/app/index';
import Main from './Main';

export default class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  private renderMain(): JSX.Element {
    return <Main />;
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
