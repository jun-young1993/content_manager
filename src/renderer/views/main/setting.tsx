// import { SettingProps } from './lib/types/app-types';
import React from 'react';
import { SettingProps } from '../../../lib/types/app-types';
type SettingItems = SettingProps['items'];

export default class Setting extends React.Component<SettingProps> {
  static defaultProps = {
    items: [
      {
        key: 'item_1',
        title: '아이템1',
        subTitle: '아이템1 부제',
        path: 'M22 12h-4l-3 9L9 3l-3 9H2',
      },
      {
        key: 'item_2',
        title: '아이템2',
        subTitle: '아이템2 부제',
        path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2',
      },
    ] as SettingItems,
  };

  public constructor(props) {
    super(props);
  }

  renderItem(index: number): JSX.Element {
    const { items } = this.props;
    const item = items[index];
    return (
      <div
        className={`p-4 lg:w-1/${items.length} md:w-1/${items.length}`}
        key={item.key}
      >
        <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
          <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <path d={`${item.path}`} />
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              {item.title}
            </h2>
            <p className="leading-relaxed text-base">{item.subTitle}</p>
          </div>
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const { items } = this.props;
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap -m-4">
            {items.map((_, index: number) => this.renderItem(index))}
          </div>
        </div>
      </section>
    );
  }
}
