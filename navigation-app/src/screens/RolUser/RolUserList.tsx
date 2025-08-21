// screens/rol-user/RolUserList.tsx
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getAllEntity } from "../../api/apiForm";
import { RolUserTackParamsList } from "../../navigations/types";
import { IRolUserDynamic } from "../../api/types/TypeDynamic/IRolUserDynamic";

type Nav = NativeStackNavigationProp<RolUserTackParamsList, "RolUserList">;

const RolUserList: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [rows, setRows] = useState<IRolUserDynamic[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRows = useCallback(async () => {
    const data = await getAllEntity<IRolUserDynamic>("RolUser/dynamic");
    setRows(Array.isArray(data) ? data : []);
  }, []);

  const onRefresh = useCallback(async () => {
    try { setRefreshing(true); await fetchRows(); }
    finally { setRefreshing(false); }
  }, [fetchRows]);

  useFocusEffect(useCallback(() => { onRefresh(); }, [onRefresh]));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RolUserRegister")}
      >
        <Text style={styles.addButtonText}>➕ Vincular Rol–Usuario</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4caf50"]}
            tintColor="#4caf50"
          />
        }
      >
        {rows.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No hay relaciones aún.</Text>
          </View>
        ) : (
          rows.map((item) => (
            <View key={String(item.id)} style={styles.card}>
              <Text style={styles.title}>
                {item.RolName ?? "Rol (sin nombre)"} → {item.UserUsername ?? "Usuario (sin nombre)"}
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => navigation.navigate("RolUserUpdate", { id: String(item.id) })}
                >
                  <Text style={styles.buttonText}>✏️ Actualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => navigation.navigate("RolUserDelete", { id: String(item.id) })}
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
  title: { fontSize: 16, fontWeight: "bold", color: "#3f51b5", marginBottom: 8 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  updateButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 6,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 6,
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

export default RolUserList;
