import {jsx as nativeJsx,Fragment} from 'react/jsx-runtime';
import {LocalizedElement} from '@/components/Localized';
export {Fragment};export type {JSX} from 'react';
export function jsx(type:Parameters<typeof nativeJsx>[0],props:Parameters<typeof nativeJsx>[1],key?:string){return nativeJsx(typeof type==='string'&&!['html','body','style'].includes(type)?LocalizedElement:type,typeof type==='string'&&!['html','body','style'].includes(type)?{...(props as object),tag:type}:props,key);}
export const jsxs=jsx;
