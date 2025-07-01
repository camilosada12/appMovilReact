import React, { useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { createEntity } from "../../api/apiForm";
import { PermissionTasckParamsList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { IPermission } from "../../api/types/IPermission";
import PermissionScreen from "../../Components/PermissionScreen";

const PermissionRegisterScreen = () => {
  const [Permission, setPermission] = useState<IPermission>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const navigation = useNavigation<NativeStackNavigationProp<PermissionTasckParamsList>>()

  const handleChange = (name: keyof IPermission, value: string | boolean) => {
    setPermission({ ...Permission, [name]: value });
  };

  const registerPermission = async () => {
    if (Permission.name.trim() === "" || Permission.description.trim() === "") {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    try {
      console.log("Enviando permiso...", Permission);
      await createEntity(Permission, "Permission");
      console.log("permiso creado");
      Alert.alert("Éxito", "Permiso registrado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() }, // Vuelve a la lista
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", `No se pudo registrar el permiso. ${error}`);
    }
  };


  return (
    <View style={styles.container}>
      <PermissionScreen Permission={Permission} handleChange={handleChange} />

      <TouchableOpacity style={styles.button} onPress={registerPermission}>
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

export default PermissionRegisterScreen;
