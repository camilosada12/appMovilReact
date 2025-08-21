// screens/rol-user/RolUserRegisterScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getAllEntity, createEntity } from "../../api/apiForm";
import { IRol } from "../../api/types/IRol";
import { IUser } from "../../api/types/IUser";

import { RolUserTackParamsList } from "../../navigations/types";
import RolUserScreen from "../../Components/RolUserScreen";
import { IRolUser } from "../../api/types/iRolUser";

type Nav = NativeStackNavigationProp<RolUserTackParamsList, "RolUserRegister">;

const RolUserRegisterScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [rolUser, setRolUser] = useState<IRolUser>({
    id: 0,
    rolId: 0,
    userId: 0,
    active: true,
    isdeleted: false,
  });

  const [roles, setRoles] = useState<IRol[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback(<K extends keyof IRolUser>(field: K, value: IRolUser[K]) => {
    setRolUser(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [rolesData, usersData] = await Promise.all([
          getAllEntity<IRol>("Rol"),    // Ajusta si tu controlador es diferente
          getAllEntity<IUser>("User"),
        ]);
        setRoles(rolesData);
        setUsers(usersData);
      } catch (err) {
        Alert.alert("Error", "No se pudieron cargar los catálogos de Roles/Usuarios.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!rolUser.rolId || rolUser.rolId === 0) {
      Alert.alert("Validación", "Selecciona un Rol.");
      return;
    }
    if (!rolUser.userId || rolUser.userId === 0) {
      Alert.alert("Validación", "Selecciona un Usuario.");
      return;
    }

    try {
      const payload = {
        rolId: rolUser.rolId,
        userId: rolUser.userId,
        active: !!rolUser.active,
      };
      await createEntity<typeof payload>(payload, "RolUser"); // POST /RolUser
      Alert.alert("Éxito", "Relación Rol–Usuario creada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la relación Rol–Usuario.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Cargando catálogos…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RolUserScreen
        rolUser={rolUser}
        roles={roles}
        users={users}
        handleChange={handleChange}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar relación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  button: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default RolUserRegisterScreen;
