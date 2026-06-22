// src/services/api.ts

import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "./axiosBaseQuery";

export const api = createApi({
  reducerPath: "api",

  baseQuery: axiosBaseQuery(),

  tagTypes: [
    "Auth",
    "Staff",
    "Appointment",
    "Customer",
    "Service",
  ],

  endpoints: () => ({}),
});