
import { Box } from "@mui/material";

import AuthorContainerHome from "@/components/containers/author.container";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Author() {
  const session = await getServerSession();

  if(!session){
    redirect("/");
  }

  return (
    <Box>
      <AuthorContainerHome />
    </Box>
  );
}
