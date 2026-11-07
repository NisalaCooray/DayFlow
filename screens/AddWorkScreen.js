
import React, { useState } from 'react';

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

export default function AddWorkScreen({ onAddTask }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('Study');
  const [priority, setPriority] = useState('Medium');

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  // Save task
  const saveTask = () => {

    if (title.trim() === '') {
      Alert.alert('Missing Title', 'Please enter a task title.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category: category,
      priority: priority,
      date: formatDate(date),
      time: formatTime(time),
      completed: false,
    };

    // Send task to App.js
    onAddTask(newTask);

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Study');
    setPriority('Medium');
    setDate(new Date());
    setTime(new Date());

    Alert.alert('Success', 'Your task has been saved!');

  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>Add New Work</Text>

      <Text style={styles.subtitle}>
        Plan your next task.
      </Text>

      {/* Task Title */}
      <Text style={styles.label}>Task Title *</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Date */}
      <Text style={styles.label}>Date</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{formatDate(date)}</Text>
      </TouchableOpacity>

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

      {/* Time */}
      <Text style={styles.label}>Time</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{formatTime(time)}</Text>
      </TouchableOpacity>

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

      {/* Category */}
      <Text style={styles.label}>Category</Text>

      <View style={styles.optionContainer}>

        {['Study', 'Work', 'Personal', 'Other'].map(item => (

          <TouchableOpacity
            key={item}
            style={[
              styles.option,
              category === item && styles.selectedOption
            ]}
            onPress={() => setCategory(item)}
          >

            <Text style={[
              styles.optionText,
              category === item && styles.selectedOptionText
            ]}>
              {item}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* Priority */}
      <Text style={styles.label}>Priority</Text>

      <View style={styles.optionContainer}>

        {['Low', 'Medium', 'High'].map(item => (

          <TouchableOpacity
            key={item}
            style={[
              styles.option,
              priority === item && styles.selectedOption
            ]}
            onPress={() => setPriority(item)}
          >

            <Text style={[
              styles.optionText,
              priority === item && styles.selectedOptionText
            ]}>
              {item}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveTask}
      >

        <Text style={styles.saveButtonText}>
          Save Task
        </Text>

      </TouchableOpacity>

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
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 7,
    color: '#333333',
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 9,
    fontSize: 14,
  },

  descriptionInput: {
    height: 85,
    textAlignVertical: 'top',
  },

  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  option: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  selectedOption: {
    backgroundColor: '#4F46E5',
  },

  optionText: {
    color: '#444444',
  },

  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 35,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
