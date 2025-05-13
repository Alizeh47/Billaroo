import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown
} from 'react-native-reanimated';

export default function IntroScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'MonsieurLaDoulaise': require('../assets/fonts/MonsieurLaDoulaise-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleStart = () => {
    router.push('/utility-tracker');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Main content container */}
      <View style={styles.contentWrapper}>
        {/* Billaroo Title with Gradient */}
        <Animated.View
          style={styles.titleGradientContainer}
          entering={FadeIn.delay(200).duration(800)}
        >
          <Text style={styles.gradientTextContainer}>
            <Text style={[styles.gradientText, { color: '#7AD8C2' }]}>Bill</Text>
            <Text style={[styles.gradientText, { color: '#FFD066' }]}>aroo</Text>
          </Text>
        </Animated.View>
        
        {/* Illustration */}
        <Animated.View 
          style={styles.illustrationContainer}
          entering={FadeIn.delay(300).duration(800)}
        >
          <Image 
            source={require('../assets/images/city-skyline.png')} 
            style={styles.customIllustration} 
          />
        </Animated.View>
        
        {/* Bottom content */}
        <Animated.View 
          entering={FadeInDown.delay(800).springify()}
          style={styles.contentContainer}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Utility Tracker</Text>
            <Animated.View 
              entering={FadeIn.delay(1200).duration(500)}
              style={styles.titleUnderline}
            ></Animated.View>
          </View>
          
          <Animated.Text 
            entering={FadeIn.delay(1400).duration(500)}
            style={styles.subtitle}
          >
            Have efficient home
          </Animated.Text>
          
          <Animated.View
            entering={FadeIn.delay(1600).duration(500)}
          >
            <TouchableOpacity 
              style={styles.button}
              onPress={handleStart}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Let's start</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f0',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  titleGradientContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20,
  },
  gradientTextContainer: {
    fontSize: 42,
    letterSpacing: 1,
  },
  gradientText: {
    fontFamily: 'MonsieurLaDoulaise',
    fontSize: 42,
    textAlign: 'center',
  },
  illustrationContainer: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  customIllustration: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
  },
  titleUnderline: {
    width: '80%',
    height: 4,
    backgroundColor: '#FFEBB7',
    borderRadius: 2,
  },
  subtitle: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFEBB7',
    width: 280,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    color: '#333',
  },
}); 