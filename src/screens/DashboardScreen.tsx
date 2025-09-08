import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';

interface DashboardScreenProps {
  onLogout?: () => void;
  userName?: string;
  navigation?: any;
  route?: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  onLogout, 
  userName = 'Usuário', 
  navigation,
  route 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [currentUserName, setCurrentUserName] = useState(userName);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    if (route?.params?.userName) {
      setCurrentUserName(route.params.userName);
    }
  }, [route?.params]);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" />
      
      <CustomHeader userName={currentUserName} onLogout={handleLogout} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dashboardContent}>
          <Text style={styles.sectionTitle}>Resumo do Projeto</Text>
          
          <Animated.View 
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.cardTitle}>Projetos Ativos</Text>
            <Text style={styles.cardValue}>3</Text>
            <Text style={styles.cardSubtitle}>Em andamento</Text>
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginTop: 15
              }
            ]}
          >
            <Text style={styles.cardTitle}>Tarefas Pendentes</Text>
            <Text style={styles.cardValue}>12</Text>
            <Text style={styles.cardSubtitle}>Para esta semana</Text>
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginTop: 30
              }
            ]}
          >
            <Text style={styles.cardTitle}>Orçamento Total</Text>
            <Text style={styles.cardValue}>R$ 45.680,00</Text>
            <Text style={styles.cardSubtitle}>Utilizado: R$ 28.450,00</Text>
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginTop: 45
              }
            ]}
          >
            <Text style={styles.cardTitle}>Próximos Vencimentos</Text>
            <Text style={styles.cardValue}>5 dias</Text>
            <Text style={styles.cardSubtitle}>Para entregas</Text>
          </Animated.View>

          <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Ações Rápidas</Text>
          
          <View style={styles.quickActions}>
            <Animated.View 
              style={[
                styles.quickActionCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.quickActionIcon}>📋</Text>
              <Text style={styles.quickActionText}>Novo RDO</Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.quickActionCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>Novo RDC</Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.quickActionCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.quickActionIcon}>👥</Text>
              <Text style={styles.quickActionText}>Equipe</Text>
            </Animated.View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 ConstruLog. Todos os direitos reservados.</Text>
      </View>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  dashboardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#ededed',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 25,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#a1a1aa',
    marginBottom: 10,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 32,
    color: '#ff6600',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#ededed',
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default DashboardScreen;