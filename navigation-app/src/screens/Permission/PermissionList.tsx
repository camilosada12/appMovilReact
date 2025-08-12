// screens/permission/PermissionList.tsx
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PermissionTasckParamsList } from "../../navigations/types";
import { getAllEntity } from "../../api/apiForm";
import { IPermission } from "../../api/types/IPermission";

type Nav = NativeStackNavigationProp<PermissionTasckParamsList, "PermissionList">;

const PermissionList = () => {
  const navigation = useNavigation<Nav>();
  const [permissions, setPermissions] = useState<IPermission[]>([]);

  const fetchPermissions = useCallback(async () => {
    try {
      const data = await getAllEntity<IPermission>("Permission");
      setPermissions(Array.isArray(data) ? data : []); // Si quieres ocultar eliminados: .filter(p => !p.isdeleted)
    } catch (error) {
      console.error("Error al traer los permisos", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPermissions(); // se recarga al volver de Delete
    }, [fetchPermissions])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("PermissionRegister")}
      >
        <Text style={styles.addButtonText}>➕ Agregar permiso</Text>
      </TouchableOpacity>

      <ScrollView style={styles.listContainer}>
        {permissions.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No hay permisos aún.</Text>
          </View>
        ) : (
          permissions.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.statusContainer}>
                <Text style={[styles.status, item.active ? styles.active : styles.inactive]}>
                  {item.active ? "Activo" : "Inactivo"}
                </Text>
                <Text style={[styles.status, item.isdeleted ? styles.deleted : styles.ok]}>
                  {item.isdeleted ? "Eliminado" : "Correcto"}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => navigation.navigate("PermissionUpdate", { id: item.id.toString() })}
                >
                  <Text style={styles.buttonText}>✏️ Actualizar</Text>
                </TouchableOpacity>

                {/* Opción B: navegar a la pantalla de Delete (confirmación y borrado allá) */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => navigation.navigate("PermissionDelete", { id: item.id.toString() })}
                >
                  <Text style={styles.buttonText}>🗑️ Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#e8eaf6" },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  listContainer: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#3f51b5", marginBottom: 6 },
  description: { fontSize: 14, color: "#555", marginBottom: 10 },
  statusContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  status: {
    fontSize: 12, fontWeight: "bold", paddingVertical: 4,
    paddingHorizontal: 8, borderRadius: 4, overflow: "hidden",
  },
  active: { backgroundColor: "#d0f0d0", color: "green" },
  inactive: { backgroundColor: "#f8d7da", color: "red" },
  deleted: { backgroundColor: "#f8d7da", color: "red" },
  ok: { backgroundColor: "#d0f0d0", color: "green" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  updateButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyText: { color: "#666" },
});

export default PermissionList;
