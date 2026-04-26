import React from 'react';
import { useAuth } from '../Context/authContext';
import ManagerHome from './ManagerHome';
import AdminHome from './AdminHome';
import EmployeeHome from './EmployeeHome';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#405DE6" />
      </View>
    );
  }

  // 2. Return the entirely different component based on role
  if (user?.role === 'manager') {
    return <ManagerHome />;
  }

  if (user?.role === 'admin') {
    return <AdminHome />;
  }

  if (user?.role === 'employee') {
    return <EmployeeHome />;
  }

  // 3. Optional: Fallback for unexpected roles
  return (
    <View>
      <Text>Unauthorized Access</Text>
    </View>
  );
}

// import React, { useState, useMemo } from 'react';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   StyleSheet,
// } from 'react-native';

// import ManagerScreen from '../Screens/ManagerScreens/main';
// import AdminScreen from '../Screens/AdminScreens/main';
// import { useAuth } from '../Context/authContext';

// const { width } = Dimensions.get('window');

// // 1. Keep the base TABS definition static or functional
// const getTabs = () => [
//   { key: 'home', label: 'Home', icon: '🏠' },
//   { key: 'chats', label: 'Chats', icon: '💬' },
//   { key: 'leave', label: 'Leave', icon: '🚪' },
//   { key: 'manager', label: 'Managers', icon: '👤' },
// ];

// // 2. Extracted Bottom Bar (Passed tabs as a prop now)
// const BottomTabBar = ({
//   index,
//   setIndex,
//   tabs,
// }: {
//   index: number;
//   setIndex: (index: number) => void;
//   tabs: { key: string; label: string; icon: string }[];
// }) => {
//   return (
//     <View style={styles.tabBar}>
//       {tabs.map(
//         (tab: { key: string; label: string; icon: string }, i: number) => {
//           const isActive = i === index;
//           return (
//             <TouchableOpacity
//               key={tab.key}
//               style={styles.tabItem}
//               onPress={() => setIndex(i)}
//               activeOpacity={0.7}
//             >
//               <View
//                 style={[styles.indicator, isActive && styles.indicatorActive]}
//               />
//               <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
//                 {tab.icon}
//               </Text>
//               <Text
//                 style={[styles.tabLabel, isActive && styles.tabLabelActive]}
//               >
//                 {tab.label}
//               </Text>
//             </TouchableOpacity>
//           );
//         },
//       )}
//     </View>
//   );
// };

// export default function Home() {
//   const { user } = useAuth();
//   const [index, setIndex] = useState(0);

//   // 3. Move Logic INSIDE the component using useMemo
//   // This ensures the scenes update correctly when the user role changes
//   const { renderScene, routes } = useMemo(() => {
//     const isManager = user?.role === 'manager';

//     // Choose which screen set to use
//     const Screens = isManager ? ManagerScreen : AdminScreen;

//     return {
//       routes: getTabs(),
//       renderScene: SceneMap({
//         home: Screens.HomeScreen,
//         chats: Screens.ChatScreen,
//         leave: Screens.LeaveScreen,
//         manager: Screens.UserScreen,
//       }),
//     };
//   }, [user]);

//   if (!user) {
//     return (
//       <View style={styles.scene}>
//         <Text>Loading Session...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width }}
//         renderTabBar={() => null}
//         swipeEnabled={true}
//       />

//       <BottomTabBar index={index} setIndex={setIndex} tabs={routes} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   // Bottom bar container
//   tabBar: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#fff',
//     borderTopWidth: 0.5,
//     borderTopColor: '#e0e0e0',
//     elevation: 10, // Android shadow
//     shadowColor: '#000', // iOS shadow
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },

//   // Each tab button
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: 6,
//   },

//   // Top active line
//   indicator: {
//     position: 'absolute',
//     top: 0,
//     width: '60%',
//     height: 3,
//     borderRadius: 2,
//     backgroundColor: 'transparent',
//   },
//   indicatorActive: {
//     backgroundColor: '#405DE6',
//   },

//   tabIcon: {
//     fontSize: 22,
//     marginBottom: 3,
//     opacity: 0.4,
//   },
//   tabIconActive: {
//     opacity: 1,
//   },

//   tabLabel: {
//     fontSize: 11,
//     color: '#999',
//     fontWeight: '500',
//   },
//   tabLabelActive: {
//     color: '#405DE6',
//     fontWeight: '700',
//   },
// });
