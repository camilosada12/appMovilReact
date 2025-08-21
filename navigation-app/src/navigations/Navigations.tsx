import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ICONS
import AntDesign from "@expo/vector-icons/AntDesign";

// Screens CRUD (las tuyas)
import FormList from "../screens/Form/FormList";
import FormRegisterScreen from "../screens/Form/FormRegisterScreen";
import FormUpdateScreen from "../screens/Form/FormUpdateScreen";
import FormDeleteScreen from "../screens/Form/FormDeleteScreen";

import ModuleList from "../screens/Module/ModuleList";
import ModuleRegisterScreen from "../screens/Module/ModuleRegisterScreen";
import ModuleUpdateScreen from "../screens/Module/ModuleUpdateScreen";
import ModuleDeleteScreen from "../screens/Module/ModuleDeleteScreen";

import PersonList from "../screens/Person/PersonList";
import PersonRegisterScreen from "../screens/Person/PersonRegisterScreen";
import PersonUpdateScreen from "../screens/Person/PersonUpdateScreen";
import PersonDeleteScreen from "../screens/Person/PersonDeleteScreen";

import PermissionList from "../screens/Permission/PermissionList";
import PermissionRegisterScreen from "../screens/Permission/PermissionRegisterScreen";
import PermissionUpdateScreen from "../screens/Permission/PermissionUpdateScreen";
import PermissionDeleteScreen from "../screens/Permission/PermissionDeleteScreen";

import RolList from "../screens/Rol/RolList";
import RolRegisterScreen from "../screens/Rol/RolRegisterScreen";
import RolUpdateScreen from "../screens/Rol/RolUpdateScreen";
import RolDeleteScreen from "../screens/Rol/RolDeleteScreen";

import UserList from "../screens/User/UserList";
import UserRegisterScreen from "../screens/User/UserRegisterScreen";
import UserUpdateScreen from "../screens/User/UserUpdateScreen";
import UserDeleteScreen from "../screens/User/UserDeleteScreen";

import FormModuleList from "../screens/FormModule/FormModuleList";
import FormModuleRegisterScreen from "../screens/FormModule/FormModuleRegisterScreen";
import FormModuleUpdateScreen from "../screens/FormModule/FormModuleUpdateScreen";
import FormModuleDeleteScreen from "../screens/FormModule/FormModuleDeleteScreen";
import HomeScreen from "../screens/home/HomeScreen";
import RolUserList from "../screens/RolUser/RolUserList";
import RolUserRegisterScreen from "../screens/RolUser/RolUserRegisterScreen";
import RolUserUpdateScreen from "../screens/RolUser/RolUserUpdateScreen";
import RolUserDeleteScreen from "../screens/RolUser/RolUserDeleteScreen";
import RolFormPermissionList from "../screens/RolFormPermission/RolFormPermissionList";
import RolFormPermissionRegisterScreen from "../screens/RolFormPermission/RolFormPermissionRegisterScreen";
import RolFormPermissionDeleteScreen from "../screens/RolFormPermission/RolFormPermissionDeleteScreen";
import RolFormPermissionUpdateScreen from "../screens/RolFormPermission/RolFormPermissionUpdateScreen";


const RootStack = createNativeStackNavigator();
const FormStackNav = createNativeStackNavigator();
const ModuleStackNav = createNativeStackNavigator();
const PersonStackNav = createNativeStackNavigator();
const PermissionStackNav = createNativeStackNavigator();
const RolStackNav = createNativeStackNavigator();
const UserStackNav = createNativeStackNavigator();
const FormModuleStackNav = createNativeStackNavigator();

function FormStack() {
  return (
    <FormStackNav.Navigator initialRouteName="FormList">
      <FormStackNav.Screen name="FormList" component={FormList} options={{ title: "Lista de Formularios" }} />
      <FormStackNav.Screen name="FormRegister" component={FormRegisterScreen} options={{ title: "Registrar Formulario" }} />
      <FormStackNav.Screen name="FormUpdate" component={FormUpdateScreen} options={{ title: "Actualizar Formulario" }} />
      <FormStackNav.Screen name="FormDelete" component={FormDeleteScreen} options={{ title: "Eliminar Formulario" }} />
    </FormStackNav.Navigator>
  );
}

function ModuleStack() {
  return (
    <ModuleStackNav.Navigator initialRouteName="ModuleList">
      <ModuleStackNav.Screen name="ModuleList" component={ModuleList} options={{ title: "Lista de Módulos" }} />
      <ModuleStackNav.Screen name="ModuleRegister" component={ModuleRegisterScreen} options={{ title: "Registrar Módulo" }} />
      <ModuleStackNav.Screen name="ModuleUpdate" component={ModuleUpdateScreen} options={{ title: "Actualizar Módulo" }} />
      <ModuleStackNav.Screen name="ModuleDelete" component={ModuleDeleteScreen} options={{ title: "Eliminar Módulo" }} />
    </ModuleStackNav.Navigator>
  );
}

function PersonStack() {
  return (
    <PersonStackNav.Navigator initialRouteName="PersonList">
      <PersonStackNav.Screen name="PersonList" component={PersonList} options={{ title: "Lista de Personas" }} />
      <PersonStackNav.Screen name="PersonRegister" component={PersonRegisterScreen} options={{ title: "Registrar Personas" }} />
      <PersonStackNav.Screen name="PersonUpdate" component={PersonUpdateScreen} options={{ title: "Actualizar Personas" }} />
      <PersonStackNav.Screen name="PersonDelete" component={PersonDeleteScreen} options={{ title: "Eliminar Personas" }} />
    </PersonStackNav.Navigator>
  );
}

function PermissionStack() {
  return (
    <PermissionStackNav.Navigator initialRouteName="PermissionList">
      <PermissionStackNav.Screen name="PermissionList" component={PermissionList} options={{ title: "Lista de permisos" }} />
      <PermissionStackNav.Screen name="PermissionRegister" component={PermissionRegisterScreen} options={{ title: "Registrar permisos" }} />
      <PermissionStackNav.Screen name="PermissionUpdate" component={PermissionUpdateScreen} options={{ title: "Actualizar permisos" }} />
      <PermissionStackNav.Screen name="PermissionDelete" component={PermissionDeleteScreen} options={{ title: "Eliminar permisos" }} />
    </PermissionStackNav.Navigator>
  );
}

function RolStack() {
  return (
    <RolStackNav.Navigator initialRouteName="RolList">
      <RolStackNav.Screen name="RolList" component={RolList} options={{ title: "Lista de roles" }} />
      <RolStackNav.Screen name="RolRegister" component={RolRegisterScreen} options={{ title: "Registrar roles" }} />
      <RolStackNav.Screen name="RolUpdate" component={RolUpdateScreen} options={{ title: "Actualizar roles" }} />
      <RolStackNav.Screen name="RolDelete" component={RolDeleteScreen} options={{ title: "Eliminar roles" }} />
    </RolStackNav.Navigator>
  );
}

function UserStack() {
  return (
    <UserStackNav.Navigator initialRouteName="UserList">
      <UserStackNav.Screen name="UserList" component={UserList} options={{ title: "Lista de usuarios" }} />
      <UserStackNav.Screen name="UserRegister" component={UserRegisterScreen} options={{ title: "Registrar usuarios" }} />
      <UserStackNav.Screen name="UserUpdate" component={UserUpdateScreen} options={{ title: "Actualizar usuarios" }} />
      <UserStackNav.Screen name="UserDelete" component={UserDeleteScreen} options={{ title: "Eliminar usuarios" }} />
    </UserStackNav.Navigator>
  );
}

function FormModuleStack() {
  return (
    <FormModuleStackNav.Navigator initialRouteName="FormModuleList">
      <FormModuleStackNav.Screen name="FormModuleList" component={FormModuleList} options={{ title: "Formularios por Módulo" }} />
      <FormModuleStackNav.Screen name="FormModuleRegister" component={FormModuleRegisterScreen} options={{ title: "Registrar" }} />
      <FormModuleStackNav.Screen name="FormModuleUpdate" component={FormModuleUpdateScreen} options={{ title: "Actualizar" }} />
      <FormModuleStackNav.Screen name="FormModuleDelete" component={FormModuleDeleteScreen} options={{ title: "Eliminar" }} />
    </FormModuleStackNav.Navigator>
  );
}

function RolUserStack() {
  return (
    <FormModuleStackNav.Navigator initialRouteName="RolUserList">
      <FormModuleStackNav.Screen name="RolUserList" component={RolUserList} options={{ title: "Lista de Roles por Usuario" }} />
      <FormModuleStackNav.Screen name="RolUserRegister" component={RolUserRegisterScreen} options={{ title: "Registrar Rol por Usuario" }} />
      <FormModuleStackNav.Screen name="RolUserUpdate" component={RolUserUpdateScreen} options={{ title: "Actualizar Rol por Usuario" }} />
      <FormModuleStackNav.Screen name="RolUserDelete" component={RolUserDeleteScreen} options={{ title: "Eliminar Rol por Usuario" }} />
    </FormModuleStackNav.Navigator>
  );
}
function RolFormPermissionStack() {
  return (
    <FormModuleStackNav.Navigator initialRouteName="RolFormPermissionList">
      <FormModuleStackNav.Screen name="RolFormPermissionList" component={RolFormPermissionList} options={{ title: "Lista de Roles por Formulario y Permiso" }} />
      <FormModuleStackNav.Screen name="RolFormPermissionRegister" component={RolFormPermissionRegisterScreen} options={{ title: "Registrar Rol por Formulario y Permiso" }} />
      <FormModuleStackNav.Screen name="RolFormPermissionUpdate" component={RolFormPermissionUpdateScreen} options={{ title: "Actualizar Rol por Formulario y Permiso  " }} />
      <FormModuleStackNav.Screen name="RolFormPermissionDelete" component={RolFormPermissionDeleteScreen} options={{ title: "Eliminar Rol por Formulario y Permiso" }} />
    </FormModuleStackNav.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        {/* Dashboard tipo Figma */}
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Administración", headerLargeTitle: true }}
        />

        {/* Stacks CRUD (sin header propio; el header lo manejan ellos) */}
        <RootStack.Screen name="FormStack" component={FormStack} options={{ headerShown: false }} />
        <RootStack.Screen name="ModuleStack" component={ModuleStack} options={{ headerShown: false }} />
        <RootStack.Screen name="PermissionStack" component={PermissionStack} options={{ headerShown: false }} />
        <RootStack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
        <RootStack.Screen name="RolStack" component={RolStack} options={{ headerShown: false }} />
        <RootStack.Screen name="PersonStack" component={PersonStack} options={{ headerShown: false }} />
        <RootStack.Screen name="FormModuleStack" component={FormModuleStack} options={{ headerShown: false }} />
        <RootStack.Screen name="RolUserStack" component={RolUserStack} options={{ headerShown: false }} />
        <RootStack.Screen name="RolFormPermissionStack" component={RolFormPermissionStack} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
