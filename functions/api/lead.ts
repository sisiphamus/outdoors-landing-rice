interface Env {
  WAITLIST_EMAILS: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json() as Record<string, string>;
    const { name, email, company, type } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Store in KV
    const key = `${type || "lead"}_${Date.now()}`;
    await env.WAITLIST_EMAILS.put(key, JSON.stringify({
      name: name || "",
      email,
      company: company || "",
      type: type || "unknown",
      timestamp: new Date().toISOString(),
    }));

    // Send email notification via MailChannels (free on Cloudflare Workers)
    const subject = type === "demo"
      ? `Everest Demo Request: ${company || name || email}`
      : `Outdoors Waitlist: ${email}`;

    const text = type === "demo"
      ? `New demo request:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nTime: ${new Date().toISOString()}`
      : `New waitlist signup:\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`;

    await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: "at253@rice.edu", name: "Adam Towner" }] }],
        from: { email: "leads@tryoutdoors-rice.pages.dev", name: "Outdoors Rice Leads" },
        subject,
        content: [{ type: "text/plain", value: text }],
      }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
