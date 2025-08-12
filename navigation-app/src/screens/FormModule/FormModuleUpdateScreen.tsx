// screens/form-module/FormModuleUpdateScreen.tsx
import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IForm } from "../../api/types/IForm";
import { IModule } from "../../api/types/IModule";
import { IFormModule } from "../../api/types/IFormModule";

import { getAllEntity, getByIdEntity, updateEntity } from "../../api/apiForm";
import { FormModuleTackParamsList } from "../../navigations/types";
import FormModuleScreen from "../../Components/FormModuleScreen";

type DetailsRouteProp = RouteProp<FormModuleTackParamsList, "FormModuleUpdate">;
type Nav = NativeStackNavigationProp<FormModuleTackParamsList>;

const FormModuleUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<Nav>();
  const { id } = route.params;

  const [formModule, setFormModule] = useState<IFormModule>({
    id: Number(id),
    formid: 0,
    moduleid: 0,
  });
  const [original, setOriginal] = useState<IFormModule | null>(null);

  const [forms, setForms] = useState<IForm[]>([]);
  const [modules, setModules] = useState<IModule[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback(<K extends keyof IFormModule>(field: K, value: IFormModule[K]) => {
    setFormModule(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // Catálogos
        const [formsData, modulesData] = await Promise.all([
          getAllEntity<IForm>("FormControllerPrueba"), 
          getAllEntity<IModule>("Module"),           
        ]);
        setForms(formsData);
        setModules(modulesData);

        // Detalle
        const detail = await getByIdEntity<IFormModule>(Number(id), "FormModule");
        setFormModule(detail);
        setOriginal(detail);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar la información para editar.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSave = async () => {
    if (!original) return;

    if (!formModule.formid || formModule.formid === 0) {
      Alert.alert("Validación", "Selecciona un Form.");
      return;
    }
    if (!formModule.moduleid || formModule.moduleid === 0) {
      Alert.alert("Validación", "Selecciona un Module.");
      return;
    }

    const hasChanges =
      formModule.formid !== original.formid ||
      formModule.moduleid !== original.moduleid;

    if (!hasChanges) {
      Alert.alert("Sin cambios", "Realiza al menos un cambio antes de guardar.");
      return;
    }

    try {
      // Normalmente el PUT espera { id, formid, moduleid }
      const payload: IFormModule = {
        id: formModule.id,
        formid: formModule.formid,
        moduleid: formModule.moduleid,
      };
      await updateEntity<IFormModule>(payload, "FormModule");
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
      <FormModuleScreen
        formModule={formModule}
        forms={forms}
        modules={modules}
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

export default FormModuleUpdateScreen;
