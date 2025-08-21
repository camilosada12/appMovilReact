import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { deleteEntity, getAllEntity, getByIdEntity } from "../../api/apiForm";
import { IRol } from "../../api/types/IRol";
import { IForm } from "../../api/types/IForm";
import { IPermission } from "../../api/types/IPermission";
import { RolFormPermissionTackParamsList } from "../../navigations/types";
import { IRolFormPermission } from "../../api/types/RolFormPermission";

type DetailsRouteProp = RouteProp<RolFormPermissionTackParamsList, "RolFormPermissionDelete">;
type NavigationProp = NativeStackNavigationProp<RolFormPermissionTackParamsList>;

export default function RolFormPermissionDeleteScreen() {
  const [data, setData] = useState<IRolFormPermission | null>(null);
  const [roles, setRoles] = useState<IRol[]>([]);
  const [forms, setForms] = useState<IForm[]>([]);
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params; // string

  useEffect(() => {
    (async () => {
      try {
        const [rolesData, formsData, permsData] = await Promise.all([
          getAllEntity<IRol>("Rol"),
          getAllEntity<IForm>("FormControllerPrueba"),
          getAllEntity<IPermission>("Permission"),
        ]);
        setRoles(rolesData);
        setForms(formsData);
        setPermissions(permsData);

        const response = await getByIdEntity<IRolFormPermission>(id as any, "RolFormPermission");
        setData(response);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener la relación Rol–Form–Permiso.");
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar esta relación Rol–Form–Permiso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEntity(id as any, "RolFormPermission", "Logical"); // id es string
              Alert.alert("Éxito", "Relación eliminada correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch {
              Alert.alert("Error", "Hubo un problema al eliminar la relación.");
            }
          },
        },
      ]
    );
  };

  if (!data) return null;

  const roleName = roles.find(r => r.id === data.rolId)?.name ?? `Rol ID: ${data.rolId}`;
  const formName = forms.find(f => f.id === data.formId)?.name ?? `Form ID: ${data.formId}`;
  const permName = permissions.find(p => p.id === data.permissionid)?.name ?? `Perm ID: ${data.permissionid}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar esta relación?</Text>

      <Text style={styles.label}>Rol:</Text>
      <Text style={styles.value}>{roleName}</Text>

      <Text style={styles.label}>Formulario:</Text>
      <Text style={styles.value}>{formName}</Text>

      <Text style={styles.label}>Permiso:</Text>
      <Text style={styles.value}>{permName}</Text>

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
