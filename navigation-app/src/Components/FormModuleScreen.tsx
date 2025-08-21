  import React from "react";
  import { ScrollView, StyleSheet, Text, View } from "react-native";
  import { Picker } from "@react-native-picker/picker";
  import { IForm } from "../api/types/IForm";
  import { IModule } from "../api/types/IModule";
  import { IFormModule } from "../api/types/IFormModule";

  interface Props {
    formModule: IFormModule;
    forms: IForm[];
    modules: IModule[];
    handleChange: <K extends keyof IFormModule>(
      field: K,
      value: IFormModule[K]
    ) => void;
  }

  const FormModuleScreen: React.FC<Props> = ({ formModule, forms, modules, handleChange }) => {
    const selectedFormName =
      formModule.form?.name ??
      forms.find(f => f.id === formModule.formid)?.name ??
      "";

    const selectedModuleName =
      formModule.module?.name ??
      modules.find(m => m.id === formModule.moduleid)?.name ??
      "";

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Vincular Form con Module</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Formulario</Text>
          <Picker
            selectedValue={formModule.formid ?? 0}
            onValueChange={(val) => handleChange("formid", Number(val))}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un Form" value={0} />
            {forms.map(f => (
              <Picker.Item key={f.id} label={f.name} value={f.id} />
            ))}
          </Picker>
          {!!selectedFormName && (
            <Text style={styles.helper}>Seleccionado: {selectedFormName}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Módulo</Text>
          <Picker
            selectedValue={formModule.moduleid ?? 0}
            onValueChange={(val) => handleChange("moduleid", Number(val))}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un Module" value={0} />
            {modules.map(m => (
              <Picker.Item key={m.id} label={m.name} value={m.id} />
            ))}
          </Picker>
          {!!selectedModuleName && (
            <Text style={styles.helper}>Seleccionado: {selectedModuleName}</Text>
          )}
        </View>

        {selectedFormName && selectedModuleName && (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Relación: {selectedFormName} → {selectedModuleName}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#f2f2f2" },
    title: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#333" },
    field: {
      marginBottom: 16,
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: "#e5e5e5",
    },
    label: { fontSize: 14, fontWeight: "600", color: "#444", marginBottom: 6 },
    picker: { backgroundColor: "#fff" },
    helper: { marginTop: 8, color: "#666", fontSize: 12 },
    summary: {
      marginTop: 8, padding: 12, backgroundColor: "#fff",
      borderRadius: 8, borderWidth: 1, borderColor: "#e5e5e5",
    },
    summaryText: { fontSize: 14, color: "#333" },
  });

  export default FormModuleScreen;
