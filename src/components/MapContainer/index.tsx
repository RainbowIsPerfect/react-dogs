import { ElementType } from 'react';

// @deprecated

type Tag = keyof JSX.IntrinsicElements;

type DefaultProps<T extends Tag> = {
  tag: ElementType;
} & JSX.IntrinsicElements[T];

interface MapContainerProps<T, P extends Tag, C extends Tag> {
  children: T;
  parent: DefaultProps<P>;
  child: DefaultProps<C>;
}

export const MapContainer = <T extends any[], P extends Tag, C extends Tag>({
  children,
  parent,
  child,
}: MapContainerProps<T, P, C>) => {
  const { tag: Parent, ...parentProps } = parent;
  const { tag: Child, ...childProps } = child;
  return children.length ? (
    <Parent {...parentProps}>
      {children.map((item, i) => {
        return (
          <Child {...childProps} key={i}>
            {item}
          </Child>
        );
      })}
    </Parent>
  ) : null;
};
