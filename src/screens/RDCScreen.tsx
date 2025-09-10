import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../components/ThemedText';

const RDCScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userName = route.params?.userName || 'Usu�rio';
  const [rdcs, setRDCs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Simula��o de dados enquanto implementamos o banco
  const loadRDCs = async () => {
    try {
      setRefreshing(true);
      // Dados mockados temporariamente
      const mockData = [
        {
          id: 1,
          data: new Date('2024-09-07'),
          responsavel: 'Jo�o Silva',
          area: 'El�trica',
          efetivo: 'Pedro, Maria',
          total_ocorrencias: 2
        },
        {
          id: 2, 
          data: new Date('2024-09-06'),
          responsavel: 'Maria Santos',
          area: 'Hidr�ulica',
          efetivo: 'Carlos, Ana',
          total_ocorrencias: 1
        }
      ];
      setRDCs(mockData);
    } catch (error) {
      console.log('Erro ao carregar RDCs:', error);
      Alert.alert('Erro', 'N�o foi poss�vel carregar os RDCs.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRDCs();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar exclus�o',
      'Tem certeza que deseja excluir este RDC?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              // Simula��o de exclus�o
              setRDCs(rdcs.filter(rdc => rdc.id !== id));
              Alert.alert('Sucesso', 'RDC exclu�do com sucesso!');
            } catch (error) {
              console.log('Erro ao excluir RDC:', error);
              Alert.alert('Erro', 'N�o foi poss�vel excluir o RDC.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.rdcItem}
      onPress={() => navigation.navigate('DetalhesRDC', { id: item.id })}
    >
      <View style={styles.rdcInfo}>
        <ThemedText style={styles.rdcData} weight="bold">
          {new Date(item.data).toLocaleDateString('pt-BR')}
        </ThemedText>
        <ThemedText style={styles.rdcResponsavel}>
          {item.responsavel}
        </ThemedText>
        <ThemedText style={styles.rdcArea}>
          {item.area}
        </ThemedText>
        <ThemedText style={styles.rdcEfetivo}>
          Efetivo: {item.efetivo || 'Nenhum'}
        </ThemedText>
        <ThemedText style={styles.rdcOcorrencias}>
          Ocorr�ncias: {item.total_ocorrencias || 0}
        </ThemedText>
      </View>
      
      <View style={styles.rdcActions}>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash" size={24} color="#ff6600" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rdcs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={loadRDCs}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text" size={64} color="#6b7280" />
            <ThemedText style={styles.emptyText} weight="bold">
              Nenhum RDC salvo
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Toque no bot�o + para criar um novo RDC
            </ThemedText>
          </View>
        }
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NovoRDC', { userName })}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  rdcItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  rdcInfo: {
    flex: 1,
  },
  rdcData: {
    color: '#ff6600',
    fontSize: 16,
    marginBottom: 4,
  },
  rdcResponsavel: {
    fontSize: 16,
    marginBottom: 2,
  },
  rdcArea: {
    color: '#a1a1aa',
    fontSize: 14,
    marginBottom: 4,
  },
  rdcEfetivo: {
    color: '#a1a1aa',
    fontSize: 12,
    marginBottom: 2,
  },
  rdcOcorrencias: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  rdcActions: {
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#a1a1aa',
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff6600',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default RDCScreen;