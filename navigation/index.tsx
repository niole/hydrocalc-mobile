/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View, ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import fontSizes from '../constants/FontSizes';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Calculator from '../screens/Calculator';
import Solutions from '../screens/Solutions';
import MyRecipes from '../screens/MyRecipes';
import { useRecipes, useSolutions } from '../globalState';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

function TabNavigator() {
  const colorScheme = useColorScheme();
  const [solutions, setSolutions] = useSolutions();
  const [recipes, setRecipes] = useRecipes();

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Tab.Navigator
        initialRouteName="Calculator"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: fontSizes.medium,
            textTransform: 'capitalize'
          },
          tabBarActiveTintColor: 'darkslategray',
        }}>
        <Tab.Screen
          name="Calculator"
          options={{
            title: 'calculator',
          }}
          >
          {props => <Calculator
            recipes={recipes}
            setRecipes={setRecipes}
            solutions={solutions}
            {...props }
            />}
        </Tab.Screen>
        <Tab.Screen
          name="Solutions"
          options={{
            title: 'solutions',
          }}
        >
          {props => <Solutions solutions={solutions} setSolutions={setSolutions} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name="MyRecipes"
          options={{
            title: 'my recipes',
          }}
        >
          {props => <MyRecipes recipes={recipes} setRecipes={setRecipes} {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
