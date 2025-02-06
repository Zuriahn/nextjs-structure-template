"use client";

import { Box, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

export default function HeaderApp() {
  const session = useSession();

  if (session.status == "authenticated") {
    return (
      <Box
        sx={{
          width: "100%",
          border: 1,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mb: 4
        }}
      >
        <Button
          variant={"outlined"}
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          Log out
        </Button>
      </Box>
    );
  }

  if (session.status == "unauthenticated") {
    return undefined;
  }
}
