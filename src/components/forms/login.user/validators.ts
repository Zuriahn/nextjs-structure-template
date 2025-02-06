import * as yup from "yup";

export const schemaForm = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
})