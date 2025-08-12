// screens/form-module/FormModuleRegisterScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IForm } from "../../api/types/IForm";
import { IModule } from "../../api/types/IModule";
import { IFormModule } from "../../api/types/IFormModule";

import { getAllEntity, createEntity } from "../../api/apiForm";
import { FormModuleTackParamsList } from "../../navigations/types";
import FormModuleScreen from "../../Components/FormModuleScreen";


type Nav = NativeStackNavigationProp<FormModuleTackParamsList, "FormModuleRegister">;

const FormModuleRegisterScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [formModule, setFormModule] = useState<IFormModule>({
    id: 0,
    formid: 0,
    moduleid: 0,
    form: undefined,
    module: undefined,
  });

  const [forms, setForms] = useState<IForm[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback(<K extends keyof IFormModule>(field: K, value: IFormModule[K]) => {
    setFormModule(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // Ajusta endpoints si tus controladores tienen nombres distintos:
        // Para Forms vienes usando "FormControllerPrueba"
        const [formsData, modulesData] = await Promise.all([
          getAllEntity<IForm>("FormControllerPrueba"),
          getAllEntity<IModule>("Module"), // si tu controlador se llama distinto, cámbialo aquí
        ]);
        setForms(formsData);
        setModules(modulesData);
      } catch (err) {
        Alert.alert("Error", "No se pudieron cargar los catálogos de Forms/Modules.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!formModule.formid || formModule.formid === 0) {
      Alert.alert("Validación", "Selecciona un Form.");
      return;
    }
    if (!formModule.moduleid || formModule.moduleid === 0) {
      Alert.alert("Validación", "Selecciona un Module.");
      return;
    }

    try {
      // El backend típicamente solo necesita formid y moduleid
      const payload = { formid: formModule.formid, moduleid: formModule.moduleid };
      await createEntity<typeof payload>(payload, "FormModule"); // POST /FormModule
      Alert.alert("Éxito", "Relación Form–Module creada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la relación Form–Module.");
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
      <FormModuleScreen
        formModule={formModule}
        forms={forms}
        modules={modules}
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

export default FormModuleRegisterScreen;
