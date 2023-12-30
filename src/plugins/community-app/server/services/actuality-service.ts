import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  findMany: async ({
    fields,
    filters,
    sort,
    populate,
    ...rest
  }: { fields ?: string[], filters ?: {}, sort ?: {}, populate ?: {}, [key: string]: any }) => {
    const actualities = await strapi.entityService?.findMany(
      "plugin::community-app.actuality",
      {}
    );
    console.log(actualities);
    return actualities;
  },
  create: async (data) => {
    const actuality = await strapi.entityService?.create(
      "plugin::community-app.actuality",
      { data: data }
    );
    console.log(actuality);
    return actuality;
  },
  update: async (id, data) => {
    const actuality = await strapi.entityService?.update(
      "plugin::community-app.actuality",
      id,
      { data: data }
    );
    console.log(actuality);
    return actuality;
  },
  delete: async (id) => {
    const actuality = await strapi.entityService?.delete(
      "plugin::community-app.actuality",
      id
    );
    console.log(id);
    return actuality;
  },
  findOne: async (id) => {
    const actuality = await strapi.entityService?.findOne(
      "plugin::community-app.actuality",
      id,
      {}
    );
    console.log(actuality);
    return actuality;
  },
});
