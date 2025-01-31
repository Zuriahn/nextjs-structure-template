
export interface IAuthorDto{
    id: string,
    name: string,
    phoneNumber: string,
    address: {
        country: string,
        state: string,
        street: string,
        number: string,
        zipcode: string
    }
}