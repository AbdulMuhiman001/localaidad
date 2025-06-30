import Coin from "@/assets/images/coin.svg";
import UserIcon from "@/assets/images/default.svg";
import Header from "@/components/header";
import { color, font } from "@/utils/constants";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AvatarScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleBackPress = () => {
    console.log("Back pressed");
  };

  const handleChooseAvatar = async () => {
    try {
      // Request permission to access media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required to select an avatar.",
          [{ text: "OK" }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        setIsImageSelected(true);
        console.log("Image selected:", imageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const handleTakePhoto = async () => {
    try {
      // Request camera permission
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera is required to take a photo.",
          [{ text: "OK" }]
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        setIsImageSelected(true);
        console.log("Photo taken:", imageUri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Select Avatar",
      "Choose how you'd like to set your profile image",
      [
        { text: "Camera", onPress: handleTakePhoto },
        { text: "Photo Library", onPress: handleChooseAvatar },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handleDoLater = () => {
    console.log("I will do later pressed");
    // Navigate to next screen or back
  };

  const handleComplete = () => {
    if (selectedImage) {
      console.log("Complete and earn points with image:", selectedImage);
      // Process the selected image and navigate
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choose an Avatar" />

      <View style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.avatarImage}
              />
            ) : (
              <UserIcon />
            )}
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Set Profile Image</Text>
          <Text style={styles.subtitle}>Min 400x400px, PNG or JPEG</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.chooseButton}
            onPress={showImagePickerOptions}
          >
            <Text style={styles.chooseButtonText}>Choose Avatar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDoLater}>
            <Text style={styles.laterText}>I will do later</Text>
          </TouchableOpacity>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={[styles.completeButton]}
          onPress={handleComplete}
          disabled={!isImageSelected}
        >
          <Text style={[styles.completeButtonText]}>Complete and earn</Text>
          <View style={styles.pointsBadge}>
            <Coin />
            <Text style={[styles.pointsText]}>+25 Points</Text>
          </View>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarCircle: {
    // width: 160,
    // height: 160,
    // borderRadius: 80,
    // backgroundColor: color.gray100,
    // justifyContent: "center",
    // alignItems: "center",
    // overflow: "hidden",
  },
  avatarImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  avatarPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: color.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: font.semiBold,
    color: color.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: font.regular,
    color: color.gray400,
  },
  actionContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  chooseButton: {
    backgroundColor: color.gray200,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
    minWidth: 200,
    alignItems: "center",
  },
  chooseButtonText: {
    fontSize: 16,
    fontFamily: font.medium,
    color: color.gray600,
  },
  laterText: {
    fontSize: 14,
    fontFamily: font.medium,
    color: color.gray400,
    textDecorationLine: "underline",
  },
  completeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.black,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: "auto",
    marginBottom: 20,
    width: "100%",
    gap: 4,
  },
  completeButtonDisabled: {
    backgroundColor: color.gray200,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.white,
  },
  completeButtonTextDisabled: {
    color: color.gray400,
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
  pointsTextDisabled: {
    color: color.gray400,
  },
});
