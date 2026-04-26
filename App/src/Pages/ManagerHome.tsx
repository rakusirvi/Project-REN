import { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import ManagerScreen from '../Screens/ManagerScreens/main';

const { width } = Dimensions.get('window');

// ── Screens ──────────────────────────────────────────
const renderScene = SceneMap({
  home: ManagerScreen.HomeScreen,
  chats: ManagerScreen.ChatScreen,
  leave: ManagerScreen.LeaveScreen,
  user: ManagerScreen.UserScreen,
});
// ── Tab Icons ─────────────────────────────────────────
const TABS = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'chats', label: 'Chats', icon: '💬' },
  { key: 'leave', label: 'Leave', icon: '🚪' },
  { key: 'user', label: 'User', icon: '👤' },
];
// ── Custom Bottom Tab Bar ─────────────────────────────
const BottomTabBar = ({
  index,
  setIndex,
}: {
  index: number;
  setIndex: (index: number) => void;
}) => {
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab, i) => {
        const isActive = i === index;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => setIndex(i)}
            activeOpacity={0.7}
          >
            {/* Active top line indicator */}
            <View
              style={[styles.indicator, isActive && styles.indicatorActive]}
            />

            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ── Main App ──────────────────────────────────────────
export default function Home() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(TABS);

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        renderTabBar={() => null} // Hide default top tab bar
        swipeEnabled={true}
      />

      {/* Our Custom Bottom Bar */}
      <BottomTabBar index={index} setIndex={setIndex} />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bottom bar container
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  // Each tab button
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
  },

  // Top active line
  indicator: {
    position: 'absolute',
    top: 0,
    width: '60%',
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    backgroundColor: '#405DE6',
  },

  tabIcon: {
    fontSize: 22,
    marginBottom: 3,
    opacity: 0.4,
  },
  tabIconActive: {
    opacity: 1,
  },

  tabLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#405DE6',
    fontWeight: '700',
  },
});
