import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { KeyMoment } from "../types";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface KeyMomentsTabProps {
  keyMoments: KeyMoment[];
  audioDurationSeconds: number;
}

export function KeyMomentsTab({ keyMoments, audioDurationSeconds }: KeyMomentsTabProps) {
    return (
      <View style={styles.tabContent}>
        <View style={styles.audioPlayer}>
          <Text style={styles.audioTitle}>Mock Interview</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.audioTimestamps}>
            <Text style={styles.audioTime}>00:00</Text>
            <Text style={styles.audioTime}>
              {formatDuration(audioDurationSeconds)}
            </Text>
          </View>
        </View>

        {keyMoments.map((moment, i) => (
          <View key={i} style={styles.momentItem}>
            <Text
              style={[
                styles.momentTimestamp,
                moment.type === "negative" && styles.momentTimestampNegative,
              ]}
            >
              {moment.timestamp}
            </Text>
            <Text style={styles.momentDescription}>{moment.description}</Text>
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
