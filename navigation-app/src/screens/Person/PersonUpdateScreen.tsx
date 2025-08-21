import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PersonTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { IPerson } from "../../api/types/IPerson";
import PersonScreen from "../../Components/PersonScreen";

type DetailsRouteProp = RouteProp<PersonTasckParamsList, "PersonUpdate">;
type NavigationProp = NativeStackNavigationProp<PersonTasckParamsList>;

const MIN_CHARS = 3;
const MAX_CHARS = 30;
const countLetters = (s: string) => (s ?? "").replace(/\s/g, "");
const normalizePhone = (s: string) => (s ?? "").replace(/\D/g, "");
const isValidPhone = (digits: string) => digits.length === 10;

export default function PersonUpdateScreen() {
  const [Person, setPerson] = useState<IPerson>({
    id: 0,
    firstName: "",
    lastName: "",
    phonenumber: "",
    active: false,
    isdeleted: false,
  });

  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id } = route.params;
  const [originalPerson, setOriginalPerson] = useState<IPerson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getByIdEntity<IPerson>(Number(id), "Person");
        setPerson(response);
        setOriginalPerson(response);
      } catch {
        Alert.alert("Error", "No se pudo obtener el registro de la persona.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (name: keyof IPerson, value: string | boolean | number) => {
    setPerson(prev => ({ ...prev, [name]: value } as IPerson));
  };

  const requestUpdatePerson = async () => {
    if (!originalPerson) return;

    const newFirst = (Person.firstName ?? "").trim();
    const newLast  = (Person.lastName ?? "").trim();
    const newPhoneDigits = normalizePhone(Person.phonenumber ?? "");
    const oldPhoneDigits = normalizePhone(originalPerson.phonenumber ?? "");

    // Requeridos NO vacíos
    if (!newFirst || !newLast) {
      Alert.alert("Validación", "Nombre y Apellido no pueden quedar vacíos.");
      return;
    }
    if (!newPhoneDigits) {
      Alert.alert("Validación", "El teléfono es obligatorio.");
      return;
    }
    if (!isValidPhone(newPhoneDigits)) {
      Alert.alert("Validación", "El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    // Longitud de nombre/apellido (3 a 30 letras sin espacios)
    const firstLen = countLetters(newFirst).length;
    const lastLen  = countLetters(newLast).length;
    if (firstLen < MIN_CHARS || firstLen > MAX_CHARS || lastLen < MIN_CHARS || lastLen > MAX_CHARS) {
      Alert.alert(
        "Validación",
        `Nombre y Apellido deben tener entre ${MIN_CHARS} y ${MAX_CHARS} letras (sin espacios).\n\n` +
        `• Nombre: ${firstLen}/${MIN_CHARS}-${MAX_CHARS}\n` +
        `• Apellido: ${lastLen}/${MIN_CHARS}-${MAX_CHARS}`
      );
      return;
    }

    // Cambios reales (comparamos con valores normalizados)
    const hasChanges =
      newFirst !== (originalPerson.firstName ?? "").trim() ||
      newLast  !== (originalPerson.lastName  ?? "").trim() ||
      newPhoneDigits !== oldPhoneDigits ||
      Person.active !== originalPerson.active;

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
      return;
    }

    const payload: IPerson = {
      ...Person,
      firstName: newFirst,
      lastName: newLast,
      phonenumber: newPhoneDigits, // ← normalizado (10 dígitos)
    };

    try {
      await updateEntity<IPerson>(payload, "Person");
      Alert.alert("Éxito", "Persona actualizada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "Hubo un problema al actualizar el registro de la persona.");
    }
  };

  return (
    <View style={styles.container}>
      <PersonScreen Person={Person} handleChange={handleChange} />
      <TouchableOpacity style={styles.button} onPress={requestUpdatePerson}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  button: {
    backgroundColor: "#4a90e2", padding: 12, borderRadius: 8,
    alignItems: "center", marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
