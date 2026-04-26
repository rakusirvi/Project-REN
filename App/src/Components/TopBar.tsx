import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

const TopBar = () => {
  const [greeting, setGreeting] = useState('Good Morning');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = new Date();

    const hour = now.getHours();
    if (hour < 12) setGreeting('Good Morning ');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Manual Date Formatting
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayName = weekdays[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();

    setDateStr(`${dayName}, ${date} ${monthName}`);
  }, []);

  const [firstWord, secondWord] = greeting.split(' ');

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.topRow}>
        
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.menuLine} />
          <View style={[styles.menuLine, { width: 14 }]} />
        </TouchableOpacity>

        {/* Profile with Status Indicator */}
        <TouchableOpacity style={styles.profileContainer}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitials}>AD</Text>
          </View>
          <View style={styles.onlineBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.dateLabel}>{dateStr}</Text>
          <Text style={styles.mainGreeting}>
            <Text style={styles.lightText}>{firstWord}, </Text>
            <Text style={styles.boldText}>{secondWord}!</Text>
          </Text>
        </View>

        {/* Optional Action Button (like a notification bell) */}
        <TouchableOpacity style={styles.notificationBtn}>
          <Text style={{ fontSize: 20 }}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingHorizontal: 24,
    paddingBottom: 25, // Increased padding for "Long Height"
    borderBottomLeftRadius: 30, // Rounded corners for a modern feel
    borderBottomRightRadius: 30,
    // Soft Elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  menuLine: {
    width: 24,
    height: 3,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginVertical: 2,
  },
  dateLabel: {
    fontSize: 13,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainGreeting: {
    fontSize: 28, // Large Bold Title
    letterSpacing: -0.5,
  },
  lightText: {
    fontWeight: '300',
    color: '#1a1a1a',
  },
  boldText: {
    fontWeight: '800',
    color: '#405DE6',
  },
  profileContainer: {
    position: 'relative',
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e6ff',
  },
  profileInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#405DE6',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationBtn: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 12,
  },
});
