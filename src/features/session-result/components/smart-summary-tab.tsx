import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { SmartSummary } from "../types";

interface SmartSummaryTabProps {
  summary: SmartSummary;
}

export function SmartSummaryTab({ summary }: SmartSummaryTabProps) {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>What worked well</Text>
      {summary.whatWorkedWell.map((point, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>✦</Text>
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}

      <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
        Overall takeaways
      </Text>
      {summary.overallTakeaways.map((point, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>✦</Text>
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
