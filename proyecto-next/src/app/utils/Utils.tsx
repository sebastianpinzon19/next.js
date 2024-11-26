import { API_CONFIG } from '../config/api.config';

// Función existente de normalización de texto
export function normalizeText(input: string): string {
    if (typeof input !== 'string') {
        throw new TypeError("Input must be a string");
    }

    const from = "séáíóúüñÑ";
    const to = "seaiounn";

    const mapping = new Map<string, string>();
    for (let i = 0; i < from.length; i++) {
        mapping.set(from[i], to[i]);
    }

    const result = input
        .replace(/\s+/g, '')
        .split('')
        .map(char => mapping.get(char) || char)
        .join('')
        .toLowerCase();

    return result;
}

// Nueva función para manejar errores HTTP
export function handleHttpError(status: number): string {
    const errorMessages: { [key: string]: string } = {
        400: 'Solicitud incorrecta',
        401: 'No autorizado',
        403: 'Acceso prohibido',
        404: 'No encontrado',
        500: 'Error interno del servidor',
        default: 'Error desconocido'
    };
    return errorMessages[status.toString()] || errorMessages.default;
}

// Función para hacer peticiones a la API
export async function fetchApi<T>(
    endpoint: string, 
    options: RequestInit = {}
): Promise<T> {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = handleHttpError(response.status);
            throw new Error(error);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en la API:', error);
        throw error;
    }
}

// Función para validar campos requeridos
export function validateRequired(fields: Record<string, any>): string[] {
    const errors: string[] = [];
    Object.entries(fields).forEach(([key, value]) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            errors.push(`El campo ${key} es requerido`);
        }
    });
    return errors;
}

// Función para formatear fechas
export function formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para manejar errores de forma consistente
export function handleError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return 'Ha ocurrido un error inesperado';
}
