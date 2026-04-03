import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import userData from "@/mock-data/user.json";

interface User {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
}

interface MenuItem {
  label: string;
  value?: string;
  onPress: () => void;
  showChevron?: boolean;
  rightIcon?: string;
}

const user = userData as User;

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Auth" as never);
  };

  const infoItems: MenuItem[] = [
    {
      label: "Phone number",
      value: user.phone,
      onPress: () => {},
    },
    {
      label: "Learning since",
      value: "August 17, 2025",
      onPress: () => {},
    },
  ];

  const menuItems: MenuItem[] = [
    {
      label: "Chat with us",
      onPress: () => {},
      showChevron: true,
    },
    {
      label: "Share the app",
      onPress: () => {},
      showChevron: true,
    },
    {
      label: "Rate the app",
      onPress: () => {},
      showChevron: true,
    },
    {
      label: "Log out",
      onPress: handleLogout,
      showChevron: true,
    },
  ];

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.pageTitle}>Your Profile</Text>

      <View style={styles.trialCard}>
        <View style={styles.trialTextBlock}>
          <Text style={styles.trialHeading}>3 days free trial for</Text>
          <Text style={styles.trialPrice}>₹1</Text>
          <Text style={styles.trialSub}>Then ₹299/month</Text>
          <TouchableOpacity style={styles.trialButton}>
            <Text style={styles.trialButtonText}>START 3 DAYS TRIAL @ ₹1</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../../../assets/trial.png")}
          style={styles.trialImage}
          cachePolicy="memory-disk"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.updateRow}>
          <Text style={styles.menuIcon}>⊞</Text>
          <Text style={styles.updateText}>New update available</Text>
          <TouchableOpacity style={styles.updateBadge}>
            <Text style={styles.updateIcon}>↓</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        {infoItems.map((item, index) => (
          <View key={item.label}>
            <View style={styles.menuRow}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuValue}>{item.value}</Text>
            </View>
            {index < infoItems.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.card}>
        {menuItems.map((item, index) => (
          <View key={item.label}>
            <TouchableOpacity style={styles.menuRow} onPress={item.onPress}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.showChevron && <Text style={styles.chevron}>›</Text>}
            </TouchableOpacity>
            {index < menuItems.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>App version v2.15.4</Text>
        <Text style={styles.footerText}>Made with ♥ from India</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.l,
  },
  backButton: {
    marginBottom: spacing.xs,
  },
  backText: {
    fontSize: typography.sizes.xxxl,
    color: colors.textPrimary,
    lineHeight: typography.sizes.xxxl,
  },
  pageTitle: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.l,
    marginTop: -spacing.xl,
  },
  trialCard: {
    backgroundColor: palette.gray90,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.m,
    borderWidth: 2,
    borderColor: "#7C3AED",
  },
  trialTextBlock: {
    flex: 1,
    gap: spacing.xxs,
  },
  trialHeading: {
    fontSize: typography.sizes.s,
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.normal,
  },
  trialPrice: {
    fontSize: typography.sizes.xxxl,
    color: palette.orange40,
    fontFamily: typography.fonts.inter.bold,
  },
  trialSub: {
    fontSize: typography.sizes.xs,
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.normal,
    marginBottom: spacing.s,
  },
  trialButton: {
    backgroundColor: colors.background,
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.s,
    alignSelf: "flex-start",
  },
  trialButtonText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.bold,
    color: palette.orange50,
    letterSpacing: 0.5,
  },
  trialImage: {
    width: 110,
    height: 130,
    marginLeft: spacing.s,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
  updateRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.m,
    gap: spacing.s,
  },
  updateText: {
    flex: 1,
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.medium,
    color: colors.textPrimary,
  },
  updateBadge: {
    backgroundColor: colors.successLight,
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  updateIcon: {
    fontSize: typography.sizes.s,
    color: colors.success,
    fontFamily: typography.fonts.inter.bold,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.m,
  },
  menuIcon: {
    fontSize: typography.sizes.m,
    color: colors.textSecondary,
  },
  menuLabel: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.medium,
    color: colors.textPrimary,
  },
  menuValue: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.normal,
    color: colors.textSecondary,
  },
  chevron: {
    fontSize: typography.sizes.xl,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  footer: {
    alignItems: "center",
    gap: spacing.xxs,
    marginTop: spacing.s,
  },
  footerText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
});
