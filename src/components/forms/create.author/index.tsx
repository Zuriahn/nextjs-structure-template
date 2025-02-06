import { Box, Button, Typography } from "@mui/material";
import TextfieldForm from "@/components/textfields/text.form";
import { schemaForm } from "./validators";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateAuthorDto } from "@/entities/author/create.author.dto";
import { useTransition } from "react";
import { createAuthor } from "@/services/author/create";
import { useGlobalContext } from "@/context/global.context";

export default function CreateAuthorForm() {
  const { showError } = useGlobalContext();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaForm) });

  const [isPending, startTransition] = useTransition();

  function onSubmitForm(data: ICreateAuthorDto) {
    startTransition(async () => {
      try {
        await createAuthor(data);
      } catch (error: any) {
        showError(error);
      }
    });
  }

  function handleErrorsForm(errors: any) {}

  return (
    <Box>
      <Typography variant={"subtitle1"} sx={{ textAlign: "center" }}>
        Form Author
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
            name={"Name Author"}
            errorMsg={errors.name?.message}
            onError={Boolean(errors.name)}
            size={"small"}
            title={"Name"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("name", value);
            }}
          />
          <TextfieldForm
            disabled={false}
            name={"Phone number author"}
            errorMsg={errors.phoneNumber?.message}
            onError={Boolean(errors.phoneNumber)}
            size={"small"}
            title={"PhoneNumber"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("phoneNumber", value);
            }}
          />
        </Box>

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
            name={"Address Country"}
            errorMsg={errors.country?.message}
            onError={Boolean(errors.country)}
            size={"small"}
            title={"Country"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("country", value);
            }}
          />
          <TextfieldForm
            disabled={false}
            name={"Address State"}
            errorMsg={errors.state?.message}
            onError={Boolean(errors.state)}
            size={"small"}
            title={"State"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("state", value);
            }}
          />
          <TextfieldForm
            disabled={false}
            name={"Address Street"}
            errorMsg={errors.street?.message}
            onError={Boolean(errors.street)}
            size={"small"}
            title={"Street"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("street", value);
            }}
          />
          <TextfieldForm
            disabled={false}
            name={"Address Number"}
            errorMsg={errors.number?.message}
            onError={Boolean(errors.number)}
            size={"small"}
            title={"Number"}
            defaultValue={undefined}
            type={"number"}
            funReturnValue={(value) => {
              setValue("number", value);
            }}
          />
          <TextfieldForm
            disabled={false}
            name={"Address Zipcode"}
            errorMsg={errors.zipcode?.message}
            onError={Boolean(errors.zipcode)}
            size={"small"}
            title={"Zipcode"}
            defaultValue={undefined}
            type={"text"}
            funReturnValue={(value) => {
              setValue("zipcode", value);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant={"outlined"} type={"submit"}>
            Submit form
          </Button>
        </Box>
      </form>
    </Box>
  );
}
