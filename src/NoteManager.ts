import * as fs from 'fs';
import * as chalk from 'chalk';
import { Note } from './Note';

/**
 * Clase NoteList
 * Permite manipular los archivos que contienen las notas
 */
export class NoteManager {
    /**
     * Crea un nuevo carpeta
     * @param user Nombre del usuario
     */
    createFolder(user: string) {
        fs.mkdirSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user);
    }

    /**
     * Comprueba si existe una nota
     * @param user Nombre del propetario de la nota
     * @param title Título de la nota
     * @returns Boolean indicando si exista una nota con ese título
     */
    exists(user: string, title: string): boolean {
        if(fs.existsSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/' + title + '.json'))
            return true;
        return false;
    }

    /**
     * Escribe en el json un nota
     * @param user Nombre del usuario
     * @param note Nota a escribir
     */
    writeNote(user: string, note: Note): string {
        if(!this.exists(user, note.title)) {
            if(!fs.existsSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user))
                this.createFolder(user);

            fs.writeFileSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/' + note.title + '.json', JSON.stringify(note, null, 2), 'utf-8');
            return this.putColor('green', 'New note added!');
        }
        else
            return this.putColor('red', 'Note title taken!');
    }

    /**
     * Lista por consola los títulos de las notas de un usuario
     * @param user Nombre del usuario
     */
    listNotes(user: string): string {
        if(fs.existsSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user)) {
            let output: string = '';
            let note: Note;
            output += this.putColor('green', 'Your notes') + '\n';
            fs.readdirSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/').forEach(fileName => {
                const file = fs.readFileSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/' + fileName);
                note = JSON.parse(file.toString());
                output += this.putColor(note.color, note.title) + '\n';
            });
            return output;
        }
        else
            return this.putColor('red', 'User not found');
    }

    /**
     * Muestra por consola una nota
     * @param user Nombre del usuario
     * @param title Título de la nota
     */
    readNote(user: string, title: string): string {
        let output: string = '';

        if(this.exists(user, title)) {
            const file = fs.readFileSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/' + title + '.json');
            let note: Note = JSON.parse(file.toString());
            output += this.putColor(note.color, note.title) + '\n';
            output += this.putColor(note.color, note.body);
            return output;
        }
        else
            return this.putColor('red', 'Note not found');
    }

    /**
     * Elimina una nota de un usuario
     * @param user Nombre del usuario
     * @param title Título de la nota
     */
    removeNote(user: string, title: string): string {
        if(this.exists(user, title)) {
            fs.unlinkSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/' + title + '.json');
            return this.putColor('green', 'Note removed!');
        }
        else
            return this.putColor('red', 'No note found');
    }

    /**
     * Actualiza una nota
     * @param user Nombre del usuario
     * @param title Título de la nota
     * @param body Nuevo contenido de la nota
     */
    updateNote(user: string, title: string, body: string): string {
        if(this.exists(user, title))
        {
            const file = fs.readFileSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/' + title + '.json');
            let oldNote: Note = JSON.parse(file.toString());
            let newNote: Note = new Note(oldNote.title, body, oldNote.color);
            fs.writeFileSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-JoseOrlandoNinaOrellana/notes/' + user + '/' + title + '.json', JSON.stringify(newNote, null, 2), 'utf-8');
            return this.putColor('green', 'Note updated');
        }
        else
            return this.putColor('red', 'No note found');
    }

    /**
     * Aplica un color a un texto
     * @param color Color
     * @param text Texto
     * @returns El texto con el color aplicado
     */
    putColor(color: string, text: string): string {
        switch(color) {
            case 'green':
                return chalk.green(text);
            case 'yellow':
                return chalk.yellow(text);
            case 'green':
                return chalk.green(text);
            case 'red':
                return chalk.red(text);
        }

        return text;
    }
};