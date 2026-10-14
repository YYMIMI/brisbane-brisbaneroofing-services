import translations from './locale-translations.json';
import routePairs from './locale-routes.json';
export const isChinese=(pathname:string)=>pathname==='/zh'||pathname.startsWith('/zh/');
const pairs=routePairs as Record<string,string>;
export const englishPath=(pathname:string)=>Object.entries(pairs).find(([,zh])=>zh===pathname)?.[0]||pathname;
export const chinesePath=(pathname:string)=>pairs[englishPath(pathname)]||pathname;
export function translate(text:string,pathname:string){
 if(!isChinese(pathname))return text;
 const trimmed=text.trim().replace(/\s+/g,' ');const translated=(translations as Record<string,string>)[trimmed];
 return translated===undefined?text:text.replace(text.trim(),translated);
}
export function localHref(href:unknown,pathname:string){
 if(typeof href!=='string'||!isChinese(pathname)||href.startsWith('#'))return href;
 try{const url=new URL(href,'https://www.melonebrisbaneroofing.com.au');if(['sms:','mailto:'].includes(url.protocol)){for(const key of ['subject','body']){const value=url.searchParams.get(key);if(value)url.searchParams.set(key,translate(value,pathname));}return url.href;}if(url.host!=='www.melonebrisbaneroofing.com.au'||!pairs[url.pathname])return href;return pairs[url.pathname]+url.search+url.hash;}catch{return href;}
}
export function localSchema(value:unknown,pathname:string,key=''):unknown{
 if(Array.isArray(value))return value.map(v=>localSchema(v,pathname,key));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,localSchema(v,pathname,k)]));
 if(typeof value==='string'&&['name','headline','description','text','serviceType','caption'].includes(key))return translate(value,pathname);
 if(typeof value==='string'&&isChinese(pathname)&&key==='inLanguage'&&value.startsWith('en'))return 'zh-Hans-AU';
 if(typeof value==='string'&&isChinese(pathname)&&['url','item','mainEntityOfPage'].includes(key)){
  const mapped=localHref(value,pathname);
  if(typeof mapped==='string'&&mapped!==value)return value.startsWith('http')?new URL(mapped,'https://www.melonebrisbaneroofing.com.au').href:mapped;
 }
 return value;
}
