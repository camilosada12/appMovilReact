// screens/user/UserRegisterScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IPerson } from "../../api/types/IPerson";
import { IUser } from "../../api/types/IUser";
import { getAllEntity, createEntity } from "../../api/apiForm";
import UserScreen from "../../Components/UserScreen"; // el componente de formulario de usuario
import { UserStack } from "../../navigations/types";

type Nav = NativeStackNavigationProp<UserStack, "UserRegister">;

const UserRegisterScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [user, setUser] = useState<IUser>({
    id: 0,
    userName: "",
    password: "",
    active: false,
    personId: 0,
  });

  const [people, setPeople] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback(<K extends keyof IUser>(field: K, value: IUser[K]) => {
    setUser(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const persons = await getAllEntity<IPerson>("Person");
        setPeople(persons);
      } catch {
        Alert.alert("Error", "No se pudo cargar el catálogo de personas.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!user.userName?.trim() || !user.password?.trim()) {
      Alert.alert("Validación", "Usuario y contraseña son obligatorios.");
      return;
    }
    if (!user.personId || user.personId === 0) {
      Alert.alert("Validación", "Seleccione una persona.");
      return;
    }

    try {
      const payload = {
        userName: user.userName,
        password: user.password,
        active: !!user.active,
        personId: user.personId,
      };
      await createEntity<typeof payload>(payload, "User");
      Alert.alert("Éxito", "Usuario creado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "No se pudo crear el usuario.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Cargando catálogo…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserScreen user={user} people={people} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  button: {
    backgroundColor: "#4a90e2", padding: 12, borderRadius: 8,
    alignItems: "center", marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default UserRegisterScreen;
