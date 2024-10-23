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
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
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

  // Function to handle adding a new patient
  const handleAddPatient = async () => {
    // Validation check for required fields
    if (!name || !age || !gender) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      // API call to add a new patient
      await axios.post('http://10.0.2.2:5000/api/patients', {
        name,
        age: parseInt(age),
        gender,
        address,
        phoneNumber,
        medicalHistory: medicalHistory.split(',').map(item => item.trim()),
      });
      Alert.alert('Success', 'Patient added successfully');
      navigation.navigate('PatientsList');
    } catch (error) {
      console.error('Error adding patient:', error);
      Alert.alert('Error', 'Failed to add patient');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Name input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {/* Age input */}
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        {/* Gender picker */}
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
        {/* Address input */}
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        {/* Phone number input */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        {/* Medical history input */}
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Medical History (comma-separated)"
          value={medicalHistory}
          onChangeText={setMedicalHistory}
          multiline
        />
        {/* Add patient button */}
        <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
          <Text style={styles.buttonText}>Add Patient</Text>
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
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
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