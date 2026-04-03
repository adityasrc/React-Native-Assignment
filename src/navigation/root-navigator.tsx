import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './auth-navigator';
import HomeStack from './main-navigator';
import SessionResultScreen from '@/features/session-result/screens/session-result-screen';

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Auth: AuthStack,
        MainTabs: HomeStack,
        SessionResult: SessionResultScreen,
    },
});

export default RootStack;