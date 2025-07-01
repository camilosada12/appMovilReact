import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { IForm } from "../../api/types/IForm";
import FormularioScreen from "../../Components/FormularioScreen";
import { createEntity } from "../../api/apiForm";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormtackParamsList } from "../../navigations/types";

const FormRegisterScreen = () => {
  const [form, setForm] = useState<IForm>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const navigation = useNavigation<NativeStackNavigationProp<FormtackParamsList>>();

  const handleChange = (name: keyof IForm, value: string | boolean) => {
    setForm({ ...form, [name]: value });
  };

  const registerForm = async () => {
    if (form.name.trim() === "" || form.description.trim() === "") {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    try {
      console.log("Enviando formulario...", form);
      await createEntity(form, "FormControllerPrueba");
      Alert.alert("Éxito", "Formulario registrado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() }, // Vuelve a la lista
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", `No se pudo registrar el formulario. ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <FormularioScreen form={form} handleChange={handleChange} />

      <TouchableOpacity style={styles.button} onPress={registerForm}>
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

export default FormRegisterScreen;
