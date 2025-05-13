import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    FadeIn
} from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function NotificationDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'MonsieurLaDoulaise': require('../assets/fonts/MonsieurLaDoulaise-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Handle back button press
  const handleBackPress = () => {
    router.back();
  };
  
  // Handle mark as read
  const handleMarkAsRead = () => {
    // Here you would add code to mark notification as read
    router.back();
  };
  
  // Navigation functions
  const navigateToHome = () => {
    router.push('/bill-payment');
  };
  
  const navigateToPaymentHistory = () => {
    router.push('/payment-history');
  };

  // Get theme appropriate colors
  const getThemeColors = () => {
    return {
      background: isDark ? '#1c1c1e' : '#f7f7f0',
      card: isDark ? '#2c2c2e' : 'white',
      text: isDark ? '#ffffff' : '#333333',
      textSecondary: isDark ? '#a0a0a0' : '#888888',
      textMuted: isDark ? '#909090' : '#97979F',
      accent: '#FFEBB7',
      markButton: '#FFEBB7',
      markButtonText: '#333333',
      importantText: '#E44E4E',
    };
  };

  const colors = getThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Billaroo Title with Gradient */}
      <Animated.View
        style={styles.titleGradientContainer}
        entering={FadeIn.delay(200).duration(500)}
      >
        <Text style={styles.gradientTextContainer}>
          <Text style={[styles.gradientText, { color: '#7AD8C2' }]}>Bill</Text>
          <Text style={[styles.gradientText, { color: '#FFD066' }]}>aroo</Text>
        </Text>
      </Animated.View>
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Notifications
        </Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[styles.notificationContainer, { backgroundColor: colors.card }]}
          entering={FadeIn.delay(100).duration(500)}
        >
          <Text style={[styles.notificationTitle, { color: colors.text }]}>
            <Text style={[styles.importantText, { color: colors.importantText }]}>Important: </Text>
            Water outage planned
          </Text>
          
          <View style={styles.notificationContent}>
            <Text style={[styles.paragraphText, { color: colors.textMuted }]}>
              We regret to inform you that there will be a scheduled water outage in your area tomorrow. The outage will begin at 9:00 AM and is expected to last for approximately 4 hours. During this time, you will not have access to water. This outage is necessary for us to make important repairs to the water main. We apologize for any inconvenience this may cause and thank you for your patience and understanding.
            </Text>
            
            <Text style={[styles.paragraphText, { color: colors.textMuted, marginTop: 15 }]}>
              If you have any questions or concerns, please contact our customer service department at 555-555-5555.
            </Text>
            
            <Text style={[styles.paragraphText, { color: colors.textMuted, marginTop: 15 }]}>
              Thank you
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
      
      <TouchableOpacity 
        style={[styles.markButton, { backgroundColor: colors.markButton }]}
        onPress={handleMarkAsRead}
        activeOpacity={0.8}
      >
        <Text style={[styles.markButtonText, { color: colors.markButtonText }]}>Mark as read</Text>
      </TouchableOpacity>
      
      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToHome}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="home" 
            size={24} 
            color={colors.textSecondary}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.textSecondary }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
        >
          <MaterialCommunityIcons 
            name="bell-outline" 
            size={24} 
            color={colors.text}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.text }]}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToPaymentHistory}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="credit-card-outline" 
            size={24} 
            color={colors.textSecondary}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.textSecondary }]}>Payments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleGradientContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  gradientTextContainer: {
    fontSize: 36,
    letterSpacing: 1,
  },
  gradientText: {
    fontFamily: 'MonsieurLaDoulaise',
    fontSize: 36,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    fontWeight: '500',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    paddingTop: 22,
    paddingBottom: 15,
    paddingHorizontal: 18,
  },
  notificationTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  importantText: {
    fontWeight: 'bold',
  },
  notificationContent: {
    paddingTop: 5,
  },
  paragraphText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    lineHeight: 20,
  },
  markButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 80, // Increased to account for bottom nav
  },
  markButtonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Bottom navigation styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    marginBottom: 2,
  },
  navText: {
    fontFamily: 'SpaceMono',
    fontSize: 12,
  },
}); 