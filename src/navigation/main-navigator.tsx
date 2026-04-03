import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '@/features/home/screens/home-screen';
import SettingsScreen from '@/features/settings/screens/settings-screen';
import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.pillContainer}>
        {state.routes.map((route, index) => {
          if (route.name === 'Store') return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName: React.ComponentProps<typeof Feather>['name'] =
            route.name === 'Home' ? 'home' : 'bar-chart-2';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
              accessible
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={route.name}
            >
              <View style={[styles.iconWrapper, isFocused && styles.iconWrapperActive]}>
                <Feather
                  name={iconName}
                  size={22}
                  color={isFocused ? colors.primary : colors.textSecondary}
                />
              </View>
              <Text style={[styles.tabLabel, { color: isFocused ? colors.primary : colors.textSecondary }]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.storeContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Store')}
        accessible
        accessibilityRole="tab"
        accessibilityLabel="Store"
      >
        <View style={styles.storeCircleInner}>
          <Feather name="shopping-bag" size={17} color={colors.textInverse} />
        </View>
        <Text style={[styles.tabLabel, { color: colors.textSecondary }]}>Store</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: spacing.m,
    left: spacing.l,
    right: spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.transparent,
  },
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 40,
    height: 72,
    width: '68%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  storeContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: spacing.xxs,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: colors.primaryLight,
  },
  storeCircleInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxs,
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.medium,
  },
});

const Tab = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBar: (props: BottomTabBarProps) => <CustomTabBar {...props} />,
  },
  screens: {
    Home: {
      screen: HomeScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
    Store: {
      screen: HomeScreen,
    },
  },
});

export default Tab;