import AccountIcon from "@/assets/images/account.svg";
import UserIcon from "@/assets/images/user.svg";
import { color, font } from "@/utils/constants";
import { PhoneIcon, ProfileIcon } from "@/utils/SvgIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const handlePersonalInfo = () => {
    console.log("Navigate to Personal Information");
    router.push("/profile/profile");
  };

  const handleChooseAvatar = () => {
    console.log("Navigate to Choose Avatar");
    router.push("/profile/avatar");
  };

  const handlePhoneVerification = () => {
    console.log("Navigate to Phone Verification");
    // Navigate to phone verification screen
  };

  const setupSteps = [
    {
      id: 1,
      title: "Locaided Account",
      description: "You've successfully signed up.",
      icon: <ProfileIcon />,
      isCompleted: true,
      points: 25,
      onPress: null,
    },
    {
      id: 2,
      title: "Personal Information",
      description: "Let others recognize connect with you.",
      icon: <MaterialIcons name="edit" size={24} color={color.gray400} />,
      isCompleted: false,
      points: 50,
      onPress: handlePersonalInfo,
    },
    {
      id: 3,
      title: "Choose an Avatar",
      description: "Pick a character that represents you.",
      icon: <UserIcon />,
      isCompleted: false,
      points: 25,
      onPress: handleChooseAvatar,
    },
    {
      id: 4,
      title: "Phone Verification",
      description: "Build trust and unlock more features.",
      icon: <PhoneIcon />,
      isCompleted: false,
      points: 25,
      onPress: handlePhoneVerification,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Network Icon Section */}
        <View style={styles.iconContainer}>
          <AccountIcon />
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Account is Ready</Text>
          <Text style={styles.subtitle}>
            Let's complete your profile to unlock all features and start earning
            Social Score.
          </Text>
        </View>

        {/* Setup Steps */}
        <View style={styles.stepsContainer}>
          {setupSteps.map((step, index) => (
            <View
              key={step.id}
              style={[
                styles.stepCard,
                step.isCompleted && styles.completedCard,
                index === setupSteps.length - 1 && styles.lastCard,
              ]}
            >
              {/* Icon */}
              <View style={styles.stepIconContainer}>{step.icon}</View>

              {/* Content */}
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>

                {/* Action Section */}
                {step.isCompleted ? (
                  <View style={styles.completedSection}>
                    <View style={styles.pointsContainer}>
                      <Text style={styles.coinIcon}>🪙</Text>
                      <Text style={styles.pointsText}>
                        +{step.points} Points
                      </Text>
                    </View>
                    <View style={styles.checkmarkContainer}>
                      <AntDesign name="check" size={20} color="#4CAF50" />
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={step.onPress || undefined}
                  >
                    <Text style={styles.continueText}>Continue</Text>
                    <View style={styles.pointsBadge}>
                      <Text style={styles.coinIconSmall}>🪙</Text>
                      <Text style={styles.pointsBadgeText}>
                        {step.points} Points
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: color.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  networkIcon: {
    width: 40,
    height: 24,
    position: "relative",
  },
  node1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4444",
    position: "absolute",
    top: 0,
    left: 16,
  },
  connector: {
    width: 20,
    height: 2,
    backgroundColor: "#FF4444",
    position: "absolute",
    top: 11,
    left: 10,
  },
  node2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4444",
    position: "absolute",
    bottom: 0,
    right: 16,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: font.semiBold,
    marginBottom: 8,
    color: color.black,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  stepsContainer: {
    flex: 1,
  },
  stepCard: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.gray200,
    marginBottom: 16,
    backgroundColor: color.white,
  },
  completedCard: {
    borderColor: "#4CAF50",
    backgroundColor: "#F8FFF8",
  },
  lastCard: {
    marginBottom: 0,
  },
  stepIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: color.gray100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.black,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: font.regular,
    color: color.gray400,
    lineHeight: 20,
    marginBottom: 16,
  },
  completedSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: font.medium,
    color: "#FF4444",
  },
  checkmarkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F5E8",
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.gray100,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  continueText: {
    fontSize: 14,
    fontFamily: font.medium,
    color: color.gray400,
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinIconSmall: {
    fontSize: 14,
    marginRight: 4,
  },
  pointsBadgeText: {
    fontSize: 12,
    fontFamily: font.medium,
    color: "#FF4444",
  },
});
