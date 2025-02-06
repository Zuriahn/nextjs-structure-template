import LoginUserForm from "@/components/forms/login.user";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if(session){
    redirect("/author")
  }

  return (
    <Box sx={{ width: "100%", border: 1, borderRadius: 2 }}>
        <LoginUserForm />
    </Box>
  );
}
