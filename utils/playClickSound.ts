import { Audio } from 'expo-av';
import { useContext, useState } from 'react';
import { SoundContext } from './SoundContext'; // Assuming you're using the SoundContext for global sound state

export const useSound = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { soundEnabled } = useContext(SoundContext);  // Get sound state from context

  const playClickSound = async () => {
    if (soundEnabled) {  // Only play sound if enabled
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/click.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    }
  };

  const playWinSound = async () => {
    if (soundEnabled) {  // Only play sound if enabled
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/win.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    }
  };

  return { playClickSound, playWinSound };
};
