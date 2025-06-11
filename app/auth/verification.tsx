import ShieldIcon from "@/assets/images/shield.svg";
import { color, font } from "@/utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);
  const phoneNumber = "+1 555-123-4567"; // This should come from props or navigation params

  useEffect(() => {
    // Auto-focus on first input when screen loads
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleBackPress = () => {
    console.log("Back pressed");
  };

  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input if value is entered
    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      // If current input is empty and backspace is pressed, go to previous input
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputFocus = (index) => {
    setActiveIndex(index);
  };

  const handleVerify = () => {
    const verificationCode = code.join("");
    router.push("/auth/location");
    console.log("Verify pressed");
    console.log("Verification code:", verificationCode);
  };

  const handleResendCode = () => {
    console.log("Resend code pressed");
    // Clear the code and reset to first input
    setCode(["", "", "", "", "", ""]);
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
  };

  const isCodeComplete = () => {
    return code.every((digit) => digit !== "");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification Code</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Shield Icon Section */}
        <View style={styles.iconContainer}>
          <ShieldIcon />
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter Your Verification Code</Text>
          <Text style={styles.subtitle}>We sent a code to {phoneNumber}.</Text>
        </View>

        {/* Code Input Section */}
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.codeInput,
                activeIndex === index && styles.activeCodeInput,
                digit && styles.filledCodeInput,
              ]}
              value={digit}
              onChangeText={(value) => handleCodeChange(value, index)}
              onFocus={() => handleInputFocus(index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Resend Section */}
        <View style={styles.resendContainer}>
          <Text style={styles.issuesText}>
            Experiencing issues receiving the code?
          </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.verifyButton,
            !isCodeComplete() && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerify}
          disabled={!isCodeComplete()}
        >
          <Text
            style={[
              styles.verifyButtonText,
              !isCodeComplete() && styles.verifyButtonTextDisabled,
            ]}
          >
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
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
    color: color.black,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
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
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: font.semiBold,
    marginBottom: 8,
    color: color.black,
  },
  subtitle: {
    fontSize: 16,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
    lineHeight: 22,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  codeInput: {
    width: 45,
    height: 50,
    borderWidth: 2,
    borderColor: color.gray200,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontFamily: font.semiBold,
    color: color.black,
    backgroundColor: color.white,
  },
  activeCodeInput: {
    borderColor: color.black,
  },
  filledCodeInput: {
    borderColor: color.black,
    backgroundColor: color.gray50,
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  issuesText: {
    fontSize: 14,
    color: color.gray400,
    fontFamily: font.regular,
    marginBottom: 8,
    textAlign: "center",
  },
  resendText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.medium,
    textDecorationLine: "underline",
  },
  verifyButton: {
    backgroundColor: color.black,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: color.gray200,
  },
  verifyButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.white,
  },
  verifyButtonTextDisabled: {
    color: color.gray400,
  },
});
