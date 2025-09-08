// No MainStack, adicione todas as telas:
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="RDC" component={RDCScreen} />
      <Stack.Screen name="NovoRDC" component={NovoRDCScreen} />
      <Stack.Screen name="ListaRDC" component={ListaRDCScreen} />
      <Stack.Screen name="RDO" component={RDOScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

// No Drawer Navigator, atualize as opções:
function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#0a0a0a',
          width: 300,
        },
        drawerActiveTintColor: '#ff6600',
        drawerInactiveTintColor: '#ededed',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={MainStack} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="RDC" component={RDCScreen} options={{ title: 'Gestão de RDCs' }} />
      <Drawer.Screen name="RDO" component={RDOScreen} options={{ title: 'RDO' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </Drawer.Navigator>
  );
}