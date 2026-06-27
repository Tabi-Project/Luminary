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
      approve: (id: string) => `/admin/nominations/${id}/approve`,
      reject: (id: string) => `/admin/nominations/${id}/reject`,
      suspend: (id: string) => `/admin/nominations/${id}/suspend`,
    },
  },
};