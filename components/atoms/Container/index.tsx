import { css } from '@emotion/react';
import React, { ComponentType } from 'react';

interface Props {
  el?: ComponentType | keyof JSX.IntrinsicElements;
}

export const Container: React.FC<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  el: Wrapper = 'div',
  children,
  ...rest
}) => {
  return (
    <Wrapper
      css={css`
        width: 1100px;
        height: auto;
        margin: 0 auto;
      `}
      {...rest}>
      {children}
    </Wrapper>
  );
};

/*
 * https://stackoverflow.com/questions/55969769/typing-a-dynamic-tag-in-react-with-typescript
 */
