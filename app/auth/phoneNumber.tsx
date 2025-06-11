import PhoneIcon from "@/assets/images/phone.svg";
import { color, font } from "@/utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";

const PhoneInputComponent = PhoneInput as any;

export default function PhoneNumberScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);

  const handleBackPress = () => {
    console.log("Back pressed");
  };

  const handleGetStarted = () => {
    router.push("/auth/verification");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phone Number</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Phone Icon Section */}
        <View style={styles.iconContainer}>
          {/* <View style={styles.iconCircle}> */}
          <PhoneIcon />
          {/* </View> */}
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What's Your Phone Number?</Text>
          <Text style={styles.subtitle}>
            We'll send you a 6 digit code to verify your number.
          </Text>
        </View>

        {/* Phone Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Phone Number<Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.phoneInputContainer}>
              <PhoneInputComponent
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="US"
                layout="first"
                onChangeText={(text: string) => {
                  setPhoneNumber(text);
                }}
                onChangeFormattedText={(text: string) => {
                  setFormattedValue(text);
                }}
                placeholder="(555) 000-0000"
                textInputProps={{
                  placeholderTextColor: color.gray300,
                  style: styles.phoneTextInput,
                  keyboardType: "phone-pad",
                  autoFocus: false,
                }}
                textContainerStyle={styles.phoneTextContainer}
                codeTextStyle={styles.countryCode}
                countryPickerButtonStyle={styles.countryPicker}
                containerStyle={styles.phoneContainer}
                flagButtonStyle={styles.flagButton}
              />
            </View>

            <View style={styles.disclaimerContainer}>
              <AntDesign name="infocirlce" size={16} color={color.gray400} />
              <Text style={styles.disclaimerText}>
                Message and data rates may apply.
              </Text>
            </View>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={[
              styles.getStartedButton,
              phoneNumber.length < 10 && styles.getStartedButtonDisabled,
            ]}
            onPress={handleGetStarted}
            disabled={phoneNumber.length < 10}
          >
            <Text
              style={[
                styles.getStartedButtonText,
                phoneNumber.length < 10 && styles.getStartedButtonTextDisabled,
              ]}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
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
  inputSection: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: font.regular,
    color: color.black,
    marginBottom: 8,
  },
  required: {
    color: "#FF4444",
  },
  phoneInputContainer: {
    borderWidth: 1,
    borderColor: color.gray200,
    borderRadius: 12,
    // backgroundColor: color.white,
    marginBottom: 12,
  },
  phoneContainer: {
    // backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 4,
  },
  phoneTextContainer: {
    backgroundColor: "transparent",
    paddingVertical: 0,
  },
  phoneTextInput: {
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
    paddingVertical: 16,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
  },
  countryPicker: {
    paddingHorizontal: 12,
  },
  flagButton: {
    paddingHorizontal: 8,
  },
  disclaimerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  disclaimerText: {
    fontSize: 14,
    color: color.gray400,
    fontFamily: font.regular,
    marginLeft: 8,
  },
  getStartedButton: {
    backgroundColor: color.black,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  getStartedButtonDisabled: {
    backgroundColor: color.gray200,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.white,
  },
  getStartedButtonTextDisabled: {
    color: color.gray400,
  },
});
