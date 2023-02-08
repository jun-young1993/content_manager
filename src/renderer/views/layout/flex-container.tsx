import React from 'react';

export interface FlexProps {
  element: JSX.Element;
  size?: string | number;
}

interface FlexContainerProps {
  flex: 'row' | 'col' | 'reverse';
  elements: FlexProps[];
}
interface FlexContainerState {}
// export default class FlexContainer extends React.Component<
//   FlexContainerProps,
//   FlexContainerState
// > {
//   public constructor(props: FlexContainerProps) {
//     //  <div className="basis-20 flex" />
//     //       <div className="basis-full" />
//     super(props);
//   }

//   public render(): JSX.Element {
//     const { flex, elements } = this.props;
//     console.log(elements);
//     const wrapClass = `w-full h-full flex flex-${flex}`;
//     return (
//       <div className={wrapClass}>
//         {elements.map((flexElement: FlexProps, index: number) => {
//           const { size, element } = flexElement;
//           const defaultFlex = size ?? `1/${elements.length}`;
//           return (
//             <div key={index} className={`basis-${defaultFlex}`}>
//               {element}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

export default function FlexContainer(props: FlexContainerProps) {
  const { flex, elements } = props;
  const wrapClass = `w-full h-full flex flex-${flex}`;
  return (
    <div className={wrapClass}>
      {elements.map((flexElement: FlexProps, index: number) => {
        const { size, element } = flexElement;
        const elementName = element.type.name;
        const defaultFlex = size ?? `1/${elements.length}`;
        return (
          <div
            key={`${elementName}-${index}`}
            className={`basis-${defaultFlex}`}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
}
