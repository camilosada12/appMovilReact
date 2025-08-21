import React from "react";
import { ScrollView, StyleSheet, Text, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";


import { IRol } from "../api/types/IRol";
import { IForm } from "../api/types/IForm";
import { IPermission } from "../api/types/IPermission";
import { IRolFormPermission } from "../api/types/RolFormPermission";

interface Props {
  rolFormPermission: IRolFormPermission;
  roles: IRol[];
  forms: IForm[];
  permissions: IPermission[];
  handleChange: <K extends keyof IRolFormPermission>(
    field: K,
    value: IRolFormPermission[K]
  ) => void;
}

const RolFormPermissionScreen: React.FC<Props> = ({
  rolFormPermission,
  roles,
  forms,
  permissions,
  handleChange,
}) => {
  const selectedRoleName =
    roles.find(r => r.id === rolFormPermission.rolId)?.name ?? "";

  const selectedFormName =
    forms.find(f => f.id === rolFormPermission.formId)?.name ?? "";

  const selectedPermName =
    permissions.find(p => p.id === rolFormPermission.permissionid)?.name ?? "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vincular Rol + Form + Permiso</Text>

      {/* Rol */}
      <View style={styles.field}>
        <Text style={styles.label}>Rol</Text>
        <Picker
          selectedValue={rolFormPermission.rolId ?? 0}
          onValueChange={(val) => handleChange("rolId", Number(val))}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Rol" value={0} />
          {roles.map(r => (
            <Picker.Item key={r.id} label={r.name} value={r.id} />
          ))}
        </Picker>
        {!!selectedRoleName && (
          <Text style={styles.helper}>Seleccionado: {selectedRoleName}</Text>
        )}
      </View>

      {/* Form */}
      <View style={styles.field}>
        <Text style={styles.label}>Formulario</Text>
        <Picker
          selectedValue={rolFormPermission.formId ?? 0}
          onValueChange={(val) => handleChange("formId", Number(val))}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Form" value={0} />
          {forms.map(f => (
            <Picker.Item key={f.id} label={f.name} value={f.id} />
          ))}
        </Picker>
        {!!selectedFormName && (
          <Text style={styles.helper}>Seleccionado: {selectedFormName}</Text>
        )}
      </View>

      {/* Permission */}
      <View style={styles.field}>
        <Text style={styles.label}>Permiso</Text>
        <Picker
          selectedValue={rolFormPermission.permissionid ?? 0}
          onValueChange={(val) => handleChange("permissionid", Number(val))}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un Permiso" value={0} />
          {permissions.map(p => (
            <Picker.Item key={p.id} label={p.name} value={p.id} />
          ))}
        </Picker>
        {!!selectedPermName && (
          <Text style={styles.helper}>Seleccionado: {selectedPermName}</Text>
        )}
      </View>

      {/* Resumen */}
      {selectedRoleName && selectedFormName && selectedPermName ? (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Relación: {selectedRoleName} → {selectedFormName} → {selectedPermName}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#333" },
  field: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 6 },
  picker: { backgroundColor: "#fff" },
  helper: { marginTop: 8, color: "#666", fontSize: 12 },
  summary: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  summaryText: { fontSize: 14, color: "#333" },
});

export default RolFormPermissionScreen;
