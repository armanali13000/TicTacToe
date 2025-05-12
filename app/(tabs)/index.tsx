import { useSound } from '@/utils/playClickSound'; // Import the updated sound hook
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeTab() {
  const { playClickSound, playWinSound } = useSound(); // Get both sound players
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      playWinSound(); // Play the win sound when there's a winner
      setTimeout(() => {
        Alert.alert('Game Over', `Player ${newWinner} wins!`);
      }, 100); // slight delay to show the latest move
    } else if (!newBoard.includes(null)) {
      setTimeout(() => {
        Alert.alert('Game Over', 'It\'s a draw!');
      }, 100);
    }
  };

  const calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        Player {isXNext ? 'X' : 'O'}'s Turn
      </Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => {
              playClickSound(); 
              handleClick(index);
            }}
          >
            <Text
              style={[
                styles.cellText,
                {
                  color: cell === 'X' ? '#8AC9EA' : cell === 'O' ? '#3546E3' : '#000',
                },
              ]}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Restart Button */}
      <TouchableOpacity style={styles.restartButton} onPress={() => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
      }}>
        <Text style={styles.restartText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: '#333',
  },
  cell: {
    width: '33%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  restartButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  restartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },  
  turnText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});
