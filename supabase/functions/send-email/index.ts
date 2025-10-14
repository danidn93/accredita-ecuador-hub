import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer";

serve(async (req) => {
  const body = await req.json();
  const { to, status, motivo, nombres, universidad, fecha, hora } = body;

  const transporter = nodemailer.createTransport({
    host: Deno.env.get("SMTP_HOST")!,
    port: Number(Deno.env.get("SMTP_PORT") || "465"),
    secure: true,
    auth: {
      user: Deno.env.get("SMTP_USER")!,
      pass: Deno.env.get("SMTP_PASS")!,
    },
  });

  const subject =
    status === "confirmed"
      ? "✅ Cita Confirmada"
      : status === "cancelled"
      ? "❌ Cita Cancelada"
      : "⚠️ Cita Rechazada";

  const html = `
    <div style="font-family: Arial; line-height:1.6">
      <h2>${subject}</h2>
      <p>Estimado/a <b>${nombres}</b> (${universidad}),</p>
      <p>Su cita para <b>${fecha}</b> a las <b>${hora}</b> ha sido <b>${status}</b>.</p>
      ${motivo ? `<p><b>Motivo:</b> ${motivo}</p>` : ""}
    </div>`;

  await transporter.sendMail({
    from: Deno.env.get("SMTP_FROM"),
    to,
    subject,
    html,
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
