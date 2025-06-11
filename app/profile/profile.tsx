import { color, font } from "@/utils/constants";
import { ProfileIcon } from "@/utils/SvgIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PersonalInformationScreen() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [username, setUsername] = useState("johndoe_01");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(1995, 11, 27));
  const [gender, setGender] = useState("Male");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

  const handleBackPress = () => {
    console.log("Back pressed");
  };

  const handleComplete = () => {
    console.log("Complete and earn points");
    console.log({
      firstName,
      lastName,
      username,
      dateOfBirth,
      gender,
    });
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    // Simulate username availability check
    setIsUsernameAvailable(text.length > 3);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const isFormValid = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      username.trim() &&
      isUsernameAvailable
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Icon Section */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <ProfileIcon color="#FF4444" size={32} />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Personal Information</Text>
          <Text style={styles.subtitle}>
            Let others recognize and connect with you.
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <View style={styles.inputWrapper}>
              <ProfileIcon color={color.gray400} size={20} />
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor={color.gray300}
              />
            </View>
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <View style={styles.inputWrapper}>
              <ProfileIcon color={color.gray400} size={20} />
              <TextInput
                style={styles.textInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor={color.gray300}
              />
            </View>
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <View style={styles.usernameLabelContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              {isUsernameAvailable && username.length > 0 && (
                <Text style={styles.availableText}>✓ Available</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.atSymbol}>@</Text>
              <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={handleUsernameChange}
                placeholder="username"
                placeholderTextColor={color.gray300}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.usernameHint}>
              <AntDesign name="infocirlce" size={16} color={color.gray400} />
              <Text style={styles.hintText}>
                Your public handle, like @coolname123
              </Text>
            </View>
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date of birth</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons
                name="calendar-today"
                size={20}
                color={color.gray400}
              />
              <Text style={styles.textInput}>{formatDate(dateOfBirth)}</Text>
            </TouchableOpacity>
          </View>

          {/* Gender */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowGenderModal(true)}
            >
              <Text style={styles.textInput}>{gender}</Text>
              <AntDesign name="down" size={16} color={color.gray400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={[
            styles.completeButton,
            !isFormValid() && styles.completeButtonDisabled,
          ]}
          onPress={handleComplete}
          disabled={!isFormValid()}
        >
          <Text style={styles.completeButtonText}>Complete and earn</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.coinIcon}>🪙</Text>
            <Text style={styles.pointsText}>+50 Points</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.genderOption}
                onPress={() => {
                  setGender(option);
                  setShowGenderModal(false);
                }}
              >
                <Text style={styles.genderOptionText}>{option}</Text>
                {gender === option && (
                  <AntDesign name="check" size={20} color={color.black} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowGenderModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  iconContainer: {
    alignItems: "center",
    paddingVertical: 20,
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
    paddingHorizontal: 20,
    marginBottom: 32,
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
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
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
  usernameLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  availableText: {
    fontSize: 14,
    fontFamily: font.medium,
    color: "#4CAF50",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: color.white,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
    marginLeft: 10,
  },
  atSymbol: {
    fontSize: 16,
    fontFamily: font.regular,
    color: color.gray400,
  },
  usernameHint: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  hintText: {
    fontSize: 14,
    fontFamily: font.regular,
    color: color.gray400,
    marginLeft: 8,
  },
  completeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.black,
    marginHorizontal: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 20,
  },
  completeButtonDisabled: {
    backgroundColor: color.gray200,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.white,
  },
  pointsBadge: {
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
    color: "#FFD700",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: color.white,
    borderRadius: 16,
    padding: 20,
    width: "80%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: font.semiBold,
    color: color.black,
    textAlign: "center",
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.gray100,
  },
  genderOptionText: {
    fontSize: 16,
    fontFamily: font.regular,
    color: color.black,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: font.medium,
    color: color.gray400,
  },
});
