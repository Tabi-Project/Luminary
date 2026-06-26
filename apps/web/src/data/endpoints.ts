export const endpoints = {
  auth: {
    login: "/auth/login",
    adminLogin: "/auth/admin/login",
  },
  nomination: {
    create: "/nomination",
    get: "/nomination",
  },
  upload: "/upload",
  admin: {
    nominations: {
      getNominations: "/admin/nominations",
    },
  },
};
