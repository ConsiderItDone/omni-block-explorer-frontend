import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import queryString from 'query-string';
import { SI, SS58_FORMAT } from 'utils/consts';

const SI_MID = 8;
const DEFAULT_DECIMALS = 11;

export const normalizeCurrency = (value: number | string = '0', decimals = DEFAULT_DECIMALS): number | string => {
  return normalizeDenominated(value, decimals);
  /* 
  const text = value?.toString() || '0';
  const si = calcSi(text, decimals);
  //const mid = text.length - (decimals + si.power);
  const mid = text.length - (decimals + si.power);
  const prefix = text.substr(0, mid);
  const padding = mid < 0 ? 0 - mid : 0;
  const postfix = `${`${new Array(padding + 1).join('0')}${text}`.substr(mid < 0 ? 0 : mid)}0000`.substr(0, 4);
  //const units = SI[SI_MID].text;
  const units = text !== '0' && si.power !== 0 ? si.value + 'NODL' : 'NODL';
  return `${formatDecimal(prefix || '0')}.${postfix} ${units}`;
   */
};
export const normalizeDenominated = (value: number | string = '0', decimals = DEFAULT_DECIMALS): string => {
  const text = (value || '0').toString().padStart(decimals, '0');
  let postfix = text.slice(text.length - decimals);
  const prefix = text.replace(postfix, '') || '0';
  postfix = removeZeroPadding(postfix);
  const result = `${prefix}.${postfix}`;
  return result + ' NODL';
};

export function removeZeroPadding(string: string | number): string {
  let text = string.toString();
  for (let i = text.length - 1; i > 0; i--) {
    if (text[i] === '0') {
      text = text.slice(0, i);
    } else {
      break;
    }
  }
  return text;
}
export function numberWithCommas(x: string | number): string {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//eslint-disable-next-line
export function calcSi(text: string, decimals: number): any {
  const siDefIndex = SI_MID - 1 + Math.ceil((text.length - decimals) / 3);

  return SI[siDefIndex] || SI[siDefIndex < 0 ? 0 : SI.length - 1];
}

const NUMBER_REGEX = new RegExp('(\\d+?)(?=(\\d{3})+(?!\\d)|$)', 'g');

export function formatDecimal(value: string): string {
  const matched = value.match(NUMBER_REGEX);

  return matched ? `${matched.join(',')}` : value;
}

export const capitalize = (string: string): string => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const stringifyValues = queryString.stringify;

export function changeAddressPrefix(address: string): [string, Error] {
  try {
    const decoded = decodeAddress(address);
    return [encodeAddress(decoded, Number(process.env.REACT_APP_OMNI_SS58_FORMAT) || SS58_FORMAT), null];
  } catch (e) {
    return [address, e];
  }
}
