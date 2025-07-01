import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ModuleTasckParamsList } from "../../navigations/types";
import { deleteEntity, getByIdEntity } from "../../api/apiForm";
import { IModule } from "../../api/types/IModule";

type DetailsRouteProp = RouteProp<ModuleTasckParamsList, "ModuleDelete">;
type NavigationProp = NativeStackNavigationProp<ModuleTasckParamsList>;

export default function ModuleDeleteScreen() {
  const [Module, setModule] = useState<IModule | null>(null);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IModule>(Number(id), "Module");
        setModule(response);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener el Modulo.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar este Modulo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEntity(Number(id), "Module", "Logical");
              Alert.alert("Éxito", "Modulo eliminado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar el Modulo.");
            }
          },
        },
      ]
    );
  };

  if (!Module) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar este Modulo?</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{Module.name}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.value}>{Module.description}</Text>

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
