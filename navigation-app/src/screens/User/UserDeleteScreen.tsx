// screens/user/UserDeleteScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { deleteEntity, getByIdEntity } from "../../api/apiForm";
import { IUser } from "../../api/types/IUser";
import { UserStack } from "../../navigations/types";


type DetailsRouteProp = RouteProp<UserStack, "UserDelete">;
type NavigationProp = NativeStackNavigationProp<UserStack>;

export default function UserDeleteScreen() {
  const [user, setUser] = useState<IUser | null>(null);

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const response = await getByIdEntity<IUser>(Number(id), "User");
        setUser(response);
      } catch {
        Alert.alert("Error", "No se pudo obtener el usuario.");
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEntity(Number(id), "User", "Logical"); // si tu API espera 'logical' minúscula, cámbialo aquí
              Alert.alert("Éxito", "Usuario eliminado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch {
              Alert.alert("Error", "Hubo un problema al eliminar el usuario.");
            }
          },
        },
      ]
    );
  };

  if (!user) return null;

  const personName = user.person ? `${user.person.firstName} ${user.person.lastName}` : `Persona ID: ${user.personId}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Seguro que deseas eliminar este usuario?</Text>

      <Text style={styles.label}>Usuario:</Text>
      <Text style={styles.value}>{user.userName}</Text>

      <Text style={styles.label}>Persona:</Text>
      <Text style={styles.value}>{personName}</Text>

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
