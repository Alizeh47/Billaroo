import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

// Progress bar component
const ProgressBar = ({ 
  label, 
  value, 
  color, 
  backgroundColor, 
  textColor 
}: { 
  label: string, 
  value: number, 
  color: string, 
  backgroundColor: string,
  textColor: string
}) => {
  return (
    <View style={styles.progressRow}>
      <Text style={[styles.progressLabel, { color: textColor }]}>{label}</Text>
      <View style={[styles.progressContainer, { backgroundColor }]}>
        <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.progressValue, { color: textColor }]}>{value}%</Text>
    </View>
  );
};

export default function UtilityDetailScreen() {
  // Get params from navigation
  const params = useLocalSearchParams();
  const { type = 'Water', amount = '179', icon = 'water-outline' } = params;
  
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
  
  // Navigate to payment confirmation
  const navigateToPayment = () => {
    const utilityType = typeof type === 'string' ? type.toLowerCase() : Array.isArray(type) ? type[0].toLowerCase() : 'utility';
    
    router.push({
      pathname: '/payment-confirmation',
      params: { 
        type: utilityType,
        amount: amount
      }
    });
  };

  // Navigate to notification detail
  const navigateToNotification = () => {
    router.push('/notification-detail');
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
      darkCard: isDark ? '#212123' : '#1c1c1e',
      text: isDark ? '#ffffff' : '#333333',
      textSecondary: isDark ? '#a0a0a0' : '#888888',
      accent: '#FFEBB7',
      progressBar1: isDark ? '#7AD8C2' : '#7AD8C2',
      progressBar2: '#FFD066',
      progressBar3: '#FFEBB7',
      progressBarBg: isDark ? '#3d3d3d' : '#E0E0E0',
      border: isDark ? '#3d3d3d' : '#E0E0E0',
    };
  };

  const colors = getThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{type}</Text>
          <View style={styles.headerRight}></View>
        </View>
        
        <Animated.View 
          style={[styles.headerCard, { backgroundColor: colors.darkCard }]}
          entering={FadeIn.delay(100).duration(500)}
        >
          <View style={styles.headerContent}>
            <View style={styles.monthContainer}>
              <Text style={[styles.monthText, { color: colors.textSecondary }]}>August</Text>
              <Text style={[styles.dueText, { color: colors.textSecondary }]}>
                Due in 3 days
              </Text>
            </View>
            
            <Animated.Text 
              style={[styles.totalAmount, { color: colors.accent }]}
              entering={FadeIn.delay(300).duration(500)}
            >
              ${amount}
            </Animated.Text>
            
            <TouchableOpacity 
              style={styles.payButton}
              activeOpacity={0.8}
              onPress={navigateToPayment}
            >
              <Text style={styles.payButtonText}>Pay now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <View style={styles.billingSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your billing info</Text>
          
          <View style={styles.progressSection}>
            <ProgressBar 
              label="Cost" 
              value={20} 
              color={colors.progressBar1} 
              backgroundColor={colors.progressBarBg}
              textColor={colors.text}
            />
            
            <ProgressBar 
              label="Consumption" 
              value={61} 
              color={colors.progressBar2} 
              backgroundColor={colors.progressBarBg}
              textColor={colors.text}
            />
            
            <ProgressBar 
              label="Savings" 
              value={84} 
              color={colors.progressBar3} 
              backgroundColor={colors.progressBarBg}
              textColor={colors.text}
            />
          </View>
        </View>
        
        <View style={styles.notificationSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.textSecondary }]}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.notificationCard, { backgroundColor: colors.card }]}
            activeOpacity={0.7}
            onPress={navigateToNotification}
          >
            <View style={styles.notificationIconContainer}>
              <MaterialCommunityIcons name="bell-ring-outline" size={22} color={colors.text} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: colors.text }]}>
                <Text style={styles.importantText}>IMPORTANT: </Text>
                {type} outage!
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.notificationCard, { backgroundColor: colors.card }]}
            activeOpacity={0.7}
            onPress={navigateToNotification}
          >
            <View style={styles.notificationIconContainer}>
              <MaterialCommunityIcons name="lightning-bolt" size={22} color={colors.text} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationText, { color: colors.text }]}>
                Energy support system available.
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToHome}
        >
          <MaterialCommunityIcons 
            name="home" 
            size={24} 
            color={colors.text}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.text }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToNotification}
        >
          <MaterialCommunityIcons 
            name="bell-outline" 
            size={24} 
            color={colors.textSecondary}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.textSecondary }]}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToPaymentHistory}
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80, // Account for bottom nav
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    width: 30, // To balance the header
  },
  headerCard: {
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  headerContent: {
    padding: 20,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  dueText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
  },
  totalAmount: {
    fontFamily: 'SpaceMono',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  payButton: {
    backgroundColor: '#FFEBB7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  billingSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  progressSection: {
    marginTop: 5,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    width: 95,
  },
  progressContainer: {
    height: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressValue: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    width: 40,
    textAlign: 'right',
  },
  notificationSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  notificationIconContainer: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
  },
  importantText: {
    fontWeight: 'bold',
    color: '#E44E4E',
  },
  notificationText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
  },
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