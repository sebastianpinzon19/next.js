'use client';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/app/utils/Utils';
import { API_CONFIG } from '@/app/config/api.config';
import { Proveedor } from '@/app/types/Proveedor.type';

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  useEffect(() => {
    const cargarProveedores = async () => {
      try {
        const data = await fetchApi<Proveedor[]>(API_CONFIG.endpoints.proveedores.base);
        setProveedores(data);
      } catch (error) {
        console.error('Error al cargar proveedores:', error);
      }
    };

    cargarProveedores();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Proveedores</h1>
      {proveedores.length > 0 ? (
        <ul>
          {proveedores.map((proveedor) => (
            <li key={proveedor.id}>{proveedor.nombre_proveedor}</li>
          ))}
        </ul>
      ) : (
        <p>No hay proveedores disponibles.</p>
      )}
    </div>
  );
}
