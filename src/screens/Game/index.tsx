import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { Entypo } from '@expo/vector-icons';
import { THEME } from "../../theme";
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { useEffect, useState } from "react";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
    const route = useRoute();
    const game = route.params as GameParams;
    const navigation = useNavigation();
    const [ads, setAds] = useState<DuoCardProps[]>([])
    const [userSelected, setUserSelected] = useState('');

    function handleGoBack() {
        navigation.goBack()
    }

    async function getDiscordUser(adsId: string) {
        await fetch(`http://192.168.0.14:3000/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => setUserSelected(data.discord))
    }

    useEffect(() => {
        fetch(`http://192.168.0.14:3000/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setAds(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />
                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList
                    data={ads}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => { getDiscordUser(item.id)}} />
                    )}
                    horizontal
                    contentContainerStyle={[ads.length > 0 ? styles.containerList : styles.containerEmpty]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios para este jogo.
                        </Text>
                    )}
                />

                <DuoMatch
                    visible={userSelected.length > 0}
                    discord={userSelected}
                    onClose={() => setUserSelected('')}
                />
            </SafeAreaView>
        </Background>
    )
}