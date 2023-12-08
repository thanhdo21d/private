import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBanner, IBannerDocs } from '~/types/banner/banner.type'
import { baseQueryWithReauth } from '../auth/signin.api'
const BannerApi = createApi({
  reducerPath: 'Banner',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['banner'],
  endpoints: (builder) => ({
    getAllBanners: builder.query<IBannerDocs, void>({
      query: () => '/banners',
      providesTags: ['banner']
    }),
    getIdBanners: builder.query<IBanner, string>({
      query: (id: string) => `/banners/${id}`,
      providesTags: ['banner']
    }),
    //add banner
    addBanner: builder.mutation<void, IBanner>({
      query: (banner) => ({
        url: '/banners',
        method: 'POST',
        body: banner
      }),
      invalidatesTags: ['banner']
    }),
    //delete image on server
    //delete banner
    deleteBanner: builder.mutation({
      query: (id: string) => ({
        url: `/banners/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['banner']
    }),
    updateBanner: builder.mutation({
      query: (banner) => ({
        url: `/banners/${banner._id}`,
        method: 'PUT',
        body: banner
      }),
      invalidatesTags: ['banner']
    }),
    upBanner: builder.mutation({
      query: (formData) => ({
        url: `/upload-banner`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['banner']
    })
  })
})
export const {
  useGetAllBannersQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetIdBannersQuery,
  useUpdateBannerMutation,
  useUpBannerMutation
} = BannerApi
export default BannerApi
