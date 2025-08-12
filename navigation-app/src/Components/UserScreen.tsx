import React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IUser } from "../api/types/IUser";
import { IPerson } from "../api/types/IPerson";

interface Props {
  user: IUser;
  people: IPerson[]; // catálogo de personas
  handleChange: <K extends keyof IUser>(field: K, value: IUser[K]) => void;
}

const UserScreen: React.FC<Props> = ({ user, people, handleChange }) => {
  const selectedPerson = user.person ?? people.find(p => p.id === user.personId);
  const fullPersonName = selectedPerson ? `${selectedPerson.firstName} ${selectedPerson.lastName}` : "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Usuario</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el usuario"
          value={user.userName ?? ""}
          onChangeText={(val) => handleChange("userName", val as IUser["userName"])}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la contraseña"
          value={user.password ?? ""}
          onChangeText={(val) => handleChange("password", val as IUser["password"])}
          secureTextEntry
        />
      </View>

      <View style={[styles.field, styles.row]}>
        <Text style={styles.label}>Activo</Text>
        <Switch
          value={!!user.active}
          onValueChange={(v) => handleChange("active", v as IUser["active"])}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Persona</Text>
        <Picker
          selectedValue={user.personId ?? 0}
          onValueChange={(val) => handleChange("personId", Number(val) as IUser["personId"])}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una persona" value={0} />
          {people.map(p => (
            <Picker.Item key={p.id} label={`${p.firstName} ${p.lastName}`} value={p.id} />
          ))}
        </Picker>
        {!!fullPersonName && <Text style={styles.helper}>Seleccionado: {fullPersonName}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#333" },
  field: {
    marginBottom: 16, backgroundColor: "#fff", borderRadius: 8,
    padding: 12, borderWidth: 1, borderColor: "#e5e5e5",
  },
  label: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 6 },
  input: {
    backgroundColor: "#fff", borderWidth: 1, borderColor: "#e5e5e5",
    padding: 12, borderRadius: 8, fontSize: 15,
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  picker: { backgroundColor: "#fff" },
  helper: { marginTop: 8, color: "#666", fontSize: 12 },
});

export default UserScreen;
