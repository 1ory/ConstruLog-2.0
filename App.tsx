import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

// Importando suas screens
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ListaRDCScreen from "./src/screens/ListaRDCScreen";
import NovoRDCScreen from "./src/screens/NovoRDCScreen";
import CustomHeader from "./src/components/CustomHeader";

// Tipos para as rotas
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  NovoRDC: { userName: string };
  DetalhesRDC: { id: number };
};

export type DrawerParamList = {
  Dashboard: { userName: string };
  ListaRDC: { userName: string };
  NovoRDC: { userName: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// Componente para carregar as fontes
const LoadFonts: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return <>{children}</>;
};

// Drawer Navigator para as telas principais
function MainDrawerNavigator() {
  const [userName, setUserName] = useState("Usuário");

  useEffect(() => {
    const getUserName = async () => {
      try {
        const savedUserName = await AsyncStorage.getItem("userName");
        if (savedUserName) {
          setUserName(savedUserName);
        }
      } catch (error) {
        console.error("Erro ao recuperar nome do usuário:", error);
      }
    };

    getUserName();
  }, []);

  const handleLogout = (navigation: any) => {
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userName");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: ({ route, options }) => (
          <CustomHeader
            title={options.title}
            userName={userName}
            showBackButton={navigation.canGoBack()}
            onLogout={() => handleLogout(navigation)}
          />
        ),
        drawerStyle: {
          backgroundColor: "#0a0a0a",
          width: 300,
        },
        drawerActiveTintColor: "#ff6600",
        drawerInactiveTintColor: "#ededed",
        drawerLabelStyle: {
          fontFamily: "Montserrat_500Medium",
          fontSize: 16,
        },
      })}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={{ userName }}
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="ListaRDC"
        component={ListaRDCScreen}
        initialParams={{ userName }}
        options={{
          title: "RDCs Salvos",
          drawerLabel: "RDCs Salvos",
        }}
      />
      <Drawer.Screen
        name="NovoRDC"
        component={NovoRDCScreen}
        initialParams={{ userName }}
        options={{
          title: "Novo RDC",
          drawerLabel: "Novo RDC",
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        setIsAuthenticated(!!userToken);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (userName?: string) => {
    try {
      await AsyncStorage.setItem("userToken", "authenticated");
      if (userName) {
        await AsyncStorage.setItem("userName", userName);
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao salvar dados de login:", error);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <LoadFonts>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#0a0a0a" },
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen name="Main" component={MainDrawerNavigator} />
          ) : (
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          )}
          <Stack.Screen
            name="NovoRDC"
            component={NovoRDCScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LoadFonts>
  );
}