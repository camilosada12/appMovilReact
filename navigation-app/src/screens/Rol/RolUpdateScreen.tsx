import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RolTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { IRol } from "../../api/types/IRol";
import RolScreen from "../../Components/RolScreen";

type DetailsRouteProp = RouteProp<RolTasckParamsList, "RolUpdate">;
type NavigationProp = NativeStackNavigationProp<RolTasckParamsList>;

const MIN_LETTERS = 10;
// Cuenta solo letras (incluye acentos y ñ/Ñ)
const countLetters = (s: string) =>
  ((s ?? "").match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g) || []).length;

export default function RolUpdateScreen() {
  const [Roles, setRoles] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;
  const [originalRol, setOriginalRol] = useState<IRol | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IRol>(Number(id), "Rol");
        setRoles(response);
        setOriginalRol(response);
      } catch {
        Alert.alert("Error", "No se pudo obtener el rol.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (name: keyof IRol, value: string | boolean) => {
    setRoles(prev => ({ ...prev, [name]: value } as IRol));
  };

  const requestUpdateRol = async () => {
    if (!originalRol) return;

    const newName = (Roles.name ?? "").trim();
    const newDesc = (Roles.description ?? "").trim();
    const oldName = (originalRol.name ?? "").trim();
    const oldDesc = (originalRol.description ?? "").trim();

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

    // ¿Cambios reales?
    const hasChanges =
      newName !== oldName ||
      newDesc !== oldDesc ||
      Roles.active !== originalRol.active;

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
      return;
    }

    const payload: IRol = { ...Roles, name: newName, description: newDesc };

    try {
      await updateEntity<IRol>(payload, "Rol");
      Alert.alert("Éxito", "Rol actualizado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "Hubo un problema al actualizar el Rol.");
    }
  };

  return (
    <View style={styles.container}>
      <RolScreen Rol={Roles} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={requestUpdateRol}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  button: { backgroundColor: "#4a90e2", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 16 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
