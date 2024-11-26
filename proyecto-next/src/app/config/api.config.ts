export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  endpoints: {
    clientes: {
      base: '/api/clientes',
      delete: (id: string) => `/api/clientes/${id}`,
    },
    proveedores: {
      base: '/api/proveedores',
    },
  },
};
