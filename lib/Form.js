// Form.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import FormViewModel from './FormViewModel';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    has_car: false,
    address: '',
    value: ''
  });

  const [formElements, setFormElements] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Male');


  useEffect(() => {
    // Fetch form elements when the component mounts
    FormViewModel.getFormElements()
      .then(data => setFormElements(data.form))
      .catch(error => console.error('Error fetching form elements:', error));

    // Check if there is stored form data and set it to the state
    FormViewModel.getStoredFormData()
      .then(storedData => {
        if (storedData) {
          setFormData(storedData);
          setSelectedValue(storedData.gender || 'Male');
        }
      })
      .catch(error => console.error('Error getting stored form data:', error));
  }, []);


  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Handle form submission
      await FormViewModel.submitForm(formData);
      console.log('Form submitted successfully');

      // You can add any additional logic after successful form submission if needed

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <View style={styles.container}>
      {formElements.map((formElement, index) => (
        <View key={index} style={styles.formElement}>
          <Text style={styles.label}>{formElement.label}</Text>
          {formElement.type === 'text' && (
            <TextInput
              style={styles.input}
              value={formData[formElement.name]}
              onChangeText={(text) => handleInputChange(formElement.name, text)}
            />
          )}
          {formElement.type === 'select' && (
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value='Male'
                  status={selectedValue === 'Male' ?
                    'checked' : 'unchecked'}
                  onPress={() => {
                    setSelectedValue('Male');
                    handleInputChange(formElement.name, 'Male');
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>
                  {formElement.values.at(0)}
                </Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Female"
                  status={selectedValue === 'Female' ?
                    'checked' : 'unchecked'}
                  onPress={() => {
                    setSelectedValue('Female');
                    handleInputChange(formElement.name, 'Female');
                  }}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>
                  {formElement.values.at(1)}
                </Text>
              </View>
            </View>
          )}
          {formElement.type === 'checkbox' && (
            <View style={styles.checkboxContainer}>
              <CheckBox
                boxType='square'
                animationDuration={0.1}
                value={formData[formElement.name]}
                onValueChange={(checked) => handleInputChange(formElement.name, checked)}
              />
              <Text style={styles.checkboxLabel}>{formElement.checkboxLabel}</Text>
            </View>
          )}
          {formElement.type === 'textarea' && (
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              value={formData[formElement.name]}
              onChangeText={(text) => handleInputChange(formElement.name, text)}
            />
          )}
        </View>
      ))}

      {/* Button for form submission */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formElement: {
    marginBottom: 32,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', // for Android
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 0,
    borderRadius: 8,
    padding: 5,
    elevation: 4,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default Form;

