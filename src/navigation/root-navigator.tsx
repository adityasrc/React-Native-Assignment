import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./auth-navigator";
import HomeStack from "./main-navigator";
const RootStack = createNativeStackNavigator({
    screens: {
        Auth: AuthStack,
        Home: HomeStack,
    }
})

export default RootStack;