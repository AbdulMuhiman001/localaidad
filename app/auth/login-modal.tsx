import Logo from "@/assets/images/Logo.svg";
import CustomButton from "@/components/customButton";
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
  handleAppleLogin: () => void;
  handleGoogleLogin: () => void;
  isLoginMode: boolean;
}

export default function LoginModal({
  visible,
  slideAnim,
  onClose,
  onSwitchToCreateAccount,
  onSwitchToLogin,
  handleGoogleLogin,
  handleAppleLogin,
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
                <CustomButton
                  title="Continue with Apple"
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
                <CustomButton
                  title="Continue with Phone"
                  onPress={
                    isLoginMode ? onSwitchToLogin : onSwitchToCreateAccount
                  }
                  variant="secondary"
                  icon={<PhoneIcon />}
                  iconPosition="left"
                />
                <CustomButton
                  title="Continue with Email"
                  onPress={
                    isLoginMode ? onSwitchToLogin : onSwitchToCreateAccount
                  }
                  icon={<EmailIcon />}
                  iconPosition="left"
                />
              </View>

              {/* Switch Account Type */}
              <View style={styles.noAccountContainer}>
                <View style={styles.line}></View>
                <Text style={styles.noAccountText}>
                  {isLoginMode ? "DON'T HAVE AN ACCOUNT?" : "HAVE AN ACCOUNT?"}
                </Text>
                <View style={styles.line}></View>
              </View>
              <CustomButton
                title={isLoginMode ? "Create account" : "Log in"}
                onPress={
                  isLoginMode ? onSwitchToCreateAccount : onSwitchToLogin
                }
                variant="secondary"
              />
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
    height: height * 0.96,
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
    marginVertical: 24,
  },
  welcomeBackContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeBackTitle: {
    fontSize: 24,
    fontFamily: font.semiBold,
    marginBottom: 8,
  },
  welcomeBackSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
  },
  loginOptionsContainer: {
    gap: 16,
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
  noAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 10,
  },
  noAccountText: {
    fontSize: 12,
    color: color.gray400,
    fontFamily: font.regular,
    letterSpacing: 0.5,
  },
  line: {
    borderBottomColor: color.gray200,
    borderBottomWidth: 1,
    width: 100,
  },
  termsText: {
    fontSize: 14,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 24,
  },
});
