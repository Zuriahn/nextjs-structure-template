import * as yup from "yup";

export const schemaForm = yup.object().shape({
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    street: yup.string().required(),
    number: yup.number().required(),
    zipcode: yup.string().required()
})