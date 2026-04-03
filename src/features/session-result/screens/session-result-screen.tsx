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

interface KeyMoment {
  timestamp: string;
  description: string;
  type: "positive" | "negative";
}

interface SmartSummary {
  whatWorkedWell: string[];
  overallTakeaways: string[];
}

interface SessionResult {
  questionId: string;
  questionText: string;
  companyName: string;
  companyLogoUrl: string;
  smartSummary: SmartSummary;
  keyMoments: KeyMoment[];
  audioDurationSeconds: number;
}

type Tab = "summary" | "highlights";
type SessionNavProp = NativeStackNavigationProp<RootStackParamList>;

const result = sessionData as SessionResult;

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

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
        <View style={styles.header}>
          <View style={styles.avatarRow}>
            <Image
              source={require('../../../../assets/avtar.png')}
              style={styles.avatarImage}
              cachePolicy="memory-disk"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{result.questionText}</Text>
            <View style={styles.askedByRow}>
              <Image
                source={{ uri: result.companyLogoUrl }}
                style={styles.companyLogo}
                cachePolicy="memory-disk"
              />
              <Text style={styles.askedByText}>
                Asked by {result.companyName}
              </Text>
            </View>
          </View>
        </View>

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
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>What worked well</Text>
            {result.smartSummary.whatWorkedWell.map((point, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletIcon}>✦</Text>
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}

            <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
              Overall takeaways
            </Text>
            {result.smartSummary.overallTakeaways.map((point, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletIcon}>✦</Text>
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.tabContent}>
            <View style={styles.audioPlayer}>
              <Text style={styles.audioTitle}>Mock Interview</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <View style={styles.audioTimestamps}>
                <Text style={styles.audioTime}>00:00</Text>
                <Text style={styles.audioTime}>
                  {formatDuration(result.audioDurationSeconds)}
                </Text>
              </View>
            </View>

            {result.keyMoments.map((moment, i) => (
              <View key={i} style={styles.momentItem}>
                <Text
                  style={[
                    styles.momentTimestamp,
                    moment.type === "negative" &&
                      styles.momentTimestampNegative,
                  ]}
                >
                  {moment.timestamp}
                </Text>
                <Text style={styles.momentDescription}>
                  {moment.description}
                </Text>
              </View>
            ))}
          </View>
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
  tabContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.l,
  },
  sectionTitle: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
    marginBottom: spacing.s,
  },
  sectionTitleSpaced: {
    marginTop: spacing.xl,
  },
  bulletRow: {
    flexDirection: "row",
    gap: spacing.s,
    marginBottom: spacing.s,
  },
  bulletIcon: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: spacing.l,
  },
  audioPlayer: {
    backgroundColor: colors.primaryLight,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    marginBottom: spacing.xl,
  },
  audioTitle: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.primary,
    marginBottom: spacing.s,
  },
  progressBar: {
    height: spacing.xxs,
    backgroundColor: colors.border,
    borderRadius: spacing.xxs,
    marginBottom: spacing.xs,
  },
  progressFill: {
    width: "40%",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: spacing.xxs,
  },
  audioTimestamps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  audioTime: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  momentItem: {
    marginBottom: spacing.l,
  },
  momentTimestamp: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.success,
    marginBottom: spacing.xxs,
  },
  momentTimestampNegative: {
    color: colors.error,
  },
  momentDescription: {
    fontSize: typography.sizes.s,
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: spacing.l,
  },
});
