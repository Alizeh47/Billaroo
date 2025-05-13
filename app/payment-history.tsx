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

// Define payment history item type
type PaymentItem = {
  id: string;
  month: string;
  utility: string;
  amount: number;
};

// Payment history data
const paymentHistory: PaymentItem[] = [
  { id: '1', month: 'September', utility: 'Heating', amount: 200 },
  { id: '2', month: 'September', utility: 'Water', amount: 100 },
  { id: '3', month: 'September', utility: 'Internet', amount: 30 },
  { id: '4', month: 'August', utility: 'Heating', amount: 10 },
  { id: '5', month: 'August', utility: 'Water', amount: 160 },
];

export default function PaymentHistoryScreen() {
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
  
  // Navigation functions
  const navigateToHome = () => {
    router.push('/bill-payment');
  };
  
  const navigateToNotification = () => {
    router.push('/notification-detail');
  };

  // Get theme appropriate colors
  const getThemeColors = () => {
    return {
      background: isDark ? '#1c1c1e' : '#f7f7f0',
      card: isDark ? '#2c2c2e' : 'white',
      darkCard: isDark ? '#291800' : '#291800', // Always dark brown
      text: isDark ? '#ffffff' : '#333333',
      activeText: isDark ? '#ffffff' : '#000000',
      textSecondary: isDark ? '#a0a0a0' : '#888888',
      accent: '#FFEBB7',
      highlightedText: '#FFD066', // Gold color for highlighted text
    };
  };

  const colors = getThemeColors();

  // Render a payment history item
  const renderPaymentItem = ({ item }: { item: PaymentItem }) => (
    <View style={[styles.paymentItem, { backgroundColor: colors.card }]}>
      <Text style={[styles.paymentDescription, { color: colors.text }]}>
        {item.month} {item.utility}
      </Text>
      <Text style={[styles.paymentAmount, { color: colors.text }]}>
        ${item.amount}
      </Text>
    </View>
  );

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
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBackPress}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.headerTitle, { color: colors.highlightedText }]}>
          Payments
        </Text>
        
        <Animated.View 
          style={[styles.statusCard, { backgroundColor: colors.darkCard }]}
          entering={FadeIn.delay(100).duration(500)}
        >
          <Text style={styles.statusText}>
            All your payment are on time. Thank you!
          </Text>
        </Animated.View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          History of payments
        </Text>
        
        {paymentHistory.map((item) => (
          <View 
            key={item.id}
            style={[styles.paymentItem, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.paymentDescription, { color: colors.text }]}>
              {item.month} {item.utility}
            </Text>
            <Text style={[styles.paymentAmount, { color: colors.text }]}>
              ${item.amount}
            </Text>
          </View>
        ))}
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
            color={colors.textSecondary}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.textSecondary }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={navigateToNotification}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="bell-outline" 
            size={24} 
            color={colors.textSecondary}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.textSecondary }]}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons 
            name="credit-card-outline" 
            size={24} 
            color={colors.activeText}
            style={styles.navIcon}
          />
          <Text style={[styles.navText, { color: colors.activeText }]}>Payments</Text>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  headerTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  statusCard: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  statusText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentDescription: {
    fontFamily: 'SpaceMono',
    fontSize: 15,
  },
  paymentAmount: {
    fontFamily: 'SpaceMono',
    fontSize: 15,
    fontWeight: '500',
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