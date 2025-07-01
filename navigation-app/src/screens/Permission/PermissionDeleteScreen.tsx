import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PermissionTasckParamsList } from "../../navigations/types";
import { deleteEntity, getByIdEntity } from "../../api/apiForm";
import { IPermission } from "../../api/types/IPermission";

type DetailsRouteProp = RouteProp<PermissionTasckParamsList, "PermissionDelete">;
type NavigationProp = NativeStackNavigationProp<PermissionTasckParamsList>;

export default function PermissionDeleteScreen() {
  const [Permission, setPermission] = useState<IPermission | null>(null);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IPermission>(Number(id), "Permission");
        setPermission(response);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener el permiso.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar este permiso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEntity(Number(id), "Permission", "Logical");
              Alert.alert("Éxito", "permiso eliminado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar el permiso.");
            }
          },
        },
      ]
    );
  };

  if (!Permission) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar este permiso?</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{Permission.name}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.value}>{Permission.description}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
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
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
