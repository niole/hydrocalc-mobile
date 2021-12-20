import * as React from 'react';
import { Button, Text, View } from 'react-native';

/**
 * I made some tabs bc for some reason things cost money in mobile
 */

type TabsProps = {
  defaultKey: string;
  children: JSX.Element[] | JSX.Element;
};

export const Tabs: React.FC<TabsProps> = ({ children, defaultKey }) => {
  const [selected, setSelected] = React.useState<string>(defaultKey);
  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {React.Children.map(children, (child: JSX.Element) => (
          <Button
            color={selected === child.props.id ? "blue" : "grey"}
            onPress={() => setSelected(child.props.id)}
            title={child.props.title}
          />
        ))}
      </View>
      {React.Children.map(children, (child: JSX.Element) => (
        React.cloneElement(child, {...child.props, selected: child.props.id === selected})
      ))}
    </View>
  );
};

type TabProps = {
  title: string;
  id: string;
  children?: React.ReactNode;
  onClick?: (k: string) => void;
  selected?: boolean;
};

export const Tab: React.FC<TabProps> = ({ title, children, onClick, id, selected }) =>selected ? <View>{children}</View> : null;
