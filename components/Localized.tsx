"use client";
import {createElement,type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import NextLink from 'next/link';
import NextImage from 'next/image';
import {chinesePath,englishPath,isChinese,localHref,localSchema,translate} from '@/lib/locale';
function children(value:ReactNode,path:string):ReactNode{return typeof value==='string'?translate(value,path):Array.isArray(value)?value.map(v=>children(v,path)):value;}
function propsFor(input:Record<string,unknown>,path:string,tag?:string){
 const p={...input};
 for(const key of ['alt','title','placeholder','aria-label'])if(typeof p[key]==='string')p[key]=translate(p[key] as string,path);
 p.children=children(p.children as ReactNode,path);
 if(p.href)p.href=localHref(p.href,path);
 if(tag==='form'&&String(p.method).toLowerCase()==='get'&&typeof p.action==='string')p.action=localHref(p.action,path);
 if(tag==='main')p.lang=isChinese(path)?'zh-Hans-AU':'en-AU';
 if(tag==='option'&&p.value===undefined&&typeof input.children==='string')p.value=input.children;
 if(typeof input.lang==='string'&&input.lang.startsWith('zh')&&input.href){p.href=isChinese(path)?englishPath(path):chinesePath(path);p.lang=isChinese(path)?'en-AU':'zh-Hans-AU';p.children=isChinese(path)?'English':'中文';}
 if(p.type==='application/ld+json'&&p.dangerouslySetInnerHTML){try{const raw=p.dangerouslySetInnerHTML as {__html:string};p.dangerouslySetInnerHTML={__html:JSON.stringify(localSchema(JSON.parse(raw.__html),path)).replace(/</g,'\\u003c')};}catch{}}
 return p;
}
export function LocalizedElement({tag,...props}:{tag:string;[key:string]:unknown}){const path=usePathname()||'/';return createElement(tag,propsFor(props,path,tag));}
export function LocalizedLink(props:React.ComponentProps<typeof NextLink>){const path=usePathname()||'/';return createElement(NextLink,propsFor(props as unknown as Record<string,unknown>,path) as unknown as React.ComponentProps<typeof NextLink>);}
export function LocalizedImage(props:React.ComponentProps<typeof NextImage>){const path=usePathname()||'/';return createElement(NextImage,propsFor(props as unknown as Record<string,unknown>,path) as unknown as React.ComponentProps<typeof NextImage>);}
