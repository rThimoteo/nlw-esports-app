import { View, Modal, Text, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from "../../theme";
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from "../Heading";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}


export function DuoMatch({ discord, onClose, ...rest }: Props) {

  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordUser() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    setIsCopying(false);
    Alert.alert('Discord Copiado!', 'Agora é só colar no Discord e adicionar.')
  }

  return (
    <Modal
      {...rest}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.content} >
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>
          <TouchableOpacity 
          style={styles.discordButton}
          onPress={handleCopyDiscordUser}
          disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>

  )
}