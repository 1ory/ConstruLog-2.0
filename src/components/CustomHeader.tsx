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
  navigation?: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ 
  title, 
  userName = 'Usuário', 
  onLogout, 
  showBackButton = false,
  navigation: propNavigation
}) => {
  const hookNavigation = useNavigation<DrawerNavigationProp<any>>();
  const navigation = propNavigation || hookNavigation;
  const { width } = Dimensions.get('window');

  const handleLogoPress = () => {
    navigation.navigate('Dashboard');
  };

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleLogoutPress = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton ? (
          <TouchableOpacity 
            onPress={handleBackPress}
            style={styles.menuButton}
          >
            {/* Ícone de voltar */}
            <Image 
              source={require('../icons/back.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={handleMenuPress}
            style={styles.menuButton}
          >
            {/* Ícone de menu hamburguer */}
            <Image 
              source={require('../icons/menu.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.headerCenter}>
        <TouchableOpacity onPress={handleLogoPress} style={styles.logoButton}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={[
              styles.logo,
              { 
                width: width * 0.5,
                maxWidth: 280,
                minWidth: 180,
              }
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.headerRight}>
        <View style={styles.userInfoContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bem-vindo(a),</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          
          <Image
            source={require('../icons/user.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          {/* Ícone de logout */}
          <Image 
            source={require('../icons/logout.png')}
            style={styles.logoutIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
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
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
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
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ededed',
  },
  logoButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 40,
    resizeMode: 'contain',
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
  profileIcon: {
    width: 36,
    height: 36,
    tintColor: '#ededed',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    gap: 6,
  },
  logoutIcon: {
    width: 16,
    height: 16,
    tintColor: '#ff6600',
  },
  logoutText: {
    color: '#ff6600',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default CustomHeader;