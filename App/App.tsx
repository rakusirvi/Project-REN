import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Import your Provider and Hook
import { AuthContextProvider } from './src/Context/authContext';
// import { useAuth } from './src/Context/authContext';

import Home from './src/Pages/Home';
import Login from './src/Pages/Login';
import SignUp from './src/Pages/SignUp';
import Loader from './src/Components/Loader';

const Stack = createNativeStackNavigator();

// 2. Create a separate component for the actual navigation logic
const RootNavigator = () => {
  // const { isAuthenticated, isLoading, user } = useAuth();
  const isAuthenticated = true;
  const isLoading = false;
  const user = true;
  if (isLoading) {
    return <Loader />;
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
