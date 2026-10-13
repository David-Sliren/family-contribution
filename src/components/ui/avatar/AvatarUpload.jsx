"use client";
import { blurColors } from "@/constants/bgBase64";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuCamera, LuUser } from "react-icons/lu";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 3;

export const AvatarUpload = ({
  img = "",
  alt = "Avatar",
  title = "Foto de perfil",
  description = "Formatos permitidos: JPG, PNG o WebP. Tamaño máximo: 3 MB.",
  changeLabel = "Cambiar imagen",
  removeLabel = "Eliminar",
  saveLabel = "Guardar imagen",
  onSave,
  className = "",
}) => {
  const inputRef = useRef(null);
  const previewRef = useRef("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  const currentImg = preview || img;

  function handleOpenPicker() {
    inputRef.current?.click();
  }

  function handleChange(event) {
    const selected = event.target.files?.[0];
    event.target.value = "";

    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Formato no permitido, usa JPG, PNG o WebP");
      return;
    }

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`La imagen no debe superar los ${MAX_SIZE_MB} MB`);
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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-slate-50/70 p-5 rounded-xl border border-slate-100 animate-fade-in-up",
        className,
      )}
    >
      <div className="relative group shrink-0">
        <button
          type="button"
          onClick={handleOpenPicker}
          className="w-24 h-24 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-indigo-100 flex items-center justify-center text-indigo-400 cursor-pointer"
          title="Cambiar fotografía"
        >
          {currentImg ? (
            <Image
              src={currentImg}
              alt={alt}
              width={96}
              height={96}
              placeholder="blur"
              blurDataURL={blurColors.purple}
              className="w-full h-full object-cover"
            />
          ) : (
            <LuUser className="w-10 h-10" />
          )}
        </button>
        <span className="absolute bottom-0 right-0 p-2.5 bg-indigo-600 group-hover:bg-indigo-700 text-white rounded-full shadow-lg ring-2 ring-white transition-transform group-active:scale-95 pointer-events-none">
          <LuCamera size={16} />
        </span>
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-sm transition">
            {changeLabel}
            <input
              ref={inputRef}
              onChange={handleChange}
              accept={ALLOWED_TYPES.join(",")}
              className="hidden"
              type="file"
            />
          </label>
          {file && (
            <>
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
              >
                {removeLabel}
              </button>
              {onSave && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition disabled:opacity-60"
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
