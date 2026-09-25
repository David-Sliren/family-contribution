"use client";

import { ListContainer } from "@/components/ui/containers/ListContainer";
import React, { useRef, useState } from "react";
import { UpdateContributionDialog } from "./UpdateContributionDialog";
import { ContributionCard } from "./ContributionCard";
import { useContributionQueryAll } from "@/hooks/tanstack/query/useQueryContribution";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";
import { useQueryState } from "nuqs";
import { parseAsString, parseAsInteger } from "nuqs";
import { GlassPaginationBasic } from "@/components/ui/glass-componenst/GlassPagination";

export const ContributionList = () => {
  const [purpose] = useQueryState("purpose", parseAsString.withDefault(""));
  const [method] = useQueryState("method", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: true }),
  );
  const [editContribution, setEditContribution] = useState(null);
  const dialogRef = useRef(null);
  const { data: contributions } = useContributionQueryAll({
    purpose,
    method,
    status,
    page,
    limit: 10,
  });
  const pagination = contributions.pagination;

  function handleEditContribution(contribution) {
    setEditContribution(contribution);
    dialogRef.current?.showModal();
  }

  function handleNextPage() {
    setPage((old) => old + 1);
  }

  function handlePrevPage() {
    setPage((old) => Math.max(old - 1, 1));
  }

  return (
    <section className="xl:max-w-8/15 space-y-2.5">
      {!contributions.data.length ? (
        <AnimationEmpy title="No hay contribuciones" />
      ) : (
        <>
          <ListContainer>
            <UpdateContributionDialog
              contribution={editContribution}
              dialogRef={dialogRef}
            />
            {contributions.data?.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
                handdler={handleEditContribution}
              />
            ))}
          </ListContainer>

          <GlassPaginationBasic
            pageNumber={page}
            totalPages={pagination.totalPages}
            hasNext={pagination.hasNextPage}
            hasPrev={pagination.hasPrevPage}
            handleNext={handleNextPage}
            handlePrev={handlePrevPage}
          />
        </>
      )}
    </section>
  );
};