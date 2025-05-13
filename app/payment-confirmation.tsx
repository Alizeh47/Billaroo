import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown
} from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function PaymentConfirmationScreen() {
  // Get params from navigation
  const params = useLocalSearchParams();
  const { type = 'water', amount = '390.8' } = params;
  
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
  
  // Handle pay now action
  const handlePayNow = () => {
    // Here you would add actual payment processing
    // Navigate to payment history page
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
      payButton: '#291800',
      payButtonText: '#ffffff',
      circleBackground: '#FFEBB7',
    };
  };

  const colors = getThemeColors();
  
  // Get current month and year
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Animated.View
          style={styles.titleContainer}
          entering={FadeInDown.delay(100).duration(500).springify()}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Payment for {type}
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            November 2023
          </Text>
        </Animated.View>
        
        <Animated.View 
          style={[styles.amountCircle, { backgroundColor: colors.circleBackground }]}
          entering={FadeIn.delay(300).duration(700)}
        >
          <MaterialCommunityIcons 
            name="credit-card-outline" 
            size={32} 
            color="#291800" 
            style={styles.cardIcon}
          />
          <View style={styles.amountContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <Text style={styles.amount}>{amount}</Text>
          </View>
        </Animated.View>
      </View>
      
      <Animated.View 
        style={styles.buttonContainer}
        entering={FadeIn.delay(600).duration(500)}
      >
        <TouchableOpacity 
          style={[styles.payButton, { backgroundColor: colors.payButton }]}
          onPress={handlePayNow}
          activeOpacity={0.8}
        >
          <Text style={[styles.payButtonText, { color: colors.payButtonText }]}>Pay now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    marginTop: 6,
    textAlign: 'center',
  },
  amountCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dollarSign: {
    fontFamily: 'SpaceMono',
    fontSize: 22,
    color: '#291800',
    marginTop: 6,
    marginRight: 2,
  },
  amount: {
    fontFamily: 'SpaceMono',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#291800',
  },
  buttonContainer: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  payButton: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    fontWeight: '500',
  }
}); 