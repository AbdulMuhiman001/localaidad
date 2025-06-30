import CustomButton from "@/components/customButton";
import { color, font } from "@/utils/constants";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoginModal from "./auth/login-modal";

// Suppress the specific error message in the app UI
LogBox.ignoreLogs([
  'Text strings must be rendered within a <Text> component',
]);

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
    setCreateAccountModalVisible(false);
    setLoginModalVisible(false);
    router.push("/auth/signup");
  };

  const switchToLogin = () => {
    setCreateAccountModalVisible(false);
    setLoginModalVisible(false);
    router.push("/auth/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % welcomeContent.length);
    }, 2000); // 5 seconds
    return () => clearInterval(interval);
  }, [welcomeContent.length]);

  return (
    <ImageBackground
      source={require("@/assets/images/entry.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Welcome Content - positioned at bottom */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {welcomeContent[currentImageIndex].title}
          </Text>

          <Text style={styles.subtitle}>
            {welcomeContent[currentImageIndex].subtitle}
          </Text>

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
          <CustomButton
            title="Create Account"
            onPress={showCreateAccountModal}
          />
          <CustomButton
            title="Login"
            onPress={showLoginModal}
            variant="secondary"
          />
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
        handleAppleLogin={() => console.log("Apple login")}
        handleGoogleLogin={() => console.log("Google login")}
      />

      {/* Create Account Modal */}
      <LoginModal
        visible={createAccountModalVisible}
        slideAnim={slideAnim}
        onClose={hideModal}
        onSwitchToCreateAccount={switchToCreateAccount}
        onSwitchToLogin={switchToLogin}
        isLoginMode={false}
        handleAppleLogin={() => console.log("Apple login")}
        handleGoogleLogin={() => console.log("Google login")}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  contentContainer: {
    marginBottom: 24,
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
    marginBottom: 24,
    fontFamily: font.medium,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  indicator: {
    width: 36,
    height: 8,
    borderRadius: 4,
    backgroundColor: color.gray200,
  },
  activeIndicator: {
    backgroundColor: color.primary,
    width: 36,
  },
  buttonContainer: {
    gap: 12,
    paddingBottom: 20,
  },
});
