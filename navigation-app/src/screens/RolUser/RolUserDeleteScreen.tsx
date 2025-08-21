// screens/rol-user/RolUserDeleteScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { deleteEntity, getAllEntity, getByIdEntity } from "../../api/apiForm";
import { IRol } from "../../api/types/IRol";
import { IUser } from "../../api/types/IUser";
import { RolUserTackParamsList } from "../../navigations/types";
import { IRolUser } from "../../api/types/iRolUser";

type DetailsRouteProp = RouteProp<RolUserTackParamsList, "RolUserDelete">;
type NavigationProp = NativeStackNavigationProp<RolUserTackParamsList>;

export default function RolUserDeleteScreen() {
  const [data, setData] = useState<IRolUser | null>(null);
  const [roles, setRoles] = useState<IRol[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const [rolesData, usersData] = await Promise.all([
          getAllEntity<IRol>("Rol"),
          getAllEntity<IUser>("User"),
        ]);
        setRoles(rolesData);
        setUsers(usersData);

        const response = await getByIdEntity<IRolUser>(Number(id), "RolUser");
        setData(response);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener la relación Rol–Usuario.");
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar esta relación Rol–Usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // Borrado lógico
              await deleteEntity(Number(id), "RolUser", "Logical");
              Alert.alert("Éxito", "Relación eliminada correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar la relación.");
            }
          },
        },
      ]
    );
  };

  if (!data) return null;

  const roleName = roles.find(r => r.id === data.rolId)?.name ?? `Rol ID: ${data.rolId}`;
  const userName = users.find(u => u.id === data.userId)?.userName ?? `User ID: ${data.userId}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar esta relación?</Text>

      <Text style={styles.label}>Rol:</Text>
      <Text style={styles.value}>{roleName}</Text>

      <Text style={styles.label}>Usuario:</Text>
      <Text style={styles.value}>{userName}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, marginBottom: 16, fontWeight: "bold" },
  label: { fontWeight: "bold", marginTop: 8 },
  value: { marginBottom: 8 },
  deleteButton: {
    backgroundColor: "#e53935",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
