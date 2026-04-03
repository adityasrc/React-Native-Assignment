import HomeScreen from '@/features/home/screens/home-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator({
    screens: {
        Main: HomeScreen,
    },
});


export default HomeStack;