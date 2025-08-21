import React, { useState } from "react";
import { View, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createEntity } from "../../api/apiForm";
import { IPerson } from "../../api/types/IPerson";
import PersonScreen from "../../Components/PersonScreen";
import { useNavigation } from "@react-navigation/native";
import { PersonTasckParamsList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const normalizePhone = (s: string) => (s ?? "").replace(/\D/g, "");
const isValidPhone = (digits: string) => digits.length === 10;

const PersonRegisterScreen = () => {
  const [Person, setPerson] = useState<IPerson>({
    id: 0,
    firstName: "",
    lastName: "",
    phonenumber: "",
    active: false,
    isdeleted: false,
  });

  const navigation = useNavigation<NativeStackNavigationProp<PersonTasckParamsList>>();

  const handleChange = (name: keyof IPerson, value: string | boolean | number) => {
    setPerson({ ...Person, [name]: value });
  };

  const registerPerson = async () => {
    const first = (Person.firstName ?? "").trim();
    const last  = (Person.lastName ?? "").trim();
    const phoneDigits = normalizePhone(Person.phonenumber ?? "");

    if (!first || !last || !phoneDigits) {
      Alert.alert("Error", "Por favor complete todos los campos (incluido el teléfono).");
      return;
    }

    if (!isValidPhone(phoneDigits)) {
      Alert.alert("Validación", "El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    try {
      const payload: IPerson = {
        ...Person,
        firstName: first,
        lastName: last,
        phonenumber: phoneDigits, // ← normalizado
      };

      await createEntity(payload, "Person");
      Alert.alert("Éxito", "Persona registrada correctamente", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", `No se pudo registrar la Persona.`);
    }
  };

  return (
    <View style={styles.container}>
      <PersonScreen Person={Person} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={registerPerson}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  button: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default PersonRegisterScreen;
