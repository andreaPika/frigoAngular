export interface User {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // La password è opzionale nel frontend per evitare esposizioni non necessarie
    token?: string;
    role: 'admin' | 'users' ;
    createdAt?: string; // Timestamp creato dal backend
    updatedAt?: string; // Timestamp aggiornato dal backend
  }
}
