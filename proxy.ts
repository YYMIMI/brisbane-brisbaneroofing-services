import {NextResponse,type NextRequest} from 'next/server';
export function proxy(request:NextRequest){const headers=new Headers(request.headers);headers.set('x-page-path',request.nextUrl.pathname);return NextResponse.next({request:{headers}});}
export const config={matcher:['/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml).*)']};
