import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Question } from "../types";

interface QuestionCardProps {
  item: Question;
  index: number;
  isSelected: boolean;
  onPress: () => void;
  onFeedbackPress: () => void;
}

export function QuestionCard({ item, index, isSelected, onPress, onFeedbackPress }: QuestionCardProps) {
    const cardBg =
      index === 0
        ? colors.backgroundCard1
        : index === 1
          ? colors.backgroundCard2
          : colors.cardBackground;
    const circleBg =
      index === 0
        ? colors.numberBadge1
        : index === 1
          ? colors.numberBadge2
          : colors.numberBadgeDefault;

    return (
      <View style={styles.cardBlock}>
        <TouchableOpacity
          style={[styles.cardPill, { backgroundColor: cardBg }]}
          activeOpacity={0.8}
          onPress={onPress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={`Question ${item.questionNumber} from ${item.companyName}`}
        >
          <View style={styles.cardLeftContent}>
            <Image
              source={{ uri: item.companyLogoUrl }}
              style={styles.companyLogo}
              cachePolicy="memory-disk"
            />
            <Text style={styles.companyName} numberOfLines={1}>
              {item.companyName}
            </Text>
          </View>
          <View style={[styles.numberCircle, { backgroundColor: circleBg }]}>
            <Text style={styles.numberText}>{item.questionNumber}</Text>
          </View>
        </TouchableOpacity>

        {index === 0 && !isSelected && (
          <View style={styles.startBadgeRow}>
            <View style={styles.startBadge}>
              <Text style={styles.startBadgeText}>START</Text>
            </View>
          </View>
        )}

        {isSelected && (
          <View style={styles.expansionPanel}>
            <Text style={styles.expansionQuestion}>{item.text}</Text>
            <View style={styles.expansionMeta}>
              <Text style={styles.expansionAskedBy}>
                Asked by {item.companyName}
              </Text>
              <View style={styles.expansionDurationRow}>
                <Feather name="clock" size={13} color={colors.textSecondary} />
                <Text style={styles.expansionDurationText}>
                  {item.durationMinutes} mins
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.feedbackButton}
              onPress={onFeedbackPress}
              accessible
              accessibilityRole="button"
            >
              <Text style={styles.feedbackText}>FEEDBACK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aiButton}
              disabled
              accessibilityState={{ disabled: true }}
            >
              <Feather
                name="headphones"
                size={16}
                color={colors.textInverse}
                style={styles.aiIcon}
              />
              <Text style={styles.aiButtonText}>AI VS AI (LISTEN)</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.completedTodayCount > 0 && (
          <View style={styles.socialProofContainer}>
            <View style={styles.dottedLine} />
            <Text style={styles.socialProofText}>
              🚩 {item.completedTodayCount.toLocaleString()} users completed Question {item.questionNumber} today 🚩
            </Text>
            <View style={styles.dottedLine} />
          </View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  cardBlock: {
    gap: 0,
  },
  cardPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 8,
    paddingLeft: spacing.m,
    paddingRight: 8,
  },
  cardLeftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: spacing.s,
  },
  companyLogo: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
  companyName: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
  },
  numberCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: colors.textInverse,
    fontSize: 24,
    fontFamily: typography.fonts.inter.bold,
  },
  startBadgeRow: {
    alignItems: "center",
    marginTop: -4,
    marginBottom: 4,
    zIndex: 10,
  },
  startBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.l,
    paddingVertical: 5,
    borderRadius: 999,
  },
  startBadgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textInverse,
    letterSpacing: 1,
  },
  expansionPanel: {
    backgroundColor: palette.orange20,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    marginTop: spacing.xs,
    gap: spacing.s,
  },
  expansionQuestion: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  expansionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expansionAskedBy: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  expansionDurationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  expansionDurationText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  feedbackButton: {
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.success,
    paddingVertical: 12,
    borderRadius: spacing.cardRadius,
    alignItems: "center",
  },
  feedbackText: {
    color: colors.success,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    letterSpacing: 0.5,
  },
  aiButton: {
    backgroundColor: palette.gray90,
    paddingVertical: 12,
    borderRadius: spacing.cardRadius,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  aiIcon: {
    marginRight: spacing.xs,
  },
  aiButtonText: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    letterSpacing: 0.5,
  },
  socialProofContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  socialProofText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginHorizontal: spacing.s,
    fontFamily: typography.fonts.inter.medium,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: palette.orange30,
    borderStyle: "dashed",
  },
});
