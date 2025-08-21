import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { IPerson } from "../api/types/IPerson";

interface Props {
  Person: IPerson;
  handleChange: (field: keyof IPerson, value: string | boolean | number) => void;
}

const PersonScreen: React.FC<Props> = ({ Person, handleChange }) => {
  const fullName =
    [Person.firstName?.trim(), Person.lastName?.trim()].filter(Boolean).join(" ") || "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Datos de la persona</Text>

      {/* FirstName */}
      <View style={styles.field}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el nombre"
          value={Person.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          autoCapitalize="words"
          returnKeyType="next"
        />
        {!!Person.firstName?.trim() && (
          <Text style={styles.helper}>Ingresado: {Person.firstName.trim()}</Text>
        )}
      </View>

      {/* LastName */}
      <View style={styles.field}>
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el apellido"
          value={Person.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          autoCapitalize="words"
          returnKeyType="next"
        />
        {!!Person.lastName?.trim() && (
          <Text style={styles.helper}>Ingresado: {Person.lastName.trim()}</Text>
        )}
      </View>

      {/* Phone */}
      <View style={styles.field}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Solo números"
          value={Person.phonenumber}
          onChangeText={(text) => {
            const onlyNums = text.replace(/[^0-9]/g, "");
            handleChange("phonenumber", onlyNums);
          }}
          keyboardType="numeric"
          maxLength={15}
          returnKeyType="done"
        />
        {!!Person.phonenumber && (
          <Text style={styles.helper}>
            {Person.phonenumber.length}/15 dígitos
          </Text>
        )}
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#333" },
  field: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  label: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  helper: { marginTop: 8, color: "#666", fontSize: 12 },
  summary: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  summaryText: { fontSize: 14, color: "#333" },
});

export default PersonScreen;
