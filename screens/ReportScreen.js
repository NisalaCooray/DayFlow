
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function ReportScreen({ tasks }) {
  const now = new Date();

  // Today's date
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');

  // Today's tasks
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


  // --------------------------------
  // WEEKLY REPORT CALCULATIONS
  // --------------------------------

  // Get the current week's Monday
  const weekStart = new Date(now);

  weekStart.setDate(
    now.getDate() - ((now.getDay() + 6) % 7)
  );

  weekStart.setHours(0, 0, 0, 0);

  // Get the current week's Sunday
  const weekEnd = new Date(weekStart);

  weekEnd.setDate(weekStart.getDate() + 6);

  // Convert dates into YYYY-MM-DD format
  const getDateKey = (date) => {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-');
  };

  const weekStartKey = getDateKey(weekStart);
  const weekEndKey = getDateKey(weekEnd);

  // Get tasks scheduled for this week
  const weeklyTasks = tasks.filter(
    task =>
      task.date >= weekStartKey &&
      task.date <= weekEndKey
  );

  const weeklyCompleted = weeklyTasks.filter(
    task => task.completed
  ).length;

  const weeklyPending = weeklyTasks.length - weeklyCompleted;

  const weeklyPercentage = weeklyTasks.length === 0
    ? 0
    : Math.round(
        (weeklyCompleted / weeklyTasks.length) * 100
      );

  // Monday to Sunday progress
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);

    date.setDate(weekStart.getDate() + index);

    const dateKey = getDateKey(date);

    const dayTasks = weeklyTasks.filter(
      task => task.date === dateKey
    );

    const dayCompleted = dayTasks.filter(
      task => task.completed
    ).length;

    const dayPercentage = dayTasks.length === 0
      ? 0
      : Math.round(
          (dayCompleted / dayTasks.length) * 100
        );

    return {
      name: date.toLocaleDateString('en-US', {
        weekday: 'short'
      }),
      date: date.getDate(),
      total: dayTasks.length,
      completed: dayCompleted,
      percentage: dayPercentage,
    };
  });


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* DAILY REPORT */}

      <Text style={styles.title}>Daily Report</Text>

      <Text style={styles.subtitle}>
        Check your daily productivity.
      </Text>

      <View style={styles.dateCard}>
        <Text style={styles.dateLabel}>TODAY</Text>

        <Text style={styles.date}>
          {now.toDateString()}
        </Text>
      </View>


      {/* Daily Summary */}

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


      {/* Daily Completion */}

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


      {/* Daily Performance */}

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


      {/* WEEKLY PROGRESS REPORT */}

      <Text style={styles.heading}>Weekly Progress</Text>

      <Text style={styles.weekSubtitle}>
        {weekStart.toDateString()} - {weekEnd.toDateString()}
      </Text>


      {/* Weekly Summary */}

      <View style={styles.weeklyCard}>

        <View style={styles.weeklyHeader}>

          <Text style={styles.weeklyTitle}>
            This Week's Summary
          </Text>

          <Text style={styles.weeklyPercentage}>
            {weeklyPercentage}%
          </Text>

        </View>

        <View style={styles.weeklyProgressBackground}>
          <View
            style={[
              styles.weeklyProgressFill,
              { width: `${weeklyPercentage}%` }
            ]}
          />
        </View>

        <Text style={styles.weeklyFooter}>
          {weeklyCompleted} of {weeklyTasks.length} tasks completed
        </Text>

        <View style={styles.weeklyStats}>

          <View style={styles.weeklyStat}>
            <Text style={styles.weeklyTotal}>
              {weeklyTasks.length}
            </Text>

            <Text style={styles.weeklyStatLabel}>
              Total
            </Text>
          </View>

          <View style={styles.weeklyStat}>
            <Text style={styles.weeklyCompleted}>
              {weeklyCompleted}
            </Text>

            <Text style={styles.weeklyStatLabel}>
              Completed
            </Text>
          </View>

          <View style={styles.weeklyStat}>
            <Text style={styles.weeklyPending}>
              {weeklyPending}
            </Text>

            <Text style={styles.weeklyStatLabel}>
              Pending
            </Text>
          </View>

        </View>

      </View>


      {/* Monday to Sunday Breakdown */}

      <Text style={styles.heading}>Daily Breakdown</Text>

      <View style={styles.daysCard}>

        {weekDays.map((day, index) => (

          <View key={index} style={styles.dayRow}>

            <View style={styles.dayInfo}>

              <Text style={styles.dayName}>
                {day.name}
              </Text>

              <Text style={styles.dayDate}>
                {day.date}
              </Text>

            </View>

            <View style={styles.dayProgressContainer}>

              <View style={styles.dayProgressBackground}>
                <View
                  style={[
                    styles.dayProgressFill,
                    { width: `${day.percentage}%` }
                  ]}
                />
              </View>

              <Text style={styles.dayTaskText}>
                {day.completed}/{day.total} completed
              </Text>

            </View>

          </View>

        ))}

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


  // Weekly Report Styles

  weekSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: -5,
    marginBottom: 13,
  },

  weeklyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },

  weeklyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  weeklyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#292943',
  },

  weeklyPercentage: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  weeklyProgressBackground: {
    height: 11,
    backgroundColor: '#E8E8F2',
    borderRadius: 10,
    marginTop: 15,
    overflow: 'hidden',
  },

  weeklyProgressFill: {
    height: 11,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
  },

  weeklyFooter: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },

  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 22,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEF5',
  },

  weeklyStat: {
    alignItems: 'center',
  },

  weeklyTotal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  weeklyCompleted: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22A06B',
  },

  weeklyPending: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E59A23',
  },

  weeklyStatLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },

  daysCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 15,
    elevation: 2,
  },

  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },

  dayInfo: {
    width: 65,
  },

  dayName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#292943',
  },

  dayDate: {
    fontSize: 11,
    color: '#888',
    marginTop: 3,
  },

  dayProgressContainer: {
    flex: 1,
  },

  dayProgressBackground: {
    height: 8,
    backgroundColor: '#E8E8F2',
    borderRadius: 10,
    overflow: 'hidden',
  },

  dayProgressFill: {
    height: 8,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
  },

  dayTaskText: {
    fontSize: 11,
    color: '#888',
    marginTop: 5,
  },

});
