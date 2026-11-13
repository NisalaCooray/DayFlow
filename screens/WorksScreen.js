
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function WorksScreen({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' ||
      (filter === 'Pending' && !task.completed) ||
      (filter === 'Completed' && task.completed);

    return matchesSearch && matchesFilter;
  });

  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={styles.taskInfo}>
          <Text
            style={[
              styles.taskTitle,
              item.completed && styles.completedTitle,
            ]}
          >
            {item.title}
          </Text>

          <Text style={styles.taskDate}>
            {item.date}  •  {item.time}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            item.completed ? styles.completedBadge : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.completed ? styles.completedStatus : styles.pendingStatus,
            ]}
          >
            {item.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        <Text style={styles.categoryTag}>{item.category}</Text>
        <Text style={styles.priorityTag}>
          {item.priority} Priority
        </Text>
      </View>

      {item.description ? (
        <Text style={styles.description}>
          {item.description}
        </Text>
      ) : null}

      <View style={styles.divider} />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEditTask(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => onToggleTask(item.id)}
        >
          <Text style={styles.buttonText}>
            {item.completed ? 'Undo' : 'Done'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDeleteTask(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Works</Text>
      <Text style={styles.subtitle}>
        Manage and track all your daily tasks.
      </Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{tasks.length}</Text>
          <Text style={styles.summaryLabel}>Total Tasks</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, styles.pendingNumber]}>
            {pendingCount}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, styles.completedNumber]}>
            {completedCount}
          </Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search your tasks..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        {['All', 'Pending', 'Completed'].map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterButton,
              filter === option && styles.activeFilter,
            ]}
            onPress={() => setFilter(option)}
          >
            <Text
              style={[
                styles.filterText,
                filter === option && styles.activeFilterText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        Your Tasks ({filteredTasks.length})
      </Text>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => String(item.id)}
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptyText}>
              Try changing your search or filter.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FC',
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22223B',
  },

  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 2,
  },

  summaryNumber: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  pendingNumber: {
    color: '#E59A23',
  },

  completedNumber: {
    color: '#22A06B',
  },

  summaryLabel: {
    fontSize: 11,
    color: '#777',
    marginTop: 5,
  },

  search: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    fontSize: 14,
    marginBottom: 15,
    elevation: 1,
    color: '#333',
  },

  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 11,
    backgroundColor: '#E8E9F2',
    borderRadius: 10,
    alignItems: 'center',
  },

  activeFilter: {
    backgroundColor: '#4F46E5',
  },

  filterText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 13,
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#22223B',
    marginBottom: 12,
  },

  listContent: {
    paddingBottom: 25,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 13,
    elevation: 2,
  },

  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  taskInfo: {
    flex: 1,
    marginRight: 8,
  },

  taskTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#292943',
  },

  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  taskDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },

  pendingBadge: {
    backgroundColor: '#FFF3DB',
  },

  completedBadge: {
    backgroundColor: '#E2F7EC',
  },

  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  pendingStatus: {
    color: '#D58A16',
  },

  completedStatus: {
    color: '#188653',
  },

  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  categoryTag: {
    backgroundColor: '#EEEEFF',
    color: '#4F46E5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    fontSize: 11,
    overflow: 'hidden',
  },

  priorityTag: {
    backgroundColor: '#F1F1F1',
    color: '#666',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    fontSize: 11,
    overflow: 'hidden',
  },

  description: {
    color: '#777',
    fontSize: 13,
    marginTop: 12,
    lineHeight: 19,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEF2',
    marginVertical: 14,
  },

  buttons: {
    flexDirection: 'row',
    gap: 8,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#F0A83A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  completeButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#E45B5B',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 35,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#555',
  },

  emptyText: {
    fontSize: 13,
    color: '#999',
    marginTop: 7,
  },
});
