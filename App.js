import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TelaLista from './src/telas/TelaLista';
import TelaFormulario from './src/telas/TelaFormulario';

const Stack = createNativeStackNavigator();
const CHAVE_STORAGE = '@meus_gastos_pessoais';

export default function App() {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    async function carregarGastos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dadosSalvos !== null) {
          setGastos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.log('Erro ao carregar dados do AsyncStorage:', erro);
      }
    }

    carregarGastos();
  }, []);

  const salvarGastosNoStorage = async (novaLista) => {
    try {
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
    } catch (erro) {
      console.log('Erro ao salvar no AsyncStorage:', erro);
    }
  };

  const adicionarGasto = (novoGasto) => {
    const listaAtualizada = [novoGasto, ...gastos];
    setGastos(listaAtualizada);
    salvarGastosNoStorage(listaAtualizada);
  };

  const excluirGasto = (idGasto) => {
    const listaAtualizada = gastos.filter((item) => item.id !== idGasto);
    setGastos(listaAtualizada);
    salvarGastosNoStorage(listaAtualizada);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Lista"
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Lista" options={{ title: 'Meus Gastos' }}>
          {(props) => (
            <TelaLista
              {...props}
              listaGastos={gastos}
              adicionarGasto={adicionarGasto}
              excluirGasto={excluirGasto}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Formulario"
          component={TelaFormulario}
          options={{ title: 'Cadastrar Gasto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}