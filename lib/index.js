import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Form from './src/Form';

const Stack = createStackNavigator();

const FormReference = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Form" component={Form}
                    options={{
                        title: 'Form Screen',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});

AppRegistry.registerComponent(
    'FormLibrary',
    () => FormReference,
);