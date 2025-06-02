import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import pkg from '../../../../package.json';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactResponse {
  status: string;
  message: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    followUp: boolean;
    leadConverted: boolean;
    leadNotConverted: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${pkg.baseUrl}`, 
  }),
  endpoints: (builder) => ({
    submitContact: builder.mutation<ContactResponse, ContactForm>({
      query: (contactData) => ({
        url: '/contact/addContact', 
        method: 'POST',
        body: contactData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useSubmitContactMutation } = contactApi;

export default contactApi;
