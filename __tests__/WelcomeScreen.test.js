import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../screens/WelcomeScreen';

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock the LinearGradient component
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

describe('WelcomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<WelcomeScreen navigation={mockNavigation} />);

    // Check if key elements are rendered
    expect(getByText('Welcome to WellCare')).toBeTruthy();
    expect(getByText('Efficient Hospital Management')).toBeTruthy();
    expect(getByText('Prepared By: Group 6')).toBeTruthy();
    expect(getByText('Ashna Paul (301479554)')).toBeTruthy();
    expect(getByText('Aarya Savaliya (301473601)')).toBeTruthy();
    expect(getByText('Course: MAPD712')).toBeTruthy();
    expect(getByText('Get Started')).toBeTruthy();
  });

  it('navigates to Main screen when Get Started is pressed', () => {
    const { getByText } = render(<WelcomeScreen navigation={mockNavigation} />);

    // Simulate button press
    fireEvent.press(getByText('Get Started'));

    // Check if navigation.navigate was called with 'Main'
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Main');
  });
});