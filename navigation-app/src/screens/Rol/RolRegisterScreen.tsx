import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { createEntity } from "../../api/apiForm";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RolTasckParamsList } from "../../navigations/types";
import { IRol } from "../../api/types/IRol";
import RolScreen from "../../Components/RolScreen";

const RolRegisterScreen = () => {
  const [Roles, setRol] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const navigation = useNavigation<NativeStackNavigationProp<RolTasckParamsList>>();

  const handleChange = (name: keyof IRol, value: string | boolean) => {
    setRol({ ...Roles, [name]: value });
  };

  const registerRol = async () => {
    if (Roles.name.trim() === "" || Roles.description.trim() === "") {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    try {
      console.log("Enviando Rol...", Roles);
      await createEntity(Roles, "Rol");
      Alert.alert("Éxito", "Rol registrado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() }, // Vuelve a la lista
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", `No se pudo registrar el Rol. ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <RolScreen Rol={Roles} handleChange={handleChange} />

      <TouchableOpacity style={styles.button} onPress={registerRol}>
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

export default RolRegisterScreen;
