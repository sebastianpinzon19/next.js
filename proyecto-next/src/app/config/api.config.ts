export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000',
  endpoints: {
    clientes: {
      base: '/api/clientes',
      delete: (id: string) => `/api/clientes/${id}`,
    },
  },
};
