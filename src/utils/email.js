import { GMAIL_USER, GMAIL_APP_PASSWORD } from "@/constants/env";
import { TemplateEmail } from "@/components/ui/email/TemplateEmail";
import nodemailer from "nodemailer";

/*
  Utilidad de envío de correos (SOLO SERVIDOR — no importar desde componentes
  cliente; para eso está src/utils/handlers.js). Renderiza TemplateEmail con
  renderToStaticMarkup y lo envía vía SMTP de Gmail (Nodemailer).
*/

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

async function renderTemplate(templateProps = {}) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const markup = renderToStaticMarkup(<TemplateEmail {...templateProps} />);
  return `<!DOCTYPE html>${markup}`;
}

export async function sendEmail({ toEmail = "", subject = "", template = {} }) {
  try {
    const info = await transporter.sendMail({
      from: `"Contribucion Familiar" <${GMAIL_USER}>`,
      to: toEmail,
      subject,
      html: await renderTemplate(template),
    });

    return { data: info, error: null };
  } catch (err) {
    throw new Error(err.message || "No se pudo enviar el correo");
  }
}
