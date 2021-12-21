import * as React from 'react';
import { Text } from 'react-native';
import { NPK } from '../globalState';

type Props = {
  npk: NPK;
};

export const NpkLabel: React.FC<Props> = ({ npk }) => (
  <Text>{npk.n}-{npk.p}-{npk.k}</Text>
);

