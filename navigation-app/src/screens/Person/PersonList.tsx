// screens/person/PersonList.tsx
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAllEntity } from "../../api/apiForm";
import { IPerson } from "../../api/types/IPerson";
import { PersonTasckParamsList } from "../../navigations/types";

type PersonScreenNavigationProp = NativeStackNavigationProp<PersonTasckParamsList, "PersonList">;

const PersonList = () => {
  const navigation = useNavigation<PersonScreenNavigationProp>();
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPersons = useCallback(async () => {
    try {
      const data = await getAllEntity<IPerson>("Person");
      setPersons(Array.isArray(data) ? data : []); // Si quieres ocultar eliminados: .filter(p => !p.isdeleted)
    } catch (error) {
      console.error("Error al traer las personas", error);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    try { setRefreshing(true); await fetchPersons(); }
    finally { setRefreshing(false); }
  }, [fetchPersons]);

  useFocusEffect(
    useCallback(() => {
      fetchPersons(); // se recarga al volver de Delete
    }, [fetchPersons])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("PersonRegister")}>
        <Text style={styles.addButtonText}>➕ Agregar Persona</Text>
      </TouchableOpacity>

      <ScrollView style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4caf50"]}
            tintColor="#4caf50"
          />
        }>
        {persons.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No hay personas aún.</Text>
          </View>
        ) : (
          persons.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.description}>Teléfono: {item.phonenumber}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => navigation.navigate("PersonUpdate", { id: item.id.toString() })}
                >
                  <Text style={styles.buttonText}>✏️ Actualizar</Text>
                </TouchableOpacity>

                {/* Opción B: navegar a la pantalla de Delete (confirmación y borrado allá) */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => navigation.navigate("PersonDelete", { id: item.id.toString() })}
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
  title: { fontSize: 18, fontWeight: "bold", color: "#3f51b5", marginBottom: 6 },
  description: { fontSize: 14, color: "#555", marginBottom: 10 },
  ok: { backgroundColor: "#d0f0d0", color: "green" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  updateButton: {
    backgroundColor: "#2196f3", paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 6, flex: 1, marginRight: 8, alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#f44336", paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 6, flex: 1, alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: {
    backgroundColor: "#fff", padding: 16, borderRadius: 12, alignItems: "center",
  },
  emptyText: { color: "#666" },
});

export default PersonList;
