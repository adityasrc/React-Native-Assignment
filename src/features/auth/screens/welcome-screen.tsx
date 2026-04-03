import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

type WelcomeNavProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topSection}>
        <Image
          source={require("../../../../assets/ready.png")}
          style={styles.logo}
          cachePolicy="memory-disk"
          contentFit="contain"
        />
      </View>

      <View style={styles.middleSection}>
        <Image
          source={require("../../../../assets/welcome.png")}
          style={styles.illustration}
          cachePolicy="memory-disk"
          contentFit="contain"
        />
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.l,
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    marginTop: spacing.xl,
  },
  logo: {
    width: 140,
    height: 44,
  },
  middleSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 320,
    height: 320,
  },
  bottomSection: {
    width: "100%",
    gap: spacing.m,
    marginBottom: spacing.xl,
  },
  button: {
    width: "100%",
    backgroundColor: colors.buttonPrimary,
    borderRadius: spacing.buttonRadius || 14,
    paddingVertical: spacing.m,
    alignItems: "center",
  },
  buttonText: {
    color: colors.buttonPrimaryText,
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.semiBold,
  },
  disclaimer: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: typography.fonts.inter.normal,
  },
  link: {
    color: colors.textPrimary,
    textDecorationLine: "underline",
    fontFamily: typography.fonts.inter.medium,
  },
});