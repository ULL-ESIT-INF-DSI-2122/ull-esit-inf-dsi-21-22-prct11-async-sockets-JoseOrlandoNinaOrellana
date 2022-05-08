/**
 * Petición del cliente
 */
export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list' | 'none';
    user: string
    title?: string;
    body?: string;
    color?: string;
}