import * as React from 'react';
import { Pressable, Button, Linking, View, Text } from 'react-native';
import { NPK, Brand } from '../globalState';

type Props = {
  name: string;
  brand?: Brand;
  npk: NPK;
};

export const SolutionListItem: React.FC<Props> = ({ name, brand, npk }) => (
  <View>
    <Text style={{ fontSize: 24 }}>{name}</Text>
    {brand && (
      <>
      <Text style={{fontSize: 18 }}>{brand.name}</Text>
      </>
    )}
    <Text style={{ fontSize:16}}>{npk.n}-{npk.p}-{npk.k}</Text>
    {brand && <Pressable style={{ flexShrink: 1}} onPress={() => brand ? Linking.openURL(brand.site) : null}>
    <Text style={{color: 'blue'}}>check out the product</Text>
  </Pressable>}
  </View>
);
