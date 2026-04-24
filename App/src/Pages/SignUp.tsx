import React, { useState, useRef } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

const REN = require('../../assets/ren_logo_white.png');

interface FormData {
  name: string;
  company_name: string;
  company_location: string;
  company_email: string;
  password: string;
  phone: string;
}

const SignUp = ({ navigation }: { navigation: any }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company_name: '',
    company_location: '',
    company_email: '',
    password: '',
    phone: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationOtp, setVerificationOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const isMismatch =
    confirmPassword !== '' && confirmPassword !== formData.password;

  const animateTransition = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (step === 1) {
      if (
        !formData.name ||
        !formData.phone ||
        !formData.password ||
        !confirmPassword
      ) {
        return Alert.alert('Error', 'Please fill all fields');
      }
      if (isMismatch) return Alert.alert('Error', 'Passwords do not match');
      animateTransition(() => setStep(2));
    } else if (step === 2) {
      if (
        !formData.company_name ||
        !formData.company_email ||
        !formData.company_location
      ) {
        return Alert.alert('Error', 'Please fill all fields');
      }
      setIsLoading(true);
      try {
        // await signup(formData);
        animateTransition(() => setStep(3));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    } else if (step === 3) {
      if (verificationOtp.length !== 6) {
        return Alert.alert('Error', 'Enter the 6-digit code');
      }
      setIsLoading(true);
      try {
        // await verifyOtp(formData.company_email, verificationOtp);
        navigation.navigate('Login');
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    animateTransition(() => setStep(prev => prev - 1));
  };

  const stepLabel = step === 1 ? 'NEXT' : step === 2 ? 'SEND OTP' : 'VERIFY';

  const stepTitle =
    step === 1
      ? 'CREATE\nIDENTITY'
      : step === 2
      ? 'YOUR\nORGANIZATION'
      : 'VERIFY\nEMAIL';

  const stepSubtitle =
    step === 1
      ? 'Start with your personal details.'
      : step === 2
      ? 'Tell us about your organization.'
      : `Enter the 6-digit code sent to\n${formData.company_email}`;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoRow}>
            <Image source={REN} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText}>REN</Text>
          </View>

          {/* Step Indicators */}
          <View style={styles.stepIndicators}>
            {[1, 2, 3].map(s => (
              <View
                key={s}
                style={[
                  styles.stepDot,
                  {
                    backgroundColor:
                      step >= s ? '#fff' : 'rgba(255,255,255,0.15)',
                  },
                ]}
              />
            ))}
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{stepTitle}</Text>
            <Text style={styles.subtitle}>{stepSubtitle}</Text>
          </View>

          {/* Animated Form Fields */}
          <Animated.View
            style={[
              styles.formContainer,
              { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
            ]}
          >
            {/* Step 1 */}
            {step === 1 && (
              <View style={styles.fields}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={formData.name}
                  onChangeText={v => handleChange('name', v)}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contact Number"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={formData.phone}
                  onChangeText={v => handleChange('phone', v)}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Secure Password"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={formData.password}
                  onChangeText={v => handleChange('password', v)}
                  secureTextEntry
                />
                <TextInput
                  style={[styles.input, isMismatch && styles.inputError]}
                  placeholder="Confirm Password"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
                {isMismatch && (
                  <Text style={styles.errorText}>* Passwords do not match</Text>
                )}
              </View>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <View style={styles.fields}>
                <TextInput
                  style={styles.input}
                  placeholder="Company Legal Name"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={formData.company_name}
                  onChangeText={v => handleChange('company_name', v)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Official Company Email"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={formData.company_email}
                  onChangeText={v => handleChange('company_email', v)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Headquarters Location"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={formData.company_location}
                  onChangeText={v => handleChange('company_location', v)}
                />
              </View>
            )}

            {/* Step 3 — OTP */}
            {step === 3 && (
              <View style={styles.otpContainer}>
                <TextInput
                  style={styles.otpInput}
                  placeholder="000000"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={verificationOtp}
                  onChangeText={v => setVerificationOtp(v.replace(/\D/g, ''))}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                <TouchableOpacity onPress={() => Alert.alert('Code Resent')}>
                  <Text style={styles.resendText}>RESEND SECURITY TOKEN</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {step > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.nextButton,
                isLoading && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {isLoading ? '...' : stepLabel}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>BACK TO LOGIN →</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scroll: {
    marginTop: 10,
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoText: {
    color: 'white',
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 0,
  },
  stepIndicators: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 32,
  },
  stepDot: {
    height: 6,
    width: 39,
    borderRadius: 10,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    color: '#fff',
    fontSize: 37,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 37,
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 24,
  },
  fields: {
    gap: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#fff',
    fontSize: 17,
    marginBottom: 4,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: -2,
    marginLeft: 4,
  },
  otpContainer: {
    alignItems: 'center',
    gap: 20,
  },
  otpInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 20,
    textAlign: 'center',
    width: '100%',
  },
  resendText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 20,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 3,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
});

export default SignUp;
