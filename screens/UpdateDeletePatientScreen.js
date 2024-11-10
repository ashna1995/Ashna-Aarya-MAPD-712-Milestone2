/**
 * UpdateDeletePatientScreen Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This component allows updating and deleting a patient's information.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function UpdateDeletePatientScreen({ route, navigation }) {
  const { patientId } = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/patients/${patientId}`);
      const patient = response.data;
      setName(patient.name);
      setAge(patient.age.toString());
      setGender(patient.gender);
      setAddress(patient.address || '');
      setPhoneNumber(patient.phoneNumber || '');
      setMedicalHistory(patient.medicalHistory.join(', '));
    } catch (error) {
      console.error('Error fetching patient details:', error);
      Alert.alert('Error', 'Failed to fetch patient details');
    }
  };

  const handleUpdatePatient = async () => {
    if (!name.trim() || !age.trim() || !gender) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`http://10.0.2.2:5000/api/patients/${patientId}`, {
        name: name.trim(),
        age: parseInt(age),
        gender,
        address: address.trim(),
        phoneNumber: phoneNumber.trim(),
        medicalHistory: medicalHistory.split(',').map(item => item.trim()).filter(item => item),
      });
      Alert.alert('Success', 'Patient updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating patient:', error);
      Alert.alert('Error', 'Failed to update patient');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePatient = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this patient? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await axios.delete(`http://10.0.2.2:5000/api/patients/${patientId}`);
              Alert.alert('Success', 'Patient deleted successfully');
              navigation.navigate('PatientsList', { refresh: true });
            } catch (error) {
              console.error('Error deleting patient:', error);
              Alert.alert('Error', 'Failed to delete patient');
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
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
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
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Medical History</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={medicalHistory}
          onChangeText={setMedicalHistory}
          multiline
        />

        <TouchableOpacity 
          style={[styles.button, styles.updateButton]} 
          onPress={handleUpdatePatient}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Update Patient</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDeletePatient}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Delete Patient</Text>
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