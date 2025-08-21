import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { createEntity } from "../../api/apiForm";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RolTasckParamsList } from "../../navigations/types";
import { IRol } from "../../api/types/IRol";
import RolScreen from "../../Components/RolScreen";

const MIN_LETTERS = 10;
// Cuenta solo letras (incluye acentos y ñ/Ñ)
const countLetters = (s: string) =>
  ((s ?? "").match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g) || []).length;

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
    const newName = (Roles.name ?? "").trim();
    const newDesc = (Roles.description ?? "").trim();

    // No permitir vacíos
    if (!newName || !newDesc) {
      Alert.alert("Validación", "Nombre y Descripción no pueden quedar vacíos.");
      return;
    }

    // Validar mínimo 20 letras (solo letras, ignora espacios/números)
    const nameLetters = countLetters(newName);
    const descLetters = countLetters(newDesc);

    if (nameLetters < MIN_LETTERS || descLetters < MIN_LETTERS) {
      Alert.alert(
        "Validación",
        `Nombre y Descripción deben tener al menos ${MIN_LETTERS} letras (se cuentan solo letras).\n\n` +
        `• Nombre: ${nameLetters}/${MIN_LETTERS}\n` +
        `• Descripción: ${descLetters}/${MIN_LETTERS}`
      );
      return;
    }

    try {
      const payload: IRol = { ...Roles, name: newName, description: newDesc };
      await createEntity(payload, "Rol");
      Alert.alert("Éxito", "Rol registrado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", "No se pudo registrar el Rol.");
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

export default RolRegisterScreen;
