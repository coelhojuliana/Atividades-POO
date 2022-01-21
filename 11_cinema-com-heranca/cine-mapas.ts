class Pessoa{
    private nome: string;
    private fone: string;
    constructor(nome: string, fone: string){
        this.nome = nome;
        this.fone = fone;
    }
    public getNome(): string{
        return this.nome;
    }

    public getFone(): string{
        return this.fone;
    }
}

class Cinema{
    private cadeiras: Map<number, Pessoa>;
    private nomes: Map<string, number>;
    constructor(public lotacao: number){
        this.cadeiras = new Map<number, Pessoa>();
        this.nomes = new Map<string, number>();
    }

    public getCadeiras(){
        return this.cadeiras;
    }

    public getNomes(){
        return this.nomes;
    }

    public procurarChave(nome: string): number{
        for(let [chave, pessoa] of this.cadeiras){
            if(pessoa.getNome() == nome){
                return chave;
            }
        }
        return -1;
    }

    public procurarTelefone(nome: string): string{
        for(let [chave, pessoa] of this.cadeiras){
            if(pessoa.getNome() == nome){
                return pessoa.getFone();
            }
        }
        return "ERRO: O nome não está cadastrado.";
    }

    public reservar(chave: number, pessoa: Pessoa){
        if(this.cadeiras.has(chave)){
            console.log("ERRO: A cadeira já está ocupada.");
            return;
        }
        if(this.nomes.has(pessoa.getNome())){
            console.log("ERRO: A pessoa já está cadastrada.");
            return;
        }
        for(let i of this.cadeiras.values()){
            if(pessoa.getFone() == i.getFone()){
                console.log("ERRO: Já há uma pessoa com o mesmo telefone.");
                return;
            }
        }
        this.cadeiras.set(chave, pessoa);
        this.nomes.set(pessoa.getNome(), chave);
        console.log(pessoa.getNome() + " foi cadastrado com sucesso na cadeira " + chave);
    }

    public cancelar(nome: string){
        if(!this.nomes.has(nome)){
            console.log("ERRO: Pessoa não encontrada.");
            return;
        }
        let chave = this.nomes.get(nome);
        if(chave !== undefined){
            this.cadeiras.delete(chave);
            this.nomes.delete(nome);
            console.log(nome + " foi deletado com sucesso.");
        }
    }

    public toString(): string{
        let saida = "";
        for(let i = 1; i <= this.lotacao; i++){
            if(this.cadeiras.has(i)){
               if(this.cadeiras.get(i) !== undefined){
                   let pessoa = this.cadeiras.get(i);
                   if(pessoa !== undefined){
                       saida += pessoa.getNome() + " ";
                   }
               }
            } else{
                saida += "- ";
            }
        }
        return saida;
    }
}
//procura a chave pelo nome, procura o telefone pelo nome, reserva (com restrições para o mesmo nome, chave ou tel)
//cancela a reserva tbm
let cine = new Cinema(22);
//Reservando 2 lugares e printando
cine.reservar(1, new Pessoa("Julieta", "85678"));
cine.reservar(3, new Pessoa("Mila", "856787"));
console.log(cine.toString());

//Reservando com a mesma chave, nome ou telefone
cine.reservar(3, new Pessoa("Claus", "85674"));
cine.reservar(6, new Pessoa("Mila", "85671"));
cine.reservar(9, new Pessoa("Vitu", "856787"));

//Deletando e printando
cine.cancelar("Julieta");
console.log(cine.toString());

//Deletando sem resultado e printando
cine.cancelar("Claus");
console.log(cine.toString());

//Procurando a chave pelo nome (com e sem resultado)
console.log(cine.procurarChave("Mila"));
console.log(cine.procurarChave("Claus"));

//Procurando o telefone pelo nome(com e sem resultado)
console.log(cine.procurarTelefone("Mila"));
console.log(cine.procurarTelefone("Claus"));