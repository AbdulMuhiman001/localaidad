import { color, font } from "@/utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function AllSetScreen() {
  const confettiAnimations = useRef([]);
  const numberOfConfetti = 50;

  // Generate confetti pieces
  const confettiPieces = Array.from(
    { length: numberOfConfetti },
    (_, index) => {
      const animatedValue = new Animated.Value(-10);
      const rotateValue = new Animated.Value(0);

      confettiAnimations.current.push({
        fall: animatedValue,
        rotate: rotateValue,
      });

      return {
        id: index,
        animatedValue,
        rotateValue,
        left: Math.random() * width,
        color: Math.random() > 0.5 ? "#FF4444" : "#333333",
        size: Math.random() > 0.7 ? "large" : "small",
        shape: Math.random() > 0.5 ? "rectangle" : "square",
        delay: Math.random() * 2000,
        duration: 3000 + Math.random() * 2000,
      };
    }
  );

  useEffect(() => {
    // Start confetti animation
    const animations = confettiPieces.map((piece, index) => {
      return Animated.sequence([
        Animated.delay(piece.delay),
        Animated.parallel([
          Animated.timing(piece.animatedValue, {
            toValue: height + 50,
            duration: piece.duration,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.timing(piece.rotateValue, {
              toValue: 1,
              duration: 1000 + Math.random() * 1000,
              useNativeDriver: true,
            }),
            { iterations: -1 }
          ),
        ]),
      ]);
    });

    Animated.stagger(100, animations).start();

    // Restart animation every 5 seconds
    const interval = setInterval(() => {
      confettiPieces.forEach((piece) => {
        piece.animatedValue.setValue(-10);
        piece.rotateValue.setValue(0);
      });
      Animated.stagger(100, animations).start();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleEnterLocaided = () => {
    console.log("Enter Locaided pressed");
    // Navigate to main app
  };

  const getConfettiStyle = (piece) => {
    const rotate = piece.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const isLarge = piece.size === "large";
    const isRectangle = piece.shape === "rectangle";

    return {
      position: "absolute",
      left: piece.left,
      backgroundColor: piece.color,
      width: isRectangle ? (isLarge ? 12 : 8) : isLarge ? 8 : 6,
      height: isRectangle ? (isLarge ? 6 : 4) : isLarge ? 8 : 6,
      borderRadius: piece.shape === "square" ? 1 : 0,
      transform: [{ translateY: piece.animatedValue }, { rotate }],
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <Animated.View key={piece.id} style={getConfettiStyle(piece)} />
      ))}

      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <AntDesign name="check" size={40} color={color.black} />
          </View>
        </View>

        {/* Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>You're all set!</Text>
          <Text style={styles.subtitle}>
            Explore your city, share moments, and earn Social Score!
          </Text>
        </View>

        {/* Enter Button */}
        <TouchableOpacity
          style={styles.enterButton}
          onPress={handleEnterLocaided}
        >
          <Text style={styles.enterButtonText}>Enter Locaided</Text>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: color.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: font.semiBold,
    color: color.black,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: font.regular,
    color: color.gray400,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  enterButton: {
    backgroundColor: color.black,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  enterButtonText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.white,
  },
});
