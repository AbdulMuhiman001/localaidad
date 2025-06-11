import { color, font } from "@/utils/constants";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoginModal from "./auth/login-modal";

const { height } = Dimensions.get("window");

export default function Entry() {
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

  const handleImageIndicatorPress = (index: number) => {
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
    setLoginModalVisible(false);
    setCreateAccountModalVisible(false);
    Animated.spring(slideAnim, {
      toValue: height,
      useNativeDriver: true,
      tension: 10,
      friction: 10,
    }).start();
  };

  const switchToCreateAccount = () => {
    setLoginModalVisible(false);
    router.push("/auth/signup");
  };

  const switchToLogin = () => {
    setCreateAccountModalVisible(false);
    router.push("/auth/login");
  };

  const isModalVisible = loginModalVisible || createAccountModalVisible;

  return (
    <ImageBackground
      source={require("@/assets/images/entry.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Main Content */}
      <View style={[styles.mainContent, isModalVisible && styles.blurred]}>
        {/* Welcome Content - positioned at bottom */}
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
        onSwitchToLogin={switchToLogin}
        isLoginMode={true}
      />

      {/* Create Account Modal */}
      <LoginModal
        visible={createAccountModalVisible}
        slideAnim={slideAnim}
        onClose={hideModal}
        onSwitchToCreateAccount={switchToCreateAccount}
        onSwitchToLogin={switchToLogin}
        isLoginMode={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  blurred: {
    opacity: 0.9,
  },
  contentContainer: {
    paddingVertical: 30,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: font.semiBold,
    textAlign: "center",
    marginBottom: 6,
    color: color.black,
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
