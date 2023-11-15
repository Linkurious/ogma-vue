import { provide, inject } from 'vue'
import Ogma from '@linkurious/ogma';
import type { InjectionKey } from 'vue'


export function ogmaInject<ND = any, ED=any>() {
  ogmaSymbol = ogmaSymbol || Symbol() as InjectionKey<Ogma<ND, ED>>;
  return ogmaSymbol;
}
export function ogmaProvider<ND = any, ED=any>(ogma: Ogma<ND, ED>) {
  constprovide(ogmInject, ogma)
}
const foo = inject(ogmInject)