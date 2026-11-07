import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import WorksScreen from './screens/WorksScreen';
import AddWorkScreen from './screens/AddWorkScreen';
import ReportScreen from './screens/ReportScreen';
import SettingsScreen from './screens/SettingsScreen';


const STORAGE_KEY = '@dayflow_tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [activeScreen, setActiveScreen] = useState('Home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.log('Loading error:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      ).catch(error => console.log('Saving error:', error));
    }
  }, [tasks, isLoaded]);

  // Add a new task
  const addTask = (newTask) => {
    setTasks(previousTasks => [...previousTasks, newTask]);
    setActiveScreen('Works');
  };

  // Complete or uncomplete a task
  const toggleTask = (taskId) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  //Delete a Task
  const deleteTask = (taskId) => {
    setTasks(previousTasks =>
      previousTasks.filter(task => task.id !== taskId)
    );
  };

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={styles.logo}>DayFlow</Text>
        <Text>Loading your tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.screen}>
        {activeScreen === 'Home' && (
          <HomeScreen tasks={tasks} />
        )}

        {activeScreen === 'Works' && (
          <WorksScreen
            tasks={tasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        )}

        {activeScreen === 'Add' && (
          <AddWorkScreen onAddTask={addTask} />
        )}

        {activeScreen === 'Report' && (
          <ReportScreen tasks={tasks} />
        )}

        {activeScreen === 'Settings' && <SettingsScreen />}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>

        {[
          { name: 'Home', icon: '⌂' },
          { name: 'Works', icon: '☷' },
          { name: 'Add', icon: '+' },
          { name: 'Report', icon: '▤' },
          { name: 'Settings', icon: '⚙' },
        ].map(item => (

          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => setActiveScreen(item.name)}
          >
            <Text style={[
              styles.navIcon,
              activeScreen === item.name && styles.activeNav
            ]}>
              {item.icon}
            </Text>

            <Text style={[
              styles.navText,
              activeScreen === item.name && styles.activeNav
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>

        ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  screen: {
    flex: 1,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  navItem: {
    alignItems: 'center',
    flex: 1,
  },

  navIcon: {
    fontSize: 23,
    color: '#888888',
  },

  navText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 3,
  },

  activeNav: {
    color: '#4F46E5',
    fontWeight: 'bold',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 10,
  },
});