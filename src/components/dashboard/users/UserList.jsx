"use client";

import { ListContainer } from "@/components/ui/containers/ListContainer";
import React, { useRef, useState } from "react";
import { AddContributionDialog } from "./AddContributionDialog";
import { UserCard } from "./UserCard";
import { useUserQueryAll } from "@/hooks/tanstack/query/useQueryUser";
import { AnimationEmpy } from "@/lottie-files/components/AnimationEmpy";
import { useQueryState } from "nuqs";
import { parseAsString, parseAsInteger } from "nuqs";
import { GlassPaginationBasic } from "@/components/ui/glass-componenst/GlassPagination";

export const UserList = () => {
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [role] = useQueryState("role", parseAsString.withDefault(""));
  const [relationship] = useQueryState(
    "relationship",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ clearOnDefault: true, scroll: true }),
  );
  const [editUser, setEditUser] = useState({});
  const dialogRef = useRef(null);
  const { data: users } = useUserQueryAll({
    search,
    role,
    relationship,
    page,
    limit: 10,
  });
  const pagination = users.pagination;

  function handdlerEditUser(user) {
    setEditUser(user);
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
      {!users.data.length ? (
        <AnimationEmpy title="No hay usuarios" />
      ) : (
        <>
          <ListContainer>
            <AddContributionDialog user={editUser} dialogRef={dialogRef} />
            {users.data?.map((user) => (
              <UserCard key={user.id} user={user} handdler={handdlerEditUser} />
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