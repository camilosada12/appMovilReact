import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormtackParamsList } from "../../navigations/types";
import { IForm } from "../../api/types/IForm";
import { deleteEntity, getByIdEntity } from "../../api/apiForm";

type DetailsRouteProp = RouteProp<FormtackParamsList, "FormDelete">;
type NavigationProp = NativeStackNavigationProp<FormtackParamsList>;

export default function FormDeleteScreen() {
  const [form, setForm] = useState<IForm | null>(null);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IForm>(Number(id), "FormControllerPrueba");
        setForm(response);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener el formulario.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar este formulario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEntity(Number(id), "FormControllerPrueba", "Logical");
              Alert.alert("Éxito", "Formulario eliminado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar el formulario.");
            }
          },
        },
      ]
    );
  };

  if (!form) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar este formulario?</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{form.name}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.value}>{form.description}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
