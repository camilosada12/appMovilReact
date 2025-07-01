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
/*
undefined =  indica que la vista no requiere parametros

Details : {userId : string}; la vista requiere un parametro
UserId de tipo String

*/ 