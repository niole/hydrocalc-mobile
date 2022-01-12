import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, Pressable, Text, View } from 'react-native';

import { addSolution, removeSolution, updateSolution, SetSolutions, Solution } from '../globalState';
import { SolutionCard } from '../solutions';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';
import { NewSolution } from '../solutions/types';

const getId = () => `${Math.random()}`;
const createDefaultSolution = () => ({ id: getId(), name: 'untitled', inputs: [], targetNpk: { n:0, p:0, k:0 }});

type Props = {
  solutions: Solution[];
  setSolutions: SetSolutions;
};

export default function Solutions({ setSolutions, solutions }: RootTabScreenProps<'Solutions'> & Props) {
  return (
    <Screen title="solutions">
      <Pressable onPress={() => addSolution(setSolutions, solutions, createDefaultSolution())}>
        <Text>
          +
        </Text>
      </Pressable>
      <View style={styles.container}>
        <FlatList
          data={solutions}
          renderItem={({ item }) => (
            <SolutionCard
              onChange={updateSolution(setSolutions, solutions)}
              onRemove={handeRemoveSolution(setSolutions, solutions, item)}
              key={item.id}
              solution={item}
              />
          )
        }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

const handeRemoveSolution = (
  setSolutions: SetSolutions,
  solutions: Solution[],
  solution: Solution
) => () => removeSolution(setSolutions, solutions)(solution);

