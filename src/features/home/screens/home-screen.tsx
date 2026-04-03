import React, { useRef, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";
import { colors, palette } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import questionsData from "@/mock-data/questions.json";

interface Question {
  id: string;
  questionNumber: number;
  companyId: string;
  companyName: string;
  companyLogoUrl: string;
  text: string;
  durationMinutes: number;
  completedTodayCount: number;
}

type HomeNavProp = NativeStackNavigationProp<RootStackParamList>;

const questions = questionsData as Question[];

function getCardBg(index: number): string {
  if (index === 0) return colors.backgroundCard1;
  if (index === 1) return colors.backgroundCard2;
  return colors.cardBackground;
}

function getNumberBg(index: number): string {
  if (index === 0) return colors.numberBadge1;
  if (index === 1) return colors.numberBadge2;
  return colors.numberBadgeDefault;
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [picked, setPicked] = useState<Question | null>(null);
  const [headerExpanded, setHeaderExpanded] = useState(false);

  const openSheet = useCallback((item: Question) => {
    setPicked(item);
    bottomSheetRef.current?.expand();
  }, []);

  const goToResult = useCallback(() => {
    bottomSheetRef.current?.close();
    navigation.navigate("SessionResult" as never);
  }, [navigation]);

  const renderCard: ListRenderItem<Question> = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.cardWrapper}>
          {index === 0 && (
            <View style={styles.startBadge}>
              <Text style={styles.startText}>START</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => openSheet(item)}
            style={[styles.card, { backgroundColor: getCardBg(index) }]}
            activeOpacity={0.75}
          >
            <Image
              source={{ uri: item.companyLogoUrl }}
              style={styles.companyLogo}
              cachePolicy="memory-disk"
            />
            <Text style={styles.companyName} numberOfLines={1}>
              {item.companyName}
            </Text>
            <View style={[styles.numberBadge, { backgroundColor: getNumberBg(index) }]}>
              <Text style={styles.numberText}>{item.questionNumber}</Text>
            </View>
          </TouchableOpacity>

          {item.completedTodayCount > 0 && (
            <View style={styles.socialProofRow}>
              <Text style={styles.flagEmoji}>🚩</Text>
              <Text style={styles.socialProofText}>
                {item.completedTodayCount.toLocaleString()} users completed Question {item.questionNumber} today
              </Text>
              <Text style={styles.flagEmoji}>🚩</Text>
            </View>
          )}
        </View>
      );
    },
    [openSheet],
  );

  const ListHeader = useCallback(
    () => (
      <View style={styles.listHeader}>
        <View style={styles.topBar}>
          <Text style={styles.brandText}>Ready!</Text>
          <View style={styles.topBarRight}>
            <View style={styles.notifBadge}>
              <Text style={styles.notifIcon}>⚡</Text>
              <Text style={styles.notifCount}>8</Text>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.practiceCard}
          onPress={() => setHeaderExpanded((prev) => !prev)}
          activeOpacity={0.8}
        >
          <Text style={styles.practiceEmoji}>💪</Text>
          <View style={styles.practiceTextBlock}>
            <Text style={styles.practiceSmall}>Practicing Top 50 Questions for</Text>
            <Text style={styles.practiceBig}>Big Tech Companies</Text>
          </View>
          <Text style={styles.chevron}>{headerExpanded ? "∧" : "∨"}</Text>
        </TouchableOpacity>
      </View>
    ),
    [headerExpanded],
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <FlashList
        data={questions}
        renderItem={renderCard}
        //@ts-ignore
        estimatedItemSize={90}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.sheetBg}
      >
        <BottomSheetView style={styles.sheetContent}>
          {picked && (
            <>
              <Text style={styles.sheetQuestion}>{picked.text}</Text>

              <View style={styles.sheetMeta}>
                <View style={styles.askedByRow}>
                  <Image
                    source={{ uri: picked.companyLogoUrl }}
                    style={styles.sheetLogo}
                    cachePolicy="memory-disk"
                  />
                  <Text style={styles.askedByText}>Asked by {picked.companyName}</Text>
                </View>
                <View style={styles.durationRow}>
                  <Text style={styles.clockIcon}>🕐</Text>
                  <Text style={styles.durationText}>{picked.durationMinutes} mins</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={goToResult}
                activeOpacity={0.85}
              >
                <Text style={styles.feedbackText}>FEEDBACK</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.aiButton} activeOpacity={0.6} disabled>
                <Text style={styles.aiButtonText}>🎧 AI VS AI (LISTEN)</Text>
              </TouchableOpacity>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.m,
  },
  listHeader: {
    marginBottom: spacing.l,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.m,
    marginTop: spacing.s,
  },
  brandText: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.inter.bold,
    color: colors.primary,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
  },
  notifBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.notifBadgeBg,
    borderRadius: spacing.buttonRadius,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xxs,
    gap: spacing.xxs,
  },
  notifIcon: {
    fontSize: typography.sizes.s,
    color: colors.textInverse,
  },
  notifCount: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textInverse,
  },
  menuButton: {
    padding: spacing.xxs,
  },
  menuIcon: {
    fontSize: typography.sizes.l,
    color: colors.textPrimary,
  },
  practiceCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
  },
  practiceEmoji: {
    fontSize: typography.sizes.xl,
  },
  practiceTextBlock: {
    flex: 1,
  },
  practiceSmall: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  practiceBig: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
  },
  chevron: {
    fontSize: typography.sizes.m,
    color: colors.textSecondary,
  },
  cardWrapper: {
    marginBottom: spacing.s,
  },
  startBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xxs,
    borderRadius: spacing.buttonRadius,
    alignSelf: "flex-start",
    marginBottom: -spacing.xxs,
    marginLeft: spacing.s,
    zIndex: 1,
  },
  startText: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xs,
    letterSpacing: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: spacing.cardRadius,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    elevation: 2,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  companyLogo: {
    width: 36,
    height: 36,
    borderRadius: 6,
    marginRight: spacing.s,
  },
  companyName: {
    flex: 1,
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
  },
  numberBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textInverse,
  },
  socialProofRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
    marginTop: spacing.s,
  },
  flagEmoji: {
    fontSize: typography.sizes.xs,
  },
  socialProofText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  sheetBg: {
    backgroundColor: palette.orange10,
  },
  sheetContent: {
    padding: spacing.xl,
    flex: 1,
  },
  sheetQuestion: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
    marginBottom: spacing.m,
    lineHeight: 28,
  },
  sheetMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  askedByRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  sheetLogo: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  askedByText: {
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  clockIcon: {
    fontSize: typography.sizes.s,
  },
  durationText: {
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  feedbackButton: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.m,
    alignItems: "center",
    marginBottom: spacing.m,
    backgroundColor: colors.background,
  },
  feedbackText: {
    color: colors.primary,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    letterSpacing: 1,
  },
  aiButton: {
    backgroundColor: "#2D2D2D",
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.m,
    alignItems: "center",
  },
  aiButtonText: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    letterSpacing: 1,
  },
});