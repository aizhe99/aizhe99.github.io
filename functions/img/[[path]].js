export async function onRequest(context) {
  const path = context.params.path.join("/");

  const object = await context.env.IMAGES.get(path);

  if (!object) {
    return new Response("not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", object.httpMetadata?.contentType || "image/jpeg");
  headers.set("Cache-Control", "public, max-age=86400");

  return new Response(object.body, { headers });
}
