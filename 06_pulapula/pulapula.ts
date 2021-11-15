class Kid{
    idade: number;
    nome: string;

    constructor(idade: number, nome:string){
        this.nome = nome;
        this.idade = idade;
    }

    setNome(nome: string){
        this.nome = nome;
    }

    setIdade(idade: number){
        this.idade = idade;
    }

    getIdade(): number{
        return this.idade;
    }

    getNome(): string{
        return this.nome;
    }

    toString(): string {
        return `Kid ${this.nome}:${this.idade}`;
    }
}

class Pulapula{
    pulando: Array<Kid>;
    fila: Array<Kid>;

    constructor(){
        this.pulando = [];
        this.fila = [];
    }

    // tirarKid(nome: string, lista: Array<Kid | null>): Kid | null { // remove e retorna com o nome ou null
    //     return
    // }

    chegarKid(kid: Kid){ // chega na fila
        if(kid == null){
            console.log("Coloque os dados da criança que vai entrar.");
            return
        }
        this.fila.push(kid);
    }

    entraKid(){ // da fila para o pulapula FUNCIONANDO
        if(this.fila == null){
            console.log("Não há ninguém na fila, insira uma criança na fila.");
            return
        }
        this.pulando.push(this.fila[0]);
        this.fila.shift();
    }

    saiKid(){ // volta para a fila FUNCIONANDO
        if(this.pulando == null){
            console.log("Não há ninguém no tampolim, insira uma criança no trampolim.");
            return
        }
        this.fila.push(this.pulando[0]);
        this.pulando.shift();
    }

    removerKid(nome: string){ // tira do parquinho
        // let tam = this.fila.length;
        // //console.log(tam);
        // let nom = this.fila[0].getNome();
        // console.log(nom);
        if(this.fila.length == 0 || this.pulando.length == 0){
            console.log("Não há crianças na fila de espera ou no trampolim");
            return
        }
        for(let i = 0; i < this.fila.length; i++){
            if(this.fila[i].nome == nome){
                this.fila.splice(i, 1);
                break
            }
        }
        for(let i = 0; i < this.pulando.length; i++){
            if(this.pulando[i].nome == nome){
                this.pulando.splice(i, 1);
                break
            }
        }
       
    }
    toString(): string {
        return `Pulapula ${this.pulando}:${this.fila}`;
    }
}

let trampolim = new Pulapula();
trampolim.chegarKid(new Kid(5, "Mario"));
trampolim.chegarKid(new Kid(4, "Livia"));
trampolim.chegarKid(new Kid(3, "Luana"));
console.log(trampolim);
trampolim.entraKid();
console.log(trampolim);
trampolim.entraKid();
console.log(trampolim);
trampolim.saiKid();
console.log(trampolim);
trampolim.removerKid("Luana");
console.log(trampolim);

