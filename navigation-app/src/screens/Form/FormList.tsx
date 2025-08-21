// screens/form/FormList.tsx
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormtackParamsList } from "../../navigations/types";
import { IForm } from "../../api/types/IForm";
import { getAllEntity } from "../../api/apiForm";

type FormScreenNavigationProp = NativeStackNavigationProp<FormtackParamsList, "FormList">;

const FormList = () => {
  const navigation = useNavigation<FormScreenNavigationProp>();
  const [forms, setForms] = useState<IForm[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchForms = useCallback(async () => {
    try {
      const data = await getAllEntity<IForm>("FormControllerPrueba");
      setForms(data); // Si quieres ocultar eliminados: .filter(f => !f.isdeleted)
    } catch (error) {
      console.error("Error al traer los formularios", error);
    }
  }, []);

  const onRefresh = useCallback(async () => {
      try { setRefreshing(true); await fetchForms(); }
      finally { setRefreshing(false); }
    }, [fetchForms]);

  useFocusEffect(
    useCallback(() => {
      fetchForms();
    }, [fetchForms])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("FormRegister")}>
        <Text style={styles.addButtonText}>➕ Agregar Formulario</Text>
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
        {forms.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>


            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => navigation.navigate("FormUpdate", { id: item.id.toString() })}
              >
                <Text style={styles.buttonText}>✏️ Actualizar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => navigation.navigate("FormDelete", { id: item.id.toString() })}
              >
                <Text style={styles.buttonText}>🗑️ Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
});

export default FormList;
