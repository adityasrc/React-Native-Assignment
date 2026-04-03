import React, { useRef, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
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
  difficulty?: string;
  topic?: string;
}

type HomeNavProp = NativeStackNavigationProp<RootStackParamList>;
const questions = questionsData as Question[];

const getTopic = (index: number) =>
  ["Arrays", "Graphs", "DP", "Trees"][index % 4];
const getDifficulty = (index: number) =>
  index % 3 === 0 ? "Hard" : index % 2 === 0 ? "Medium" : "Easy";

const getCardBg = (index: number) =>
  index === 0
    ? colors.backgroundCard1 || palette.orange10
    : index === 1
      ? colors.backgroundCard2 || palette.orange30
      : colors.cardBackground;
const getNumberBg = (index: number) =>
  index === 0
    ? colors.numberBadge1 || colors.primary
    : index === 1
      ? colors.numberBadge2 || colors.primary
      : colors.numberBadgeDefault || colors.textSecondary;

const QuestionCard = React.memo(
  ({
    item,
    index,
    onPress,
  }: {
    item: Question;
    index: number;
    onPress: () => void;
  }) => {
    const isLeft = index % 2 === 0;
    const difficulty = item.difficulty || getDifficulty(index);
    const topic = item.topic || getTopic(index);

    return (
      <View style={styles.cardWrapper}>
        {index === 0 && (
          <View
            style={[
              styles.startBadge,
              isLeft ? styles.badgeLeft : styles.badgeRight,
            ]}
          >
            <Text style={styles.startBadgeText}>START</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.cardPill,
            { backgroundColor: getCardBg(index) },
            isLeft ? styles.alignLeft : styles.alignRight,
          ]}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <View style={styles.cardLeftContent}>
            <Image
              source={{ uri: item.companyLogoUrl }}
              style={styles.companyLogo}
              cachePolicy="memory-disk"
            />
            <View>
              <Text style={styles.companyName} numberOfLines={1}>
                {item.companyName}
              </Text>
              <Text style={styles.metaText}>
                {difficulty} • {item.durationMinutes}m • {topic}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.numberCircle,
              { backgroundColor: getNumberBg(index) },
            ]}
          >
            <Text style={styles.numberText}>{item.questionNumber}</Text>
          </View>
        </TouchableOpacity>

        {item.completedTodayCount > 0 && (
          <View style={styles.socialProofContainer}>
            <View style={styles.dottedLine} />
            <Text style={styles.socialProofText}>
              {(item.completedTodayCount / 1000).toFixed(1)}k solved today
            </Text>
            <View style={styles.dottedLine} />
          </View>
        )}
      </View>
    );
  },
);

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["55%"], []);
  const [picked, setPicked] = useState<Question | null>(null);

  const openSheet = useCallback((item: Question) => {
    setPicked(item);
    bottomSheetRef.current?.expand();
  }, []);

  const goToResult = useCallback(() => {
    bottomSheetRef.current?.close();
    navigation.navigate("SessionResult" as never);
  }, [navigation]);

  const ListHeader = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.topBar}>
          <Text style={styles.logoText}>Ready!</Text>
          <View style={styles.topBarRight}>
            <View style={styles.streakBadge}>
              <Text style={styles.badgeText}>7 Day</Text>
            </View>
            <View style={styles.xpBadge}>
              <Text style={styles.badgeText}>120 XP</Text>
            </View>
          </View>
        </View>

        <View style={styles.practiceBanner}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerSubText}>Your Daily Target</Text>
            <Text style={styles.bannerMainText}>Top 50 Big Tech Qs</Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color={colors.textSecondary}
          />
        </View>
      </View>
    ),
    [],
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

        <FlashList
          data={questions}
          renderItem={({ item, index }) => (
            <QuestionCard
              item={item}
              index={index}
              onPress={() => openSheet(item)}
            />
          )}
          // @ts-ignore
          estimatedItemSize={120}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

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
              <View style={styles.sheetHeaderMeta}>
                <Image
                  source={{ uri: picked.companyLogoUrl }}
                  style={styles.sheetLogoSmall}
                />
                <Text style={styles.sheetCompanyText}>
                  {picked.companyName} • {getTopic(picked.questionNumber)}
                </Text>
              </View>

              <Text style={styles.sheetQuestion}>{picked.text}</Text>

              <View style={styles.sheetTagsRow}>
                <View style={styles.sheetTag}>
                  <Text style={styles.sheetTagText}>
                    {picked.durationMinutes} mins
                  </Text>
                </View>
                <View style={styles.sheetTag}>
                  <Text style={styles.sheetTagText}>
                    {getDifficulty(picked.questionNumber)}
                  </Text>
                </View>
                <View style={styles.sheetTag}>
                  <Text style={styles.sheetTagText}>3.2k attempts</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={goToResult}
                activeOpacity={0.85}
              >
                <Text style={styles.feedbackText}>PRACTICE NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.aiButton}
                activeOpacity={0.6}
                disabled
              >
                <Text style={styles.aiButtonText}>AI VS AI (LISTEN)</Text>
              </TouchableOpacity>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  listContent: {
    paddingHorizontal: spacing.l,
    paddingBottom: 100,
    paddingTop: spacing.m,
  },
  headerContainer: {
    marginTop: spacing.s,
    marginBottom: spacing.l,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.m,
  },
  logoText: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.inter.bold,
    color: colors.primary,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  streakBadge: {
    backgroundColor: palette.orange10,
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: 999,
  },
  xpBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
  },
  practiceBanner: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.cardRadius,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    flexDirection: "row",
    alignItems: "center",
  },
  bannerTextContainer: { flex: 1 },
  bannerSubText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  bannerMainText: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
  },
  cardWrapper: { marginBottom: spacing.m, position: "relative" },
  cardPill: {
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 50,
    paddingVertical: 6,
    paddingLeft: spacing.m,
    paddingRight: 6,
    elevation: 2,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  alignLeft: { alignSelf: "flex-start" },
  alignRight: { alignSelf: "flex-end" },
  cardLeftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: spacing.s,
  },
  companyLogo: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginRight: spacing.s,
  },
  companyName: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
  },
  metaText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
    marginTop: 2,
  },
  numberCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: colors.textInverse,
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.bold,
  },
  startBadge: {
    position: "absolute",
    top: -10,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.m,
    paddingVertical: 6,
    borderRadius: 999,
    zIndex: 10,
  },
  badgeLeft: { right: 40 },
  badgeRight: { left: 40 },
  startBadgeText: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.bold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  socialProofContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.m,
    paddingHorizontal: spacing.l,
  },
  socialProofText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginHorizontal: spacing.s,
    fontFamily: typography.fonts.inter.semiBold,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  sheetBg: { backgroundColor: colors.background },
  sheetContent: { padding: spacing.xl, flex: 1 },
  sheetHeaderMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.s,
    gap: spacing.xs,
  },
  sheetLogoSmall: { width: 16, height: 16, borderRadius: 4 },
  sheetCompanyText: {
    fontSize: typography.sizes.s,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.medium,
  },
  sheetQuestion: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
    marginBottom: spacing.m,
    lineHeight: 28,
  },
  sheetTagsRow: {
    flexDirection: "row",
    gap: spacing.s,
    marginBottom: spacing.xl,
    flexWrap: "wrap",
  },
  sheetTag: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.s,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sheetTagText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.medium,
  },
  feedbackButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.m,
    alignItems: "center",
    marginBottom: spacing.m,
  },
  feedbackText: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.s,
    letterSpacing: 1,
  },
  aiButton: {
    backgroundColor: palette.gray80,
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