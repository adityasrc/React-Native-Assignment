import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
    const navigation = useNavigation<any>();
    const onPress = ()=> navigation.navigate('Login');
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
}
