import AsyncStorage from '@react-native-async-storage/async-storage';

class FormViewModel {
    static async getFormElements() {
        try {
            const response = await fetch('http://localhost:3000/form-elements');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching form elements:', error);
            throw error;
        }
    }

    static async submitForm(formData) {
        try {
            // Store form data in AsyncStorage
            await AsyncStorage.setItem('formData', JSON.stringify(formData));

            // Call the POST API with the form data (use a mock API for now)
            const response = await fetch('http://localhost:3000/form-elements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            return response;
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }

    static async getStoredFormData() {
        try {
            // Retrieve stored form data from AsyncStorage
            const storedData = await AsyncStorage.getItem('formData');
            return storedData ? JSON.parse(storedData) : null;
        } catch (error) {
            console.error('Error getting stored form data:', error);
            throw error;
        }
    }
}

export default FormViewModel;
