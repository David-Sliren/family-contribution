import React from "react";

/*
  TemplateEmail — plantilla de correo transaccional reutilizable.
  Sigue DESIGN.md (paleta tonal M3 + gradiente de marca en el CTA), pero con
  ESTILOS INLINE: el HTML de correo no procesa Tailwind ni clases externas.
  Se renderiza en servidor con renderToStaticMarkup (ver src/utils/email.js).
  Usada por la verificación de email y la recuperación de contraseña.
*/

const DISPLAY_FONT = "'Montserrat Alternates', 'Inter', Arial, Helvetica, sans-serif";
const BODY_FONT = "'Inter', Arial, Helvetica, sans-serif";
const BRAND = "Aleida | Contribucion";

export const TemplateEmail = ({
  title = "",
  message = "",
  userName = "",
  buttonText = "",
  buttonUrl = "",
  note = "",
  footerText = "Este correo fue generado automáticamente por la plataforma Aleida | Contribucion. No respondas a este mensaje.",
}) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#faf8fd", // surface
        padding: "32px 16px",
        fontFamily: BODY_FONT,
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          backgroundColor: "#ffffff", // surface-container-lowest
          borderRadius: "2rem",
          overflow: "hidden",
          border: "1px solid rgba(204, 195, 215, 0.35)", // outline-variant
          boxShadow: "0 4px 24px rgba(110, 54, 210, 0.06)", // tonal-shadow-sm
        }}
      >
        {/* Header de marca — gradiente primario (DESIGN.md §3.2) */}
        <div
          style={{
            background: "linear-gradient(120deg, #6e36d2, #8854ed)",
            padding: "36px 40px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255, 251, 255, 0.85)",
            }}
          >
            {BRAND}
          </p>
          <h1
            style={{
              margin: "10px 0 0",
              fontFamily: DISPLAY_FONT,
              fontSize: "26px",
              lineHeight: 1.25,
              fontWeight: 700,
              color: "#fffbff", // on-primary-container
            }}
          >
            {title}
          </h1>
        </div>

        {/* Cuerpo */}
        <div style={{ padding: "36px 40px 40px" }}>
          {userName && (
            <p
              style={{
                margin: "0 0 12px",
                fontSize: "15px",
                lineHeight: 1.6,
                color: "#1b1b1f", // on-surface
              }}
            >
              Hola <strong>{userName}</strong>,
            </p>
          )}
          <p
            style={{
              margin: "0 0 28px",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#4a4454", // on-surface-variant
            }}
          >
            {message}
          </p>

          {buttonText && buttonUrl && (
            <p style={{ margin: "0 0 18px", textAlign: "center" }}>
              <a
                href={buttonUrl}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(120deg, #6e36d2, #8854ed)",
                  backgroundColor: "#6e36d2", // fallback para clientes sin gradiente
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  padding: "14px 32px",
                  borderRadius: "999px",
                }}
              >
                {buttonText}
              </a>
            </p>
          )}

          {note && (
            <p
              style={{
                display: "inline-block",
                margin: "0 0 18px",
                padding: "6px 14px",
                borderRadius: "999px",
                backgroundColor: "#ebddff", // secondary-fixed
                color: "#552f9a", // on-secondary-fixed-variant
                fontSize: "12px",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              {note}
            </p>
          )}

          {buttonUrl && (
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                lineHeight: 1.5,
                color: "#7b7486", // outline
                textAlign: "center",
              }}
            >
              Si el botón no funciona, copia este enlace en tu navegador:
              <br />
              <span style={{ wordBreak: "break-all" }}>{buttonUrl}</span>
            </p>
          )}
        </div>

        {/* Pie */}
        <div
          style={{
            padding: "18px 40px 28px",
            borderTop: "1px solid #e3e2e6", // surface-variant
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              lineHeight: 1.5,
              color: "#7b7486", // outline
            }}
          >
            {footerText}
          </p>
        </div>
      </div>
    </div>
  );
};
