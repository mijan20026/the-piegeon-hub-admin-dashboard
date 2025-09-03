// src/redux/apiSlices/mypigeonSlice.js
import { api } from "../api/baseApi";

const mypigeonSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyPigeons: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/pigeon?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        const pigeons = response?.data?.data?.map((pigeon) => ({
          key: pigeon._id,
          image: pigeon.photos?.[0] ? pigeon.photos[0] : "",
          name: pigeon.name,
          country: { name: pigeon.country, icon: "" }, // flag optional
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
          color: pigeon.color,
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

export const { useGetMyPigeonsQuery } = mypigeonSlice;
