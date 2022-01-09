import * as React from 'react';
import { Text, View } from 'react-native';
import { NPK, Solution } from '../globalState';
import { LabelValue, Card, NpkLabel } from '../components';

type Props = {
  solution: Solution;
};

export const SolutionCard: React.FC<Props> = ({ solution }) => (
  <Card
    key={solution.name}
    title={solution.name}
    onRemove={() => undefined}
  >
    {solution.inputs.map((i, index) =>
      <InputCard key={`${i.solution.name}-${i.frac}-${index}`} frac={i.frac} {...i.solution} />
    )}
  </Card>
);

const InputCard: React.FC<{ name: string, brand?: string, npk: NPK, ec: number, frac: number }> = ({
  name, brand, npk, ec, frac
}) => (
  <View key={name}>
    <Text>{name} </Text>
    {brand && <LabelValue label="brand" value={brand} />}
    <NpkLabel npk={npk} />
    <LabelValue label="ec" value={`${ec}`} />
    <LabelValue label="frac" value={`${frac}`} />
  </View>
);