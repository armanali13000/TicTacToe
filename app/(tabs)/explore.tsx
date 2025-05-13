import { useSoundContext } from '@/utils/SoundContext';
import { useTheme } from '@/utils/ThemeContext';
import React from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { soundEnabled, toggleSound } = useSoundContext();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#111' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      

      <View style={styles.settingRow}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>Sound</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
      </View>

      <Button
        title="Reset Settings"
        onPress={() => {
          toggleDarkMode(); // Toggle back to light if needed
          setNotificationsEnabled(true);
        }}
        color="red"
      />

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: isDarkMode ? '#ccc' : 'gray' }]}>Developed by Arman</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  settingText: { fontSize: 18 },
  footer: { marginTop: 40, alignItems: 'center' },
  footerText: { fontSize: 14 },
});

export default SettingsScreen;
