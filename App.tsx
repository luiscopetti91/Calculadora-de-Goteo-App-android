import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, TouchableWithoutFeedback, Keyboard } from 'react-native';

const GoteoApp = () => {
  const [cantidad, setCantidad] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [unidadTiempo, setUnidadTiempo] = useState('minutos');
  const [resultado, setResultado] = useState('');

  const calcularGoteo = () => {
    const volumenSuero = parseInt(cantidad);
    const tiempoInt = parseInt(tiempo);

    if (!isNaN(volumenSuero) && !isNaN(tiempoInt)) {
      let tiempoEnMinutos = tiempoInt;
      if (unidadTiempo === 'horas') {
        tiempoEnMinutos *= 60;
      }

      const goteoMicrogotas = (volumenSuero * 60) / tiempoEnMinutos;
      const goteoMacrogotas = (volumenSuero * 20) / tiempoEnMinutos;
      const goteoMlHora = goteoMicrogotas;

      let resultadoText = `Microgotas por minuto: ${goteoMicrogotas.toFixed(2)} μgtt/min (${Math.ceil(goteoMicrogotas)}).\n`;
      resultadoText += `Macrogotas por minuto: ${goteoMacrogotas.toFixed(2)} gtt/min (${Math.ceil(goteoMacrogotas)}).\n`;
      resultadoText += `El goteo en mililitros por hora es de ${goteoMlHora.toFixed(2)} ml/h (${Math.ceil(goteoMlHora)} ml/h).`;

      setResultado(resultadoText);
    } else {
      setResultado('');
    }
  };

  const limpiarCampos = () => {
    setCantidad('');
    setTiempo('');
    setUnidadTiempo('minutos');
    setResultado('');
  };

/**
 ????
 */



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de Goteo</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Cantidad (ml)</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tiempo</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.switchText}>{unidadTiempo}</Text>
            <Switch
              value={unidadTiempo === 'minutos'}
              onValueChange={(value) => setUnidadTiempo(value ? 'minutos' : 'horas')}
            />
          </View>
          <TextInput
            style={styles.input}
            value={tiempo}
            onChangeText={setTiempo}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calcularGoteo}>
          <Text style={styles.buttonText}>Calcular Goteo</Text>
        </TouchableOpacity>
    
        {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    color: 'black',
  },
  switchText: {
    color: '#333333',
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  resultado: {
    color: '#333333',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para ajustar el espacio entre el texto y el Switch
  },
});

export default GoteoApp;
