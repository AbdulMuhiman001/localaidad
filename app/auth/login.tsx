import Logo from "@/assets/images/Logo.svg";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import { color, font } from "@/utils/constants";
import { AppleIcon, GoogleIcon, LockIcon, MailIcon } from "@/utils/SvgIcons";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
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
    router.push("/auth/location");
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
    router.push("/auth/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <Header title="Login with Email" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Logo />
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
                <MailIcon />
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
                <LockIcon />
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••••"
                  placeholderTextColor={color.gray300}
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
                  <Text>
                    {showPassword ? (
                      <Feather name="eye-off" size={20} color={color.gray300} />
                    ) : (
                      <Feather name="eye" size={20} color={color.gray300} />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <CustomButton title="Login" onPress={handleLogin} />

            {/* OR Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <CustomButton
                title="Continue with Google"
                onPress={handleAppleLogin}
                variant="secondary"
                icon={<AppleIcon />}
                iconPosition="left"
              />
              <CustomButton
                title="Continue with Google"
                onPress={handleGoogleLogin}
                variant="secondary"
                icon={<GoogleIcon />}
                iconPosition="left"
              />
            </View>

            <View style={styles.noAccountContainer}>
              <View style={styles.dividerLine}></View>
              <Text style={styles.noAccountText}>
                {" DON'T HAVE AN ACCOUNT?"}
              </Text>
              <View style={styles.dividerLine}></View>
            </View>
            <CustomButton
              title="Create Account"
              onPress={handleCreateAccount}
              fullWidth
              variant="secondary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  titleContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: font.semiBold,
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
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: font.regular,
    color: color.black,
    marginBottom: 8,
  },
  passwordLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: color.gray400,
    fontFamily: font.medium,
    textDecorationLine: "underline",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.gray200,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
    paddingLeft: 6,
  },
  eyeIcon: {
    padding: 4,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
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
  socialButtons: {
    gap: 12,
    marginBottom: 8,
  },
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 16,
  },
  noAccountText: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
    letterSpacing: 0.5,
  },
});
