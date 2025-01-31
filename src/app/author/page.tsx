"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState, useTransition } from "react";

import { getAll } from "@/services/author/getAll";
import { IAuthorDto } from "@/entities/author/author.dto";

import { useGlobalError } from "@/context/global.error.context";
import CreateAuthorForm from "@/components/forms/create.author";

export default function Author() {
  const { showError } = useGlobalError();

  const [data, setData] = useState<IAuthorDto[]>([]);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getAll();
        setData(response);
      } catch (error: any) {
        showError(error);
      }
    });
  }, []);

  return (
    <Box sx={{ width: "100%", border: 1, borderRadius: 2 }}>
      {isPending ? undefined : (
        <>
          <Typography color={"textPrimary"} sx={{ textAlign: "center" }}>
            Author Page
          </Typography>
          <CreateAuthorForm />
          {data?.map((item, index) => (
            <Box key={`${index}-author-description`} sx={{ p: 4 }}>
              <Typography color={"textSecondary"}>
                Id: {`${item.id}`}
              </Typography>
              <Typography color={"textSecondary"}>
                Name: {`${item.name}`}
              </Typography>
              <Typography color={"textSecondary"}>
                Phone number: {`${item.phoneNumber}`}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color={"textSecondary"}>
                  Address country: {`${item.address.country}`}
                </Typography>
                <Typography color={"textSecondary"}>
                  Address state: {`${item.address.state}`}
                </Typography>
                <Typography color={"textSecondary"}>
                  Address street: {`${item.address.street}`}
                </Typography>
                <Typography color={"textSecondary"}>
                  Address number: {`${item.address.number}`}
                </Typography>
                <Typography color={"textSecondary"}>
                  Address zipcode: {`${item.address.zipcode}`}
                </Typography>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}
