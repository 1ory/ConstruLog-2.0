// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
//   TouchableOpacity,
//   Dimensions
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import CustomHeader from '../components/CustomHeader';

// interface RDCScreenProps {
//   onLogout?: () => void;
//   userName?: string;
// }

// const RDCScreen: React.FC<RDCScreenProps> = ({ onLogout, userName = 'Usuário' }) => {
//   const navigation = useNavigation();

//   const handleLogout = () => {
//     if (onLogout) {
//       onLogout();
//     } else {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });
//     }
//   };

//   const handleNovoRDC = () => {
//     navigation.navigate('NovoRDC');
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" />
      
//       <CustomHeader title="RDC - Registro Diário de Campo" userName={userName} onLogout={handleLogout} />
      
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.title}>Registro Diário de Campo</Text>
        
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>🏗️ Obra: Residencial Alphaville</Text>
          
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Informações da Obra</Text>
//             <View style={styles.infoRow}>
//               <Text style={styles.infoLabel}>Local:</Text>
//               <Text style={styles.infoValue}>Rua das Construções, 123</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.infoLabel}>Engenheiro Responsável:</Text>
//               <Text style={styles.infoValue}>Carlos Silva</Text>
//             </View>
//             <View style={styles.infoRow}>
//               <Text style={styles.infoLabel}>Status:</Text>
//               <Text style={[styles.infoValue, styles.statusActive]}>Em Andamento</Text>
//             </View>
//           </View>
          
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Equipe no Local</Text>
//             <View style={styles.teamItem}>
//               <Text style={styles.teamText}>Pedreiros: 8</Text>
//             </View>
//             <View style={styles.teamItem}>
//               <Text style={styles.teamText}>Eletricistas: 3</Text>
//             </View>
//             <View style={styles.teamItem}>
//               <Text style={styles.teamText}>Encanadores: 2</Text>
//             </View>
//             <View style={styles.teamItem}>
//               <Text style={styles.teamText}>Ajudantes: 5</Text>
//             </View>
//           </View>
          
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Condições do Tempo</Text>
//             <View style={styles.weatherItem}>
//               <Text style={styles.weatherText}>🌤️ Parcialmente Nublado</Text>
//             </View>
//             <View style={styles.weatherItem}>
//               <Text style={styles.weatherText}>🌡️ Temperatura: 28°C</Text>
//             </View>
//             <View style={styles.weatherItem}>
//               <Text style={styles.weatherText}>💧 Umidade: 65%</Text>
//             </View>
//           </View>
          
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Ocorrências</Text>
//             <Text style={styles.occurrenceText}>
//               • Atraso na entrega de material de acabamento
//               {'\n'}• Necessidade de reforço na estrutura do 2º pavimento
//               {'\n'}• Equipe de pintura remarcada para próxima semana
//             </Text>
//           </View>
//         </View>
        
//         <TouchableOpacity style={styles.addButton} onPress={handleNovoRDC}>
//           <Text style={styles.addButtonText}>+ Novo Registro RDC</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a0a0a',
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   title: {
//     fontSize: 24,
//     color: '#ededed',
//     fontWeight: 'bold',
//     marginBottom: 25,
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: '#ff6600',
//     fontWeight: '600',
//     marginBottom: 15,
//   },
//   card: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#2a2a2a',
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: '#ff6600',
//     fontWeight: '600',
//     marginBottom: 15,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#a1a1aa',
//     fontWeight: '500',
//   },
//   infoValue: {
//     fontSize: 14,
//     color: '#ededed',
//   },
//   statusActive: {
//     color: '#4ade80',
//     fontWeight: '600',
//   },
//   teamItem: {
//     marginBottom: 8,
//     paddingLeft: 10,
//   },
//   teamText: {
//     fontSize: 14,
//     color: '#ededed',
//   },
//   weatherItem: {
//     marginBottom: 8,
//     paddingLeft: 10,
//   },
//   weatherText: {
//     fontSize: 14,
//     color: '#ededed',
//   },
//   occurrenceText: {
//     fontSize: 14,
//     color: '#a1a1aa',
//     lineHeight: 22,
//   },
//   addButton: {
//     backgroundColor: '#ff6600',
//     padding: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default RDCScreen;