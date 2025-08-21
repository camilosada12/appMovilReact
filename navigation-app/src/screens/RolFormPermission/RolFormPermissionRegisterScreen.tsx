import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getAllEntity, createEntity } from "../../api/apiForm";

import { IRol } from "../../api/types/IRol";
import { IForm } from "../../api/types/IForm";
import { IPermission } from "../../api/types/IPermission";

import { RolFormPermissionTackParamsList } from "../../navigations/types";
import { IRolFormPermission } from "../../api/types/RolFormPermission";
import RolFormPermissionScreen from "../../Components/RolFormPermission";

type Nav = NativeStackNavigationProp<RolFormPermissionTackParamsList, "RolFormPermissionRegister">;

const RolFormPermissionRegisterScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [row, setRow] = useState<IRolFormPermission>({
    id: "",
    rolId: 0,
    formId: 0,
    permissionid: 0,
    active: true,
    isdeleted: false,
  });

  const [roles, setRoles] = useState<IRol[]>([]);
  const [forms, setForms] = useState<IForm[]>([]);
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback(<K extends keyof IRolFormPermission>(field: K, value: IRolFormPermission[K]) => {
    setRow(prev => ({ ...prev, [field]: value }));
  }, []);

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
      } catch (err) {
        Alert.alert("Error", "No se pudieron cargar Roles/Forms/Permisos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!row.rolId)       return Alert.alert("Validación", "Selecciona un Rol.");
    if (!row.formId)      return Alert.alert("Validación", "Selecciona un Form.");
    if (!row.permissionid) return Alert.alert("Validación", "Selecciona un Permiso.");

    try {
      const payload = {
        rolId: row.rolId,
        formId: row.formId,
        permissionid: row.permissionid,
        active: !!row.active,
      };
      await createEntity<typeof payload>(payload, "RolFormPermission");
      Alert.alert("Éxito", "Relación creada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "No se pudo crear la relación.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Cargando catálogos…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RolFormPermissionScreen
        rolFormPermission={row}
        roles={roles}
        forms={forms}
        permissions={permissions}
        handleChange={handleChange}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar relación</Text>
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

export default RolFormPermissionRegisterScreen;
