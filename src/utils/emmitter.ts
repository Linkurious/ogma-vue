import { getCurrentInstance } from 'vue';

export default function useEmitter<T extends Record<string, any>>() {
  const instance = getCurrentInstance();

  return function emit<K extends keyof T>(name: K, payload: T[K]) {
    if (instance !== null) {
      instance.emit(name as string, payload);
    }
  };
}
