class Cliente{
    nome: string;
    id: string;
    lugar: number;

    constructor(nome: string, id: string, lugar: number){
        this.nome = nome;
        this.id = id;
        this.lugar = lugar;
    }

    getFone(): string{
        return this.nome;
    }

    getId(): string{
        return this.id;
    }
    
    getLugar(): number{
        return this.lugar;
    }

    setFone(nome: string){
        this.nome = nome;
    }

    setId(id: string){
        this.id = id;
        
    }

    setLugar(lugar: number){
        this.lugar = lugar;
    }

    toString(): string {
        return `Cliente ${this.nome}:${this.id}:${this.lugar}`;
    }
}

class Sala{
    cadeiras: Array<Cliente>;

    constructor(capacidade: number){
        this.cadeiras = [];
        for(let i = 0; i < capacidade; i++){
            this.cadeiras.push();
        }  
    }
    cancelar(id: string){
        for(let i = 0; i < this.cadeiras.length; i++){
            if(this.cadeiras[i].id == id){
                this.cadeiras.splice(i, 1);
                return
            }
        }
    }

    reservar(cliente: Cliente){
        let p = cliente.lugar;
        for(let i = 0; i < this.cadeiras.length; i++){
            if(cliente.lugar == this.cadeiras[i].lugar){
                console.log("Erro: O lugar já está ocupado");
                return
            }
            if(cliente.id == this.cadeiras[i].id){
                console.log("Erro: Já há uma pessoa com a mesma ID na sala");
                return
            }
        }
        this.cadeiras[p] = cliente;
        return
        
    }

    getCadeiras(){
        return this.cadeiras;
    }

   

    toString(): string {
        return `Sala ${this.cadeiras}`;
    }

}

let sala = new Sala(5);
console.log(sala);
sala.reservar(new Cliente("davi", "3232", 0));
console.log(sala);
sala.reservar(new Cliente("joao", "3131", 3));
console.log(sala);
sala.reservar(new Cliente("rute", "3030", 0));
console.log(sala);
sala.reservar(new Cliente("davi", "3232", 2));
console.log(sala);
sala.cancelar("3232");
console.log(sala);

// Não consigo acessar os dados do cliente que está na cadeira quando o vetor da cadeira aceita null ou string.