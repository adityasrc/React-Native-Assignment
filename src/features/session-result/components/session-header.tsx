import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { SessionResult } from "../types";

interface SessionHeaderProps {
  result: SessionResult;
  onClose: () => void;
}

export function SessionHeader({ result, onClose }: SessionHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.avatarRow}>
        <Image
          source={require("../../../../assets/avtar.png")}
          style={styles.avatarImage}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
          <Text style={styles.askedByText}>Asked by {result.companyName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
