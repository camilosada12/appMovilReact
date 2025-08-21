// screens/home/HomeScreen.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

type Tile = {
  id: string;
  title: string;
  icon: React.ComponentProps<typeof AntDesign>["name"];
  target: { stack: string; screen: string };
};

const TILES: Tile[] = [
  { id: "form",   title: "Formulario",   icon: "form",       target: { stack: "FormStack",       screen: "FormList" } },
  { id: "module", title: "Módulo",       icon: "appstore-o", target: { stack: "ModuleStack",     screen: "ModuleList" } },
  { id: "perm",   title: "Permisos",     icon: "lock",       target: { stack: "PermissionStack", screen: "PermissionList" } },
  { id: "user",   title: "Usuarios",     icon: "user",       target: { stack: "UserStack",       screen: "UserList" } },
  { id: "roles",  title: "Roles",        icon: "team",       target: { stack: "RolStack",        screen: "RolList" } },
  { id: "person", title: "Personas",     icon: "idcard",     target: { stack: "PersonStack",     screen: "PersonList" } },
  { id: "formModule",     title: "FormModules",  icon: "appstore1",  target: { stack: "FormModuleStack", screen: "FormModuleList" } },
  { id: "rolUser",        title: "RolUser", icon: "team", target: { stack: "RolUserStack", screen: "RolUserList" } },
  { id: "rolFormPermission", title: "RolFormPermission", icon: "lock", target: { stack: "RolFormPermissionStack", screen: "RolFormPermissionList" } },
];


export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: Tile }) => (
    <View style={styles.tile}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate(item.target.stack, { screen: item.target.screen })}
      >
        <View style={styles.iconWrap}>
          <AntDesign name={item.icon} size={56} />
        </View>
        <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={TILES}
        keyExtractor={(t) => t.id}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}      // <-- separa en 2 columnas con espacio uniforme
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const GUTTER = 16;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#67C3C6",
  },
  list: {
    paddingHorizontal: GUTTER,
    paddingTop: GUTTER,
    paddingBottom: 32,
  },
  row: {
    justifyContent: "space-between", // <-- evita que la última card se estire
    marginBottom: GUTTER,
  },
  tile: {
    // 2 columnas: cada tile ocupa ~48% para dejar gutter entre ellas
    width: "48%",
  },
  card: {
    // IMPORTANTE: quitar flex: 1 para que no se estiren
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 26,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // elevación Android
    elevation: 4,
    height: 150, // <-- altura fija (todas iguales)
    // Si prefieres cuadrados en vez de altura fija:
    // aspectRatio: 1,
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
