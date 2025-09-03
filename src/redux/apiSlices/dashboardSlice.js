// src/redux/apiSlices/dashboardSlice.js
import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPigeons: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/pigeon?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const pigeons = response?.data?.data?.map((pigeon) => ({
          key: pigeon._id,
          image: pigeon.photos?.[0] ? `${pigeon.photos[0]}` : "",
          name: pigeon.name,
          country: { name: pigeon.country, icon: "" }, // add icon if available
          breeder: pigeon.breeder,
          ringNumber: pigeon.ringNumber,
          birthYear: pigeon.birthYear,
          father: pigeon.fatherRingId
            ? `${pigeon.fatherRingId.ringNumber} (${pigeon.fatherRingId.name})`
            : "-",
          mother: pigeon.motherRingId
            ? `${pigeon.motherRingId.ringNumber} (${pigeon.motherRingId.name})`
            : "-",
          gender: pigeon.gender,
          status: pigeon.status,
          verified: pigeon.verified ? "Yes" : "No",
          icon: pigeon.verified ? "/assets/verify.png" : "",
        }));
        return {
          pigeons,
          pagination: response?.data?.pagination || {},
        };
      },
    }),
  }),
});

export const { useGetPigeonsQuery } = dashboardSlice;
