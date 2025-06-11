import Logo from "@/assets/images/Logo.svg";
import { AppleIcon, EmailIcon, GoogleIcon, PhoneIcon } from "@/utils/SvgIcons";
import { color, font } from "@/utils/constants";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

interface LoginModalProps {
  visible: boolean;
  slideAnim: Animated.Value;
  onClose: () => void;
  onSwitchToCreateAccount: () => void;
  onSwitchToLogin: () => void;
  isLoginMode: boolean;
}

export default function LoginModal({
  visible,
  slideAnim,
  onClose,
  onSwitchToCreateAccount,
  onSwitchToLogin,
  isLoginMode,
}: LoginModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView intensity={20} style={styles.blurContainer}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isLoginMode ? "Login" : "Create Account"}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <View style={styles.modalContent}>
              {/* Logo and Tagline */}
              <View style={styles.logoContainer}>
                <Logo />
              </View>

              {/* Welcome Back */}
              <View style={styles.welcomeBackContainer}>
                <Text style={styles.welcomeBackTitle}>Welcome Back!</Text>
                <Text style={styles.welcomeBackSubtitle}>
                  {isLoginMode
                    ? "Login to continue sharing your local moments."
                    : "Sign in to book unforgettable experiences and manage your upcoming sessions."}
                </Text>
              </View>

              {/* Login Options */}
              <View style={styles.loginOptionsContainer}>
                <TouchableOpacity style={styles.loginOption}>
                  {/* <Text style={styles.appleIcon}>🍎</Text> */}
                  <AppleIcon />
                  <Text style={styles.loginOptionText}>
                    Continue with Apple
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginOption}>
                  {/* <Text style={styles.googleIcon}>G</Text> */}
                  <GoogleIcon />
                  <Text style={styles.loginOptionText}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginOption}>
                  {/* <Text style={styles.phoneIcon}>📱</Text> */}
                  <PhoneIcon />
                  <Text style={styles.loginOptionText}>
                    Continue with Phone
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.emailLoginOption}>
                  {/* <Text style={styles.emailIcon}>✉️</Text> */}
                  <EmailIcon />
                  <Text style={styles.emailLoginText}>Continue with Email</Text>
                </TouchableOpacity>
              </View>

              {/* Switch Account Type */}
              <View style={styles.createAccountContainer}>
                <View style={styles.noAccountContainer}>
                  <View style={styles.line}></View>
                  <Text style={styles.noAccountText}>
                    {isLoginMode
                      ? "DON'T HAVE AN ACCOUNT?"
                      : "HAVE AN ACCOUNT?"}
                  </Text>
                  <View style={styles.line}></View>
                </View>
                <TouchableOpacity
                  style={styles.createAccountModalButton}
                  onPress={
                    isLoginMode ? onSwitchToCreateAccount : onSwitchToLogin
                  }
                >
                  <Text style={styles.createAccountModalText}>
                    {isLoginMode ? "Create account" : "Log in"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Terms */}
              <Text style={styles.termsText}>
                By continuing, you agree to our Terms & Privacy Policy
              </Text>
            </View>
          </Animated.View>
        </BlurView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.95,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: color.gray200,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: font.regular,
    textAlign: "center",
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 34,
  },
  welcomeBackContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  welcomeBackTitle: {
    fontSize: 24,
    fontFamily: font.semiBold,
    marginBottom: 8,
  },
  welcomeBackSubtitle: {
    fontSize: 17,
    lineHeight: 24,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
  },
  loginOptionsContainer: {
    marginBottom: 30,
  },
  loginOption: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: color.gray200,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  loginOptionText: {
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
  phoneIcon: {
    fontSize: 20,
  },
  emailLoginOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.black,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  emailLoginText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.white,
    marginLeft: 12,
  },
  emailIcon: {
    fontSize: 20,
  },
  createAccountContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  noAccountText: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  line: {
    borderBottomColor: color.gray200,
    borderBottomWidth: 1,
    marginBottom: 17,
    width: 80,
  },
  createAccountModalButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: color.gray200,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: "100%",
  },
  createAccountModalText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.black,
    textAlign: "center",
  },
  termsText: {
    fontSize: 14,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
    lineHeight: 18,
  },
});
