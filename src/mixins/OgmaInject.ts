import { provide, inject } from 'vue'
import Ogma from '@linkurious/ogma';
import type { InjectionKey } from 'vue'

export const key = Symbol() as InjectionKey<Ogma>

const foo = inject(key)