import * as React from 'react';

type Props<B, A> = {
  before: B;
  checker: (before: B) => boolean;
  children: (after: A) => JSX.Element;
};

export function Doer<B, A extends B>({ before, checker, children }: Props<B, A>) {
  if (checker(before)) {
    return children(before as A);
  }
  return null;
}
