import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator } from 'react-native';
// 1. Import your Provider and Hook
import { AuthContextProvider } from './src/Context/authContext';
import { useAuth } from './src/Context/authContext';

import Home from './src/Pages/Home';
import Login from './src/Pages/Login';
import SignUp from './src/Pages/SignUp';

const Stack = createNativeStackNavigator();

// 2. Create a separate component for the actual navigation logic
const RootNavigator = () => {
  const { isAuthenticated, getMe, isLoading, user } = useAuth();

  useEffect(() => {
    getMe();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          gap: 15,
        }}
      >
        <ActivityIndicator size="large" color="#444" />
        <Text style={{ color: '#fff' }}>Please Wait Loading ...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated && user ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignUp"
              component={SignUp}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 3. The main App component ONLY provides the context
const App = () => {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
};

export default App;
