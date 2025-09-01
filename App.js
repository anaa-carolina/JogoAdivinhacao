import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(() => gerarNumeroAleatorio());
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [acertou, setAcertou] = useState(false);
  const [historico, setHistorico] = useState([]);

  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const verificarPalpite = () => {
    const palpiteNum = parseInt(palpite);

    if (isNaN(palpiteNum) || palpiteNum < 1 || palpiteNum > 100) {
      setMensagem('Digite um número entre 1 e 100.');
      return;
    }

    setTentativas(prev => prev + 1);

    let dica = '';
    if (palpiteNum < numeroSecreto) {
      dica = '🔼 Maior';
      setMensagem('Tente um número maior.');
    } else if (palpiteNum > numeroSecreto) {
      dica = '🔽 Menor';
      setMensagem('Tente um número menor.');
    } else {
      dica = '🎯 Acertou!';
      setMensagem(`Você acertou em ${tentativas + 1} tentativas!`);
      setAcertou(true);
    }

    setHistorico(prev => [
      ...prev,
      { id: Date.now().toString(), valor: palpiteNum, dica },
    ]);

    setPalpite('');
  };

  const reiniciarJogo = () => {
    setNumeroSecreto(gerarNumeroAleatorio());
    setTentativas(0);
    setMensagem('');
    setPalpite('');
    setAcertou(false);
    setHistorico([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Adivinhação</Text>
      <Text style={styles.subtitle}>Adivinhe o número entre 1 e 100</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu palpite"
        keyboardType="numeric"
        value={palpite}
        onChangeText={setPalpite}
        editable={!acertou}
      />

      <TouchableOpacity style={styles.botao} onPress={verificarPalpite} disabled={acertou}>
        <Text style={styles.botaoTexto}>Verificar</Text>
      </TouchableOpacity>

      {mensagem !== '' && <Text style={styles.mensagem}>{mensagem}</Text>}
      <Text style={styles.tentativas}>Tentativas: {tentativas}</Text>

      {acertou && (
        <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarJogo}>
          <Text style={styles.botaoTexto}>Jogar Novamente</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.historicoTitulo}>Palpites anteriores:</Text>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.historicoItem}>
            {item.valor} → {item.dica}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#7635dfff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoReiniciar: {
    backgroundColor: '#9c61dfff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mensagem: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
  },
  tentativas: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  historicoTitulo: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  historicoItem: {
    fontSize: 16,
    paddingVertical: 4,
    color: '#333',
  },
});
