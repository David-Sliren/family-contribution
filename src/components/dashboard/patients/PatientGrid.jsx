"use client";

import { useRef, useState } from "react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { AnimationEmpty } from "@/lottie-files/components/AnimationEmpty";
import { GlassPaginationBasic } from "@/components/ui/glass-componenst/GlassPagination";
import { useAllPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import { PatientCard } from "./PatientCard";
import { PatientImageDialog } from "./PatientImageDialog";
import { UpdatePatientDialog } from "./UpdatePatientDialog";

export function PatientGrid() {
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: true }),
  );
  const { data: patients } = useAllPatientQuery({ search, page, limit: 10 });
  const [patientToEdit, setPatientToEdit] = useState({});
  const [patientToPhoto, setPatientToPhoto] = useState({});
  const dialogRef = useRef(null);
  const imageDialogRef = useRef(null);

  function handleEdit(patient) {
    setPatientToEdit(patient);
    dialogRef.current?.showModal();
  }

  function handleChangeImage(patient) {
    setPatientToPhoto(patient);
    imageDialogRef.current?.showModal();
  }

  function handleNextPage() {
    setPage((old) => old + 1);
  }

  function handlePrevPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  if (!patients.data.length)
    return <AnimationEmpty title="No hay pacientes registrados" />;

  return (
    <section className="space-y-2.5">
      <section className="flex flex-col justify-between min-h-140 sm:overflow-y-auto scroll-hiden space-y-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UpdatePatientDialog patient={patientToEdit} dialogRef={dialogRef} />
          <PatientImageDialog
            patient={patientToPhoto}
            dialogRef={imageDialogRef}
          />
          {patients.data.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEdit}
              onChangeImage={handleChangeImage}
            />
          ))}
        </div>
      </section>

      <GlassPaginationBasic
        pageNumber={page}
        totalPages={patients.pagination.totalPages}
        hasNext={patients.pagination.hasNextPage}
        hasPrev={patients.pagination.hasPrevPage}
        handleNext={handleNextPage}
        handlePrev={handlePrevPage}
      />
    </section>
  );
}
