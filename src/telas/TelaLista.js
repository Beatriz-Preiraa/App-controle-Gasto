import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaLista({ navigation, route, listaGastos, adicionarGasto, excluirGasto }) {
  // Recebe o item que veio do formulário
  useEffect(() => {
    if (route.params?.novoGasto) {
      adicionarGasto(route.params.novoGasto);
      // Limpa os parâmetros para evitar inserção duplicada ao recarregar a tela
      navigation.setParams({ novoGasto: null });
    }
  }, [route.params?.novoGasto]);

  const totalAcumulado = listaGastos.reduce((acumulador, item) => {
    return acumulador + Number(item.valor);
  }, 0);

  const formatarMoeda = (valor) => {
    return valor.toFixed(2).replace('.', ',');
  };

  const renderizarItem = ({ item }) => (
    <View style={estilos.cartaoGasto}>
      <View style={estilos.dadosGasto}>
        <Text style={estilos.descricaoGasto}>{item.descricao}</Text>
        <Text style={estilos.valorGasto}>R$ {formatarMoeda(item.valor)}</Text>
      </View>

      <TouchableOpacity
        style={estilos.botaoExcluir}
        onPress={() => excluirGasto(item.id)}
      >
        <Text style={estilos.textoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={estilos.container}>
      <View style={estilos.cartaoTotal}>
        <Text style={estilos.rotuloTotal}>Total acumulado</Text>
        <Text style={estilos.valorTotal}>R$ {formatarMoeda(totalAcumulado)}</Text>
      </View>

      <TouchableOpacity
        style={estilos.botaoAdicionar}
        onPress={() => navigation.navigate('Formulario')}
      >
        <Text style={estilos.textoBotaoAdicionar}>+ Adicionar Novo Gasto</Text>
      </TouchableOpacity>

      <FlatList
        data={listaGastos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        ListEmptyComponent={
          <Text style={estilos.textoVazio}>Nenhum gasto anotado ainda.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', 
  },
  cartaoTotal: {
    backgroundColor: '#1e1e1e', 
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d2d2d',
    marginBottom: 16,
    alignItems: 'center',
  },
  rotuloTotal: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  valorTotal: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4caf50', 
    marginTop: 4,
  },
  botaoAdicionar: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotaoAdicionar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartaoGasto: {
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d2d2d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dadosGasto: {
    flex: 1,
    marginRight: 10,
  },
  descricaoGasto: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  valorGasto: {
    fontSize: 15,
    color: '#bbbbbb',
    marginTop: 4,
  },
  botaoExcluir: {
    backgroundColor: '#cf6679', 
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoExcluir: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 40,
    fontSize: 15,
  },
});