import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendAppointmentEmail({
  to,
  status,
  motivo,
  nombres,
  universidad,
  fecha,
  hora,
}: {
  to: string;
  status: "confirmed" | "cancelled" | "rejected";
  motivo?: string | null;
  nombres: string;
  universidad: string;
  fecha: string;
  hora: string;
}) {
  const subject =
    status === "confirmed"
      ? "✅ Cita Confirmada"
      : status === "cancelled"
      ? "❌ Cita Cancelada"
      : "⚠️ Cita Rechazada";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6">
      <h2>${subject}</h2>
      <p>Estimado/a <strong>${nombres}</strong> (${universidad}),</p>
      <p>Su cita programada para <b>${fecha}</b> a las <b>${hora}</b> ha sido <b>${
    status === "confirmed" ? "confirmada" : status === "cancelled" ? "cancelada" : "rechazada"
  }</b>.</p>
      ${
        motivo
          ? `<p><strong>Motivo:</strong> ${motivo}</p>`
          : ""
      }
      <p>Atentamente,<br>Equipo de Educalidad SAS</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
}
