import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { ModuleTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IModule } from "../../api/types/IModule";
import ModuleScreen from "../../Components/ModuleScreen";

type DetailsRouteProp = RouteProp<ModuleTasckParamsList, "ModuleUpdate">;
type NavigationProp = NativeStackNavigationProp<ModuleTasckParamsList>;

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
      setOriginalModule(response);  // Guardas copia original
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener el Modulo.");
    }
  };

  fetchData();
}, []);

  const handleChange = (name: string, value: string | boolean) => {
    setModule({ ...Module, [name]: value });
  };

  const requestUpdateModule = async () => {
  if (!originalModule) return;

  const hasChanges =
    Module.name.trim() !== originalModule.name.trim() ||
    Module.description.trim() !== originalModule.description.trim() ||
    Module.active !== originalModule.active;

  if (!hasChanges) {
    Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
    return;
  }

  try {
    await updateEntity<IModule>(Module, "Module");
    Alert.alert("Éxito", "modulo actualizado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  } catch (error) {
    console.error("Error completo:", error);
    Alert.alert("Error", "Hubo un problema al actualizar el Modulo.");
  }
};


  return (
    <View style={styles.container}>
      <ModuleScreen Module={Module} handleChange={handleChange}/>

      <TouchableOpacity style={styles.button} onPress={requestUpdateModule}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
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
  button: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});