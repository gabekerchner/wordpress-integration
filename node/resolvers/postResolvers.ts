/* eslint-disable @typescript-eslint/camelcase */
export const postResolvers = {
  author: async ({ author }: { author: number }, _: any, ctx: Context) => {
    const {
      clients: { wordpressProxy },
    } = ctx
    try {
      return await wordpressProxy.getUser(author)
    } catch (e) {
      console.error(e)
    }
    return null
  },
  categories: async (
    { categories }: { categories: [number] },
    _: any,
    ctx: Context
  ) => {
    const {
      clients: { wordpressProxy },
    } = ctx
    return categories.map(id => wordpressProxy.getCategory(id))
  },
  tags: async ({ tags }: { tags: [number] }, _: any, ctx: Context) => {
    const {
      clients: { wordpressProxy },
    } = ctx
    return tags.map(id => wordpressProxy.getTag(id))
  },
  featured_media: async (
    { featured_media }: { featured_media: number },
    _: any,
    ctx: Context
  ) => {
    const {
      clients: { wordpressProxy },
    } = ctx
    if (featured_media > 0) {
      try {
        return await wordpressProxy.getMediaSingle(featured_media)
      } catch (e) {
        console.error(e)
      }
    }
    return null
  },
}
