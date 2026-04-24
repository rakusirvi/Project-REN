import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ navigation }: { navigation: any }) => {
  const [role, setRole] = useState('Admin');
  const [state, setState] = useState('Login');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/ren_logo_white.png')}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.Heading}>{`Welcome Back`}</Text>
        <Text style={styles.Heading2}>{`Sign in to your account`}</Text>
      </View>
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
                  style={[styles.roleText, role === r && styles.roleActiveText]}
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
              returnKeyType="next"
              blurOnSubmit={false}
              secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login as {role}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                setState('Token');
              }}
              style={styles.newButton}
            >
              <Text style={styles.newButtonText}>Join Using Token</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('SignUp');
              }}
              style={styles.newButton}
            >
              <Text style={styles.newButtonText}>New to REN</Text>
            </TouchableOpacity>
          </View>
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
                style={[styles.roleToken, role === r && styles.roleActive]}
                activeOpacity={0.3}
              >
                <Text
                  style={[styles.roleText, role === r && styles.roleActiveText]}
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
              <Text style={styles.BackToLoginButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {state === 'PasswordChange' && (
        <>
          <Text>Change Password</Text>
          <TouchableOpacity
            onPress={() => {
              setState('Login');
            }}
            style={styles.BackToLoginButton}
          >
            <Text style={styles.BackToLoginButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    padding: 15,
    flex: 1,
    backgroundColor: '#0a0a0a',
  },

  container: {
    marginTop: 30,
    alignItems: 'center',
  },

  headingContainer: {
    marginTop: 20,
  },

  Heading: {
    color: '#ffff',
    fontSize: 38,
    fontWeight: 800,
  },
  Heading2: {
    paddingHorizontal: 5,
    fontSize: 17,
    color: '#888',
    lineHeight: 24,
  },

  selectRoleText: {
    marginTop: 10,
    color: '#fafafa',
    fontSize: 15,
    paddingLeft: 8,
    fontWeight: 800,
  },
  roleContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
    borderWidth: 2,
    borderColor: '#f1f1f9',
    borderRadius: 10,
    padding: 2,
  },
  role: {
    width: '33.33%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  roleToken: {
    width: '50%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  roleActive: {
    backgroundColor: '#ffff',
    borderRadius: 10,
  },
  roleActiveText: {
    color: '#000',
  },
  roleText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#fff',
    fontWeight: 300,
  },
  inputContainer: {
    marginTop: 30,
    padding: 2,

    gap: 12,
    marginBottom: 10,
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
  loginButton: {
    marginTop: 5,
    backgroundColor: 'white',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  BackToLoginButton: {
    marginTop: 60,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'white',
  },

  BackToLoginButtonText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 17,
    textAlign: 'center',
  },

  loginButtonText: {
    fontWeight: 700,
    fontSize: 17,
    textAlign: 'center',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  newButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderBottomColor: 'white',
  },
  newButtonText: {
    color: 'white',
    fontWeight: 600,
  },
});
