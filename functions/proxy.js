export async function onRequest(context){
  const url = new URL(context.request.url).searchParams.get('url');
  if(!url) return new Response('Missing url', {status:400});
  const target = new URL(url);
  const headers = new Headers();
  headers.set('User-Agent','Mozilla/5.0');
  headers.set('Referer', target.origin + '/');
  headers.set('Origin', target.origin);
  // M3U এর জন্য Range হেডার লাগে না
  const res = await fetch(target.toString(), { headers });
  const newHeaders = new Headers(res.headers);
  newHeaders.set('Access-Control-Allow-Origin','*');
  newHeaders.set('Access-Control-Allow-Headers','*');
  return new Response(res.body, { status: res.status, headers: newHeaders });
}
