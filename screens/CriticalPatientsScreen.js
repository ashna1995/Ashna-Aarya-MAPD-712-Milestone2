/**
 * CriticalPatientsScreen Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This component displays a list of critical patients in the WellCare hospital management system.
 * It fetches data from the backend API and allows navigation to detailed patient information.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function CriticalPatientsScreen({ navigation }) {
  // State variable to store the list of critical patients
  const [criticalPatients, setCriticalPatients] = useState([]);

  // Fetch critical patients when the component mounts
  useEffect(() => {
    fetchCriticalPatients();
  }, []);

  // Function to fetch critical patients from the API
  const fetchCriticalPatients = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/patients/critical');
      setCriticalPatients(response.data);
    } catch (error) {
      console.error('Error fetching critical patients:', error);
    }
  };

  // Render a single patient item in the list
  const renderPatientItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => navigation.navigate('PatientDetails', { patientId: item._id })}
    >
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientDetails}>{item.age} years old • {item.gender}</Text>
      </View>
      <Ionicons name="warning" size={24} color="#FF3B30" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={criticalPatients}
        renderItem={renderPatientItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={<Text style={styles.noPatients}>No critical patients</Text>}
      />
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});