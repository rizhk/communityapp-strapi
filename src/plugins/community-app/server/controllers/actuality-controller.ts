import { Strapi } from "@strapi/strapi";
import sharedServices from "../services/sharedServices";

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
      .findMany({
        populate: ["cover", "document"], // specify the relations you want to include
      });
  },
  async findOne(ctx) {
    const id = ctx.params.id;

    ctx.body = await strapi
      .plugin("community-app")
      .service("actualityService")
      .findOne({
        id: id, // replace with the ID of the entity you want to fetch
        populate: ["cover", "document"], // specify the relations you want to include
      });
  },
  async create(ctx) {
    try {
      const columns = [
        "content",
        "title",
        "startDate",
        "endDate",
        "type",
        "cover",
        "document",
      ];
      const body = ctx.request.body;
      const filesSent = ctx.request.files;
      const bodyData: Record<string, any> = {};

      // Process the files...
      for (const file in filesSent) {
        if (filesSent[file].name !== "undefined") {
          const uploadedFile =
            await strapi.plugins.upload.services.upload.upload({
              data: {},
              files: filesSent[file],
            });
          // Now the file is uploaded and you have access to its info
          const fileObject = Array.isArray(uploadedFile)
            ? uploadedFile.pop()
            : uploadedFile;
          body[file] = fileObject.id;
        }
      }

      for (const column of columns) {
        bodyData[column] = body[column];
      }

      // Add listing to the database
      const entity = await strapi
        .plugin("community-app")
        .service("actualityService")
        .create({
          content: bodyData.content,
          title: bodyData.title,
          startDate: new Date(bodyData.startDate),
          endDate: new Date(bodyData.endDate),
          type: bodyData?.type,
          cover: bodyData?.cover,
          document: bodyData?.document,
        });

      // Return the created entity
      return entity;
    } catch (error) {
      console.error(error);
      ctx.throw(500, "An error occurred while processing your request.");
    }
  },
  async update(ctx) {
    try {
      const columns = [
        "content",
        "title",
        "startDate",
        "endDate",
        "type",
        "cover",
        "document",
      ];
      const id = ctx.params.id;
      const body = ctx.request.body;
      const filesSent = ctx.request.files;
      const bodyData: Record<string, any> = {};

      const oldActuality = await strapi
        .plugin("community-app")
        .service("actualityService")
        .findOne({
          id: id, // replace with the ID of the entity you want to fetch
          populate: ["cover", "document"], // specify the relations you want to include
        });
      // Process the files...
      for (const file in filesSent) {
        if (filesSent[file].name !== "undefined") {
          const uploadedFile =
            await strapi.plugins.upload.services.upload.upload({
              data: {},
              files: filesSent[file],
            });
          // Now the file is uploaded and you have access to its info
          const fileObject = Array.isArray(uploadedFile)
            ? uploadedFile.pop()
            : uploadedFile;
          body[file] = fileObject.id;
        }
      }

      for (const column of columns) {
        bodyData[column] = body[column];
      }

      // Add listing to the database
      const entity = await strapi
        .plugin("community-app")
        .service("actualityService")
        .update(id, {
          content: bodyData.content,
          title: bodyData.title,
          startDate: new Date(bodyData.startDate),
          endDate: new Date(bodyData.endDate),
          type: bodyData?.type,
          cover: bodyData?.cover,
          document: bodyData.document,
        });

      if (
        bodyData["cover"] &&
        oldActuality &&
        oldActuality?.document &&
        oldActuality.document?.id
      ) {
        await sharedServices({ strapi }).deleteFile(oldActuality.document?.id);
      }
      if (
        bodyData["document"] &&
        oldActuality &&
        oldActuality?.cover &&
        oldActuality.cover?.id
      ) {
        await sharedServices({ strapi }).deleteFile(oldActuality.cover?.id);
      }

      // Return the created entity
      return entity;
    } catch (error) {
      console.error(error);
      ctx.throw(500, "An error occurred while processing your request.");
    }
  },
  async delete(ctx) {
    const oldActuality = await strapi
      .plugin("community-app")
      .service("actualityService")
      .findOne({
        id: ctx.params.id, // replace with the ID of the entity you want to fetch
        populate: ["cover", "document"], // specify the relations you want to include
      });
    const actuality = await strapi
      .plugin("community-app")
      .service("actualityService")
      .delete(ctx.params.id);

    if (oldActuality && oldActuality?.document && oldActuality.document?.id) {
      await sharedServices({ strapi }).deleteFile(oldActuality.document?.id);
    }
    if (oldActuality && oldActuality?.cover && oldActuality.cover?.id) {
      await sharedServices({ strapi }).deleteFile(oldActuality.cover?.id);
    }
  },
});
