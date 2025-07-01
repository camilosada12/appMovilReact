import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { PersonTasckParamsList } from "../../navigations/types";
import { getByIdEntity, updateEntity } from "../../api/apiForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FormularioScreen from "../../Components/FormularioScreen";
import { IPerson } from "../../api/types/IPerson";
import PersonScreen from "../../Components/PersonScreen";

type DetailsRouteProp = RouteProp<PersonTasckParamsList, "PersonUpdate">;
type NavigationProp = NativeStackNavigationProp<PersonTasckParamsList>;

export default function PersonpdateScreen() {
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
      setOriginalPerson(response);  // Guardas copia original
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener el el regitro de esta persona.");
    }
  };

  fetchData();
}, []);

  const handleChange = (name: string, value: string | boolean | number) => {
    setPerson({ ...Person, [name]: value });
  };

  const requestUpdatePerson = async () => {
  if (!originalPerson) return;

  const hasChanges =
    Person.firstName.trim() !== originalPerson.firstName.trim() ||
    Person.lastName.trim() !== originalPerson.lastName.trim() ||
    Person.phonenumber.trim() !== originalPerson.phonenumber.trim() ||
    Person.active !== originalPerson.active;

  if (!hasChanges) {
    Alert.alert("Sin cambios", "Debes realizar al menos un cambio real para actualizar.");
    return;
  }

  try {
    await updateEntity<IPerson>(Person, "Person");
    Alert.alert("Éxito", "Persona actualizado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  } catch (error) {
    console.error("Error completo:", error);
    Alert.alert("Error", "Hubo un problema al actualizar el registro de la persona.");
  }
};


  return (
    <View style={styles.container}>
      <PersonScreen  Person={Person} handleChange={handleChange}/>

      <TouchableOpacity style={styles.button} onPress={requestUpdatePerson}>
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