import { bluzelle, API, BluzelleConfig } from 'bluzelle';
import { Store } from 'vuex';
import { State } from './store';
import { generateUUID } from '../utils';

export const config: BluzelleConfig = {
  mnemonic: "dish film auto bundle nest hospital arctic giraffe surface afford tribe toe swing flavor outdoor hand slice diesel awesome excess liar impulse trumpet rare",
  chain_id: 'bluzelleTestNetPublic-6',
  uuid: "d2a1d33b-81ac-4617-bea7-b8edff6dde45",
  endpoint: 'https://client.sentry.testnet.public.bluzelle.com:1319'
};

export const gasOptions = { 'gas_price': 10 };

let bz: API;
export const initBlz = (async ($store: Store<State>) => {
  $store.dispatch('connecting');
  bz = await bluzelle(config);
  $store.dispatch('blzInitialized');
});

export const getKey = async (key: string) => await bz.read(key);

export const setKey = async (key: string, value: string) => {
  if (await bz.has(key)) {
    return await bz.update(key, value, gasOptions);
  } else {
    return await bz.create(key, value, gasOptions);
  }
}