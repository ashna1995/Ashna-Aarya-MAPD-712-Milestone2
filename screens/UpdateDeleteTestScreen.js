/**
 * UpdateDeleteTestScreen Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This component allows updating and deleting a patient's test.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function UpdateDeleteTestScreen({ route, navigation }) {
  const { patientId, testId } = route.params;
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTestDetails();
  }, []);

  const fetchTestDetails = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/patients/${patientId}/tests/${testId}`);
      const test = response.data;
      setType(test.type);
      setValue(test.value);
    } catch (error) {
      console.error('Error fetching test details:', error);
      Alert.alert('Error', 'Failed to fetch test details');
    }
  };

  const handleUpdateTest = async () => {
    if (!type || !value) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`http://10.0.2.2:5000/api/patients/${patientId}/tests/${testId}`, {
        type,
        value,
      });
      Alert.alert('Success', 'Test updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating test:', error);
      Alert.alert('Error', 'Failed to update test');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTest = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this test? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await axios.delete(`http://10.0.2.2:5000/api/patients/${patientId}/tests/${testId}`);
              Alert.alert('Success', 'Test deleted successfully');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting test:', error);
              Alert.alert('Error', 'Failed to delete test');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Test Type *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Test Type" value="" />
            <Picker.Item label="Blood Pressure" value="Blood Pressure" />
            <Picker.Item label="Respiratory Rate" value="Respiratory Rate" />
            <Picker.Item label="Blood Oxygen Level" value="Blood Oxygen Level" />
            <Picker.Item label="Heartbeat Rate" value="Heartbeat Rate" />
          </Picker>
        </View>

        <Text style={styles.label}>Test Value *</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Enter test value"
        />

        <TouchableOpacity 
          style={[styles.button, styles.updateButton]} 
          onPress={handleUpdateTest}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Update Test</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDeleteTest}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Delete Test</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  picker: {
    height: 50,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});