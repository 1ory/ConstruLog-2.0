// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import CustomHeader from '../components/CustomHeader';

// const RDOScreen = ({ navigation }) => {
//   const handleLogout = () => {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Login' }],
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" />
      
//       <CustomHeader title="RDO" userName="Usuário" onLogout={handleLogout} />
      
//       <View style={styles.content}>
//         <Text style={styles.text}>Tela RDO - Em Desenvolvimento</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a0a0a',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: '#ededed',
//     fontSize: 18,
//   },
// });

// export default RDOScreen;