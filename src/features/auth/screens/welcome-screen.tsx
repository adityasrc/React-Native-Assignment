import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@/navigation/types";
import { colors } from "@/theme";
import { spacing } from "@/theme";
import { typography } from "@/theme";

type WelcomeNavProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavProp>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/ready.png")}
        style={styles.logo}
        cachePolicy="memory-disk"
      />

      <Image
        source={require("../../../../assets/welcome.png")}
        style={styles.illustration}
        cachePolicy="memory-disk"
      />

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>✓ Let's go</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By continuing, you acknowledge agreeing to our{"\n"}
          <Text style={styles.link}>terms of service</Text>
          <Text> and </Text>
          <Text style={styles.link}>privacy policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  logo: {
    width: 180,
    height: 60,
  },
  illustration: {
    width: 300,
    height: 300,
  },
  taglineContainer: {
    alignItems: "center",
  },
  taglineBlack: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    lineHeight: 32,
  },
  taglineOrange: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    lineHeight: 32,
  },
  button: {
    width: "100%",
    backgroundColor: colors.buttonPrimary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: colors.buttonPrimaryText,
    fontSize: 16,
    fontWeight: "600",
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    color: colors.textLink,
    textDecorationLine: "underline",
  },
  bottomSection: {
    width: "100%",
    gap: 16,
  },
});
