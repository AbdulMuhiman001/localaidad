import CustomButton from "@/components/customButton";
import { color, font } from "@/utils/constants";
import { router } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function LocationScreen() {
  const [isRequesting, setIsRequesting] = useState(false);
  const [location, setLocation] = useState("");

  const handleGrantLocation = () => {
    setIsRequesting(true);
    // Simulate saving a location as text
    setTimeout(() => {
      setLocation("Sample Location, City Center");
      setIsRequesting(false);
      router.push("/auth/welcome");
    }, 1000);
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
        <CustomButton
          title="Grant Access to Location"
          onPress={handleGrantLocation}
          loading={isRequesting}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
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
});
