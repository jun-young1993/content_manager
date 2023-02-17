export interface FlexProps {
  element: JSX.Element;
  size?: string;
}

interface FlexContainerProps {
  flex: 'row' | 'col' | 'reverse';
  elements: FlexProps[];
}

export default function FlexContainer(props: FlexContainerProps) {
  const { flex, elements } = props;
  const wrapClass = `w-full h-full flex flex-${flex}`;

  return (
    <div className={wrapClass}>
      {elements.map((flexElement: FlexProps, index: number) => {
        const indexToString: string = index.toString();
        const { size, element } = flexElement;
        const elementName: string = element.type.name;
        const defaultFlex: string = size ?? `1/${elements.length}`;
        return (
          <div
            key={`${elementName}-${indexToString}`}
            className={`basis-${defaultFlex}`}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
}
