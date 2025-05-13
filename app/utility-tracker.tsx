import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  Animated as RNAnimated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Utility types options
const UTILITY_TYPES = [
  'Electricity',
  'Water',
  'Gas',
  'Internet',
  'Rent',
  'Phone',
  'Cable TV',
  'Other'
];

// Payment periodicity options
const PAYMENT_PERIODS = ['Weekly', 'Monthly', 'Annual'];

export default function UtilityTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  
  // State management
  const [amount, setAmount] = useState(90);
  const [utilityType, setUtilityType] = useState('');
  const [showUtilityOptions, setShowUtilityOptions] = useState(false);
  const [paymentPeriod, setPaymentPeriod] = useState('Monthly');
  const [splitBill, setSplitBill] = useState(true);
  
  // Animation for dropdown
  const dropdownAnimation = useRef(new RNAnimated.Value(0)).current;
  
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

  // Handle adding utility
  const handleAddUtility = () => {
    router.push('/bill-payment');
  };

  // Handle slider change
  const handleSliderChange = (value: number) => {
    setAmount(Math.round(value));
  };
  
  // Handle utility type selection
  const handleUtilitySelect = (type: string) => {
    setUtilityType(type);
    setShowUtilityOptions(false);
  };
  
  // Handle payment period selection
  const handlePeriodSelect = (period: string) => {
    setPaymentPeriod(period);
  };
  
  // Handle split bill toggle
  const handleSplitBillToggle = (value: boolean) => {
    setSplitBill(value);
  };

  // Get theme appropriate colors
  const getThemeColors = () => {
    return {
      background: isDark ? '#1c1c1e' : '#f7f7f0',
      card: isDark ? '#2c2c2e' : 'white',
      text: isDark ? '#ffffff' : '#333333',
      textSecondary: isDark ? '#a0a0a0' : '#888888',
      accent: '#FFEBB7',
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>← Back</Text>
        </TouchableOpacity>
        
        {/* Billaroo Title with Gradient */}
        <View style={styles.titleGradientContainer}>
          <Text style={styles.gradientTextContainer}>
            <Text style={[styles.gradientText, { color: '#7AD8C2' }]}>Bill</Text>
            <Text style={[styles.gradientText, { color: '#FFD066' }]}>aroo</Text>
          </Text>
        </View>
        
        <Animated.View 
          style={styles.contentContainer}
          entering={FadeIn.delay(200).duration(500)}
        >
          {/* Space for horizontal illustration */}
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../assets/images/city.png')}
              style={styles.horizontalIllustration}
              resizeMode="cover" 
            />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Utility Tracker</Text>
            <View style={styles.titleUnderline}></View>
          </View>
          
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Add your utilities here</Text>
          
          <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Utility type</Text>
              <TouchableOpacity 
                style={[styles.selectButton, { borderColor: colors.border }]}
                onPress={() => setShowUtilityOptions(true)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.selectButtonText, 
                  { color: utilityType ? colors.text : colors.textSecondary }
                ]}>
                  {utilityType || 'Select'}
                </Text>
                <Text style={[styles.dropdownIcon, { color: colors.textSecondary }]}>▼</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Payment periodicity</Text>
              <View style={styles.buttonGroup}>
                {PAYMENT_PERIODS.map((period) => (
                  <TouchableOpacity 
                    key={period}
                    style={[
                      styles.periodButton, 
                      { backgroundColor: isDark ? '#3d3d3d' : '#f7f7f0' },
                      paymentPeriod === period && styles.periodButtonActive
                    ]}
                    onPress={() => handlePeriodSelect(period)}
                    activeOpacity={0.7}
                  >
                    <Text 
                      style={[
                        styles.periodButtonText, 
                        { color: colors.textSecondary },
                        paymentPeriod === period && [styles.periodButtonTextActive, { color: colors.text }]
                      ]}
                    >
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Amount to pay</Text>
              {Platform.OS === 'web' ? (
                <View style={styles.webSliderContainer}>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={amount}
                    onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                    style={styles.webSlider}
                  />
                  <style>{`
                    input[type=range] {
                      -webkit-appearance: none;
                      width: 100%;
                      height: 10px;
                      border-radius: 5px;
                      background: ${isDark ? '#3d3d3d' : '#E0E0E0'};
                      outline: none;
                    }
                    input[type=range]::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #FFEBB7;
                      cursor: pointer;
                    }
                    input[type=range]::-moz-range-thumb {
                      width: 20px;
                      height: 20px;
                      border-radius: 50%;
                      background: #FFEBB7;
                      cursor: pointer;
                    }
                  `}</style>
                </View>
              ) : (
                <View style={styles.customSliderContainer}>
                  <View style={[styles.customSliderTrack, { backgroundColor: colors.border }]}>
                    <View 
                      style={[
                        styles.customSliderFill, 
                        { width: `${(amount / 200) * 100}%` }
                      ]} 
                    />
                  </View>
                  <TouchableOpacity 
                    style={[
                      styles.customSliderThumb,
                      { left: `${(amount / 200) * 100}%` }
                    ]}
                  />
                </View>
              )}
              <Text style={[styles.amountText, { color: colors.text }]}>${amount}</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Split bill</Text>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkboxRow}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox, 
                      { borderColor: colors.border, backgroundColor: colors.card },
                      splitBill && styles.checkboxChecked
                    ]}
                    onPress={() => handleSplitBillToggle(true)}
                  >
                    {splitBill && <Text style={styles.checkMark}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={[styles.checkboxLabel, { color: colors.text }]}>Yes</Text>
                </View>
                
                <View style={styles.checkboxRow}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox, 
                      { borderColor: colors.border, backgroundColor: colors.card },
                      !splitBill && styles.checkboxChecked
                    ]}
                    onPress={() => handleSplitBillToggle(false)}
                  >
                    {!splitBill && <Text style={styles.checkMark}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={[styles.checkboxLabel, { color: colors.text }]}>No</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddUtility}
              activeOpacity={0.8}
            >
              <Text style={[styles.addButtonText, { color: colors.text }]}>Add utility</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Utility Type Dropdown Modal */}
      <Modal
        visible={showUtilityOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUtilityOptions(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowUtilityOptions(false)}
        >
          <View 
            style={[
              styles.modalContent, 
              { backgroundColor: colors.card }
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Utility Type</Text>
            {UTILITY_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.utilityOption,
                  utilityType === type && { backgroundColor: '#FFEBB722' }
                ]}
                onPress={() => handleUtilitySelect(type)}
              >
                <Text style={[styles.utilityOptionText, { color: colors.text }]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
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
    paddingTop: 40,
    paddingBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  backButtonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  titleGradientContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  gradientTextContainer: {
    fontSize: 40,
    letterSpacing: 1,
  },
  gradientText: {
    fontFamily: 'MonsieurLaDoulaise',
    fontSize: 40,
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  horizontalIllustration: {
    width: '100%',
    height: '100%',
    maxWidth: undefined,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 24,
    marginBottom: 5,
  },
  titleUnderline: {
    width: '110%',
    height: 4,
    backgroundColor: '#FFEBB7',
    borderRadius: 2,
  },
  subtitle: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    marginBottom: 10,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  selectButtonText: {
    fontFamily: 'SpaceMono',
  },
  dropdownIcon: {
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  periodButtonActive: {
    backgroundColor: '#FFEBB7',
  },
  periodButtonText: {
    fontFamily: 'SpaceMono',
  },
  periodButtonTextActive: {
    fontFamily: 'SpaceMono',
  },
  webSliderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  webSlider: {
    width: '100%',
  },
  customSliderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  customSliderTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
  },
  customSliderFill: {
    height: '100%',
    backgroundColor: '#FFEBB7',
    borderRadius: 3,
  },
  customSliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFEBB7',
    position: 'absolute',
    top: '50%',
    marginLeft: -10,
    marginTop: -10,
  },
  amountText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFEBB7',
    borderColor: '#FFEBB7',
  },
  checkMark: {
    color: '#333',
    fontSize: 14,
  },
  checkboxLabel: {
    fontFamily: 'SpaceMono',
  },
  addButton: {
    backgroundColor: '#FFEBB7',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  utilityOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  utilityOptionText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
  },
});