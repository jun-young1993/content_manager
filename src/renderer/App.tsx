import React from 'react';
import { AppState } from '../@types/app/index';
import Header from './Header';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

export default class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  private renderHeader(): JSX.Element {
    return <Header />;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderApp(): JSX.Element {
    return <>app</>;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderFooter(): JSX.Element {
    return <>app</>;
  }

  /**
   *
   *
   * @returns JSX.Element
   * @memberof App
   */
  public render(): JSX.Element {
    return (
      <div className="container">
        {this.renderHeader()}
        {this.renderApp()}
        {this.renderFooter()}
      </div>
    );
  }
}
