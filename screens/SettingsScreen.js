
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.subtitle}>
        Customize your DayFlow experience.
      </Text>

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Notifications</Text>

      <View style={styles.settingCard}>
        <View style={styles.settingIcon}>
          <Text style={styles.iconText}>🔔</Text>
        </View>

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
          trackColor={{
            false: '#D1D5DB',
            true: '#A5A0F5',
          }}
          thumbColor={remindersEnabled ? '#4F46E5' : '#F4F4F5'}
        />
      </View>

      <View style={styles.settingCard}>
        <View style={styles.settingIcon}>
          <Text style={styles.iconText}>⏰</Text>
        </View>

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
          trackColor={{
            false: '#D1D5DB',
            true: '#A5A0F5',
          }}
          thumbColor={alarmsEnabled ? '#4F46E5' : '#F4F4F5'}
        />
      </View>

      {/* About */}
      <Text style={styles.sectionTitle}>About</Text>

      <View style={styles.aboutCard}>
        <View style={styles.appIcon}>
          <Text style={styles.appIconText}>D</Text>
        </View>

        <Text style={styles.appName}>DayFlow</Text>

        <Text style={styles.aboutSubtitle}>
          Daily To-Do List Management System
        </Text>

        <View style={styles.versionBadge}>
          <Text style={styles.version}>
            Version 1.0.0
          </Text>
        </View>

        <Text style={styles.footerText}>
          Organize your day, one task at a time.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FC',
  },

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22223B',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22223B',
    marginTop: 20,
    marginBottom: 13,
  },

  settingCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  settingIcon: {
    width: 43,
    height: 43,
    backgroundColor: '#EEEEFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  iconText: {
    fontSize: 21,
  },

  settingInfo: {
    flex: 1,
    paddingRight: 8,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#292943',
  },

  description: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    lineHeight: 18,
  },

  aboutCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },

  appIcon: {
    width: 65,
    height: 65,
    backgroundColor: '#4F46E5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  appIconText: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: 'bold',
  },

  appName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  aboutSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },

  versionBadge: {
    backgroundColor: '#EEEEFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 15,
  },

  version: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },

  footerText: {
    fontSize: 12,
    color: '#999',
    marginTop: 18,
    textAlign: 'center',
  },
});
