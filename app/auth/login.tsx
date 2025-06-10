import { color, font } from "@/utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";

import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Handle login logic
    console.log("Login pressed");
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log("Forgot password pressed");
  };

  const handleAppleLogin = () => {
    // Handle Apple login
    console.log("Apple login pressed");
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log("Google login pressed");
  };

  const handleCreateAccount = () => {
    // Navigate to create account
    console.log("Create account pressed");
  };

  const handleBackPress = () => {
    // Handle back navigation
    console.log("Back pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Login with Email</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>locaided</Text>
            <Text style={styles.taglineText}>people. places. proof.</Text>
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login to Your Account</Text>
            <Text style={styles.subtitle}>
              Login to continue sharing your local moments.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email address</Text>
              <View style={styles.inputWrapper}>
                <Fontisto name="email" size={24} color={color.gray200} />
                <TextInput
                  style={styles.textInput}
                  placeholder="johndoe@example.com"
                  placeholderTextColor={color.gray300}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordLabelContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot password</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={24} color={color.gray200} />
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••••"
                  placeholderTextColor={color.gray200}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.eyeIcon}
                >
                  <Text style={styles.eyeIconText}>
                    {`${
                      showPassword ? (
                        "🙈"
                      ) : (
                        <AntDesign
                          name="eyeo"
                          size={24}
                          color={color.gray200}
                        />
                      )
                    }`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleAppleLogin}
            >
              <Text style={styles.appleIcon}>🍎</Text>
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleLogin}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Create Account Section */}
            <View style={styles.createAccountContainer}>
              <Text style={styles.noAccountText}>DON'T HAVE AN ACCOUNT?</Text>
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={handleCreateAccount}
              >
                <Text style={styles.createAccountButtonText}>
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: color.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: font.regular,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  logoText: {
    fontSize: 36,
    fontFamily: font.bold,
    color: color.black,
    marginBottom: 4,
  },
  taglineText: {
    fontSize: 16,
    color: color.gray400,
    fontFamily: font.regular,
    fontStyle: "italic",
  },
  titleContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: font.semiBold,
    color: color.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: font.medium,
    color: color.black,
    marginBottom: 8,
  },
  passwordLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: color.primary,
    fontFamily: font.medium,
    textDecorationLine: "underline",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.gray200,
  },
  emailIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  lockIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
  },
  eyeIcon: {
    padding: 4,
  },
  eyeIconText: {
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: color.black,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.white,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: color.gray200,
  },
  dividerText: {
    fontSize: 14,
    color: color.gray400,
    fontFamily: font.regular,
    marginHorizontal: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: color.gray200,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.black,
    marginLeft: 12,
  },
  appleIcon: {
    fontSize: 20,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#4285F4",
    color: "white",
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  createAccountContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noAccountText: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  createAccountButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: color.gray200,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: "100%",
  },
  createAccountButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.black,
    textAlign: "center",
  },
});
