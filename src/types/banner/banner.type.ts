export interface IBannerDocs {
  banners: IBanner[]
}
export interface IBanner {
  data: {
    _id?: string
    url: string
    publicId: string
  }
}
