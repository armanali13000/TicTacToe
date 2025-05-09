import { useSoundContext } from '@/utils/SoundContext';
import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { soundEnabled, toggleSound } = useSoundContext();  // Use context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={() => setNotificationsEnabled(!notificationsEnabled)} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Sound</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
      </View>

      <Button title="Reset Settings" onPress={() => {
        setIsDarkMode(false);
        setNotificationsEnabled(true);
      }} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  settingText: { fontSize: 18 },
});

export default SettingsScreen;
