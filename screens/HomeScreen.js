
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function HomeScreen({ tasks }) {

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const percentage = tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);

  const today = [
    new Date().getFullYear(),
    String(new Date().getMonth() + 1).padStart(2, '0'),
    String(new Date().getDate()).padStart(2, '0')
  ].join('-');

  const todayTasks = tasks.filter(
    task => task.date === today
  );

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>DayFlow</Text>

      <Text style={styles.subtitle}>
        Manage your day, one task at a time.
      </Text>

      <Text style={styles.date}>
        {new Date().toDateString()}
      </Text>

      <Text style={styles.heading}>Your Overview</Text>

      <View style={styles.cardContainer}>

        <View style={styles.card}>
          <Text style={styles.number}>{tasks.length}</Text>
          <Text style={styles.cardText}>Total Tasks</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.number, { color: '#16A34A' }]}>
            {completedTasks}
          </Text>
          <Text style={styles.cardText}>Completed</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.number, { color: '#EA580C' }]}>
            {pendingTasks}
          </Text>
          <Text style={styles.cardText}>Pending</Text>
        </View>

      </View>

      <Text style={styles.heading}>Overall Progress</Text>

      <View style={styles.progressCard}>

        <Text style={styles.percentage}>{percentage}%</Text>

        <Text style={styles.cardText}>
          Tasks completed
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${percentage}%` }
            ]}
          />
        </View>

      </View>

      <Text style={styles.heading}>Today's Tasks</Text>

      {todayTasks.length === 0 ? (

        <Text style={styles.emptyText}>
          No tasks scheduled for today.
        </Text>

      ) : (

        todayTasks.map(task => (
          <View key={task.id} style={styles.taskCard}>

            <Text style={styles.taskTitle}>
              {task.completed ? '✓ ' : '○ '}
              {task.title}
            </Text>

            <Text style={styles.taskInfo}>
              {task.time} • {task.category}
            </Text>

          </View>
        ))

      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },

  date: {
    fontSize: 14,
    color: '#777777',
    marginTop: 20,
  },

  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
    color: '#222222',
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  number: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  cardText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
  },

  percentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  progressBackground: {
    height: 9,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginTop: 15,
  },

  progressFill: {
    height: 9,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },

  taskInfo: {
    fontSize: 12,
    color: '#777777',
    marginTop: 6,
  },

  emptyText: {
    color: '#777777',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
  },

});
