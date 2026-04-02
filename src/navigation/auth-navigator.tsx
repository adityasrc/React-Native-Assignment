import SplashScreen from '@/features/auth/screens/splash-screen';
import WelcomeScreen from '@/features/auth/screens/welcome-screen';
import LoginScreen from '@/features/auth/screens/login-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator({
  screens: {
    Splash: SplashScreen,
    Welcome: WelcomeScreen,
    Login: LoginScreen,
  },
});

export default AuthStack;