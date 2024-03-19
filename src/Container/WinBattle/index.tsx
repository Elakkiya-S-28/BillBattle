import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const WinBattle = ({ route }) => {
  const { names } = route.params;
  const nameList = names.filter(name => name.trim() !== '');

  const [winner, setWinner] = useState('');

  useEffect(() => {
    const shuffledNames = shuffleArray(nameList);
    const winnerIndex = Math.floor(Math.random() * shuffledNames.length);
    setWinner(shuffledNames[winnerIndex]);
  }, [names]);

  const [confettiClicked, setConfettiClicked] = useState(false);
  const handleConfettiBurst = () => {
    setConfettiClicked(true);
  };

  const celebrationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(celebrationValue, {
      toValue: 1,
      duration: 5000, 
      useNativeDriver: false,
    }).start();
  }, []);

  const celebrationStyle = {
    opacity: celebrationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1], 
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.celebrationScreen, celebrationStyle]}>
        <Text style={styles.celebrationText}>{winner}</Text>
      </Animated.View>
      {confettiClicked && (
        <ConfettiCannon
          count={400}
          origin={{ x: -10, y: 0 }}
          explosionSpeed={600} 
          fadeOut={true} 
        />
      )}
      <TouchableOpacity onPress={handleConfettiBurst}>
        <Text style={styles.label}>Winner 😻</Text>
      </TouchableOpacity>
    
    </View>
  );
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  celebrationScreen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgb(220, 184, 255)'
  },
  celebrationText: {
    fontSize: 20,
    color: '#FFFEFA',
    marginTop: 10,
  },
  label: {
    fontSize: 24,
    marginBottom: 100,
    color: '#333333',
  },
  winnerName: {
    fontSize: 20,
    color: '#ffff',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    textAlign: 'center',
  },
});

export default WinBattle;
