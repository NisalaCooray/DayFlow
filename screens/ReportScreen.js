
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

export default function ReportScreen({ tasks }) {

  // Get today's date
  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');

  // Today's tasks
  const todayTasks = tasks.filter(
    task => task.date === today
  );

  // Completed tasks scheduled for today
  const completed = todayTasks.filter(
    task => task.completed
  ).length;

  // Pending tasks scheduled for today
  const pending = todayTasks.length - completed;

  // Overdue tasks (past dates and not completed)
  const overdue = tasks.filter(
    task => task.date < today && !task.completed
  ).length;

  // Daily completion percentage
  const percentage = todayTasks.length === 0
    ? 0
    : Math.round((completed / todayTasks.length) * 100);

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>Daily Report</Text>

      <Text style={styles.subtitle}>
        Check your daily productivity.
      </Text>

      <Text style={styles.date}>
        {now.toDateString()}
      </Text>

      {/* Daily Summary */}
      <Text style={styles.heading}>Today's Summary</Text>

      <View style={styles.cardContainer}>

        <View style={styles.card}>
          <Text style={styles.number}>
            {todayTasks.length}
          </Text>
          <Text style={styles.cardText}>Total Tasks</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.number, { color: '#16A34A' }]}>
            {completed}
          </Text>
          <Text style={styles.cardText}>Completed</Text>
        </View>

      </View>

      <View style={styles.cardContainer}>

        <View style={styles.card}>
          <Text style={[styles.number, { color: '#EA580C' }]}>
            {pending}
          </Text>
          <Text style={styles.cardText}>Pending</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.number, { color: '#DC2626' }]}>
            {overdue}
          </Text>
          <Text style={styles.cardText}>Overdue</Text>
        </View>

      </View>

      {/* Progress */}
      <Text style={styles.heading}>Daily Completion</Text>

      <View style={styles.progressCard}>

        <Text style={styles.percentage}>
          {percentage}%
        </Text>

        <Text style={styles.cardText}>
          Today's tasks completed
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

      {/* Report Message */}
      <View style={styles.messageCard}>

        <Text style={styles.messageTitle}>
          Daily Performance
        </Text>

        <Text style={styles.messageText}>
          {todayTasks.length === 0
            ? 'You have no tasks scheduled for today. Enjoy your day or plan something new!'
            : percentage === 100
              ? 'Excellent! You completed all your tasks for today.'
              : `You have completed ${completed} out of ${todayTasks.length} tasks. Keep going!`
          }
        </Text>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginTop: 20,
  },

  subtitle: {
    color: '#777777',
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
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },

  number: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  cardText: {
    fontSize: 13,
    color: '#666666',
    marginTop: 6,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
  },

  percentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  progressBackground: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginTop: 15,
  },

  progressFill: {
    height: 10,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
  },

  messageCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },

  messageTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333',
  },

  messageText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    lineHeight: 21,
  },

});
