import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { PermissionTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IPermission } from "../../api/types/IPermission";
import PermissionScreen from "../../Components/PermissionScreen";

type DetailsRouteProp = RouteProp<PermissionTasckParamsList, "PermissionUpdate">;
type NavigationProp = NativeStackNavigationProp<PermissionTasckParamsList>;

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
      setOriginalPermission(response);  // Guardas copia original
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener el permiso.");
    }
  };

  fetchData();
}, []);

  const handleChange = (name: string, value: string | boolean) => {
    setPermission({ ...Permission, [name]: value });
  };

  const requestUpdatePermission = async () => {
  if (!originalPermission) return;

  const hasChanges =
    Permission.name.trim() !== originalPermission.name.trim() ||
    Permission.description.trim() !== originalPermission.description.trim() ||
    Permission.active !== originalPermission.active;

  if (!hasChanges) {
    Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
    return;
  }

  try {
    await updateEntity<IPermission>(Permission, "Permission");
    Alert.alert("Éxito", "permiso actualizado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  } catch (error) {
    console.error("Error completo:", error);
    Alert.alert("Error", "Hubo un problema al actualizar el permiso.");
  }
};


  return (
    <View style={styles.container}>
      <PermissionScreen Permission={Permission} handleChange={handleChange}/>

      <TouchableOpacity style={styles.button} onPress={requestUpdatePermission}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

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