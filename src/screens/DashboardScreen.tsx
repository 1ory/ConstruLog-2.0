import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";

interface DashboardScreenProps {
  route?: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [userName, setUserName] = useState("Usuário");

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

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
      }),
    ]).start();

    if (route?.params?.userName) {
      setUserName(route.params.userName);
    }
  }, [route?.params]);

  const navigateToNovoRDC = () => {
    navigation.navigate("NovoRDC", { userName });
  };

  const navigateToListaRDC = () => {
    navigation.navigate("ListaRDC", { userName });
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dashboardContent}>
          <Text style={styles.welcomeTitle}>Bem-vindo, {userName}!</Text>
          <Text style={styles.sectionTitle}>Resumo do Projeto</Text>

          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
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
                marginTop: 15,
              },
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
                marginTop: 30,
              },
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
                marginTop: 45,
              },
            ]}
          >
            <Text style={styles.cardTitle}>Próximos Vencimentos</Text>
            <Text style={styles.cardValue}>5 dias</Text>
            <Text style={styles.cardSubtitle}>Para entregas</Text>
          </Animated.View>

          <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Ações Rápidas</Text>

          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={navigateToNovoRDC}
            >
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>Novo RDC</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={navigateToListaRDC}
            >
              <Text style={styles.quickActionIcon}>📋</Text>
              <Text style={styles.quickActionText}>Ver RDCs</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => {}}
            >
              <Text style={styles.quickActionIcon}>👥</Text>
              <Text style={styles.quickActionText}>Equipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 ConstruLog. Todos os direitos reservados.
        </Text>
      </View>
    </Animated.View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    paddingTop: 10, // Ajuste para compensar o header do drawer
  },
  dashboardContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    color: "#ff6600",
    fontFamily: "Montserrat_700Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    color: "#ededed",
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 25,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    color: "#a1a1aa",
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",
  },
  cardValue: {
    fontSize: 32,
    color: "#ff6600",
    fontFamily: "Montserrat_700Bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    fontFamily: "Montserrat_500Medium",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  quickActionCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    width: "30%",
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: "#ededed",
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
  },
  footer: {
    padding: 20,
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    alignItems: "center",
  },
  footerText: {
    color: "#6b7280",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
});

export default DashboardScreen;