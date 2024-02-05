import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Movie, Person, Search, SeeAll, Favourites} from "./screens"

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Movie"
          options={{ headerShown: false }}
          component={Movie}
        />
        <Stack.Screen
          name="Person"
          options={{ headerShown: false }}
          component={Person}
        />
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={Search}
        />
        <Stack.Screen
          name="SeeAll"
          options={{ headerShown: false }}
          component={SeeAll}
        />
        <Stack.Screen
          name="Favourites"
          options={{ headerShown: false }}
          component={Favourites}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack