import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  Extrapolate,
  FadeIn,
  interpolate,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Define utility bill type
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type UtilityBill = {
  type: string;
  amount: number;
  icon: IconName;
};

// Utility bill data
const utilityBills: UtilityBill[] = [
  { type: 'Water', amount: 179, icon: 'water-outline' },
  { type: 'Electricity', amount: 342, icon: 'lightning-bolt' },
  { type: 'Heating', amount: 89, icon: 'fire' },
  { type: 'Internet', amount: 52, icon: 'wifi' }
];

// Calculate total amount
const totalAmount = utilityBills.reduce((sum, bill) => sum + bill.amount, 0);

export default function BillPaymentScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  
  // Animation values
  const headerScale = useSharedValue(0.95);
  const headerOpacity = useSharedValue(0);
  const notificationOpacity = useSharedValue(0);
  const billScales = Array(utilityBills.length).fill(0).map(() => useSharedValue(0.8));
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'MonsieurLaDoulaise': require('../assets/fonts/MonsieurLaDoulaise-Regular.ttf'),
  });

  useEffect(() => {
    // Animate header
    headerOpacity.value = withTiming(1, { duration: 500 });
    headerScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    
    // Animate notification
    notificationOpacity.value = withDelay(800, withSpring(1, { damping: 20, stiffness: 90 }));
    
    // Animate bill cards with sequential bounce effect
    billScales.forEach((scale, index) => {
      scale.value = withDelay(300 + index * 100, withSpring(1, { damping: 8, stiffness: 100 }));
    });
  }, []);
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ scale: headerScale.value }]
    };
  });
  
  const notificationAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: notificationOpacity.value,
      transform: [{ 
        translateY: interpolate(
          notificationOpacity.value, 
          [0, 1], 
          [10, 0], 
          Extrapolate.CLAMP
        ) 
      }]
    };
  });
  
  // Generate animated styles for bill cards
  const getBillAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      return {
        transform: [{ scale: billScales[index].value }]
      };
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  // Handle back button press
  const handleBackPress = () => {
    router.back();
  };

  // Navigate to utility detail page
  const navigateToUtilityDetail = (utility: UtilityBill) => {
    router.push({
      pathname: '/utility-detail',
      params: { 
        type: utility.type,
        amount: utility.amount,
        icon: utility.icon
      }
    });
  };
  
  // Navigate to payment confirmation
  const navigateToPayment = () => {
    router.push({
      pathname: '/payment-confirmation',
      params: { 
        type: 'bill',
        amount: totalAmount.toFixed(1)
      }
    });
  };
  
  // Navigate to notification detail
  const navigateToNotification = () => {
    router.push('/notification-detail');
  };
  
  // Navigate to payment history
  const navigateToPaymentHistory = () => {
    router.push('/payment-history');
  };
  
  // Navigate to home
  const navigateToHome = () => {
    // Stay on the current page or refresh it
    // No navigation needed as we're already on the home page
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
      iconBackground: '#ffebb7', // Match the exact color from the image
      iconColor: isDark ? '#333333' : '#333333',
      border: isDark ? '#3d3d3d' : '#E0E0E0',
      notification: isDark ? '#333333' : '#f0f0f0',
      gold: '#FFD700',
      navIcon: isDark ? '#a0a0a0' : '#666666',
      navIconActive: isDark ? '#ffffff' : '#333333',
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
        
        {/* Back button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>← Back</Text>
        </TouchableOpacity>
        
        <Animated.View 
          style={[styles.headerCard, { backgroundColor: colors.darkCard }, headerAnimatedStyle]}
        >
          <View style={styles.headerContent}>
            <View style={styles.monthContainer}>
              <Text style={[styles.monthText, { color: colors.textSecondary }]}>August</Text>
              <Text style={[styles.dueText, { color: colors.textSecondary }]}>
                <MaterialCommunityIcons name="clock-outline" size={14} color={colors.textSecondary} style={styles.clockIcon} />
                Due in 3 days
              </Text>
            </View>
            
            <Animated.Text 
              style={[styles.totalAmount, { color: colors.accent }]}
              entering={SlideInRight.delay(300).duration(500)}
            >
              $390.81
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
        
        <View style={styles.billsGrid}>
          {utilityBills.map((bill, index) => (
            <Animated.View 
              key={bill.type}
              style={[
                styles.billCard, 
                { backgroundColor: colors.card },
                getBillAnimatedStyle(index)
              ]}
            >
              <TouchableOpacity 
                style={styles.billCardClickable}
                activeOpacity={0.7}
                onPress={() => navigateToUtilityDetail(bill)}
              >
                <View style={[styles.billIconContainer, { backgroundColor: colors.iconBackground }]}>
                  <MaterialCommunityIcons 
                    name={bill.icon} 
                    size={20} 
                    color="#666666"
                    style={styles.iconStyle}
                  />
                </View>
                <Text style={[styles.billAmount, { color: colors.text }]}>${bill.amount}</Text>
                <Text style={[styles.billType, { color: colors.textSecondary }]}>{bill.type}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        
        <View style={styles.notificationSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.textSecondary }]}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <Animated.View 
            style={[
              styles.notificationCard, 
              { backgroundColor: colors.card },
              notificationAnimatedStyle
            ]}
          >
            <TouchableOpacity 
              style={styles.notificationCardContent}
              activeOpacity={0.7}
              onPress={navigateToNotification}
            >
              <View style={styles.notificationIconContainer}>
                <MaterialCommunityIcons name="bell-outline" size={22} color={colors.text} />
              </View>
              <Text style={[styles.notificationText, { color: colors.text }]}>You have overpayment.</Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
      
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
            color={colors.navIconActive}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.navIconActive }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToNotification}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="bell-outline" 
            size={24} 
            color={colors.navIcon}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.navIcon }]}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToPaymentHistory}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="credit-card-outline" 
            size={24} 
            color={colors.navIcon}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.navIcon }]}>Payments</Text>
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
  titleGradientContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  backButtonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 4,
  },
  totalAmount: {
    fontFamily: 'SpaceMono',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  billsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  billCard: {
    width: '48%',
    borderRadius: 20,
    padding: 0,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  billCardClickable: {
    padding: 18,
    width: '100%',
    height: '100%',
  },
  billIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  iconStyle: {
    opacity: 0.85,
  },
  billAmount: {
    fontFamily: 'SpaceMono',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  billType: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
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
  sectionTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    fontWeight: '500',
  },
  seeAllText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  notificationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  notificationIconContainer: {
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    flex: 1,
  },
  notificationArrow: {
    padding: 5,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
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