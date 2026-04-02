import type { StaticScreenProps } from '@react-navigation/native';
//static type definations react navigation me use hota hai

type props = StaticScreenProps<{

}

const HomeTabs = createBottomTabNavigator({
    screens: {
        Splash: SplashScreen,
        Welcome: WelcomeScreen,
        
    }
})

const AuthTabs = createBottomTabNavigator({
    
})