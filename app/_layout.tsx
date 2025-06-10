import { AppProvider } from "@/context/app_context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ToastProvider } from "../components/toast_provider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Medium": require("../assets/fonts/BrittiSansTrial-Light.otf"),
    "Inter-Regular": require("../assets/fonts/BrittiSansTrial-Regular.otf"),
    "Inter-SemiBold": require("../assets/fonts/BrittiSansTrial-Semibold.otf"),
    "Inter-Bold": require("../assets/fonts/BrittiSansTrial-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ToastProvider>
    </AppProvider>
  );
}
