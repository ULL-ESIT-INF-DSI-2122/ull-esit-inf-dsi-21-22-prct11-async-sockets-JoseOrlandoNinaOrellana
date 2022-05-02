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
        fs.mkdirSync('notes/' + user);
    }

    /**
     * Comprueba si existe una nota
     * @param user Nombre del propetario de la nota
     * @param title Título de la nota
     * @returns Boolean indicando si exista una nota con ese título
     */
    exists(user: string, title: string): boolean {
        if(fs.existsSync('./notes' + user + '/' + title + '.json'))
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
            if(!fs.existsSync('./notes' + user))
                this.createFolder(user);

            fs.writeFileSync('./notes' + user + '/' + note.title + '.json', JSON.stringify(note, null, 2), 'utf-8');
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
        let output: string = '';
        let note: Note;
        output += this.putColor('green', 'Your notes') + '\n';
        fs.readdirSync('./notes' + user + '/').forEach(fileName => {
            const file = fs.readFileSync('./notes' + user + '/' + fileName);
            note = JSON.parse(file.toString());
            output += this.putColor(note.color, note.title) + '\n';
        });
        return output;
    }

    /**
     * Muestra por consola una nota
     * @param user Nombre del usuario
     * @param title Título de la nota
     */
    readNote(user: string, title: string): string {
        let output: string = '';

        if(this.exists(user, title)) {
            const file = fs.readFileSync('./notes' + user + '/' + title + '.json');
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
            fs.unlinkSync('./notes' + user + '/' + title + '.json');
            return this.putColor('green', 'Note removed!');
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

let no: Note = new Note('NoteExample', 'tee', 'green');

let t = new NoteManager();
console.log(t.writeNote('juan', no));