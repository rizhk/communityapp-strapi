import { Strapi } from "@strapi/types";

export default async ({ strapi }: { strapi: Strapi }) => {
  // Define the permissions
  const pluginPermissions = [
    {
      section: "plugins",
      displayName: "Welcome Message",
      uid: "actuality-controller.index",
      pluginName: "community-app",
    },
    {
      uid: "actuality-controller.find-many",
      displayName: "Actualities",
      section: "plugins",
      pluginName: "community-app",
    },
    {
      uid: "actuality-controller.find-one",
      displayName: "Read Actuality",
      section: "plugins",
      pluginName: "community-app",
    },
    {
      uid: "actuality-controller.create",
      displayName: "Create Actuality",
      section: "plugins",
      pluginName: "community-app",
    },
    {
      uid: "actuality-controller.update",
      displayName: "Update Actuality",
      section: "plugins",
      pluginName: "community-app",
    },
    {
      uid: "actuality-controller.delete",
      displayName: "Delete Actuality",
      section: "plugins",
      pluginName: "community-app",
    },
  ];

  // Register the permissions
  await strapi.admin?.services.permission.actionProvider.registerMany(
    pluginPermissions
  );
};
