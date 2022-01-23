import * as React from 'react';
import { StyleSheet, FlatList as ReactFlatList, View } from 'react-native';

type Props = {
  data: any[];
  renderItem: React.FC<{ item: any }>;
}

export const FlatList: React.FC<Props> = ({ data, renderItem }) => (
  <View style={styles.container}>
    <ReactFlatList
      data={data}
      renderItem={renderItem}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 }
});
