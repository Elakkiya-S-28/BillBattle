import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Provider as PaperProvider, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [names, setNames] = useState('');
  const [enteredNames, setEnteredNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (enteredNames.length < 2) {
      setErrorMessage('Please enter at least two names.');
    } else {
      navigation.navigate('WinBattle', { names: enteredNames });
      setErrorMessage('');
    }
  };

  const handleAddName = () => {
    if (names.trim() !== '') {
      setEnteredNames([...enteredNames, names.trim()]);
      setNames('');
    }
  };

  useEffect(() => {
    // Clear entered names when the component unmounts
    return () => {
      setEnteredNames([]);
    };
  }, []);

  // Reset entered names when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      setEnteredNames([]);
    }, [])
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.label}>Win Battle </Text>
        <Text style={styles.text}>Atleast 2 user</Text>
        <PaperTextInput
          style={styles.input}
          multiline
          placeholder="Enter names here..."
          placeholderTextColor="#555555"
          textColor='#555555'
          onChangeText={text => setNames(text)}
          value={names}
        />
        <PaperButton mode="contained" onPress={handleAddName}>Add Name</PaperButton>
        <ScrollView contentContainerStyle={styles.enteredNamesContainer}>
          {enteredNames.map((name, index) => (
            <Text key={index} style={styles.enteredName}>{name}</Text>
          ))}
        </ScrollView>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <PaperButton mode="contained" onPress={handleNext} disabled={enteredNames.length < 2}>Next</PaperButton>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa', 
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
    alignSelf:'center',
  },
  input: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  enteredNamesContainer: {
    marginBottom: 20,
  },
  enteredName: {
    color: '#333333', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
    borderRadius: 5,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  text:{
    color:'black',
  }
});

export default HomeScreen;
