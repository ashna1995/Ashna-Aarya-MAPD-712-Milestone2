/**
 * WelcomeScreen Component
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This component renders the welcome screen for the WellCare hospital management app.
 * It displays a background image, logo, welcome message, group information, and a button to navigate to the main screen.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/hospital-background.jpg')}
      style={styles.backgroundImage}
    >
      {/* Gradient overlay for better text visibility */}
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          {/* Hospital logo */}
          <Image
            source={require('../assets/hospital-logo.jpg')}
            style={styles.logo}
          />
          
          {/* Main content container */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome to WellCare</Text>
            <Text style={styles.subtitle}>Efficient Hospital Management</Text>
            <View style={styles.divider} />
            
            {/* Group and member information */}
            <Text style={styles.groupInfo}>Prepared By: Group 6</Text>
            <Text style={styles.memberInfo}>Ashna Paul (301479554)</Text>
            <Text style={styles.memberInfo}>Aarya Savaliya (301473601)</Text>
            <Text style={styles.courseInfo}>Course: MAPD712</Text>
          </View>
          
          {/* Navigation button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  divider: {
    width: 50,
    height: 2,
    backgroundColor: '#007AFF',
    marginVertical: 20,
  },
  groupInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  memberInfo: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 5,
  },
  courseInfo: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});