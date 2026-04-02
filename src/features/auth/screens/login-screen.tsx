import type { StaticScreenProps } from '@react-navigation/native';
import {Text,  TouchableOpacity,  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation<any>();
    const onPress = () => { navigation.navigate('Home')};
  return(
    <View>
        <Text>Kickstart your journey</Text>
        <Text>We will send you an OTP to verify you number</Text>

        <TouchableOpacity onPress={onPress}>
            <Text>Home Chale</Text>
        </TouchableOpacity>
    </View>
  )
}