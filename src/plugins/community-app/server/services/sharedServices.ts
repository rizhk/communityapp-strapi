import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async deleteFile(id: string) {
    try {
      // Find the file entry from Strapi.
      const fileEntry = await strapi.db?.query("plugin::upload.file").findOne({
        where: { id: id },
      });

      // Delete the actual file from the upload folder.
      await strapi.plugins.upload.services.upload.remove(fileEntry);

      // Delete the file entry from Strapi.
      await strapi.db?.query("plugin::upload.file").delete({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  },
});
