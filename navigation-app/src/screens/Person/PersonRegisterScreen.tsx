import React, { useState } from "react";
import { View, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createEntity } from "../../api/apiForm";
import { IPerson } from "../../api/types/IPerson";
import PersonScreen from "../../Components/PersonScreen";
import { useNavigation } from "@react-navigation/native";
import { PersonTasckParamsList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
    if (
      Person.firstName.trim() === "" ||
      Person.lastName.trim() === "" ||
      Person.phonenumber.trim() === ""
    ) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    try {
      console.log("Enviando Personas registradas...", Person);
      await createEntity(Person, "Person");
      console.log("Persona registrada");
      Alert.alert("Éxito", "Persona registrado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() }, // Vuelve a la lista
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", `No se pudo registrar la Persona. ${error}`);
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PersonRegisterScreen;
