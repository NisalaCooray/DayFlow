
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
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

  const confirmDelete = (task) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteTask(task.id),
        },
      ]
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskInfo}>
        <Text
          style={[
            styles.taskTitle,
            item.completed && styles.completedTitle,
          ]}
        >
          {item.title}
        </Text>

        <Text style={styles.details}>
          {item.date} | {item.time}
        </Text>

        <Text style={styles.details}>
          {item.category} • {item.priority} Priority
        </Text>

        {item.description ? (
          <Text style={styles.description}>
            {item.description}
          </Text>
        ) : null}

        <Text style={styles.status}>
          {item.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>

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
      <Text style={styles.title}>My Works</Text>

      <TextInput
        style={styles.search}
        placeholder="Search tasks..."
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

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks found.
          </Text>
        }
      />
    </View>
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
    marginBottom: 20,
  },
  search: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E5E7EF',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#4A63E7',
  },
  filterText: {
    color: '#444',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFF',
  },
  taskCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskInfo: {
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  details: {
    color: '#777',
    fontSize: 13,
    marginTop: 5,
  },
  description: {
    color: '#555',
    marginTop: 8,
  },
  status: {
    marginTop: 8,
    color: '#4A63E7',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
      flex: 1,
      backgroundColor: '#F39C12',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
  completeButton: {
    flex: 1,
    backgroundColor: '#4A63E7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
  },
});
