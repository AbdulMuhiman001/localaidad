import { color, font } from "@/utils/constants";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: any;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  backgroundColor,
  textColor,
  borderColor,
  icon,
  iconPosition = "left",
  fullWidth = true,
  style,
}: CustomButtonProps) {
  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button];

    // Size variants
    switch (size) {
      case "small":
        baseStyle.push(styles.smallButton);
        break;
      case "large":
        baseStyle.push(styles.largeButton);
        break;
      default:
        baseStyle.push(styles.mediumButton);
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle.push(styles.secondaryButton);
        break;
      case "outline":
        baseStyle.push(styles.outlineButton);
        break;
      default:
        baseStyle.push(styles.primaryButton);
    }

    // Custom colors
    if (backgroundColor) {
      baseStyle.push({ backgroundColor });
    }
    if (borderColor) {
      baseStyle.push({ borderColor });
    }

    // States
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }

    // Full width
    if (!fullWidth) {
      baseStyle.push(styles.autoWidth);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: any[] = [styles.buttonText];

    // Size variants
    switch (size) {
      case "small":
        baseStyle.push(styles.smallText);
        break;
      case "large":
        baseStyle.push(styles.largeText);
        break;
      default:
        baseStyle.push(styles.mediumText);
    }

    // Variant text colors
    switch (variant) {
      case "secondary":
        baseStyle.push(styles.secondaryText);
        break;
      case "outline":
        baseStyle.push(styles.outlineText);
        break;
      default:
        baseStyle.push(styles.primaryText);
    }

    // Custom text color
    if (textColor) {
      baseStyle.push({ color: textColor });
    }

    // Disabled state
    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? color.white : color.black}
          />
        </View>
      );
    }

    if (icon) {
      return (
        <View style={styles.iconContainer}>
          {iconPosition === "left" && icon}
          <Text style={getTextStyle()}>{title}</Text>
          {iconPosition === "right" && icon}
        </View>
      );
    }

    return <Text style={getTextStyle()}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  // Size variants
  smallButton: {
    paddingVertical: 12,
  },
  mediumButton: {
    paddingVertical: 18,
  },
  largeButton: {
    paddingVertical: 22,
  },

  // Button variants
  primaryButton: {
    backgroundColor: color.black,
  },
  secondaryButton: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray200,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: color.gray200,
  },

  // Text styles
  buttonText: {
    fontFamily: font.semiBold,
    textAlign: "center",
  },

  // Text size variants
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Text color variants
  primaryText: {
    color: color.white,
  },
  secondaryText: {
    color: color.black,
  },
  outlineText: {
    color: color.black,
  },

  // States
  disabledButton: {
    backgroundColor: color.gray200,
    borderColor: color.gray200,
  },
  disabledText: {
    color: color.gray400,
  },

  // Loading
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: 8,
  },

  // Icon
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // Width
  autoWidth: {
    alignSelf: "flex-start",
  },
});
