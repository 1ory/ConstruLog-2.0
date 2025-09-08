import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import ThemedText from "../components/ThemedText";

interface LoginScreenProps {
  onLogin: (userName?: string) => void;
  navigation?: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    // Simulação de login enquanto implementamos o banco
    setTimeout(() => {
      const userName = email.split("@")[0];
      setIsLoading(false);
      onLogin(userName);
      
      if (navigation) {
        navigation.navigate("Main");
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff6600" />
                <ThemedText style={styles.loadingText}>Validando acesso...</ThemedText>
              </View>
            </View>
          )}

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoPlaceholder}>
                <ThemedText weight="bold" style={styles.logoText}>
                  CONSTRULOG
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.subtitle}>Acesse sua conta</ThemedText>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel} weight="medium">Email</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  isFocusedEmail && styles.inputFocused
                ]}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel} weight="medium">Senha</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  isFocusedPassword && styles.inputFocused
                ]}
                placeholder="Digite sua senha"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                editable={!isLoading}
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.forgotPassword} disabled={isLoading}>
              <ThemedText style={styles.forgotPasswordText}>Esqueceu a senha?</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <ThemedText style={styles.loginButtonText} weight="medium">Entrar</ThemedText>
              )}
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <ThemedText style={styles.signupText}>Não tem uma conta? </ThemedText>
              <TouchableOpacity disabled={isLoading}>
                <ThemedText style={styles.signupLink} weight="medium">Cadastre-se</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>© 2024 ConstruLog. Todos os direitos reservados.</ThemedText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContainer: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoPlaceholder: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 24,
  },
  logoText: {
    fontSize: 24,
    color: '#ff6600',
  },
  subtitle: {
    fontSize: 16,
    color: '#a1a1aa',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#ededed',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#ff6600',
    backgroundColor: '#262626',
  },
  divider: {
    height: 1,
    backgroundColor: '#3f3f46',
    marginVertical: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#ff6600',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#ff6600',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#ff6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: '#ff983d',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#a1a1aa',
    fontSize: 14,
  },
  signupLink: {
    color: '#ff6600',
    fontSize: 14,
  },
  footer: {
    marginTop: 40,
    paddingVertical: 16,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;