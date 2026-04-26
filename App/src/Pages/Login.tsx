import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Context/authContext';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }: { navigation: any }) => {
  const [role, setRole] = useState('Manager');
  const [state, setState] = useState('Login');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { login, isLoading } = useAuth();
  const Heading =
    state === 'Login'
      ? 'Welcome Back'
      : state === 'Token'
      ? 'Join With Token'
      : 'Set Your Password';

  const SubHeading =
    state === 'Login'
      ? 'Sign in to your account'
      : state === 'Token'
      ? 'Enter token to join'
      : 'Enter your new password to continue';

  const handleLogin = () => {
    if (!data.email || !data.password) {
      Alert.alert('REN', 'Please fill all the fields');
      return;
    }
    login(data, role);
    setData({ email: '', password: '' });
  };

  if (isLoading) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            gap: 15,
          }}
        >
          <ActivityIndicator size="large" color="#444" />
          <Text style={{ color: '#fff' }}>Please Wait Loading ...</Text>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Image
              source={require('../../assets/ren_logo_white.png')}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.Heading}>{Heading}</Text>
            <Text style={styles.Heading2}>{SubHeading}</Text>
          </View>
          <View style={styles.glassCard}>
            {state === 'Login' && (
              <>
                <View style={styles.roleContainer}>
                  {['Admin', 'Manager', 'Employee'].map((r, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setRole(r);
                      }}
                      style={[styles.role, role === r && styles.roleActive]}
                      activeOpacity={0.3}
                    >
                      <Text
                        style={[
                          styles.roleText,
                          role === r && styles.roleActiveText,
                        ]}
                      >
                        {r}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.selectRoleText}>Select Role</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Enter Email Address"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChange={e =>
                      setData({ ...data, email: e.nativeEvent.text })
                    }
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                  <TextInput
                    style={[styles.input]}
                    placeholder="Enter Password"
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={e =>
                      setData({ ...data, password: e.nativeEvent.text })
                    }
                    returnKeyType="next"
                    blurOnSubmit={false}
                    secureTextEntry
                  />

                  <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Login as {role}</Text>
                  </TouchableOpacity>
                </View>
                {/* ── Divider ── */}
                <View style={styles.divider}>
                  <View style={styles.divLine} />
                  <Text style={styles.divText}>OR</Text>
                  <View style={styles.divLine} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setState('Token');
                  }}
                  style={styles.ToTokenButton}
                >
                  <Text style={styles.ToTokenButtonText}>Join Using Token</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}
                  style={styles.NewToRenButton}
                >
                  <Text style={styles.NewToRenButtonText}>New to REN</Text>
                </TouchableOpacity>
              </>
            )}

            {state === 'Token' && (
              <>
                <View style={styles.roleContainer}>
                  {['Manager', 'Employee'].map((r, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setRole(r);
                      }}
                      style={[
                        styles.roleToken,
                        role === r && styles.roleActive,
                      ]}
                      activeOpacity={0.3}
                    >
                      <Text
                        style={[
                          styles.roleText,
                          role === r && styles.roleActiveText,
                        ]}
                      >
                        {r}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.selectRoleText}>Select Role</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Enter Email"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                  <TextInput
                    style={[styles.input]}
                    placeholder="Enter Token"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setState('PasswordChange');
                    }}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Join as {role}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setState('Login');
                    }}
                    style={styles.BackToLoginButton}
                  >
                    <Text style={styles.BackToLoginButtonText}>
                      Back to Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {state === 'PasswordChange' && (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Enter New Password"
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    secureTextEntry
                    blurOnSubmit={false}
                  />
                  <TextInput
                    style={[styles.input]}
                    placeholder="Confirm New Password"
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    secureTextEntry
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Update Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setState('Login');
                    }}
                    style={styles.BackToLoginButton}
                  >
                    <Text style={styles.BackToLoginButtonText}>
                      Back to Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050505',
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    top: -height * 0.15,
    left: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(99, 102, 241, 0.95)',
    transform: [{ scaleX: 1.2 }],
  },
  circle2: {
    position: 'absolute',
    bottom: -height * 0.05,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(236, 72, 153, 0.25)',
  },
  glassCard: {
    marginHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 20,
    marginTop: 25,
    shadowColor: '#666',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  container: {
    marginTop: 30,
    alignItems: 'center',
  },
  headingContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  Heading: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '800',
  },
  Heading2: {
    paddingHorizontal: 5,
    fontSize: 17,
    color: '#aaa',
    lineHeight: 24,
  },
  selectRoleText: {
    marginTop: 15,
    color: '#fafafa',
    fontSize: 15,
    paddingLeft: 8,
    fontWeight: '800',
  },
  roleContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 14,
    padding: 4,
  },
  role: {
    width: '33.33%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  roleToken: {
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  roleActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  roleActiveText: {
    color: '#fff',
    fontWeight: '700',
  },
  roleText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#aaa',
    fontWeight: '500',
  },
  inputContainer: {
    marginTop: 20,
    gap: 12,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#fff',
    fontSize: 17,
    marginBottom: 4,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
  BackToLoginButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  BackToLoginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 25,
    marginBottom: 15,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  divText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    letterSpacing: 0.6,
    fontWeight: '600',
  },
  ToTokenButton: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  ToTokenButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
  },
  NewToRenButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  NewToRenButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
  },
});
