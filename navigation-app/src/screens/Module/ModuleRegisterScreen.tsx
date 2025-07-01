import React, { useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { createEntity } from "../../api/apiForm";
import { IModule } from "../../api/types/IModule";
import ModuleScreen from "../../Components/ModuleScreen";
import { ModuleTasckParamsList } from "../../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const ModuleRegisterScreen = () => {
  const [Module, setModule] = useState<IModule>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const navigation = useNavigation<NativeStackNavigationProp<ModuleTasckParamsList>>()

  const handleChange = (name: keyof IModule, value: string | boolean) => {
    setModule({ ...Module, [name]: value });
  };

  const registerModule = async () => {
    if (Module.name.trim() === "" || Module.description.trim() === "") {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    try {
      console.log("Enviando Modulo...", Module);
      await createEntity(Module, "Module");
      console.log("modulo creado");
      Alert.alert("Éxito", "modulo registrado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() }, // Vuelve a la lista
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", `No se pudo registrar el Modulo. ${error}`);
    }
  };


  return (
    <View style={styles.container}>
      <ModuleScreen Module={Module} handleChange={handleChange} />

      <TouchableOpacity style={styles.button} onPress={registerModule}>
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

export default ModuleRegisterScreen;
