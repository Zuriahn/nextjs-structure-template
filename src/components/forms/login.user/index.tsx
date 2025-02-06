"use client";

import { Box, Button, Typography } from "@mui/material";
import TextfieldForm from "@/components/textfields/text.form";
import { schemaForm } from "./validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginForm } from "./interfaces";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useGlobalContext } from "@/context/global.context";
import { useRouter } from "next/navigation";

export default function LoginUserForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showError } = useGlobalContext();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaForm) });

  function onSubmitForm(data: ILoginForm) {
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          Email: data.email,
          Password: data.password,
        });
        if (result?.ok == false) throw new Error(result.error!);
        router.push("/author");
      } catch (error: any) {
        showError(error);
      }
    });
  }

  function handleErrorsForm(errors: any) {}

  return (
    <Box>
      <Typography variant={"subtitle1"} sx={{ textAlign: "center" }}>
        Login to the application
      </Typography>
      <form onSubmit={handleSubmit(onSubmitForm, handleErrorsForm)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            my: 2,
          }}
        >
          <TextfieldForm
            disabled={false}
            name={"Email account"}
            errorMsg={errors.email?.message}
            onError={Boolean(errors.email)}
            size={"small"}
            title={"Email"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("email", value);
            }}
          />
          <TextfieldForm
            disabled={false}
            name={"Password account"}
            errorMsg={errors.password?.message}
            onError={Boolean(errors.password)}
            size={"small"}
            title={"Password"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("password", value);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button disabled={isPending} variant={"outlined"} type={"submit"}>
            Sign in
          </Button>
        </Box>
      </form>
    </Box>
  );
}
