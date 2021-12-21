import * as React from 'react';
import { Text, View } from 'react-native';
import { NPK, Solution } from '../globalState';
import { NpkLabel } from '../components';

type Props = {
  solution: Solution;
};

export const SolutionCard: React.FC<Props> = ({ solution }) => (
  <View key={solution.name}>
    <Text>{solution.name}</Text>
    {solution.inputs.map((i, index) =>
      <InputCard key={`${i.solution.name}-${i.frac}-${index}`} frac={i.frac} {...i.solution} />
    )}
  </View>
);

const InputCard: React.FC<{ name: string, brand?: string, npk: NPK, ec: number, frac: number }> = ({
  name, brand, npk, ec, frac
}) => (
  <View key={name}>
    <Text>{name} </Text>
    {brand && <Text>{brand}</Text>}
    <NpkLabel npk={npk} />
    <Text>{ec}</Text>
    <Text>{frac}</Text>
  </View>
);
