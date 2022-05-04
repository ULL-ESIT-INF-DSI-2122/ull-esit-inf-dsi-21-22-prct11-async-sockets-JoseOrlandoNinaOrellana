/**
 * Petición del cliente
 */
export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    user: string
    title?: string;
    body?: string;
    color?: string;
}