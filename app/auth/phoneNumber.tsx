import PhoneIcon from "@/assets/images/phone.svg";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import { color, font } from "@/utils/constants";
import Foundation from "@expo/vector-icons/Foundation";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function PhoneNumberScreen() {
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [country, setCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // Ensure empty string
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  useEffect(() => {
    console.log("Country object:", country); // Debug full country object
    console.log("Country flag:", country?.flag); // Debug flag value
    console.log("Country callingCode:", country?.callingCode); // Debug calling code
  }, [country]);

  const handleBackPress = () => {
    router.back();
  };

  const handleGetStarted = () => {
    router.push("/auth/verification");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isButtonDisabled = phoneNumber.length < 10;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <Header title="Phone Number" />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <PhoneIcon />
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.title}>What's Your Phone Number?</Text>
                <Text style={styles.subtitle}>
                  We'll send you a 6 digit code to verify your number.
                </Text>
              </View>

              <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    Phone Number<Text style={styles.required}>*</Text>
                  </Text>

                  <View style={styles.phoneInputContainer}>
                    <TouchableOpacity
                      onPress={() => setShowCountryPicker(true)}
                      style={styles.countryPickerButton}
                    >
                      {country?.flag && country.flag.startsWith("data:image") ? (
                        <Image
                          source={{ uri: country.flag }}
                          style={styles.flagIcon}
                          resizeMode="contain"
                        />
                      ) : (
                        <Text style={styles.countryCodeText}>
                          {country?.flag}
                        </Text>
                      )}
                      <Text style={styles.countryCodeText}>
                        +{country?.callingCode?.[0] || "1"}
                      </Text>
                      <Feather name="chevron-down" size={18} color="#222" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.phoneTextInput}
                      placeholder="(555) 000-0000"
                      placeholderTextColor={color.gray300}
                      keyboardType="phone-pad"
                      value={phoneNumber}
                      onChangeText={(text) => {
                        console.log("Input value:", text); // Debug log
                        setPhoneNumber(text);
                      }}
                      returnKeyType="done"
                      onSubmitEditing={dismissKeyboard}
                    />
                  </View>

                  {showCountryPicker && (
                    <CountryPicker
                      visible={showCountryPicker}
                      withFlag// Disable flag in CountryPicker modal
                      withCallingCode
                      withFilter
                      onSelect={(country: Country) => {
                        setCountry(country);
                        setCountryCode(country.cca2);
                        setShowCountryPicker(false);
                      }}
                      onClose={() => setShowCountryPicker(false)}
                      countryCode={countryCode}
                    />
                  )}
                  <View style={styles.disclaimerContainer}>
                    <Foundation name="info" size={16} color={color.gray300} />
                    <Text style={styles.disclaimerText}>
                      Message and data rates may apply.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Get Started"
              onPress={handleGetStarted}
              disabled={isButtonDisabled}
              variant="primary"
              size="medium"
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: font.semiBold,
    marginBottom: 8,
    textAlign: "center",
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
    marginBottom: 8,
  },
  required: {
    color: "#FF4444",
  },
  phoneInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: color.gray200,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: color.white,
    alignItems: "center",
    paddingHorizontal: 5, // Adjusted for tighter layout
    height: 50, // Fixed height to match design
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8, // Adjusted padding
    paddingVertical: 0, // No vertical padding to fit height
    borderRightWidth: 1,
    borderRightColor: color.gray200,
    height: "100%", // Full height of container
  },
  flagIcon: {
    width: 28,
    height: 28,
    marginRight: 4,
    borderRadius: 18, // half of width/height for a perfect circle
    overflow: 'hidden',
    borderWidth: 1, // subtle border
    borderColor: '#E0E0E0',
    backgroundColor: '#fff', // white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
    marginLeft: 4, // Space between flag and code
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
    paddingVertical: 0, // No vertical padding to fit height
    paddingHorizontal: 10,
    height: "100%", // Full height of container
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
});