import { color, font } from "@/utils/constants";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Splash() {
  const containerScale = useSharedValue(0);
  const imageScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const loaderRotation = useSharedValue(0);
  const loaderOpacity = useSharedValue(0);

  useEffect(() => {
    containerScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });

    setTimeout(() => {
      imageScale.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      textOpacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      textTranslateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
    }, 400);

    // Start loader animation after a short delay
    setTimeout(() => {
      loaderOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      loaderRotation.value = withRepeat(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }, 800);
  }, [
    containerScale,
    imageScale,
    textOpacity,
    textTranslateY,
    loaderRotation,
    loaderOpacity,
  ]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: containerScale.value }],
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const animatedLoaderStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
    transform: [{ rotate: `${loaderRotation.value}deg` }],
  }));

  useEffect(() => {
    setTimeout(() => {
      router.replace("/entry");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedContainerStyle]}>
        <Animated.Image
          style={[styles.image, animatedImageStyle]}
          source={require("../assets/images/icon.png")}
        />
      </Animated.View>
      <Animated.Text style={[styles.appName, animatedTextStyle]}>
        People. Places. Proof.{" "}
      </Animated.Text>

      {/* Loader */}
      <Animated.View style={[styles.loaderContainer, animatedLoaderStyle]}>
        <View style={styles.loader} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 130,
    width: 130,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  appName: {
    fontSize: 18,
    marginTop: 46,
    color: color.white,
    fontFamily: font.semiBold,
  },
  loaderContainer: {
    position: "absolute",
    bottom: 100,
    width: 36,
    height: 36,
  },
  loader: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "transparent",
    borderTopColor: "rgba(255, 37, 88, 0.8)",
    borderRightColor: "rgba(255, 37, 88, 0.9)",
  },
});
