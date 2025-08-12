// screens/user/UserUpdateScreen.tsx
import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IPerson } from "../../api/types/IPerson";
import { IUser } from "../../api/types/IUser";

import { getAllEntity, getByIdEntity, updateEntity } from "../../api/apiForm";

import UserScreen from "../../Components/UserScreen";
import { UserStack } from "../../navigations/types";

type DetailsRouteProp = RouteProp<UserStack, "UserUpdate">;
type Nav = NativeStackNavigationProp<UserStack>;

type IUserUpdate = Pick<IUser, "id" | "userName" | "active" | "personId"> & { password?: string | null };

const UserUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<Nav>();
  const { id } = route.params;

  const [user, setUser] = useState<IUser>({
    id: Number(id),
    userName: "",
    password: "",
    active: false,
    personId: 0,
  });
  const [original, setOriginal] = useState<IUser | null>(null);

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

        const detail = await getByIdEntity<IUser>(Number(id), "User");
        setUser(detail);
        setOriginal(detail);
      } catch {
        Alert.alert("Error", "No se pudo cargar la información para editar.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSave = async () => {
    if (!original) return;

    const hasChanges =
      user.userName?.trim() !== original.userName?.trim() ||
      user.active !== original.active ||
      user.personId !== original.personId;

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Realiza al menos un cambio antes de guardar.");
      return;
    }

    try {
      const payload: IUserUpdate = {
        id: user.id,
        userName: user.userName?.trim(),
        active: !!user.active,
        personId: user.personId,
      };
      await updateEntity<IUserUpdate>(payload, "User");
      Alert.alert("Éxito", "Usuario actualizado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e: any) {
      console.log("Update User error:", { status: e?.status, url: e?.url, body: e?.body });
      const backendMsg =
        e?.body?.error || e?.body?.title || e?.message || "No se pudo actualizar el usuario.";
      Alert.alert("Error", String(backendMsg));
    }

  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Cargando…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserScreen user={user} people={people} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
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

export default UserUpdateScreen;
