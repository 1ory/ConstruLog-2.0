import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ThemedText from '../components/ThemedText';

const RDOScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userName = route.params?.userName || 'Usuário';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title} weight="bold">
          RDO - Registro Diário de Obra
        </ThemedText>
        <ThemedText style={styles.text}>
          Tela RDO - Em Desenvolvimento
        </ThemedText>
        <ThemedText style={styles.subtext}>
          Em breve você poderá gerenciar seus Registros Diários de Obra aqui
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ff6600',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    color: '#a1a1aa',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RDOScreen;