// screens/user/UserList.tsx
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAllEntity } from "../../api/apiForm";
import { IUser } from "../../api/types/IUser";
import { UserStack } from "../../navigations/types";

type Nav = NativeStackNavigationProp<UserStack, "UserList">;

const UserList: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [rows, setRows] = useState<IUser[]>([]);

  const fetchRows = useCallback(async () => {
    try {
      const data = await getAllEntity<IUser>("User"); // ← devuelve IUser con person anidado
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al listar User", err);
      setRows([]);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchRows(); }, [fetchRows]));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("UserRegister")}
      >
        <Text style={styles.addButtonText}>➕ Agregar Usuario</Text>
      </TouchableOpacity>

      <ScrollView style={styles.listContainer}>
        {rows.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No hay usuarios aún.</Text>
          </View>
        ) : (
          rows.map((u) => {
            const fullName = u.userName ? `${u.userName}`.trim() : "Sin persona";
            // Prioriza correo de usuario; si no, usa correo de la persona (si existe en tu IPerson)
            const emailShown = u.email ? u.email : "Sin correo";

            return (
              <View key={u.id} style={styles.card}>
                {/* En título mostramos Nombre y Apellido */}
                <Text style={styles.title}>{fullName}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => navigation.navigate("UserUpdate", { id: String(u.id) })}
                  >
                    <Text style={styles.buttonText}>✏️ Actualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => navigation.navigate("UserDelete", { id: String(u.id) })}
                  >
                    <Text style={styles.buttonText}>🗑️ Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#e8eaf6" },
  addButton: {
    backgroundColor: "#4caf50", padding: 12, borderRadius: 8,
    alignItems: "center", marginBottom: 16, elevation: 3,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  listContainer: { flex: 1 },
  card: {
    backgroundColor: "#fff", padding: 16, marginBottom: 16, borderRadius: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4, elevation: 4,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#3f51b5", marginBottom: 8 },
  description: { fontSize: 14, color: "#555", marginBottom: 6 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  updateButton: {
    backgroundColor: "#2196f3", paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: 6, flex: 1, marginRight: 6, alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#f44336", paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: 6, flex: 1, marginLeft: 6, alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: { backgroundColor: "#fff", padding: 16, borderRadius: 12, alignItems: "center" },
  emptyText: { color: "#666" },
});

export default UserList;
