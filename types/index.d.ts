import { ComputedRef } from 'vue';

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type EmitType = (event: eventContext, ...args: any[]) => void;

export type DynamicProps<T> = {
  [p in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
