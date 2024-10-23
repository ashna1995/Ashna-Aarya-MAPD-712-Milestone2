/**
 * AddTestScreen Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This component renders a form to add a new medical test for a patient
 * in the WellCare hospital management system. It allows users to select a test type
 * and input the test value, then sends the data to the backend API.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function AddTestScreen({ route }) {
  const { patientId } = route.params;
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      onTestAdded: () => {
        navigation.navigate('PatientDetails', { patientId, refresh: true });
      },
    });
  }, [navigation, patientId]);

  const handleAddTest = async () => {
    if (!type || !value) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await axios.post(`http://10.0.2.2:5000/api/patients/${patientId}/tests`, { type, value });
      Alert.alert('Success', 'Test added successfully');
      navigation.getParent()?.setOptions({ onTestAdded: undefined });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding test:', error);
      Alert.alert('Error', 'Failed to add test');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <TextInput
        style={styles.input}
        placeholder="Test Value"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTest}>
        <Text style={styles.buttonText}>Add Test</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});