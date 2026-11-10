import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaFormulario({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const tratarSalvar = () => {
    setMensagemErro('');

    const descricaoValida = descricao.trim();
    const valorConvertido = parseFloat(valor.replace(',', '.'));

    if (!descricaoValida) {
      setMensagemErro('Por favor, informe a descrição do gasto.');
      return;
    }

    if (isNaN(valorConvertido) || valorConvertido <= 0) {
      setMensagemErro('O valor deve ser um número maior que zero.');
      return;
    }

    const novoGasto = {
      id: Date.now().toString(),
      descricao: descricaoValida,
      valor: valorConvertido,
    };

    // Volta para a Lista enviando o novo gasto como dado puro (serializável)
    navigation.navigate('Lista', { novoGasto });
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Novo Gasto</Text>

      {mensagemErro !== '' && (
        <View style={estilos.caixaErro}>
          <Text style={estilos.textoErro}>{mensagemErro}</Text>
        </View>
      )}

      <Text style={estilos.rotulo}>Descrição</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex: Almoço, Uber, Mercado..."
        placeholderTextColor='#b6b2b2'
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={estilos.rotulo}>Valor (R$)</Text>
      <TextInput
        style={estilos.input}
        placeholder="0.00"
        placeholderTextColor='#b6b2b2'
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <TouchableOpacity style={estilos.botaoSalvar} onPress={tratarSalvar}>
        <Text style={estilos.textoBotao}>Salvar Gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  rotulo: {
    fontSize: 16,
    marginBottom: 6,
    color: '#e0e0e0',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#ffffff', 
  },
  caixaErro: {
    backgroundColor: '#2c1517',
    borderColor: '#cf6679',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  textoErro: {
    color: '#ff8a80',
    fontSize: 14,
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});