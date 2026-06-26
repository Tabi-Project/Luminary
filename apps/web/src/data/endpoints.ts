export const endpoints = {
  auth: {
    login: "/auth/login",
    adminLogin: "/auth/admin/login",
  },
  nomination: {
    create: "/nomination",
  },
  upload: "/upload",
  categories: {
    get: "/api/categories",
  },
  articles: {
    get: "/articles",
  },
  admin: {
    nominations: {
      getNominations: "/admin/nominations",
    },
  },
};
