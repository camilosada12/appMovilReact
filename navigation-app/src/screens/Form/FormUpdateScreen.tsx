import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { FormtackParamsList } from "../../navigations/types";
import { IForm } from "../../api/types/IForm";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FormularioScreen from "../../Components/FormularioScreen";

type DetailsRouteProp = RouteProp<FormtackParamsList, "FormUpdate">;
type NavigationProp = NativeStackNavigationProp<FormtackParamsList>;

export default function FormUpdateScreen() {
  const [form, setForm] = useState<IForm>({
    id: 0,
    name: "",
    description: "",
    active: false,
    isdeleted: false,
  });

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;
  const [originalForm, setOriginalForm] = useState<IForm | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getByIdEntity<IForm>(Number(id), "FormControllerPrueba");
      setForm(response);
      setOriginalForm(response);  // Guardas copia original
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener el formulario.");
    }
  };

  fetchData();
}, []);

  const handleChange = (name: string, value: string | boolean) => {
    setForm({ ...form, [name]: value });
  };

  const requestUpdateForm = async () => {
  if (!originalForm) return;

  const hasChanges =
    form.name.trim() !== originalForm.name.trim() ||
    form.description.trim() !== originalForm.description.trim() ||
    form.active !== originalForm.active;

  if (!hasChanges) {
    Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
    return;
  }

  try {
    await updateEntity<IForm>(form, "FormControllerPrueba");
    Alert.alert("Éxito", "Formulario actualizado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  } catch (error) {
    console.error("Error completo:", error);
    Alert.alert("Error", "Hubo un problema al actualizar el formulario.");
  }
};


  return (
    <View style={styles.container}>
      <FormularioScreen form={form} handleChange={handleChange}/>

      <TouchableOpacity style={styles.button} onPress={requestUpdateForm}>
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