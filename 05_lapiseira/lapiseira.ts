class Grafite{
    calibre: number;
    dureza: string;
    tamanho: number;

    constructor(calibre: number, dureza: string, tamanho: number){
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha(): number {
        if (this.dureza === 'HB')
            return 1;
        if (this.dureza === '2B')
            return 2;
        if (this.dureza === '4B')
            return 4;
        if (this.dureza === '6B')
            return 6;
        return 0;
    }

    toString(): string {
        return `Grafite ${this.calibre}:${this.dureza}:${this.tamanho}`;
    }
}

class Lapiseira{
    bico: Grafite | null;
    calibre: number;
    tambor: Array<Grafite | null>;

    constructor(calibre: number){
        this.calibre = calibre;
        this.tambor = [];
        this.bico = null;
    }

    inserirGrafite(grafite: Grafite): boolean{
        if(grafite.calibre != this.calibre){
            console.log("O calibre não é compatível");
            return false;
        }
        this.tambor.push(grafite);
        return true
    }

    puxaGrafite(): boolean{
        if(this.tambor == null){
            console.log("Erro: Não há grafites no tambor");
            return false;
        }
        if(this.bico != null){
            console.log("Erro: O bico não está vazio.");
            return false;
        }
        this.bico = this.tambor[0];
        this.tambor.shift();
        return true;
    }

    removeGrafite(){
        if(this.bico != null){
            console.log("Erro: O bico já está vazio.");
        }
        this.bico = null;
        return
    }

    escrever(folhas: number){
        if(this.bico != null){
            if(folhas*this.bico.gastoPorFolha() <= this.bico.tamanho){
                this.bico.tamanho -= folhas*this.bico.gastoPorFolha();
            }
            
            if(folhas*this.bico.gastoPorFolha() > this.bico.tamanho){
                console.log("O grafite acabou antes de completar as folhas. " + this.bico.tamanho / this.bico.gastoPorFolha() + " foram escritas.");
                this.bico = null;
            }
        }
        else{
            console.log("A lapiseira não possui um grafite");
            return
        }
    }
}

let lapiseira = new Lapiseira(0.5);
console.log(lapiseira);
lapiseira.inserirGrafite(new Grafite(0.7, "2B", 50));
console.log(lapiseira);
lapiseira.inserirGrafite(new Grafite(0.5, "2B", 50));
console.log(lapiseira);
lapiseira.inserirGrafite(new Grafite(0.5, "2B", 30));
console.log(lapiseira);
lapiseira.puxaGrafite();
console.log(lapiseira);
lapiseira.puxaGrafite();
console.log(lapiseira);
lapiseira.removeGrafite();
console.log(lapiseira);