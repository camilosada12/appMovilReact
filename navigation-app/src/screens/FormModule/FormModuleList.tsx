// screens/form-module/FormModuleList.tsx
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormModuleTackParamsList } from "../../navigations/types";
import { getAllEntity } from "../../api/apiForm";
import { IFormModuleDynamic } from "../../api/types/TypeDynamic/IFormModuleDynamic";

type Nav = NativeStackNavigationProp<FormModuleTackParamsList, "FormModuleList">;

const FormModuleList: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [rows, setRows] = useState<IFormModuleDynamic[]>([]);

  const fetchRows = useCallback(async () => {
    try {
      // /dynamic devuelve { id, FormName?, ModuleName? }
      const data = await getAllEntity<IFormModuleDynamic>("FormModule/dynamic");
setRows(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Error al listar FormModule/dynamic", err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRows();
    }, [fetchRows])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("FormModuleRegister")}
      >
        <Text style={styles.addButtonText}>➕ Vincular Form–Module</Text>
      </TouchableOpacity>

      <ScrollView style={styles.listContainer}>
        {rows.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No hay relaciones aún.</Text>
          </View>
        ) : (
          rows.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>
                {item.FormName ?? "Form (sin nombre)"} → {item.ModuleName ?? "Module (sin nombre)"}
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => navigation.navigate("FormModuleUpdate", { id: String(item.id) })}
                >
                  <Text style={styles.buttonText}>✏️ Actualizar</Text>
                </TouchableOpacity>

                {/* Opción B: NO borrar aquí. Navegamos a la pantalla de Delete */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => navigation.navigate("FormModuleDelete", { id: String(item.id) })}
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

export default FormModuleList;
