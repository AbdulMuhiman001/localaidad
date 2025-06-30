import { color, font } from "@/utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  backgroundColor?: string;
  titleColor?: string;
  borderBottom?: boolean;
  style?: any;
  titleStyle?: any;
  leftButtonStyle?: any;
  rightButtonStyle?: any;
}

export default function Header({
  title,
  showBackButton = true,
  onBackPress,
  leftElement,
  rightElement,
  backgroundColor = color.white,
  titleColor = color.black,
  borderBottom = true,
  style,
  titleStyle,
  leftButtonStyle,
  rightButtonStyle,
}: HeaderProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const renderLeftElement = () => {
    if (leftElement) {
      return leftElement;
    }

    if (showBackButton) {
      return (
        <TouchableOpacity
          style={[styles.backButton, leftButtonStyle]}
          onPress={handleBackPress}
        >
          <AntDesign name="arrowleft" size={24} color={titleColor} />
        </TouchableOpacity>
      );
    }

    return <View style={styles.headerSpacer} />;
  };

  const renderRightElement = () => {
    if (rightElement) {
      return rightElement;
    }

    return <View style={styles.headerSpacer} />;
  };

  return (
    <View
      style={[
        styles.header,
        { backgroundColor },
        borderBottom && styles.headerBorder,
        style,
      ]}
    >
      {renderLeftElement()}

      {title && (
        <Text
          style={[styles.headerTitle, { color: titleColor }, titleStyle]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}

      {renderRightElement()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    minHeight: 60,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: color.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: font.regular,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
});
