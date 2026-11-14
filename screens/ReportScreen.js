
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function ReportScreen({ tasks }) {
  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');

  const todayTasks = tasks.filter(
    task => task.date === today
  );

  const completed = todayTasks.filter(
    task => task.completed
  ).length;

  const pending = todayTasks.length - completed;

  const overdue = tasks.filter(
    task => task.date < today && !task.completed
  ).length;

  const percentage = todayTasks.length === 0
    ? 0
    : Math.round((completed / todayTasks.length) * 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.title}>Daily Report</Text>

      <Text style={styles.subtitle}>
        Check your daily productivity.
      </Text>

      <View style={styles.dateCard}>
        <Text style={styles.dateLabel}>TODAY</Text>
        <Text style={styles.date}>{now.toDateString()}</Text>
      </View>

      {/* Summary */}
      <Text style={styles.heading}>Today's Summary</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.totalNumber}>
            {todayTasks.length}
          </Text>
          <Text style={styles.cardText}>Total Tasks</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.completedNumber}>
            {completed}
          </Text>
          <Text style={styles.cardText}>Completed</Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.pendingNumber}>
            {pending}
          </Text>
          <Text style={styles.cardText}>Pending</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.overdueNumber}>
            {overdue}
          </Text>
          <Text style={styles.cardText}>Overdue</Text>
        </View>
      </View>

      {/* Progress */}
      <Text style={styles.heading}>Daily Completion</Text>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>
              Your Progress
            </Text>
            <Text style={styles.progressSubtitle}>
              Today's tasks completed
            </Text>
          </View>

          <Text style={styles.percentage}>
            {percentage}%
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${percentage}%` }
            ]}
          />
        </View>

        <Text style={styles.progressFooter}>
          {completed} of {todayTasks.length} tasks completed
        </Text>
      </View>

      {/* Performance Message */}
      <Text style={styles.heading}>Daily Performance</Text>

      <View style={styles.messageCard}>
        <View style={styles.messageIcon}>
          <Text style={styles.messageEmoji}>
            {todayTasks.length === 0
              ? '📅'
              : percentage === 100
                ? '🎉'
                : '💪'}
          </Text>
        </View>

        <Text style={styles.messageTitle}>
          {todayTasks.length === 0
            ? 'Plan Your Day'
            : percentage === 100
              ? 'Excellent Work!'
              : 'Keep Going!'}
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
  },

  dateCard: {
    backgroundColor: '#EEEEFF',
    padding: 16,
    borderRadius: 13,
    marginTop: 22,
  },

  dateLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4F46E5',
    letterSpacing: 1,
  },

  date: {
    fontSize: 15,
    fontWeight: '600',
    color: '#33335A',
    marginTop: 5,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 13,
    color: '#22223B',
  },

  cardContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 2,
  },

  totalNumber: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  completedNumber: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#22A06B',
  },

  pendingNumber: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#E59A23',
  },

  overdueNumber: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#E45B5B',
  },

  cardText: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#292943',
  },

  progressSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },

  percentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  progressBackground: {
    height: 11,
    backgroundColor: '#E8E8F2',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: 11,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
  },

  progressFooter: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },

  messageCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
  },

  messageIcon: {
    width: 55,
    height: 55,
    backgroundColor: '#EEEEFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  messageEmoji: {
    fontSize: 27,
  },

  messageTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#292943',
  },

  messageText: {
    fontSize: 13,
    color: '#777',
    marginTop: 9,
    lineHeight: 21,
    textAlign: 'center',
  },
});
