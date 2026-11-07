
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@dayflow_settings';

export default function SettingsScreen() {

  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [alarmsEnabled, setAlarmsEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved settings
  useEffect(() => {

    const loadSettings = async () => {

      try {

        const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);

        if (savedSettings !== null) {

          const settings = JSON.parse(savedSettings);

          setRemindersEnabled(settings.remindersEnabled ?? true);
          setAlarmsEnabled(settings.alarmsEnabled ?? true);

        }

      } catch (error) {

        console.log('Settings loading error:', error);

      } finally {

        setIsLoaded(true);

      }

    };

    loadSettings();

  }, []);

  // Save settings whenever switches change
  useEffect(() => {

    if (!isLoaded) {
      return;
    }

    const saveSettings = async () => {

      try {

        const settings = {
          remindersEnabled,
          alarmsEnabled,
        };

        await AsyncStorage.setItem(
          SETTINGS_KEY,
          JSON.stringify(settings)
        );

      } catch (error) {

        console.log('Settings saving error:', error);

      }

    };

    saveSettings();

  }, [remindersEnabled, alarmsEnabled, isLoaded]);

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>Settings</Text>

      <Text style={styles.subtitle}>
        Customize your DayFlow experience.
      </Text>

      <Text style={styles.sectionTitle}>Notifications</Text>

      {/* Task Reminders */}
      <View style={styles.settingCard}>

        <View style={styles.settingInfo}>

          <Text style={styles.settingTitle}>
            Task Reminders
          </Text>

          <Text style={styles.description}>
            Get a reminder one hour before a task.
          </Text>

        </View>

        <Switch
          value={remindersEnabled}
          onValueChange={setRemindersEnabled}
        />

      </View>

      {/* Event-time Notifications */}
      <View style={styles.settingCard}>

        <View style={styles.settingInfo}>

          <Text style={styles.settingTitle}>
            Event-time Notifications
          </Text>

          <Text style={styles.description}>
            Get notified when a task is scheduled to start.
          </Text>

        </View>

        <Switch
          value={alarmsEnabled}
          onValueChange={setAlarmsEnabled}
        />

      </View>

      <Text style={styles.sectionTitle}>About</Text>

      <View style={styles.aboutCard}>

        <Text style={styles.appName}>DayFlow</Text>

        <Text style={styles.description}>
          Daily To-Do List Management System
        </Text>

        <Text style={styles.version}>
          Version 1.0.0
        </Text>

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 15,
  },

  settingCard: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  settingInfo: {
    flex: 1,
    paddingRight: 10,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  description: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
  },

  aboutCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },

  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A63E7',
  },

  version: {
    fontSize: 12,
    color: '#999',
    marginTop: 12,
  },

});
