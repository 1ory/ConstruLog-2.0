import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
  FlatList,
  Alert,
  CheckBox
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHeader from '../components/CustomHeader';
import ThemedText from '../components/ThemedText';

interface NovoRDCScreenProps {
  navigation: any;
  route: any;
}

const NovoRDCScreen: React.FC<NovoRDCScreenProps> = ({ navigation, route }) => {
  const userName = route.params?.userName || 'Usuário';
  
  // Estados para os dados do formulário
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [responsavel, setResponsavel] = useState('');
  const [area, setArea] = useState('');
  const [programada, setProgramada] = useState('');
  const [descricao, setDescricao] = useState('');
  const [efetivo, setEfetivo] = useState<string[]>([]);
  const [outrosEfetivo, setOutrosEfetivo] = useState('');
  const [ocorrencias, setOcorrencias] = useState<Array<{tipo: string, observacao: string}>>([]);
  const [tempo, setTempo] = useState<number[]>([]);
  const [efetividade, setEfetividade] = useState<Record<string, {inicio: string, fim: string}>>({});

  // Estados para modais e seleções
  const [showResponsaveisModal, setShowResponsaveisModal] = useState(false);
  const [showAreasModal, setShowAreasModal] = useState(false);
  const [showOcorrenciasModal, setShowOcorrenciasModal] = useState(false);
  const [showEfetivoModal, setShowEfetivoModal] = useState(false);
  const [novaOcorrenciaTipo, setNovaOcorrenciaTipo] = useState('');
  const [novaOcorrenciaObs, setNovaOcorrenciaObs] = useState('');

  // Dados de exemplo
  const responsaveis = ['João Silva', 'Maria Santos', 'Carlos Oliveira', 'Ana Costa'];
  const areas = ['Elétrica', 'Hidráulica', 'Estrutural', 'Acabamento', 'Administrativo'];
  const tiposOcorrencia = [
    'Falta de material', 
    'Problema técnico', 
    'Condições climáticas', 
    'Atraso na entrega', 
    'Falta de pessoal',
    'Outros'
  ];
  const equipe = ['Pedro Alves', 'Marcos Lima', 'Julia Rocha', 'Ricardo Mendes', 'Fernanda Torres', 'Outros'];
  const etapasEfetividade = [
    'CHEGADA AO CANTEIRO',
    'BATIDA DE PONTO',
    'DDS',
    'SOLICITAÇÃO DE FERRAMENTAS',
    'CHEGADA A FRENTE DE SERVIÇO',
    'EMISSÃO DE PT',
    'LIBERAÇÃO DE SERVIÇO',
    'INÍCIO DAS ATIVIDADES',
    'SAÍDA PARA ALMOÇO',
    'TÉRMINO DAS ATIVIDADES',
    'ORGANIZAÇÃO DA FRENTE DE SERVIÇO',
    'SAÍDA PARA O CANTEIRO'
  ];

  const handleSave = () => {
    // Validação básica
    if (!responsavel || !area || !descricao) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios: Responsável, Área e Descrição');
      return;
    }

    // Preparar dados para salvar
    const rdcData = {
      date,
      responsavel,
      area,
      programada,
      descricao,
      efetivo,
      outrosEfetivo: efetivo.includes('Outros') ? outrosEfetivo : '',
      ocorrencias,
      tempo,
      efetividade,
    };

    console.log('Dados do RDC:', rdcData);
    Alert.alert('Sucesso', 'RDC salvo com sucesso!');
    navigation.goBack();
  };

  const toggleEfetivo = (nome: string) => {
    if (nome === 'Outros') {
      if (efetivo.includes('Outros')) {
        setEfetivo(efetivo.filter(item => item !== 'Outros'));
        setOutrosEfetivo('');
      } else {
        setEfetivo([...efetivo, 'Outros']);
      }
    } else {
      if (efetivo.includes(nome)) {
        setEfetivo(efetivo.filter(item => item !== nome));
      } else {
        setEfetivo([...efetivo, nome]);
      }
    }
  };

  const addOcorrencia = () => {
    if (novaOcorrenciaTipo && novaOcorrenciaObs) {
      setOcorrencias([...ocorrencias, { tipo: novaOcorrenciaTipo, observacao: novaOcorrenciaObs }]);
      setNovaOcorrenciaTipo('');
      setNovaOcorrenciaObs('');
      setShowOcorrenciasModal(false);
    } else {
      Alert.alert('Atenção', 'Preencha o tipo e a observação da ocorrência');
    }
  };

  const removeOcorrencia = (index: number) => {
    const novasOcorrencias = [...ocorrencias];
    novasOcorrencias.splice(index, 1);
    setOcorrencias(novasOcorrencias);
  };

  const toggleTempo = (valor: number) => {
    if (tempo.includes(valor)) {
      setTempo(tempo.filter(item => item !== valor));
    } else {
      setTempo([...tempo, valor]);
    }
  };

  const updateEfetividade = (etapa: string, campo: 'inicio' | 'fim', valor: string) => {
    setEfetivity({
      ...efetividade,
      [etapa]: {
        ...(efetividade[etapa] || { inicio: '', fim: '' }),
        [campo]: valor
      }
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.modalItem}
      onPress={() => {
        setResponsavel(item);
        setShowResponsaveisModal(false);
      }}
    >
      <ThemedText style={styles.modalItemText}>{item}</ThemedText>
    </TouchableOpacity>
  );

  const renderAreaItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.modalItem}
      onPress={() => {
        setArea(item);
        setShowAreasModal(false);
      }}
    >
      <ThemedText style={styles.modalItemText}>{item}</ThemedText>
    </TouchableOpacity>
  );

  const renderOcorrenciaItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.modalItem}
      onPress={() => {
        setNovaOcorrenciaTipo(item);
      }}
    >
      <ThemedText style={styles.modalItemText}>{item}</ThemedText>
    </TouchableOpacity>
  );

  const renderEfetivoItem = ({ item }: { item: string }) => (
    <View style={styles.efetivoItem}>
      <CheckBox
        value={efetivo.includes(item)}
        onValueChange={() => toggleEfetivo(item)}
      />
      <ThemedText style={styles.efetivoText}>{item}</ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" />
      
      <CustomHeader 
        title="Novo RDC" 
        userName={userName}
        showBackButton={true}
        onLogout={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Data */}
        <ThemedText style={styles.label} weight="medium">Data *</ThemedText>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <ThemedText style={styles.inputText}>
            {date.toLocaleDateString('pt-BR')}
          </ThemedText>
          <Ionicons name="calendar" size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Responsável */}
        <ThemedText style={styles.label} weight="medium">Responsável *</ThemedText>
        <TouchableOpacity style={styles.input} onPress={() => setShowResponsaveisModal(true)}>
          <ThemedText style={responsavel ? styles.inputText : styles.placeholderText}>
            {responsavel || 'Selecione o responsável'}
          </ThemedText>
          <Ionicons name="chevron-down" size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Área */}
        <ThemedText style={styles.label} weight="medium">Área *</ThemedText>
        <TouchableOpacity style={styles.input} onPress={() => setShowAreasModal(true)}>
          <ThemedText style={area ? styles.inputText : styles.placeholderText}>
            {area || 'Selecione a área'}
          </ThemedText>
          <Ionicons name="chevron-down" size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Programada */}
        <ThemedText style={styles.label} weight="medium">Programada</ThemedText>
        <View style={styles.programadaContainer}>
          <TouchableOpacity 
            style={[styles.programadaOption, programada === 'Sim' && styles.programadaSelected]}
            onPress={() => setProgramada('Sim')}
          >
            <ThemedText style={programada === 'Sim' ? styles.programadaSelectedText : styles.programadaText}>Sim</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.programadaOption, programada === 'Não' && styles.programadaSelected]}
            onPress={() => setProgramada('Não')}
          >
            <ThemedText style={programada === 'Não' ? styles.programadaSelectedText : styles.programadaText}>Não</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Descrição */}
        <ThemedText style={styles.label} weight="medium">Descrição *</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva a atividade"
          placeholderTextColor="#6b7280"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        {/* Efetivo */}
        <ThemedText style={styles.label} weight="medium">Efetivo</ThemedText>
        <TouchableOpacity style={styles.input} onPress={() => setShowEfetivoModal(true)}>
          <ThemedText style={efetivo.length > 0 ? styles.inputText : styles.placeholderText}>
            {efetivo.length > 0 ? `${efetivo.length} selecionado(s)` : 'Selecione os membros da equipe'}
          </ThemedText>
          <Ionicons name="chevron-down" size={20} color="#6b7280" />
        </TouchableOpacity>

        {efetivo.includes('Outros') && (
          <TextInput
            style={styles.input}
            placeholder="Especifique outros membros"
            placeholderTextColor="#6b7280"
            value={outrosEfetivo}
            onChangeText={setOutrosEfetivo}
          />
        )}

        {/* Ocorrências */}
        <ThemedText style={styles.label} weight="medium">Ocorrências</ThemedText>
        {ocorrencias.map((ocorrencia, index) => (
          <View key={index} style={styles.ocorrenciaItem}>
            <View style={styles.ocorrenciaHeader}>
              <ThemedText style={styles.ocorrenciaTipo} weight="bold">{ocorrencia.tipo}</ThemedText>
              <TouchableOpacity onPress={() => removeOcorrencia(index)}>
                <Ionicons name="close-circle" size={20} color="#ff6600" />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.ocorrenciaObs}>{ocorrencia.observacao}</ThemedText>
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowOcorrenciasModal(true)}
        >
          <Ionicons name="add" size={20} color="#ff6600" />
          <ThemedText style={styles.addButtonText} weight="medium">Adicionar Ocorrência</ThemedText>
        </TouchableOpacity>

        {/* Tempo */}
        <ThemedText style={styles.label} weight="medium">Tempo (horas)</ThemedText>
        <View style={styles.tempoContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hora) => (
            <TouchableOpacity
              key={hora}
              style={[styles.tempoOption, tempo.includes(hora) && styles.tempoSelected]}
              onPress={() => toggleTempo(hora)}
            >
              <ThemedText style={tempo.includes(hora) ? styles.tempoSelectedText : styles.tempoText}>{hora}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Efetividade */}
        <ThemedText style={styles.label} weight="medium">Efetividade</ThemedText>
        {etapasEfetividade.map((etapa) => (
          <View key={etapa} style={styles.etapaContainer}>
            <ThemedText style={styles.etapaText}>{etapa}</ThemedText>
            <View style={styles.horariosContainer}>
              <TextInput
                style={styles.horarioInput}
                placeholder="00:00"
                placeholderTextColor="#6b7280"
                value={efetividade[etapa]?.inicio || ''}
                onChangeText={(text) => updateEfetividade(etapa, 'inicio', text)}
                keyboardType="numeric"
              />
              <ThemedText style={styles.horarioSeparator}>-</ThemedText>
              <TextInput
                style={styles.horarioInput}
                placeholder="00:00"
                placeholderTextColor="#6b7280"
                value={efetividade[etapa]?.fim || ''}
                onChangeText={(text) => updateEfetividade(etapa, 'fim', text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        ))}

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText} weight="medium">Salvar RDC</ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* Modal de Responsáveis */}
      <Modal visible={showResponsaveisModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle} weight="bold">Selecione o Responsável</ThemedText>
            <FlatList
              data={responsaveis}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowResponsaveisModal(false)}
            >
              <ThemedText style={styles.modalCloseText} weight="medium">Fechar</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Áreas */}
      <Modal visible={showAreasModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle} weight="bold">Selecione a Área</ThemedText>
            <FlatList
              data={areas}
              renderItem={renderAreaItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowAreasModal(false)}
            >
              <ThemedText style={styles.modalCloseText} weight="medium">Fechar</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Ocorrências */}
      <Modal visible={showOcorrenciasModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle} weight="bold">Adicionar Ocorrência</ThemedText>
            
            <ThemedText style={styles.label} weight="medium">Tipo de Ocorrência</ThemedText>
            <FlatList
              data={tiposOcorrencia}
              renderItem={renderOcorrenciaItem}
              keyExtractor={(item) => item}
              style={styles.modalList}
            />
            
            <ThemedText style={styles.label} weight="medium">Observação</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva a ocorrência"
              placeholderTextColor="#6b7280"
              value={novaOcorrenciaObs}
              onChangeText={setNovaOcorrenciaObs}
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowOcorrenciasModal(false)}
              >
                <ThemedText style={styles.modalButtonText} weight="medium">Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={addOcorrencia}
              >
                <ThemedText style={styles.modalButtonText} weight="medium">Adicionar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Efetivo */}
      <Modal visible={showEfetivoModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle} weight="bold">Selecione o Efetivo</ThemedText>
            <FlatList
              data={equipe}
              renderItem={renderEfetivoItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowEfetivoModal(false)}
            >
              <ThemedText style={styles.modalCloseText} weight="medium">Confirmar</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6b7280',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  programadaContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  programadaOption: {
    flex: 1,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    alignItems: 'center',
  },
  programadaSelected: {
    backgroundColor: '#ff6600',
    borderColor: '#ff6600',
  },
  programadaText: {
    color: '#ededed',
  },
  programadaSelectedText: {
    color: '#ffffff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff6600',
    marginBottom: 15,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ff6600',
    marginLeft: 10,
  },
  ocorrenciaItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  ocorrenciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ocorrenciaTipo: {
    color: '#ff6600',
    fontSize: 16,
  },
  ocorrenciaObs: {
    color: '#ededed',
  },
  tempoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tempoOption: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tempoSelected: {
    backgroundColor: '#ff6600',
    borderColor: '#ff6600',
  },
  tempoText: {
    fontWeight: 'bold',
  },
  tempoSelectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  etapaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  etapaText: {
    flex: 1,
    fontSize: 12,
  },
  horariosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horarioInput: {
    backgroundColor: '#2a2a2a',
    color: '#ededed',
    borderRadius: 5,
    padding: 5,
    width: 60,
    textAlign: 'center',
  },
  horarioSeparator: {
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#ff6600',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    padding: 15,
    backgroundColor: '#ff6600',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  modalCloseText: {
    color: '#ffffff',
  },
  modalList: {
    maxHeight: 200,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#2a2a2a',
  },
  modalButtonConfirm: {
    backgroundColor: '#ff6600',
  },
  modalButtonText: {
    color: '#ffffff',
  },
  efetivoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  efetivoText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default NovoRDCScreen;