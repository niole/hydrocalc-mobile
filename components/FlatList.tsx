import * as React from 'react';
import { StyleSheet, FlatList as ReactFlatList, View } from 'react-native';

type Props = {
  data: any[];
  itemRenderer: React.FC<{ item: any }>;
}

export const FlatList: React.FC<Props> = ({ data, itemRenderer }) => (
  <View style={styles.container}>
    <ReactFlatList
      data={data}
      renderItem={itemRenderer}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 }
});
