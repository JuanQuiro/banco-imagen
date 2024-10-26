import sqlite3 from 'sqlite3';
import { createClient } from "@libsql/client/web";

// Conexión a la base de datos local (SQLite)
const localDb = new sqlite3.Database('./dev.db');

// Crear el cliente de Turso
const tursoClient = createClient({
  url: 'libsql://imagenbanco-juanquiro.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjk2NzczODIsImlkIjoiOGEzMzRkZTYtMTRiYi00ZGJjLWE1YTEtZjA5MzEwZTRiNDhhIn0.-3ZaFARgnxuxs6HYU1ij2diCzcLUGnnUaSnKTUXLnCgt8EfBvizhLjUy-WJoggCnGryP4a74qlLHtn8HYccKDA',
});

// Función para sincronizar datos
async function syncData() {
  try {
    // Obtener datos de Turso para cada tabla
    const tables = ['Account', 'Categoria', 'Destacado', 'Etiqueta', 'ImagenDestacada', 'ImagenEtiqueta', 'Post', 'Session', 'User', 'VerificationToken', 'VideoDestacado'];
    
    for (const table of tables) {
      const tursoData = await tursoClient.execute(`SELECT * FROM ${table}`);
      
      localDb.serialize(() => {
        // Prepara la consulta de inserción dependiendo de la tabla
        switch (table) {
          case 'Account':
            const accountStmt = localDb.prepare('INSERT OR REPLACE INTO Account (id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            for (const account of tursoData.rows) {
              accountStmt.run(account.id, account.userId, account.type, account.provider, account.providerAccountId, account.refresh_token, account.access_token, account.expires_at, account.token_type, account.scope, account.id_token, account.session_state);
            }
            accountStmt.finalize();
            break;

          case 'Categoria':
            const categoriaStmt = localDb.prepare('INSERT OR REPLACE INTO Categoria (id, nombre, descripcion) VALUES (?, ?, ?)');
            for (const categoria of tursoData.rows) {
              categoriaStmt.run(categoria.id, categoria.nombre, categoria.descripcion);
            }
            categoriaStmt.finalize();
            break;

          case 'Destacado':
            const destacadoStmt = localDb.prepare('INSERT OR REPLACE INTO Destacado (id, tipo, imagenId, videoId, orden, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)');
            for (const destacado of tursoData.rows) {
              destacadoStmt.run(destacado.id, destacado.tipo, destacado.imagenId, destacado.videoId, destacado.orden, destacado.createdAt, destacado.updatedAt);
            }
            destacadoStmt.finalize();
            break;

          case 'Etiqueta':
            const etiquetaStmt = localDb.prepare('INSERT OR REPLACE INTO Etiqueta (id, nombre) VALUES (?, ?)');
            for (const etiqueta of tursoData.rows) {
              etiquetaStmt.run(etiqueta.id, etiqueta.nombre);
            }
            etiquetaStmt.finalize();
            break;

          case 'ImagenDestacada':
            const imagenDestacadaStmt = localDb.prepare('INSERT OR REPLACE INTO ImagenDestacada (id, src, alt, titulo, descripcion, categoriaId, size, createdAt, updatedAt, uploadedById) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            for (const imagen of tursoData.rows) {
              const categoriaId = 1; // Asegúrate de que este ID corresponde a una categoría existente
              imagenDestacadaStmt.run(imagen.id, imagen.src, imagen.alt, imagen.titulo, imagen.descripcion, categoriaId, imagen.size, imagen.createdAt, imagen.updatedAt, imagen.uploadedById);
            }
            imagenDestacadaStmt.finalize();
            break;

          case 'ImagenEtiqueta':
            const imagenEtiquetaStmt = localDb.prepare('INSERT OR REPLACE INTO ImagenEtiqueta (imagenId, etiquetaId) VALUES (?, ?)');
            for (const imagenEtiqueta of tursoData.rows) {
              imagenEtiquetaStmt.run(imagenEtiqueta.imagenId, imagenEtiqueta.etiquetaId);
            }
            imagenEtiquetaStmt.finalize();
            break;

          case 'Post':
            const postStmt = localDb.prepare('INSERT OR REPLACE INTO Post (id, name, createdAt, updatedAt, createdById) VALUES (?, ?, ?, ?, ?)');
            for (const post of tursoData.rows) {
              postStmt.run(post.id, post.name, post.createdAt, post.updatedAt, post.createdById);
            }
            postStmt.finalize();
            break;

          case 'Session':
            const sessionStmt = localDb.prepare('INSERT OR REPLACE INTO Session (id, sessionToken, userId, expires) VALUES (?, ?, ?, ?)');
            for (const session of tursoData.rows) {
              sessionStmt.run(session.id, session.sessionToken, session.userId, session.expires);
            }
            sessionStmt.finalize();
            break;

          case 'User':
            const userStmt = localDb.prepare('INSERT OR REPLACE INTO User (id, name, email, emailVerified, image) VALUES (?, ?, ?, ?, ?)');
            for (const user of tursoData.rows) {
              userStmt.run(user.id, user.name, user.email, user.emailVerified, user.image);
            }
            userStmt.finalize();
            break;

          case 'VerificationToken':
            const verificationTokenStmt = localDb.prepare('INSERT OR REPLACE INTO VerificationToken (identifier, token, expires) VALUES (?, ?, ?)');
            for (const verificationToken of tursoData.rows) {
              verificationTokenStmt.run(verificationToken.identifier, verificationToken.token, verificationToken.expires);
            }
            verificationTokenStmt.finalize();
            break;

          case 'VideoDestacado':
            const videoDestacadoStmt = localDb.prepare('INSERT OR REPLACE INTO VideoDestacado (id, src, alt, titulo, descripcion, size, createdAt, updatedAt, uploadedById) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
            for (const video of tursoData.rows) {
              videoDestacadoStmt.run(video.id, video.src, video.alt, video.titulo, video.descripcion, video.size, video.createdAt, video.updatedAt, video.uploadedById);
            }
            videoDestacadoStmt.finalize();
            break;
        }
      });
    }

    console.log('Datos sincronizados exitosamente');
  } catch (error) {
    console.error('Error al sincronizar los datos:', error);
  } finally {
    localDb.close(); // Cierra la conexión
  }
}

// Llama a la función para sincronizar
syncData();

