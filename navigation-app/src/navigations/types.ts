export type FormtackParamsList = {
  FormList: undefined;
  FormUpdate: { id: string };
  FormRegister: undefined;
  FormDelete: {id : string};
};
export type ModuleTasckParamsList = {
  ModuleList: undefined;
  ModuleUpdate: { id: string };
  ModuleRegister: undefined;
  ModuleDelete: {id : string};
}
export type PersonTasckParamsList = {
  PersonList: undefined;
  PersonUpdate: { id: string };
  PersonRegister: undefined;
  PersonDelete: {id : string};
}
export type PermissionTasckParamsList = {
  PermissionList: undefined;
  PermissionUpdate: { id: string };
  PermissionRegister: undefined;
  PermissionDelete: {id : string};
}
export type RolTasckParamsList = {
  RolList: undefined;
  RolUpdate: { id: string };
  RolRegister: undefined;
  RolDelete: {id : string};
}
export type UserStack = {
  UserList: undefined;
  UserUpdate: { id: string };
  UserRegister: undefined;
  UserDelete: {id : string};
}
export type FormModuleTackParamsList = {
  FormModuleList: undefined;
  FormModuleUpdate: { id: string };
  FormModuleRegister: undefined;
  FormModuleDelete: {id : string};
}
export type RolUserTackParamsList = {
  RolUserList: undefined;
  RolUserUpdate: { id: string };
  RolUserRegister: undefined;
  RolUserDelete: {id : string};
}
export type RolFormPermissionTackParamsList = {
  RolFormPermissionList: undefined;
  RolFormPermissionUpdate: { id: string };
  RolFormPermissionRegister: undefined;
  RolFormPermissionDelete: {id : string};
}
/*
undefined =  indica que la vista no requiere parametros

Details : {userId : string}; la vista requiere un parametro
UserId de tipo String

*/ 