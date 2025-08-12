import { IForm } from './IForm';
import { IModule } from './IModule';

export interface IFormModule {
  id: number;        
  formid: number;
  moduleid: number;
  form?: IForm;       
  module?: IModule; 
}