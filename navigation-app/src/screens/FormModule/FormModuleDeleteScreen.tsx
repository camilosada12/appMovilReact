import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormModuleTackParamsList } from "../../navigations/types";
import { deleteEntity, getByIdEntity } from "../../api/apiForm";
import { IFormModule } from "../../api/types/IFormModule";

type DetailsRouteProp = RouteProp<FormModuleTackParamsList, "FormModuleDelete">;
type NavigationProp = NativeStackNavigationProp<FormModuleTackParamsList>;

export default function FormModuleDeleteScreen() {
  const [formModule, setFormModule] = useState<IFormModule | null>(null);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      try {
        // OJO: sin /dynamic
        const response = await getByIdEntity<IFormModule>(Number(id), "FormModule");
        setFormModule(response);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener la relación Form–Module.");
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar esta relación Form–Module?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // Endpoint correcto y borrado lógico
              await deleteEntity(Number(id), "FormModule", "Logical");
              Alert.alert("Éxito", "Relación eliminada correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar la relación.");
            }
          },
        },
      ]
    );
  };

  if (!formModule) return null;

  const formName = formModule.form?.name ?? `Form ID: ${formModule.formid}`;
  const moduleName = formModule.module?.name ?? `Module ID: ${formModule.moduleid}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar esta relación?</Text>

      <Text style={styles.label}>Formulario:</Text>
      <Text style={styles.value}>{formName}</Text>

      <Text style={styles.label}>Módulo:</Text>
      <Text style={styles.value}>{moduleName}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, marginBottom: 16, fontWeight: "bold" },
  label: { fontWeight: "bold", marginTop: 8 },
  value: { marginBottom: 8 },
  deleteButton: {
    backgroundColor: "#e53935",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
