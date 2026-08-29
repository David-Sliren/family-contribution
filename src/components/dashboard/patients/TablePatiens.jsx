"use client";

import { useRef, useState } from "react";
import { useAllPatientQuery } from "@/hooks/tanstack/query/useQueryPatient";
import { usePagination } from "@/hooks/usePagination";

import { FooterButton } from "@/components/ui/table/FooterButton";
import { UpdatePatientDialog } from "./UpdatePatientDialog";
import {
  Table,
  Thead,
  Th,
  TBody,
  RowBody,
  Td,
  Rowhead,
} from "@/components/ui/table/Table";

const RowPatient = ({ patient, handdler }) => {
  return (
    <RowBody
      classname={{
        "bg-secondary-container": patient.id !== 0 && patient.id % 2 === 0,
      }}
    >
      <Td className="cursor-pointer" onClick={() => handdler(patient)}>
        {patient.name || "indefinido"}
      </Td>
      <Td>{patient.lastName || "indefinido"} </Td>
      <Td>{patient.age || "indefinido"}</Td>
      <Td>{patient.clinicName || "Indefinida"}</Td>
      <Td>{patient.isMain ? "Si" : "No"}</Td>
    </RowBody>
  );
};

export const TablePatiens = () => {
  const { data, isLoading } = useAllPatientQuery();
  const [editPatient, setEditPatient] = useState({});
  const dialogRef = useRef(null);
  const {
    page,
    nextPage,
    prevPage,
    startIndex,
    endIndex,
    isFirstPage,
    islastPage,
    totalPages,
  } = usePagination(data?.length ?? 1, 10);

  const viewData = data.slice(startIndex, endIndex);

  function handdlerEditPatient(patient) {
    setEditPatient(patient);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <Table
        className="rounded-2xl"
        isLoading={isLoading}
        hasData={data?.length}
        emptyTitle="No hay pacientes"
      >
        <Thead className="bg-primary-container">
          <Rowhead>
            <Th text="Nombre" />
            <Th text="Apellido" />
            <Th text="edad" />
            <Th text="clinica" />
            <Th text="principal" />
          </Rowhead>
        </Thead>
        <TBody>
          {viewData.map((pt) => (
            <RowPatient
              key={pt.id}
              patient={pt}
              handdler={handdlerEditPatient}
            />
          ))}
        </TBody>
      </Table>
      <UpdatePatientDialog patient={editPatient} dialogRef={dialogRef} />
      <FooterButton
        next={nextPage}
        prev={prevPage}
        current={page + 1}
        last={totalPages}
        isLastPage={islastPage}
        isFirstPage={isFirstPage}
      />
    </>
  );
};
