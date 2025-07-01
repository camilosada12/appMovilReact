import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PersonTasckParamsList } from "../../navigations/types";
import { deleteEntity, getByIdEntity } from "../../api/apiForm";
import { IPerson } from "../../api/types/IPerson";

type DetailsRouteProp = RouteProp<PersonTasckParamsList, "PersonDelete">;
type NavigationProp = NativeStackNavigationProp<PersonTasckParamsList>;

export default function PersonDeleteScreen() {
  const [Person, setPerson] = useState<IPerson | null>(null);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IPerson>(Number(id), "Person");
        setPerson(response);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener el registro de esa persona.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar este registro de la persona?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEntity(Number(id), "Person", "Logical");
              Alert.alert("Éxito", "registro de la persona eliminado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar el registro de esta persona.");
            }
          },
        },
      ]
    );
  };

  if (!Person) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar este registro?</Text>
      <Text style={styles.label}>FirstName:</Text>
      <Text style={styles.value}>{Person.firstName}</Text>

      <Text style={styles.label}>LastName:</Text>
      <Text style={styles.value}>{Person.lastName}</Text>

      <Text style={styles.label}>Phonenumber:</Text>
      <Text style={styles.value}>{Person.phonenumber}</Text>

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
