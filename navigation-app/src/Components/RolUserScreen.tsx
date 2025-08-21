import React from "react";
import { ScrollView, StyleSheet, Text, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IRol } from "../api/types/IRol";
import { IUser } from "../api/types/IUser";
import { IRolUser } from "../api/types/iRolUser";

interface Props {
  rolUser: IRolUser;
  roles: IRol[];   // { id, name, ... }
  users: IUser[];  // { id, userName, ... }
  handleChange: <K extends keyof IRolUser>(field: K, value: IRolUser[K]) => void;
}

const RolUserScreen: React.FC<Props> = ({ rolUser, roles, users, handleChange }) => {
  const selectedRoleName =
    roles.find(r => r.id === rolUser.rolId)?.name ?? "";

  const selectedUserName =
    users.find(u => u.id === rolUser.userId)?.userName ?? "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vincular Rol con Usuario</Text>

      {/* Usuario */}
      <View style={styles.field}>
        <Text style={styles.label}>Usuario</Text>
        <Picker
          selectedValue={rolUser.userId ?? 0}
          onValueChange={(val) => handleChange("userId", Number(val))}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un usuario" value={0} />
          {users.map(u => (
            <Picker.Item key={u.id} label={u.userName} value={u.id} />
          ))}
        </Picker>
        {!!selectedUserName && (
          <Text style={styles.helper}>Seleccionado: {selectedUserName}</Text>
        )}
      </View>

      {/* Rol */}
      <View style={styles.field}>
        <Text style={styles.label}>Rol</Text>
        <Picker
          selectedValue={rolUser.rolId ?? 0}
          onValueChange={(val) => handleChange("rolId", Number(val))}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un rol" value={0} />
          {roles.map(r => (
            <Picker.Item key={r.id} label={r.name} value={r.id} />
          ))}
        </Picker>
        {!!selectedRoleName && (
          <Text style={styles.helper}>Seleccionado: {selectedRoleName}</Text>
        )}
      </View>

      {/* Resumen */}
      {(selectedUserName && selectedRoleName) ? (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Relación: {selectedUserName} ↔ {selectedRoleName}
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
    justifyContent: "space-between"
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

export default RolUserScreen;
