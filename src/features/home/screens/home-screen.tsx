import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { QuestionCard } from "../components/question-card";

import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { RootStackParamList } from "@/navigation/types";
import questionsData from "@/mock-data/questions.json";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

import type { Question } from "../types";

const questions = questionsData as Question[];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCardPress = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleNavigation = useCallback(
    (route: keyof RootStackParamList) => {
      const parent = navigation.getParent<NavigationProps>();
      if (parent) {
        parent.navigate(route);
      } else {
        navigation.navigate(route);
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.topBar}>
        <Text style={styles.logoText}>Ready!</Text>
        <View style={styles.topBarRight}>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>⚡ 8</Text>
          </View>
          <TouchableOpacity style={styles.hamburgerButton} activeOpacity={0.7}>
            <Feather name="menu" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={questions}
          keyExtractor={(item) => item.id}
          // @ts-ignore
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          ListHeaderComponent={
            <TouchableOpacity style={styles.practiceBanner} activeOpacity={0.8}>
              <Text style={styles.bannerEmoji}>💪</Text>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerSubText}>Practicing Top 50 Questions for</Text>
                <Text style={styles.bannerMainText}>Big Tech Companies</Text>
              </View>
              <Feather name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          }
          ItemSeparatorComponent={() => <View style={{ height: spacing.m }} />}
          renderItem={({ item, index }) => {
            const isSelected = selectedId === item.id;
            return (
              <QuestionCard
                item={item}
                index={index}
                isSelected={isSelected}
                onPress={() => handleCardPress(item.id)}
                onFeedbackPress={() => handleNavigation("SessionResult")}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.l,
    paddingTop: spacing.xs,
    paddingBottom: spacing.s,
    backgroundColor: colors.background,
  },
  logoText: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.inter.bold,
    color: colors.primary,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
  },
  xpBadge: {
    backgroundColor: palette.green50,
    paddingHorizontal: spacing.m,
    paddingVertical: 6,
    borderRadius: 999,
  },
  xpText: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.bold,
    color: palette.white,
  },
  hamburgerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: palette.gray20,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: spacing.l,
  },
  scrollContent: {
    paddingBottom: 120,
    paddingTop: spacing.xs,
  },
  practiceBanner: {
    backgroundColor: palette.orange10,
    borderRadius: spacing.cardRadius,
    borderWidth: 1.5,
    borderColor: palette.orange30,
    padding: spacing.m,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.l,
  },
  bannerEmoji: {
    fontSize: 24,
    marginRight: spacing.s,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerSubText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  bannerMainText: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
  },
});
