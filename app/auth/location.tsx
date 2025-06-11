import { color, font } from "@/utils/constants";
// import { LocationIcon } from "@/utils/SvgIcons";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LocationScreen() {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleGrantLocation = async () => {
    setIsRequesting(true);

    try {
      const serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        Alert.alert(
          "Location Services Disabled",
          "Please enable location services in your device settings to continue.",
          [{ text: "OK" }]
        );
        setIsRequesting(false);
        return;
      }

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        console.log("Location permission granted");
        // Navigate to next screen (replace with your next route)
        router.push("/auth/welcome"); // or wherever you want to navigate
      } else if (status === "denied") {
        Alert.alert(
          "Location Permission Denied",
          "Location access is required to discover and share real-time moments around you. Please grant permission in settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => {
                // Note: Opening settings programmatically requires additional setup
                console.log("Open device settings");
              },
            },
          ]
        );
      } else {
        console.log("Location permission not granted:", status);
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
      Alert.alert(
        "Error",
        "Something went wrong while requesting location permission. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/location.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        {/* Content Section */}
        <View style={styles.textContent}>
          <Text style={styles.title}>We Need Your Location</Text>
          <Text style={styles.subtitle}>
            Locaided uses your location to help you discover and share real-time
            moments happening around you.
          </Text>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.grantButton,
              isRequesting && styles.grantButtonDisabled,
            ]}
            onPress={handleGrantLocation}
            disabled={isRequesting}
          >
            <Text style={styles.grantButtonText}>
              {isRequesting ? "Requesting..." : "Grant Access to Location"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  phoneContainer: {
    marginBottom: 40,
  },
  phoneMockup: {
    width: 280,
    height: 500,
    backgroundColor: color.white,
    borderRadius: 25,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  statusTime: {
    fontSize: 14,
    fontFamily: font.semiBold,
    color: color.black,
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  signalBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginRight: 6,
  },
  bar: {
    width: 3,
    backgroundColor: color.black,
    marginRight: 2,
  },
  bar1: { height: 4 },
  bar2: { height: 6 },
  bar3: { height: 8 },
  bar4: { height: 10 },
  wifi: {
    width: 15,
    height: 12,
    backgroundColor: color.black,
    marginRight: 6,
    borderRadius: 2,
  },
  battery: {
    width: 24,
    height: 12,
    backgroundColor: color.black,
    borderRadius: 2,
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  appTitle: {
    fontSize: 20,
    fontFamily: font.semiBold,
    color: color.black,
  },
  headerIcons: {
    flexDirection: "row",
  },
  searchIcon: {
    width: 20,
    height: 20,
    backgroundColor: color.gray300,
    borderRadius: 10,
    marginRight: 12,
  },
  dropIcon: {
    width: 20,
    height: 20,
    backgroundColor: color.gray300,
    borderRadius: 10,
  },
  storiesSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  story: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.gray100,
    marginBottom: 5,
  },
  activeStory: {
    borderWidth: 2,
    borderColor: "#FF4444",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: color.gray200,
  },
  storyName: {
    fontSize: 12,
    fontFamily: font.regular,
    color: color.black,
  },
  mapSection: {
    flex: 1,
    backgroundColor: color.gray50,
    margin: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  locationPin: {
    width: 50,
    height: 50,
    backgroundColor: color.white,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontFamily: font.semiBold,
    textAlign: "center",
    marginBottom: 12,
    color: color.black,
  },
  subtitle: {
    fontSize: 16,
    color: color.gray400,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
    fontFamily: font.regular,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  grantButton: {
    backgroundColor: color.black,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  grantButtonDisabled: {
    opacity: 0.7,
  },
  grantButtonText: {
    color: color.white,
    fontSize: 16,
    fontFamily: font.semiBold,
  },
});
