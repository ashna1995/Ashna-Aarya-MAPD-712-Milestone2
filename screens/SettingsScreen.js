/**
 * SettingsScreen Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This component displays the settings screen for the WellCare hospital management app.
 * It allows users to toggle various preferences, access account-related options, and log out.
 * The component uses switches for preferences and touchable buttons for other actions.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  // State variables for user preferences
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  // Toggle functions for preferences
  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState);
  const toggleAutoSync = () => setAutoSyncEnabled(previousState => !previousState);

  // Function to handle logout
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => console.log("Logout pressed") 
          // Here you would typically clear the user's session and navigate to the login screen
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {/* Notifications Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#007AFF" : "#f4f3f4"}
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>
        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkModeEnabled ? "#007AFF" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={darkModeEnabled}
          />
        </View>
        {/* Auto-sync Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Auto-sync Data</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={autoSyncEnabled ? "#007AFF" : "#f4f3f4"}
            onValueChange={toggleAutoSync}
            value={autoSyncEnabled}
          />
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {/* Change Password Button */}
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Change Password', 'This feature is not implemented yet.')}>
          <Ionicons name="key-outline" size={24} color="#007AFF" />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        {/* Privacy Policy Button */}
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Privacy Policy', 'This feature is not implemented yet.')}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#007AFF" />
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        {/* Terms of Service Button */}
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Terms of Service', 'This feature is not implemented yet.')}>
          <Ionicons name="document-text-outline" size={24} color="#007AFF" />
          <Text style={styles.buttonText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles for the component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
});