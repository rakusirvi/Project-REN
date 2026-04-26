import { ScrollView, View } from 'react-native';
import React from 'react';
import TopBar from '../../Components/TopBar';

export default function HomeScreen() {
  return (
    <View>
      <TopBar />
      <ScrollView></ScrollView>
    </View>
  );
}
