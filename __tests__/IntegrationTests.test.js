import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddPatientScreen from '../screens/AddPatientScreen';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert'); // Mock the Alert module

describe('AddPatientScreen', () => {
  it('shows an error if required fields are missing', () => {
    const { getByText, getByPlaceholderText } = render(<AddPatientScreen />);

    // Simulate leaving required fields empty and trying to submit
    fireEvent.changeText(getByPlaceholderText("Enter patient's name"), '');
    fireEvent.changeText(getByPlaceholderText("Enter patient's age"), '');
    fireEvent.press(getByText('Add Patient'));

    // Expect an alert to be displayed with the correct error message
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all required fields');
  });
});
