import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ModuleTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { IModule } from "../../api/types/IModule";
import ModuleScreen from "../../Components/ModuleScreen";

type DetailsRouteProp = RouteProp<ModuleTasckParamsList, "ModuleUpdate">;
type NavigationProp = NativeStackNavigationProp<ModuleTasckParamsList>;

const MIN_CHARS = 3;
const MAX_CHARS = 30;
const countLetters = (s: string) => (s ?? "").replace(/\s/g, "").length;

export default function ModuleUpdateScreen() {
  const [Module, setModule] = useState<IModule>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;
  const [originalModule, setOriginalModule] = useState<IModule | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IModule>(Number(id), "Module");
        setModule(response);
        setOriginalModule(response);
      } catch {
        Alert.alert("Error", "No se pudo obtener el Módulo.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (name: keyof IModule, value: string | boolean) => {
    setModule(prev => ({ ...prev, [name]: value } as IModule));
  };

  const requestUpdateModule = async () => {
    if (!originalModule) return;

    const newName = (Module.name ?? "").trim();
    const newDesc = (Module.description ?? "").trim();
    const oldName = (originalModule.name ?? "").trim();
    const oldDesc = (originalModule.description ?? "").trim();

    if (!newName || !newDesc) {
      Alert.alert("Validación", "Nombre y Descripción no pueden quedar vacíos.");
      return;
    }

    const nameLen = countLetters(newName);
    const descLen = countLetters(newDesc);
    if (nameLen < MIN_CHARS || nameLen > MAX_CHARS || descLen < MIN_CHARS || descLen > MAX_CHARS) {
      Alert.alert(
        "Validación",
        `Nombre y Descripción deben tener entre ${MIN_CHARS} y ${MAX_CHARS} letras (sin espacios).\n\n` +
        `• Nombre: ${nameLen}/${MIN_CHARS}-${MAX_CHARS}\n` +
        `• Descripción: ${descLen}/${MIN_CHARS}-${MAX_CHARS}`
      );
      return;
    }

    const hasChanges =
      newName !== oldName ||
      newDesc !== oldDesc ||
      Module.active !== originalModule.active;

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
      return;
    }

    const payload: IModule = { ...Module, name: newName, description: newDesc };

    try {
      await updateEntity<IModule>(payload, "Module");
      Alert.alert("Éxito", "Módulo actualizado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "Hubo un problema al actualizar el Módulo.");
    }
  };

  return (
    <View style={styles.container}>
      <ModuleScreen Module={Module} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={requestUpdateModule}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  button: { backgroundColor: "#4a90e2", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 16 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
