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
    cadeiras: Array<Cliente | null>;

    constructor(capacidade: number){
        this.cadeiras = [];
        for(let i = 0; i < capacidade; i++){
            this.cadeiras.push(null);
        }
    }
    cancelar(id: string){
        for(let i = 0; i < this.cadeiras.length; i++){
           let cliente = this.cadeiras[i];
           if(cliente == null){
                console.log("ERRO: Não há nenhuma reserva para ser cancelada");
                return
            }
           if(cliente != null && cliente.id == id){
               this.cadeiras[i] = null;
               console.log("Cancelamento para: " + cliente.nome + " concluído.");
               return
           }
        }
    }

    reservar(cliente: Cliente){
        for(let j = 0; j < this.cadeiras.length; j++){
            let cli = this.cadeiras[j];
            if(cli != null && cli.id == cliente.id){
                console.log("ERRO: Já há alguém com este ID na sala.");
                return
            }
        }
        for(let i = 0; i < this.cadeiras.length; i++){
            let cli = this.cadeiras[i];
            if(cli != null && cli.lugar == cliente.lugar){
                console.log("ERRO: O assento já está ocupado")
                return
            }

            if(cliente.lugar == i && this.cadeiras[i] == null){
                this.cadeiras[i] = cliente;
                console.log("Reserva concluída para: " + cliente.nome);
                return
            }
        }
    }

    mostrarCadeiras(){
        let assentos = [];
        for(let i = 0; i < this.cadeiras.length; i++){
            if(this.cadeiras[i] == null){
                assentos[i] = "-";
            }
            else{
                assentos[i] = this.cadeiras[i];
            }
        }
        console.log(assentos);
    }

    getCadeiras(){
        return this.cadeiras;
    }

    toString(): string {
        return `Sala ${this.cadeiras}`;
    }

}

let sala = new Sala(5);
//sala.mostrarCadeiras();
sala = new Sala(4);
//sala.mostrarCadeiras();
sala.reservar(new Cliente("davi", "3232", 0));
sala.reservar(new Cliente("joao", "3131", 3));
sala.mostrarCadeiras();
sala.reservar(new Cliente("rute", "3231", 0));
sala.mostrarCadeiras();
sala.cancelar("3232");
sala.mostrarCadeiras();