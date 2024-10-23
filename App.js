/**
 * App.js - Main Application Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This is the main component of the WellCare hospital management app.
 * It sets up the navigation structure using React Navigation, including
 * a stack navigator for the main flow and a tab navigator for the main screens.
 * The app includes screens for patient management, critical patients, and settings.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import all screen components
import WelcomeScreen from './screens/WelcomeScreen';
import PatientsListScreen from './screens/PatientsListScreen';
import AddPatientScreen from './screens/AddPatientScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import AddTestScreen from './screens/AddTestScreen';
import SettingsScreen from './screens/SettingsScreen';
import PatientHistoryScreen from './screens/PatientHistoryScreen';
import CriticalPatientsScreen from './screens/CriticalPatientsScreen';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator component
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure tab bar icons
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'PatientsList') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'AddPatient') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'CriticalPatients') {
            iconName = focused ? 'warning' : 'warning-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="PatientsList" component={PatientsListScreen} options={{ title: 'Patients' }} />
      <Tab.Screen name="AddPatient" component={AddPatientScreen} options={{ title: 'Add Patient' }} />
      <Tab.Screen name="CriticalPatients" component={CriticalPatientsScreen} options={{ title: 'Critical' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Define all screens in the stack */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} options={{ title: 'Patient Details' }} />
          <Stack.Screen name="AddTest" component={AddTestScreen} options={{ title: 'Add Test' }} />
          <Stack.Screen name="PatientHistory" component={PatientHistoryScreen} options={{ title: 'Patient History' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}