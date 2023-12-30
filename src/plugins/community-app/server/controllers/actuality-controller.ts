import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("community-app")
      .service("myService")
      .getWelcomeMessage();
  },
  async findMany(ctx) {
    ctx.body = await strapi
      .plugin("community-app")
      .service("actualityService")
      .findMany({});
  },
  async findOne(ctx) {
    const id = ctx.params.id;
    ctx.body = await strapi
      .plugin("community-app")
      .service("actualityService")
      .findOne(id);
  },
  async create(ctx) {
    ctx.body = await strapi
      .plugin("community-app")
      .service("actualityService")
      .create(ctx.request.body);
  },
  async update(ctx) {
    const id = ctx.params.id;
    const data =  ctx.request.body;
    ctx.body = await strapi
      .plugin("community-app")
      .service("actualityService")
      .update(id, data);
  },
  async delete(ctx) {
    ctx.body = await strapi
      .plugin("community-app")
      .service("actualityService")
      .delete(ctx.params.id);
  },
});
