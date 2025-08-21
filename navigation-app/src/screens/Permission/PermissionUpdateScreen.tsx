import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PermissionTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { IPermission } from "../../api/types/IPermission";
import PermissionScreen from "../../Components/PermissionScreen";

type DetailsRouteProp = RouteProp<PermissionTasckParamsList, "PermissionUpdate">;
type NavigationProp = NativeStackNavigationProp<PermissionTasckParamsList>;

const MIN_CHARS = 3;
const MAX_CHARS = 30;
const countLetters = (s: string) => (s ?? "").replace(/\s/g, "").length;

export default function PermissionUpdateScreen() {
  const [Permission, setPermission] = useState<IPermission>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;
  const [originalPermission, setOriginalPermission] = useState<IPermission | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IPermission>(Number(id), "Permission");
        setPermission(response);
        setOriginalPermission(response);
      } catch {
        Alert.alert("Error", "No se pudo obtener el permiso.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (name: keyof IPermission, value: string | boolean) => {
    setPermission(prev => ({ ...prev, [name]: value } as IPermission));
  };

  const requestUpdatePermission = async () => {
    if (!originalPermission) return;

    const newName = (Permission.name ?? "").trim();
    const newDesc = (Permission.description ?? "").trim();
    const oldName = (originalPermission.name ?? "").trim();
    const oldDesc = (originalPermission.description ?? "").trim();

    if (!newName || !newDesc) {
      Alert.alert("Validación", "Nombre y Descripción no pueden quedar vacíos.");
      return;
    }

    const nameLen = countLetters(newName);
    const descLen = countLetters(newDesc);
    if (nameLen < MIN_CHARS || nameLen > MAX_CHARS || descLen < MIN_CHARS || descLen > MAX_CHARS) {
      Alert.alert(
        "Validación",
        `Nombre y Descripción deben tener entre ${MIN_CHARS} y ${MAX_CHARS} letras (sin espacios).\n\n` +
        `• Nombre: ${nameLen}/${MIN_CHARS}-${MAX_CHARS}\n` +
        `• Descripción: ${descLen}/${MIN_CHARS}-${MAX_CHARS}`
      );
      return;
    }

    const hasChanges =
      newName !== oldName ||
      newDesc !== oldDesc ||
      Permission.active !== originalPermission.active;

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
      return;
    }

    const payload: IPermission = { ...Permission, name: newName, description: newDesc };

    try {
      await updateEntity<IPermission>(payload, "Permission");
      Alert.alert("Éxito", "Permiso actualizado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "Hubo un problema al actualizar el permiso.");
    }
  };

  return (
    <View style={styles.container}>
      <PermissionScreen Permission={Permission} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={requestUpdatePermission}>
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
