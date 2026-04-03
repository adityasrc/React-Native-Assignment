import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRef, useMemo } from 'react';
import { View, Text,StyleSheet } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import questionsData from "../../../mock-data/questions.json";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { useState } from 'react';

interface Question {
  id: string;
  questionNumber: number;       // Displayed as the numbered badge on the card
  companyId: string;
  companyName: string;
  companyLogoUrl: string;
  text: string;                 // The interview question
  durationMinutes: number;      // Shown in the open state
  completedTodayCount: number;  // "X users completed this today"
}

export default function HomeScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%'], []);
    const [selectedQuest, setSelectedQuest] = useState<Question | null>(null)

    const renderCard: ListRenderItem<Question> = ({item, index}) => {
        const isEven = index%2 === 0;

        const onPress = ()=> {
            setSelectedQuest(item);
            bottomSheetRef.current?.expand();
        }

        return (
            <TouchableOpacity 
                onPress={onPress}
                style={[{ alignSelf: isEven ? 'flex-start' : 'flex-end' }]}
            >
                {index === 0 && <View><Text>START</Text></View>}

                <Image 
                    source={{ uri: item.companyLogoUrl }} 
                    style={styles.logo} 
                    cachePolicy="memory-disk"
                />
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.questionNumber}>{item.questionNumber}</Text>
            </TouchableOpacity>
        )
    }

    const Header = () => (
        <View>
            <Text>Ready!</Text>
            <View><Text>Practicing Top 50 Questions for Big Tech Companies</Text></View>
        </View>
    )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlashList
        data={questionsData as Question[]}
        renderItem={renderCard}
        //@ts-ignore
        ListHeaderComponent={Header}
        //@ts-ignore
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
      />

      <BottomSheet
        ref = {bottomSheetRef}
        index = {-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        >
            <View style={{ padding: 20}}>
                <Text>{selectedQuest?.companyName}</Text>
                <Text style={ {marginTop: 10} }>{selectedQuest?.text}</Text>
            </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    logo: {

    },

    companyName: {

    },

    questionNumber: {

    }
})
