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
        // # cod arcaico --
            // let valid = "0123456789()-";
            // for(let i = 0; i < number.length; i++){
            //     for(let j = 0; j < valid.length; j++){
            //         if(number[i] != valid[j]){
            //             return false;
            //         }
            //     }
            // }
            // return true;

        // # versão da aula --
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
    private fones: Array<Fones | null>;

    constructor(nome: string, fones: Array<Fones | null>){
        this.nome = nome;
        this.fones = [];
    }

    addFones(fone: Fones){
        if(fone.isValid() == false){
            return
        }
        this.fones.push(fone);
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

    toString(){
        let str = this.getNomes() + " - " + this.getFones().join(", ");
        console.log(str);
        // let ctts = [];
        // for(let i = 0; i < this.getFones().length; i++){
        //     ctts.push(i, this.getFones()[i]);
        // }
        
        // console.log(this.getNomes() + " - " + ctts.join(":"));
    }

    getFones(): Array<Fones | null>{
        return this.fones;
    }

    getNomes(): string{
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

class IO{
    addContato(): Contato{
        write("Digite o nome do contato: ");
        let nome = input();
        let fone: Array<Fones | null> = [];

        let ctt = new Contato(nome, fone);

        return ctt;
    }

    shell(){
        let ctt = this.addContato();

        while(true){
            let line = input();
            let words = line.split(" ");
            if(words[0] == "end"){
                break;
            } else if(words[0] == "show"){
                ctt.toString();
            } else if(words[0] == "add"){
                let fone = new Fones(words[1], words[2]);
                ctt.addFones(fone);
            } else if(words[0] == "rm"){
                let index = words[1];
                ctt.rmFones(index);
            } else{
                console.log("Comando inválido.");
            }
        }
    }
}

let io = new IO();
io.shell();

