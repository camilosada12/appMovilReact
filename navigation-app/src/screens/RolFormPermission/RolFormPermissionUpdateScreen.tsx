import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getAllEntity, getByIdEntity, updateEntity } from "../../api/apiForm";

import { IRol } from "../../api/types/IRol";
import { IForm } from "../../api/types/IForm";
import { IPermission } from "../../api/types/IPermission";
import { RolFormPermissionTackParamsList } from "../../navigations/types";
import { IRolFormPermission } from "../../api/types/RolFormPermission";
import RolFormPermissionScreen from "../../Components/RolFormPermission";

type DetailsRouteProp = RouteProp<RolFormPermissionTackParamsList, "RolFormPermissionUpdate">;
type Nav = NativeStackNavigationProp<RolFormPermissionTackParamsList>;

const RolFormPermissionUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<Nav>();
  const { id } = route.params; // string (GUID u otro)

  const [row, setRow] = useState<IRolFormPermission>({
    id: id,
    rolId: 0,
    formId: 0,
    permissionid: 0,
    active: true,
    isdeleted: false,
  });
  const [original, setOriginal] = useState<IRolFormPermission | null>(null);

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

        // getByIdEntity está tipado para number; como tu id es string, castea a any
        const detail = await getByIdEntity<IRolFormPermission>(id as any, "RolFormPermission");
        setRow(detail);
        setOriginal(detail);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar la información para editar.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const hasChanges = useMemo(() => {
    if (!original) return false;
    return (
      row.rolId !== original.rolId ||
      row.formId !== original.formId ||
      row.permissionid !== original.permissionid ||
      !!row.active !== !!original.active
    );
  }, [row, original]);

  const handleSave = async () => {
    if (!original) return;

    if (!row.rolId)        return Alert.alert("Validación", "Selecciona un Rol.");
    if (!row.formId)       return Alert.alert("Validación", "Selecciona un Form.");
    if (!row.permissionid) return Alert.alert("Validación", "Selecciona un Permiso.");

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Realiza al menos un cambio antes de guardar.");
      return;
    }

    try {
      const payload: IRolFormPermission = {
        id: row.id,
        rolId: row.rolId,
        formId: row.formId,
        permissionid: row.permissionid,
        active: !!row.active,
        isdeleted: !!row.isdeleted,
      };
      await updateEntity<IRolFormPermission>(payload, "RolFormPermission");
      Alert.alert("Éxito", "Relación actualizada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "No se pudo actualizar la relación.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Cargando…</Text>
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
        <Text style={styles.buttonText}>Guardar cambios</Text>
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

export default RolFormPermissionUpdateScreen;
