export default {
  "community-app-routes": {
    type: "content-api",
    routes: [
      {
        method: "GET",
        path: "/",
        handler: "myController.index",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/actualities",
        handler: "ActualityController.findMany",
        config: {
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/actualities/:id",
        handler: "ActualityController.findOne",
        config: {
          policies: [],
        },
      },
      {
        method: "PUT",
        path: "/actualities/:id",
        handler: "ActualityController.update",
        config: {
          policies: [],
        },
      },
      {
        method: "POST",
        path: "/actualities",
        handler: "ActualityController.create",
        config: {
          policies: [],
        },
      },
      {
        method: "DELETE",
        path: "/actualities/:id",
        handler: "ActualityController.delete",
        config: {
          policies: [],
        },
      },
    ],
  },
};
