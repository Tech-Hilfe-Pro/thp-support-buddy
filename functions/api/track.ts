export const onRequestPost: PagesFunction = async (ctx) => {
  const enable = ctx.env?.ANALYTICS_ENABLE === "true";
  if (!enable) {
    return new Response(JSON.stringify({ ok: false, reason: "disabled" }), { 
      status: 204,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const token = ctx.env?.ANALYTICS_TOKEN;
    if (token) {
      const auth = ctx.request.headers.get("Authorization") || "";
      if (auth !== `Bearer ${token}`) {
        return new Response("unauthorized", { status: 401 });
      }
    }

    const body = await ctx.request.json();
    const evt = {
      ts: body?.ts || new Date().toISOString(),
      event: body?.event || "unknown",
      path: body?.path || "",
      href: body?.href || "",
      sid: body?.sid || "",
      props: body?.props || {},
      ip: ctx.request.headers.get("CF-Connecting-IP") || "",
      ua: body?.ua || ""
    };

    // Optional: persist to KV if bound
    try {
      const kv = (ctx.env as any)?.ANALYTICS_KV;
      if (kv && kv.put) {
        const key = `${evt.ts}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
        await kv.put(key, JSON.stringify(evt), { 
          expirationTtl: 60 * 60 * 24 * 30 // 30 Tage
        });
      } else {
        // Fallback: log only
        console.log("THP_EVT", evt.event, evt.path, evt.props);
      }
    } catch (e) {
      console.log("THP_EVT_LOG", evt.event, evt.path, evt.props);
    }

    return new Response(JSON.stringify({ ok: true }), { 
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { 
      status: 400, 
      headers: { "Content-Type": "application/json" }
    });
  }
};