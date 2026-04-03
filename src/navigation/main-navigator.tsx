import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '@/features/home/screens/home-screen';
import SettingsScreen from '@/features/settings/screens/settings-screen';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const Tab = createBottomTabNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused }: { focused: boolean }) => (
                    <Text style={{ fontSize: typography.sizes.l, opacity: focused ? 1 : 0.5 }}>🏠</Text>
                ),
            },
        },
        Settings: {
            screen: SettingsScreen,
            options: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({ focused }: { focused: boolean }) => (
                    <Text style={{ fontSize: typography.sizes.l, opacity: focused ? 1 : 0.5 }}>📊</Text>
                ),
            },
        },
        Store: {
            screen: HomeScreen,
            options: {
                tabBarLabel: 'Store',
                tabBarIcon: ({ focused }: { focused: boolean }) => (
                    <Text style={{ fontSize: typography.sizes.l, opacity: focused ? 1 : 0.5 }}>🛍️</Text>
                ),
            },
        },
    },
});

export default Tab;