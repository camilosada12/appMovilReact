// screens/rol-user/RolUserUpdateScreen.tsx
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getAllEntity, getByIdEntity, updateEntity } from "../../api/apiForm";
import { IRol } from "../../api/types/IRol";
import { IUser } from "../../api/types/IUser";
import { RolUserTackParamsList } from "../../navigations/types";
import RolUserScreen from "../../Components/RolUserScreen";
import { IRolUser } from "../../api/types/iRolUser";

type DetailsRouteProp = RouteProp<RolUserTackParamsList, "RolUserUpdate">;
type Nav = NativeStackNavigationProp<RolUserTackParamsList>;

const RolUserUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<Nav>();
  const { id } = route.params;

  const [rolUser, setRolUser] = useState<IRolUser>({
    id: Number(id),
    rolId: 0,
    userId: 0,
    active: true,
    isdeleted: false,
  });
  const [original, setOriginal] = useState<IRolUser | null>(null);

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
          getAllEntity<IRol>("Rol"),
          getAllEntity<IUser>("User"),
        ]);
        setRoles(rolesData);
        setUsers(usersData);

        const detail = await getByIdEntity<IRolUser>(Number(id), "RolUser");
        setRolUser(detail);
        setOriginal(detail);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar la información para editar.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const hasChanges = useMemo(() => {
    if (!original) return false;
    return (
      rolUser.rolId !== original.rolId ||
      rolUser.userId !== original.userId ||
      !!rolUser.active !== !!original.active
    );
  }, [rolUser, original]);

  const handleSave = async () => {
    if (!original) return;

    if (!rolUser.rolId || rolUser.rolId === 0) {
      Alert.alert("Validación", "Selecciona un Rol.");
      return;
    }
    if (!rolUser.userId || rolUser.userId === 0) {
      Alert.alert("Validación", "Selecciona un Usuario.");
      return;
    }

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Realiza al menos un cambio antes de guardar.");
      return;
    }

    try {
      const payload: IRolUser = {
        id: rolUser.id,
        rolId: rolUser.rolId,
        userId: rolUser.userId,
        active: !!rolUser.active,
        isdeleted: !!rolUser.isdeleted,
      };
      await updateEntity<IRolUser>(payload, "RolUser");
      Alert.alert("Éxito", "Relación actualizada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la relación.");
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
      <RolUserScreen
        rolUser={rolUser}
        roles={roles}
        users={users}
        handleChange={handleChange}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
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

export default RolUserUpdateScreen;
