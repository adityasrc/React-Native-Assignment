import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              {route.name === 'Home' ? (
                <Feather name="home" size={24} color={isFocused ? colors.primary : colors.textSecondary} />
              ) : (
                <MaterialCommunityIcons name="presentation" size={26} color={isFocused ? colors.primary : colors.textSecondary} />
              )}
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
      >
        <View style={styles.storeCircleInner}>
          <Feather name="shopping-bag" size={16} color={colors.background} />
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
    elevation: 0,
    backgroundColor: 'transparent',
  },
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 35,
    height: 70,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  storeContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  storeCircleInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxs,
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.medium,
    marginTop: spacing.xxs,
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