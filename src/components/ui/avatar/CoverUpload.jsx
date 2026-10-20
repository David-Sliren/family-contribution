"use client";
import { blurColors } from "@/constants/bgBase64";
import { IMAGE_MIME_TYPES, fileImageFronted } from "@/schemas/file";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuCamera, LuImage } from "react-icons/lu";

const fileSignature = (f) => `${f.name}-${f.size}`;

/**
 * Subida de imagen tipo "cover" (banner). Versión ancha de AvatarUpload para
 * la foto de un paciente (ver DESIGN.md: Sección 5.3 y Sección 10 - Do).
 */
export const CoverUpload = ({
  image = "",
  alt = "Imagen del paciente",
  title = "Foto del paciente",
  description = "Formatos permitidos: JPG, PNG o WebP. Tamaño máximo: 3 MB.",
  changeLabel = "Cambiar imagen",
  removeLabel = "Eliminar",
  saveLabel = "Guardar imagen",
  onSave,
  className = "",
}) => {
  const inputRef = useRef(null);
  const previewRef = useRef("");
  const savedRef = useRef("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const currentImg = preview || image;

  function handleOpenPicker() {
    inputRef.current?.click();
  }

  function handleChange(event) {
    const selected = event.target.files?.[0];
    event.target.value = "";

    if (!selected) return;

    const parsed = fileImageFronted.safeParse({ file: selected });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    if (savedRef.current === fileSignature(selected)) {
      handleRemove();
      setError("Esta imagen ya fue guardada, elige otra");
      return;
    }

    if (previewRef.current) URL.revokeObjectURL(previewRef.current);

    const url = URL.createObjectURL(selected);
    previewRef.current = url;
    setFile(selected);
    setPreview(url);
    setError("");
  }

  function handleRemove() {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = "";
    setFile(null);
    setPreview("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file || !onSave || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSave(file);

      savedRef.current = fileSignature(file);
      setFile(null);
      setError("");
    } catch {
      // el padre ya notifica el error; se mantiene la selección para reintentar
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-4 bg-surface-container-low p-5 rounded-2xl ring-1 ring-outline-variant/15 animate-fade-in-up w-96 max-w-full",
        className,
      )}
    >
      <div className="relative group shrink-0">
        <button
          type="button"
          onClick={handleOpenPicker}
          className="relative w-full aspect-square rounded-2xl ring-4 ring-white shadow-tonal-sm overflow-hidden bg-primary/10 flex items-center justify-center text-primary cursor-pointer"
          title="Cambiar fotografía"
        >
          {currentImg ? (
            <Image
              src={currentImg}
              alt={alt}
              fill
              sizes="24rem"
              placeholder="blur"
              blurDataURL={blurColors.purple}
              className="object-cover"
            />
          ) : (
            <LuImage className="w-10 h-10" />
          )}
        </button>
        <span className="absolute bottom-0 right-0 p-2.5 bg-primary text-on-primary rounded-full shadow-lg ring-2 ring-white transition-transform group-active:scale-95 pointer-events-none">
          <LuCamera size={16} />
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <h3 className="text-sm font-semibold text-on-surface">{title}</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            {description}
          </p>
          {error && <p className="text-xs text-error mt-1">{error}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-surface-container-lowest border border-outline-variant rounded-full text-on-surface hover:bg-surface-container-high shadow-sm transition">
            {changeLabel}
            <input
              ref={inputRef}
              onChange={handleChange}
              accept={IMAGE_MIME_TYPES.join(",")}
              className="hidden"
              type="file"
            />
          </label>
          {file && (
            <>
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-1.5 text-xs font-medium text-error hover:bg-error/5 rounded-full transition cursor-pointer"
              >
                {removeLabel}
              </button>
              {onSave && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full shadow-tonal-sm transition disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Guardando..." : saveLabel}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </form>
  );
};
