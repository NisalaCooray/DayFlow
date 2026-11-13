
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddWorkScreen({
  onAddTask,
  onUpdateTask,
  initialTask
}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('Study');
  const [priority, setPriority] = useState('Medium');

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Load existing task details when editing
  useEffect(() => {

    if (initialTask) {

      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCategory(initialTask.category || 'Study');
      setPriority(initialTask.priority || 'Medium');

      const taskDate = new Date(`${initialTask.date}T00:00:00`);
      const taskTime = new Date(`2000-01-01T${initialTask.time || '00:00'}:00`);

      if (!isNaN(taskDate.getTime())) {
        setDate(taskDate);
      }

      if (!isNaN(taskTime.getTime())) {
        setTime(taskTime);
      }

    } else {

      resetForm();

    }

  }, [initialTask]);

  // Format date
  const formatDate = (value) => {

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;

  };

  // Format time
  const formatTime = (value) => {

    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;

  };

  // Reset form
  const resetForm = () => {

    setTitle('');
    setDescription('');
    setCategory('Study');
    setPriority('Medium');
    setDate(new Date());
    setTime(new Date());

  };

  // Save or update task
  const saveTask = () => {

    if (title.trim() === '') {

      Alert.alert('Missing Title', 'Please enter a task title.');
      return;

    }

    const updatedTask = {

      id: initialTask ? initialTask.id : Date.now().toString(),

      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      date: formatDate(date),
      time: formatTime(time),

      completed: initialTask ? initialTask.completed : false,

    };

    if (initialTask) {

      onUpdateTask(updatedTask);

    } else {

      onAddTask(updatedTask);

      Alert.alert('Success', 'Your task has been saved!');

    }

    resetForm();

  };

  const categories = [
    { name: 'Study', icon: '📚' },
    { name: 'Work', icon: '💼' },
    { name: 'Personal', icon: '👤' },
    { name: 'Other', icon: '📌' },
  ];

  const priorities = [
    { name: 'Low', color: '#16A34A', background: '#E9F8EF' },
    { name: 'Medium', color: '#D97706', background: '#FFF3E0' },
    { name: 'High', color: '#DC2626', background: '#FEECEC' },
  ];

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* Header */}
      <View style={styles.header}>

        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>✎</Text>
        </View>

        <Text style={styles.title}>
          {initialTask ? 'Edit Task' : 'Add New Task'}
        </Text>

        <Text style={styles.subtitle}>
          {initialTask
            ? 'Make changes to your task details.'
            : 'Plan your day and stay organized.'}
        </Text>

      </View>

      {/* Task Details */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>Task Details</Text>

        <Text style={styles.label}>Task Title *</Text>

        <TextInput
          style={styles.input}
          placeholder="What do you need to do?"
          placeholderTextColor="#A0A0B0"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Add some details about your task..."
          placeholderTextColor="#A0A0B0"
          value={description}
          onChangeText={setDescription}
          multiline
        />

      </View>

      {/* Date and Time */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>Schedule</Text>

        <View style={styles.scheduleContainer}>

          <View style={styles.scheduleItem}>

            <Text style={styles.label}>Date</Text>

            <TouchableOpacity
              style={styles.scheduleButton}
              onPress={() => setShowDatePicker(true)}
            >

              <Text style={styles.scheduleIcon}>📅</Text>

              <Text style={styles.scheduleText}>
                {formatDate(date)}
              </Text>

            </TouchableOpacity>

          </View>

          <View style={styles.scheduleItem}>

            <Text style={styles.label}>Time</Text>

            <TouchableOpacity
              style={styles.scheduleButton}
              onPress={() => setShowTimePicker(true)}
            >

              <Text style={styles.scheduleIcon}>🕒</Text>

              <Text style={styles.scheduleText}>
                {formatTime(time)}
              </Text>

            </TouchableOpacity>

          </View>

        </View>

        {showDatePicker && (

          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {

              setShowDatePicker(false);

              if (selectedDate) {
                setDate(selectedDate);
              }

            }}
          />

        )}

        {showTimePicker && (

          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {

              setShowTimePicker(false);

              if (selectedTime) {
                setTime(selectedTime);
              }

            }}
          />

        )}

      </View>

      {/* Category */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>Category</Text>

        <View style={styles.optionContainer}>

          {categories.map(item => (

            <TouchableOpacity
              key={item.name}
              style={[
                styles.categoryOption,
                category === item.name && styles.selectedCategory
              ]}
              onPress={() => setCategory(item.name)}
            >

              <Text style={styles.categoryIcon}>{item.icon}</Text>

              <Text style={[
                styles.optionText,
                category === item.name && styles.selectedOptionText
              ]}>
                {item.name}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      </View>

      {/* Priority */}
      <View style={styles.section}>

        <Text style={styles.sectionTitle}>Priority</Text>

        <View style={styles.priorityContainer}>

          {priorities.map(item => (

            <TouchableOpacity
              key={item.name}
              style={[
                styles.priorityOption,
                {
                  backgroundColor: priority === item.name
                    ? item.background
                    : '#FFFFFF',
                  borderColor: priority === item.name
                    ? item.color
                    : '#E7E7EF'
                }
              ]}
              onPress={() => setPriority(item.name)}
            >

              <View style={[
                styles.priorityDot,
                { backgroundColor: item.color }
              ]} />

              <Text style={[
                styles.priorityText,
                {
                  color: priority === item.name
                    ? item.color
                    : '#66667A'
                }
              ]}>
                {item.name}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveTask}
        activeOpacity={0.8}
      >

        <Text style={styles.saveButtonText}>
          {initialTask ? '✓  Update Task' : '+  Save Task'}
        </Text>

      </TouchableOpacity>

      <Text style={styles.footerText}>
        Keep planning. Keep progressing.
      </Text>

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
    paddingBottom: 25,
  },

  header: {
    marginBottom: 20,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E8E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  headerIconText: {
    fontSize: 25,
    color: '#4F46E5',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  subtitle: {
    fontSize: 13,
    color: '#77778A',
    marginTop: 6,
  },

  section: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 15,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#29293D',
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#55556A',
    marginTop: 10,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#F7F7FB',
    borderWidth: 1,
    borderColor: '#EEEEF4',
    padding: 13,
    borderRadius: 10,
    fontSize: 13,
    color: '#29293D',
  },

  descriptionInput: {
    height: 85,
    textAlignVertical: 'top',
  },

  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  scheduleItem: {
    width: '48%',
  },

  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7FB',
    borderWidth: 1,
    borderColor: '#EEEEF4',
    padding: 12,
    borderRadius: 10,
  },

  scheduleIcon: {
    fontSize: 16,
    marginRight: 7,
  },

  scheduleText: {
    fontSize: 11,
    color: '#44445A',
    fontWeight: '500',
  },

  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7FB',
    borderWidth: 1,
    borderColor: '#EEEEF4',
    padding: 12,
    borderRadius: 10,
    marginBottom: 9,
  },

  selectedCategory: {
    backgroundColor: '#EEEEFF',
    borderColor: '#4F46E5',
  },

  categoryIcon: {
    fontSize: 17,
    marginRight: 9,
  },

  optionText: {
    fontSize: 13,
    color: '#55556A',
    fontWeight: '500',
  },

  selectedOptionText: {
    color: '#4F46E5',
    fontWeight: 'bold',
  },

  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priorityOption: {
    width: '31%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },

  priorityDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginRight: 6,
  },

  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footerText: {
    fontSize: 11,
    color: '#9999A8',
    textAlign: 'center',
    marginTop: 15,
  },

});
