import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RolTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IRol } from "../../api/types/IRol";
import RolScreen from "../../Components/RolScreen";

type DetailsRouteProp = RouteProp<RolTasckParamsList, "RolUpdate">;
type NavigationProp = NativeStackNavigationProp<RolTasckParamsList>;

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
      setOriginalRol(response);  // Guardas copia original
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener el rol.");
    }
  };

  fetchData();
}, []);

  const handleChange = (name: string, value: string | boolean) => {
    setRoles({ ...Roles, [name]: value });
  };

  const requestUpdateRol = async () => {
  if (!originalRol) return;

  const hasChanges =
    Roles.name.trim() !== originalRol.name.trim() ||
    Roles.description.trim() !== originalRol.description.trim() ||
    Roles.active !== originalRol.active;

  if (!hasChanges) {
    Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
    return;
  }

  try {
    await updateEntity<IRol>(Roles, "Rol");
    Alert.alert("Éxito", "Rol actualizado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  } catch (error) {
    console.error("Error completo:", error);
    Alert.alert("Error", "Hubo un problema al actualizar el Rol.");
  }
};


  return (
    <View style={styles.container}>
      <RolScreen Rol={Roles} handleChange={handleChange}/>

      <TouchableOpacity style={styles.button} onPress={requestUpdateRol}>
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