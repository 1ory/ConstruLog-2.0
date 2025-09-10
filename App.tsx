import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
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
import RDCScreen from "./src/screens/RDCScreen";
import NovoRDCScreen from "./src/screens/NovoRDCScreen";
import RDOScreen from "./src/screens/RDOScreen"; // Nova tela RDO
import CustomHeader from "./src/components/CustomHeader";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

// Tipos para as rotas
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  NovoRDC: { userName: string };
  DetalhesRDC: { id: number };
};

export type DrawerParamList = {
  Dashboard: undefined;
  RDC: undefined;
  RDO: undefined; // Nova tela RDO
  NovoRDC: undefined;
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return <>{children}</>;
};

// Drawer Navigator para as telas principais
function MainDrawerNavigator() {
  const { userName, logout } = useAuth();

  const handleLogout = (navigation: any) => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: ({ route, options }) => (
          <CustomHeader
            title={options.title}
            userName={userName}
            showBackButton={navigation.canGoBack() && route.name !== 'Dashboard'}
            onLogout={() => handleLogout(navigation)}
            navigation={navigation}
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
        headerShown: true,
      })}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="RDC"
        component={RDCScreen}
        options={{
          title: "RDCs",
          drawerLabel: "RDCs",
        }}
      />
      <Drawer.Screen
        name="RDO" // Nova tela RDO
        component={RDOScreen}
        options={{
          title: "RDO",
          drawerLabel: "RDO",
        }}
      />
      <Drawer.Screen
        name="NovoRDC"
        component={NovoRDCScreen}
        options={{
          title: "Novo RDC",
          drawerLabel: "Novo RDC",
        }}
      />
    </Drawer.Navigator>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
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
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        <Stack.Screen
          name="NovoRDC"
          component={NovoRDCScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LoadFonts>
        <AppContent />
      </LoadFonts>
    </AuthProvider>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
};