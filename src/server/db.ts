import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client/web";
import { env } from "~/env";

// Crear cliente libSQL usando las variables de entorno
const libsql = createClient({
  url: env.TURSO_DATABASE_URL, // Asume que estas variables están definidas en tu archivo .env
  authToken: env.TURSO_AUTH_TOKEN,
});

// Crear el adaptador para Prisma
const adapter = new PrismaLibSQL(libsql);

// Función para crear el cliente de Prisma con el adaptador y las opciones de logging
const createPrismaClient = () =>
  new PrismaClient({
    adapter, // Usar el adaptador de libSQL
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Manejo de instancia global de Prisma para evitar múltiples instancias en desarrollo
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// Exportar la instancia de la base de datos
export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
