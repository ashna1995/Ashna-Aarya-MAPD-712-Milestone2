/**
 * AddPatientScreen Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This component renders a form to add a new patient to the WellCare hospital management system.
 * It allows users to input patient details and sends the data to the backend API.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function AddPatientScreen({ navigation }) {
  // State variables for form fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle adding a new patient
  const handleAddPatient = async () => {
    // Validation check for required fields
    if (!name.trim() || !age.trim() || !gender) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // API call to add a new patient
      const response = await axios.post('http://10.0.2.2:5000/api/patients', {
        name: name.trim(),
        age: parseInt(age),
        gender,
        address: address.trim(),
        phoneNumber: phoneNumber.trim(),
        medicalHistory: medicalHistory.split(',').map(item => item.trim()).filter(item => item),
      });

      Alert.alert('Success', 'Patient added successfully');
      navigation.navigate('PatientsList', { refresh: true });
    } catch (error) {
      console.error('Error adding patient:', error);
      Alert.alert('Error', 'Failed to add patient. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient's name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient's age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gender *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient's address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient's phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Medical History</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter medical history (comma-separated)"
          value={medicalHistory}
          onChangeText={setMedicalHistory}
          multiline
        />

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.disabledButton]} 
          onPress={handleAddPatient}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Add Patient</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
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
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});