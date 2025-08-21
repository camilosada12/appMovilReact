import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormtackParamsList } from "../../navigations/types";
import { IForm } from "../../api/types/IForm";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import FormularioScreen from "../../Components/FormularioScreen";

type DetailsRouteProp = RouteProp<FormtackParamsList, "FormUpdate">;
type NavigationProp = NativeStackNavigationProp<FormtackParamsList>;

const MIN_CHARS = 3;
const MAX_CHARS = 30;
const countLetters = (s: string) => (s ?? "").replace(/\s/g, "").length;

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
        setOriginalForm(response);
      } catch {
        Alert.alert("Error", "No se pudo obtener el formulario.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (name: keyof IForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [name]: value } as IForm));
  };

  const requestUpdateForm = async () => {
    if (!originalForm) return;

    const newName = (form.name ?? "").trim();
    const newDesc = (form.description ?? "").trim();
    const oldName = (originalForm.name ?? "").trim();
    const oldDesc = (originalForm.description ?? "").trim();

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
      form.active !== originalForm.active;

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
      return;
    }

    const payload: IForm = { ...form, name: newName, description: newDesc };

    try {
      await updateEntity<IForm>(payload, "FormControllerPrueba");
      Alert.alert("Éxito", "Formulario actualizado correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "Hubo un problema al actualizar el formulario.");
    }
  };

  return (
    <View style={styles.container}>
      <FormularioScreen form={form} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={requestUpdateForm}>
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
