import { Background } from './src/components/Background';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
  Inter_600SemiBold
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
    Inter_600SemiBold
  })
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
