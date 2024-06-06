import type { InjectionKey } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

export interface FormContextProps {
  resetAction: () => Promise<void>;
  saveAction: () => Promise<void>;
}

const key: InjectionKey<FormContextProps> = Symbol();

export function createFormContext(context: FormContextProps) {
  return createContext<FormContextProps>(context, key);
}

export function useFOrmContext() {
  return useContext<FormContextProps>(key);
}
