import React from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { IPerson } from "../api/types/IPerson";

interface Props {
    Person: IPerson;
    handleChange: (field: keyof IPerson, value: string | boolean | number) => void;
}

const PersonScreen: React.FC<Props> = ({ Person, handleChange }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="FirstName"
                value={Person.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="LastName"
                value={Person.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="phonenumber"
                value={Person.phonenumber}
                onChangeText={(text) => {
                    const onlyNums = text.replace(/[^0-9]/g, "");
                    handleChange("phonenumber", onlyNums);
                }}
                keyboardType="numeric"
            />

            <Text>Active</Text>
            <Switch
                value={Person.active}
                onValueChange={(value) => handleChange("active", value)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
});

export default PersonScreen;
