import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
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

const user = userData as User;

export default function SettingsScreen() {
  const navigation = useNavigation();

  const infoItems = [
    { label: "Phone number", value: user.phone, icon: <Feather name="phone" size={20} color={colors.textSecondary} /> },
    { label: "Learning since", value: "August 17, 2025", icon: <Feather name="clock" size={20} color={colors.textSecondary} /> },
  ];

  const menuItems = [
    { label: "Chat with us", icon: <Feather name="message-square" size={20} color={colors.textSecondary} />, onPress: () => {} },
    { label: "Share the app", icon: <Feather name="share" size={20} color={colors.textSecondary} />, onPress: () => {} },
    { label: "Rate the app", icon: <Feather name="star" size={20} color={colors.textSecondary} />, onPress: () => {} },
    {
      label: "Log out",
      icon: <Feather name="log-out" size={20} color={colors.textSecondary} />,
      onPress: () => navigation.navigate("Auth" as never),
    },
  ];

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="chevron-left" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.pageTitle}>Your Profile</Text>
        
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.trialCard}>
        <Image
          source={require("../../../../assets/trial.png")}
          style={styles.trialImage}
          cachePolicy="memory-disk"
          contentFit="cover"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.updateRow}>
          <View style={styles.rowIconContainer}>
            <Feather name="grid" size={20} color={colors.textSecondary} />
          </View>
          <Text style={styles.updateText}>New update available</Text>
          <View style={styles.updateBadge}>
            <Feather name="arrow-down" size={14} color={colors.success} />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        {infoItems.map((item, index) => (
          <View key={item.label}>
            <View style={styles.menuRow}>
              <View style={styles.rowIconContainer}>{item.icon}</View>
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
            <TouchableOpacity style={styles.menuRow} onPress={item.onPress} activeOpacity={0.7}>
              <View style={styles.rowIconContainer}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.l,
  },
  backButton: {
    padding: spacing.s,
  },
  pageTitle: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
  },
  trialCard: {
    borderRadius: spacing.cardRadius,
    marginBottom: spacing.m,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: palette.gray70,
  },
  trialImage: {
    width: "100%",
    aspectRatio: 2.5,
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
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.m,
    gap: spacing.s,
  },
  rowIconContainer: {
    width: spacing.xl,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.medium,
    color: colors.textPrimary,
  },
  menuValue: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.normal,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.xl + spacing.s,
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