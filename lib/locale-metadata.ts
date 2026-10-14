import type {Metadata} from 'next';
import entries from './locale-metadata.json';
import {chinesePath,englishPath,isChinese,translate} from './locale';
import {business} from '@/app/site-data';
const site={domain:business.siteUrl};
export function pageMetadata(pathname:string,base:Metadata):Metadata{
 const en=englishPath(pathname);const data=(entries as Record<string,{title:string;description:string;og:Record<string,string>;twitter:Record<string,string>}>)[en];if(!data)return {...base,robots:{index:false,follow:false}};
 const title=translate(data.title,pathname);const description=translate(data.description,pathname);const zh=chinesePath(en);const url=site.domain+pathname;
 return {...base,title:{absolute:title},description,alternates:{canonical:url,languages:{'en-AU':site.domain+en,'zh-Hans-AU':site.domain+zh,'x-default':site.domain+en}},openGraph:{...base.openGraph,title:translate(data.og.title||data.title,pathname),description:translate(data.og.description||data.description,pathname),url,locale:isChinese(pathname)?'zh_CN':'en_AU',images:data.og.image?[{url:data.og.image,width:Number(data.og['image:width'])||1736,height:Number(data.og['image:height'])||907,alt:translate(data.og['image:alt']||'',pathname)}]:undefined},twitter:{...base.twitter,title:translate(data.twitter.title||data.title,pathname),description:translate(data.twitter.description||data.description,pathname)},robots:{index:true,follow:true}};
}
