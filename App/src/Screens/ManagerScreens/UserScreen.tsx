import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { useAuth } from '../../Context/authContext';
export default function UserScreen() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>UserScreen</Text>
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

