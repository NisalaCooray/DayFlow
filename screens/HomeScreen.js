
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ tasks }) {

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const percentage = tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);

  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');

  const todayTasks = tasks.filter(
    task => task.date === today
  );

  const greeting = now.getHours() < 12
    ? 'Good Morning ☀️'
    : now.getHours() < 18
      ? 'Good Afternoon 🌤️'
      : 'Good Evening 🌙';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.title}>DayFlow</Text>
          <Text style={styles.subtitle}>
            Manage your day, one task at a time.
          </Text>
        </View>

        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>D</Text>
        </View>
      </View>

      {/* Date */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateIcon}>📅</Text>
        <Text style={styles.date}>
          {now.toDateString()}
        </Text>
      </View>

      {/* Overview */}
      <Text style={styles.sectionTitle}>Your Overview</Text>

      <View style={styles.cardContainer}>

        <View style={[styles.statCard, styles.totalCard]}>
          <Text style={styles.statIcon}>📋</Text>
          <Text style={styles.number}>{tasks.length}</Text>
          <Text style={styles.cardText}>Total Tasks</Text>
        </View>

        <View style={[styles.statCard, styles.completedCard]}>
          <Text style={styles.statIcon}>✓</Text>
          <Text style={[styles.number, { color: '#16A34A' }]}>
            {completedTasks}
          </Text>
          <Text style={styles.cardText}>Completed</Text>
        </View>

        <View style={[styles.statCard, styles.pendingCard]}>
          <Text style={styles.statIcon}>◷</Text>
          <Text style={[styles.number, { color: '#EA580C' }]}>
            {pendingTasks}
          </Text>
          <Text style={styles.cardText}>Pending</Text>
        </View>

      </View>

      {/* Progress */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <Text style={styles.progressLabel}>All Tasks</Text>
      </View>

      <View style={styles.progressCard}>

        <View style={styles.progressTop}>
          <View>
            <Text style={styles.progressHeading}>
              Your productivity
            </Text>
            <Text style={styles.progressSubtitle}>
              Keep up the good work!
            </Text>
          </View>

          <Text style={styles.percentage}>{percentage}%</Text>
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
          {completedTasks} of {tasks.length} tasks completed
        </Text>

      </View>

      {/* Today's Tasks */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.taskCount}>
          <Text style={styles.taskCountText}>
            {todayTasks.length}
          </Text>
        </View>
      </View>

      {todayTasks.length === 0 ? (

        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyTitle}>No tasks for today</Text>
          <Text style={styles.emptyText}>
            Enjoy your free time or add a new task!
          </Text>
        </View>

      ) : (

        todayTasks.map(task => (

          <View key={task.id} style={styles.taskCard}>

            <View style={[
              styles.taskIndicator,
              {
                backgroundColor: task.completed
                  ? '#16A34A'
                  : '#4F46E5'
              }
            ]} />

            <View style={styles.taskDetails}>

              <Text style={[
                styles.taskTitle,
                task.completed && styles.completedTaskTitle
              ]}>
                {task.title}
              </Text>

              <Text style={styles.taskInfo}>
                {task.time || 'No time set'}  •  {task.category}
              </Text>

            </View>

            <View style={[
              styles.statusBadge,
              task.completed
                ? styles.completedBadge
                : styles.pendingBadge
            ]}>
              <Text style={[
                styles.statusText,
                task.completed
                  ? styles.completedStatus
                  : styles.pendingStatus
              ]}>
                {task.completed ? 'Done' : 'Pending'}
              </Text>
            </View>

          </View>

        ))

      )}

      <View style={styles.bottomSpace} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F6FC',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 14,
    color: '#77778A',
    marginBottom: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  subtitle: {
    fontSize: 13,
    color: '#77778A',
    marginTop: 5,
  },

  logoCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 12,
    marginTop: 22,
  },

  dateIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  date: {
    fontSize: 13,
    color: '#55556A',
    fontWeight: '500',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25253A',
    marginTop: 25,
    marginBottom: 13,
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '31.5%',
    paddingVertical: 15,
    paddingHorizontal: 7,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  totalCard: {
    backgroundColor: '#EEEEFF',
  },

  completedCard: {
    backgroundColor: '#E9F8EF',
  },

  pendingCard: {
    backgroundColor: '#FFF3E8',
  },

  statIcon: {
    fontSize: 19,
    color: '#4F46E5',
    marginBottom: 8,
  },

  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  cardText: {
    fontSize: 11,
    color: '#66667A',
    marginTop: 5,
    textAlign: 'center',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressLabel: {
    fontSize: 11,
    color: '#4F46E5',
    backgroundColor: '#E8E7FF',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 15,
  },

  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
  },

  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#29293D',
  },

  progressSubtitle: {
    fontSize: 12,
    color: '#888899',
    marginTop: 5,
  },

  percentage: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  progressBackground: {
    height: 10,
    backgroundColor: '#E9E9F2',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: 10,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
  },

  progressFooter: {
    fontSize: 12,
    color: '#888899',
    marginTop: 12,
  },

  taskCount: {
    backgroundColor: '#E8E7FF',
    width: 27,
    height: 27,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  taskCountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
  },

  taskIndicator: {
    width: 4,
    height: 42,
    borderRadius: 5,
    marginRight: 12,
  },

  taskDetails: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#29293D',
  },

  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },

  taskInfo: {
    fontSize: 11,
    color: '#888899',
    marginTop: 6,
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 5,
  },

  completedBadge: {
    backgroundColor: '#E9F8EF',
  },

  pendingBadge: {
    backgroundColor: '#FFF3E8',
  },

  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  completedStatus: {
    color: '#16A34A',
  },

  pendingStatus: {
    color: '#EA580C',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#29293D',
  },

  emptyText: {
    fontSize: 12,
    color: '#888899',
    marginTop: 7,
    textAlign: 'center',
  },

  bottomSpace: {
    height: 20,
  },

});
