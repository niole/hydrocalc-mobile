import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import fontSizes from '../constants/FontSizes';

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
    <View style={{flex:1}}>
      <View style={styles.tabs}>
        {React.Children.map(children, (child: JSX.Element) => (
          <Pressable
            style={
              selected === child.props.id ? [styles.selected, styles.tabbase] : styles.tabbase
            }
            onPress={() => setSelected(child.props.id)}
          >
          <Text style={
              selected === child.props.id ?
                [styles.baseText, styles.selectedText] :
                [styles.baseText, styles.text]
            }>
              {child.props.title}
            </Text>
          </Pressable>
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

const styles = StyleSheet.create({
  tabbase: {
    padding: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 15,
  },
  selected: {
    borderBottomColor: 'rgb(0, 122, 255)',
    borderBottomWidth: 3,
  },
  baseText: {
    fontSize: fontSizes.medium,
  },
  selectedText: {
    color: 'darkslategray',
  },
  text: {
    color: 'rgba(47, 79, 79, 0.5)',
  },
  tabs: {
    paddingBottom: 15,
    flexDirection: "row"
  }
});
