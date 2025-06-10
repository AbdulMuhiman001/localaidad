import { color, font } from "@/utils/constants";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoginModal from "./auth/login-modal";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [createAccountModalVisible, setCreateAccountModalVisible] =
    useState(false);
  const [slideAnim] = useState(new Animated.Value(height));

  // Sample images and content - you can replace with your actual images
  const welcomeContent = [
    {
      title: "Welcome to Locaided",
      subtitle:
        "Capture what's happening around you, share it instantly, and earn for every impactful moment.",
    },
    {
      title: "Build Community",
      subtitle:
        "Connect with your neighborhood and stay informed about local events and activities.",
    },
    {
      title: "Earn Rewards",
      subtitle:
        "Get rewarded for sharing valuable content that helps your community stay connected.",
    },
    {
      title: "Stay Safe",
      subtitle:
        "Real-time alerts and updates help keep you and your community informed and secure.",
    },
    {
      title: "Discover Local",
      subtitle:
        "Find out what's happening in your area with location-based content and updates.",
    },
  ];

  const handleImageIndicatorPress = (index) => {
    setCurrentImageIndex(index);
  };

  const showLoginModal = () => {
    setLoginModalVisible(true);
    setCreateAccountModalVisible(false);
    Animated.spring(slideAnim, {
      toValue: height * 0.1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const showCreateAccountModal = () => {
    setCreateAccountModalVisible(true);
    setLoginModalVisible(false);
    Animated.spring(slideAnim, {
      toValue: height * 0.1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const hideModal = () => {
    Animated.spring(slideAnim, {
      toValue: height,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      setLoginModalVisible(false);
      setCreateAccountModalVisible(false);
    });
  };

  const switchToCreateAccount = () => {
    setLoginModalVisible(false);
    setCreateAccountModalVisible(true);
  };

  const switchToLogin = () => {
    setCreateAccountModalVisible(false);
    router.push("/auth/login");
  };

  const isModalVisible = loginModalVisible || createAccountModalVisible;

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={[styles.mainContent, isModalVisible && styles.blurred]}>
        {/* Main Image/Content Area */}
        <View style={styles.imageContainer}>
          <View style={styles.phoneFrame}>{/* Placeholder for image */}</View>
        </View>

        {/* Welcome Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {welcomeContent[currentImageIndex].title}
          </Text>

          <Text style={styles.subtitle}>
            {welcomeContent[currentImageIndex].subtitle}
          </Text>

          {/* Image Indicators */}
          <View style={styles.indicatorContainer}>
            {welcomeContent.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
                onPress={() => handleImageIndicatorPress(index)}
              />
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={showCreateAccountModal}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={showLoginModal}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Modal */}
      <LoginModal
        visible={loginModalVisible}
        slideAnim={slideAnim}
        onClose={hideModal}
        onSwitchToCreateAccount={switchToCreateAccount}
        isLoginMode={true}
      />

      {/* Create Account Modal */}
      <LoginModal
        visible={createAccountModalVisible}
        slideAnim={slideAnim}
        onClose={hideModal}
        onSwitchToLogin={switchToLogin}
        isLoginMode={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  blurred: {
    opacity: 0.3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  phoneFrame: {
    width: width * 0.75,
    height: width * 0.75 * 1.8,
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
    overflow: "hidden",
    borderWidth: 8,
    borderColor: "#f0f0f0",
  },
  contentContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: font.semiBold,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: color.gray400,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 30,
    fontFamily: font.regular,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 36,
    height: 8,
    borderRadius: 4,
    backgroundColor: color.gray200,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: color.primary,
    width: 36,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  createAccountButton: {
    backgroundColor: color.black,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 12,
  },
  createAccountText: {
    color: color.white,
    fontSize: 16,
    fontFamily: font.semiBold,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "transparent",
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.gray200,
  },
  loginText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    textAlign: "center",
  },
});
