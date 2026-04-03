import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";
import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import sessionData from "@/mock-data/session-result.json";
import type { SessionResult } from "../types";
import { SessionHeader } from "../components/session-header";
import { SmartSummaryTab } from "../components/smart-summary-tab";
import { KeyMomentsTab } from "../components/key-moments-tab";

type Tab = "summary" | "highlights";
type SessionNavProp = NativeStackNavigationProp<RootStackParamList>;

const result = sessionData as SessionResult;



export default function SessionResultScreen() {
  const navigation = useNavigation<SessionNavProp>();
  const [activeTab, setActiveTab] = useState<Tab>("summary");

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SessionHeader result={result} onClose={() => navigation.goBack()} />

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab("summary")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "summary" && styles.tabTextActive,
              ]}
            >
              Smart summary
            </Text>
            {activeTab === "summary" && <View style={styles.tabUnderline} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab("highlights")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "highlights" && styles.tabTextActive,
              ]}
            >
              Key moments
            </Text>
            {activeTab === "highlights" && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>

        {activeTab === "summary" ? (
          <SmartSummaryTab summary={result.smartSummary} />
        ) : (
          <KeyMomentsTab 
            keyMoments={result.keyMoments} 
            audioDurationSeconds={result.audioDurationSeconds} 
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    backgroundColor: colors.successLight,
    paddingBottom: spacing.xl,
    alignItems: "center",
    paddingHorizontal: spacing.screenPadding,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.m,
    width: "100%",
    justifyContent: "center",
  },
  avatarImage: {
    width: 120,
    height: spacing.avatarSize,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    backgroundColor: colors.background,
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: typography.sizes.s,
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.bold,
  },
  questionCard: {
    backgroundColor: colors.success,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    width: "100%",
    alignItems: "center",
    gap: spacing.s,
  },
  questionText: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textInverse,
    textAlign: "center",
    lineHeight: spacing.xxl,
  },
  askedByRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  companyLogo: {
    width: spacing.m,
    height: spacing.m,
    borderRadius: spacing.xxs,
  },
  askedByText: {
    fontSize: typography.sizes.s,
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.normal,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.m,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.s,
  },
  tabText: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.medium,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.semiBold,
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: spacing.xl,
    right: spacing.xl,
    height: 2,
    backgroundColor: colors.textPrimary,
    borderRadius: 2,
  },
});
