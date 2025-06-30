import ShieldIcon from "@/assets/images/shield.svg";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import { color, font } from "@/utils/constants";
import { router } from "expo-router";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
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
import { SafeAreaView } from "react-native-safe-area-context";

type CodeDisplayBoxProps = {
  digit: string;
  index: number;
  activeIndex: number;
  scaleAnim: Animated.Value;
};

// Memoized display box component with animations
const CodeDisplayBox = memo(({ digit, index, activeIndex, scaleAnim }: CodeDisplayBoxProps) => {
  const isActive = activeIndex === index;
  const hasDigit = digit !== "";

  return (
    <Animated.View
      style={[
        styles.codeBox,
        isActive && styles.activeCodeBox,
        hasDigit && styles.filledCodeBox,
        {
          transform: [
            {
              scale: isActive ? scaleAnim : 1,
            },
          ],
        },
      ]}
    >
      <Animated.Text 
        style={[
          styles.codeText,
          {
            opacity: hasDigit ? 1 : 0.3,
            transform: [
              {
                scale: hasDigit ? 1 : 0.8,
              },
            ],
          }
        ]}
      >
        {hasDigit ? digit : "•"}
      </Animated.Text>
    </Animated.View>
  );
});

export default function VerificationScreen() {
  const [code, setCode] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const phoneNumber = "+1 555-123-4567";

  useEffect(() => {
    // Focus the input after a short delay
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animate active box
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeIndex, scaleAnim]);

  const handleCodeChange = useCallback((value: string) => {
    // Only allow digits and limit to 6 characters
    const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(digitsOnly);
    setActiveIndex(digitsOnly.length);
  }, []);

  const handleVerify = () => {
    console.log("Verification code:", code);
    router.push("/auth/location");
  };

  const handleResendCode = () => {
    console.log("Resend code pressed");
    setCode("");
    setActiveIndex(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isCodeComplete = () => code.length === 6;

  // Create array of 6 digits for display
  const displayDigits = code.split("").concat(Array(6 - code.length).fill(""));

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <Header title="Verification Code" />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View style={styles.content}>
              {/* Shield Icon Section */}
              <View style={styles.iconContainer}>
                <ShieldIcon />
              </View>

              {/* Title Section */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter Your Verification Code</Text>
                <Text style={styles.subtitle}>
                  We sent a code to {phoneNumber}.
                </Text>
              </View>

              {/* Code Input Section */}
              <View style={styles.codeInputContainer}>
                {/* Hidden input for actual text input */}
                <TextInput
                  ref={inputRef}
                  style={styles.hiddenInput}
                  value={code}
                  onChangeText={handleCodeChange}
                  keyboardType="number-pad"
                  maxLength={6}
                  selectTextOnFocus
                  autoCorrect={false}
                  importantForAutofill="no"
                  textContentType="oneTimeCode"
                  allowFontScaling={false}
                  returnKeyType="done"
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                
                {/* Visual display boxes */}
                <TouchableOpacity
                  style={styles.displayContainer}
                  onPress={() => inputRef.current?.focus()}
                  activeOpacity={0.8}
                >
                  {displayDigits.map((digit, index) => (
                    <CodeDisplayBox
                      key={index}
                      digit={digit}
                      index={index}
                      activeIndex={activeIndex}
                      scaleAnim={scaleAnim}
                    />
                  ))}
                </TouchableOpacity>
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
            </View>
          </ScrollView>

          {/* Verify Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Verify"
              onPress={handleVerify}
              disabled={!isCodeComplete()}
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
    color: color.black,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: color.gray400,
    fontFamily: font.regular,
    textAlign: "center",
    lineHeight: 22,
  },
  codeInputContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
  displayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codeBox: {
    width: 50,
    height: 60,
    borderWidth: 1.5,
    borderColor: color.gray200,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  activeCodeBox: {
    borderColor: color.gray200,
    borderWidth: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  filledCodeBox: {
    borderColor: color.gray200,
    backgroundColor: color.white,
  },
  codeText: {
    fontSize: 24,
    fontFamily: font.semiBold,
    color: color.black,
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
    letterSpacing: 0.6,
    color: color.black,
    fontFamily: font.medium,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
