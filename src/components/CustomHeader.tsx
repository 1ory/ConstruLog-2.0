import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface CustomHeaderProps {
  title?: string;
  userName?: string;
  onLogout?: () => void;
  showBackButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ 
  title, 
  userName = 'Usuário', 
  onLogout, 
  showBackButton = false 
}) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { width } = Dimensions.get('window');

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {/* Botão de menu/voltar à esquerda */}
      <View style={styles.leftSection}>
        {showBackButton ? (
          <TouchableOpacity 
            onPress={handleBackPress}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>←</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={handleMenuPress}
            style={styles.menuButton}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Logo centralizada */}
      <View style={styles.centerSection}>
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <TouchableOpacity onPress={handleLogoPress}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>CONSTRULOG</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Informações do usuário à direita */}
      <View style={styles.rightSection}>
        <View style={styles.userInfoContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bem-vindo(a),</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80' }}
            style={styles.profileImage}
          />
        </View>
        
        {onLogout && (
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    minHeight: 100,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
    color: '#ededed',
  },
  title: {
    fontSize: 18,
    color: '#ededed',
    fontWeight: '600',
  },
  logoPlaceholder: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  logoText: {
    color: '#ff6600',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeContainer: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#a1a1aa',
    fontWeight: '300',
  },
  userName: {
    fontSize: 14,
    color: '#ededed',
    fontWeight: 'bold',
    marginTop: 2,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
  },
  logoutText: {
    color: '#ff6600',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default CustomHeader;