import { bluzelle, API, BluzelleConfig } from 'bluzelle';
import { Store } from 'vuex';
import { State } from './store';
import { generateUUID } from '../utils';

const getUUID = () => {
  let uuid = localStorage.getItem('uuid');
  if (uuid === null) {
    uuid = generateUUID();
    localStorage.setItem('uuid', uuid);
  }
  return uuid;
};
export const config: BluzelleConfig = {
  mnemonic: "dish film auto bundle nest hospital arctic giraffe surface afford tribe toe swing flavor outdoor hand slice diesel awesome excess liar impulse trumpet rare",
  chain_id: 'bluzelleTestNetPublic-6',
  uuid: getUUID(),
  endpoint: 'https://client.sentry.testnet.public.bluzelle.com:1319'
};

export const gasOptions = { 'gas_price': 10 };

let bz: API;
export const initBlz = (async ($store: Store<State>) => {
  $store.dispatch('connecting');
  bz = await bluzelle(config);
  $store.dispatch('blzInitialized');
});

export const getKey = async (key: string) => {
  if (await bz.has(key)) {
    return await bz.read(key);
  } else {
    return null;
  }
}

export const setKey = async (key: string, value: string) => {
  if (await bz.has(key)) {
    return await bz.update(key, value, gasOptions);
  } else {
    return await bz.create(key, value, gasOptions);
  }
}