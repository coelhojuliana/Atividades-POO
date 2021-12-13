import { strictEqual } from "assert";

const readline = require('readline-sync');
let input = () => readline.question();
let write = (x: any) => process.stdout.write("" + x);

class Fones{
    private id: string;
    private number: string;
    constructor(id: string, number: string){
        this.id = id;
        this.number = number;
    }

    public static validate(number: string): boolean{
        let validados = "0123456789()-";
        for(let i = 0; i < number.length; i++){
            if(validados.indexOf(number[i]) == -1){
                return false;
            }
        }
        return true;
    }

    public toString(): string{
        return this.id + ":" + this.number;
        // return this.getId() + ": " + this
        // let fra: string = this.getId() + ":" + this.getNumber;
        // return fra;
        // console.log(this.getId() + ":" + this.getNumber());
    }

    getId(): string{
        return this.id;
    }

    getNumber(): string{
        return this.number;
    }

    setId(id: string){
        this.id = id;
    }

    setNumber(number: string){
        this.number = number;
    }

    public isValid(){
        if(Fones.validate(this.getNumber()) == false){
            console.log("O numero nao é valido");
            return false;
        }
        console.log("deu bom");
        return true;
    }
}

class Contato{
    private nome: string;
    private fones: Array<Fones>;

    constructor(nome: string, fones: Array<Fones>){
        this.nome = nome;
        this.fones = [];
        for(let i = 0; i < fones.length; i++){
            this.addFones(fones[i]);
        }
    }

    addFones(fone: Fones){
        if(fone != null){
            if(fone.isValid() == false){
                return null;
            }
            this.fones.push(fone);
        }
    }

    rmFones(index: number){
        for(let i = 0; i < this.fones.length; i++){
            if(index == i){
                this.fones.splice(i, 1);
                console.log("removeu");
                return
            }
        }
        console.log("Não há registro");
    }

    toString(): string{
        // let str = this.getNome() + " - " + this.getFones().join(", ");
        // console.log(str);
        let str: string = " " + this.getNome() + " - " + this.getFones().join(", ");
        return str;
        
    }

    getFones(): Array<Fones>{
        return this.fones;
    }

    getNome(): string{
        return this.nome;
    }

    setFones(fones: Array<Fones>){
        this.fones = [];
        for(let fone of fones){
            this.addFones(fone);
        }
    }
    
    setNome(nome: string){
        this.nome = nome;
    }
}

class Agenda{
    private contatos: Map<string, Contato>

    constructor(){
        this.contatos = new Map<string, Contato>();
    }

    addContato(ctt: Contato){
        if(this.contatos.has(ctt.getNome())){
            let existente = this.contatos.get(ctt.getNome());
            for(let fone of ctt.getFones()){
               if(existente != undefined){
                   existente.addFones(fone);
               }
            }
        } else{
            this.contatos.set(ctt.getNome(), ctt);
        }
    }

    findContato(nome: string): Contato | null{
        if(this.contatos.has(nome)){
            let existe = this.contatos.get(nome); console.log({existe});
            if(existe != undefined){
                //console.log(existe);
                return existe;
            }
        }
        console.log("Não há registros");
        return null;
     }

     findPosByName(nome: string): number{
        if(this.contatos.has(nome)){
            let contats = Array.from(this.contatos.keys());
            let num = contats.indexOf(nome);
            console.log("A posição do contato na agenda é: " + num);
            return num;
        } else{
            console.log("Não há registro.");
            return -1;
        }
     }

    rmContato(nome: string){
        if(this.contatos.delete(nome)){
            console.log("O contato foi apagado com sucesso.");
            return true;
        }
        console.log("O contato lido não existe.");
        return false;
    }

    searchContato(padrao: string): Array<Contato> | null{
        let result = new Array<Contato>();
        this.contatos.forEach(contato => {
            if(contato.getNome().match(padrao)){
                result.push(contato);
            }
        })
        if(result != null){
            console.log("" + result);
            return result;
        } 
        console.log("Não há registros com o padrão.");
        return null;
    }

    toString(){
        let contats = Array.from(this.contatos.values());
        for (let cont of contats){
            if(cont){
                console.log("" + cont);
            }
        }  
    }
}

