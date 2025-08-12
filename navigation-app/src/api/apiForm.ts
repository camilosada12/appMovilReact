import { BOOK_END_POINT } from "../constants/endpoints";

export const createEntity = async <T>(register: T, endpoint: string) => {
    try {
        const response = await fetch(`${BOOK_END_POINT}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la API: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllEntity = async <T>(endpoint: string): Promise<T[]> => {
    try {
        const response = await fetch(`${BOOK_END_POINT}${endpoint}`);
        if (!response.ok) throw new Error("Error al listar los registros");

        const data = await response.json();
        console.log("DATA CRUDO:", data);

        if (Array.isArray(data)) {
            return data;
        } else {
            console.warn("La respuesta no es un array, retorno []");
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};



export const getByIdEntity = async <T>(id: number, endpoint: string): Promise<T> => {
    try {
        const response = await fetch(`${BOOK_END_POINT}${endpoint}/${id}`);
        if (!response.ok) throw new Error("Error al obtener el registro");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateEntity = async <T>(register: T, endpoint: string) => {
    const url = `${BOOK_END_POINT}${endpoint}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // Si usas JWT, descomenta y pasa el token
            // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(register),
    });

    // Lee SIEMPRE el cuerpo una sola vez
    const raw = await response.text();
    let body: any = null;
    if (raw) {
        try { body = JSON.parse(raw); } catch { body = raw; }
    }

    if (!response.ok) {
        const message =
            (body && (body.error || body.message)) ||
            `${response.status} ${response.statusText}`;
        const err: any = new Error(message);
        err.status = response.status;
        err.url = url;
        err.body = body;
        throw err;
    }

    // Puede venir vacío (Ok() sin contenido)
    return body ?? null;
};


export const deleteEntity = async (id: number, endpoint: string, mode: "fisico" | "Logical" = "fisico") => {
    try {
        const response = await fetch(`${BOOK_END_POINT}${endpoint}/${id}?mode=${mode}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el registro");

        // Si el backend no devuelve contenido (solo 200 OK vacío), evita hacer .json()
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllDynamic = async <T>(endpoint: string): Promise<T[]> => {
    try {
        const response = await fetch(`${BOOK_END_POINT}${endpoint}/dynamic`);
        if (!response.ok) throw new Error("Error al listar los registros dinámicos");

        const data = await response.json();
        console.log("DYNAMIC DATA:", data);

        return Array.isArray(data) ? (data as T[]) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};
