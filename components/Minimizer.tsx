import * as React from 'react';
import { Pressable } from 'react-native';

type ToggleProps = { children: React.ReactNode };
type ChildMinimizerProps = { children: React.ReactNode };

type ChildProps = {
  Toggle: (ps: ToggleProps) => JSX.Element;
  ChildMinimizer: (ps: ChildMinimizerProps) => JSX.Element | null;
};

type Props = {
  children: (cps: ChildProps) => JSX.Element;
  showOverride?: boolean;
};

export const Minimizer: React.FC<Props> = ({ showOverride = false, children }) => {
  const [show, setShow] = React.useState<boolean>(showOverride);

  React.useEffect(() => { setShow(showOverride)}, [showOverride]);

  const ChildMinimizer = ({ children }: ChildMinimizerProps) => show ? <>{children}</> : null;

  const Toggle = ({ children }: ToggleProps) => <Pressable onPress={() => setShow(!show)}>{children}</Pressable>;

  return children({ ChildMinimizer, Toggle });
};
