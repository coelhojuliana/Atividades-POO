class Pessoa{
    private nome: string;
    private idade: number;
    private id: number;

    constructor(nome: string, idade: number, id: number){
        this.nome = nome;
        this.idade = idade;
        this.id = id;
    }
    public getNome(): string{
        return this.nome;
    }
    public getIdade(): number{
        return this.idade;
    }
    public getId(): number{
        return this.id;
    }
    public toString(): string{
        return this.nome + ": " + "[" + this.idade + " anos] " + "[id: " + this.id + "]";
    }
}

abstract class Criminoso extends Pessoa{
    private periculosidade: string;
    crimes: Array<string>;
    private preso: boolean;

    constructor(nome: string, idade: number, id: number, crime: string){
        super(nome, idade, id);
        this.periculosidade = "n/e";
        this.preso = false;
        this.crimes = [];
        this.crimes.push(crime);
    }
    public getPeri(): string{
        return this.periculosidade;
    }
    abstract getCrimes(): Array<string>;

    abstract addCrimes(crime: string): any;

    public getStatus(): boolean{
        return this.preso;
    }
    public addPeri(periculosidade: string){
        this.periculosidade = periculosidade;
        console.log("Periculosidade [" + periculosidade + "] adicionada.");
    }
    public addStatus(status: boolean){
        this.preso = status;
        console.log("O status do criminoso agora é [" + status + "]");
    }
    public toString(): string{
        return super.toString() + " [periculosidade: " + this.periculosidade + "] " + "[status: " + this.preso + "]";
    }

}

class Supervilao extends Criminoso{
    private supernome: string;
    private nemesis: string;

    constructor(supernome: string, nemesis: string, idade: number, id: number, crime: string){
        super(supernome, idade, id, crime);
        this.supernome = supernome;
        this.nemesis = nemesis;
    }
    public getSupNome(): string{
        return this.supernome;
    }
    public getNemesis(): string{
        return this.nemesis;
    }
    public getCrimes(): string[]{
        return super.crimes;
    }
    public addCrimes(crime: string): any {
        this.crimes.push(crime);
        console.log("O crime [" + crime + "] foi adicionado");
    }
    public toString(): string{
        return super.toString() + "[nemesis: " + this.nemesis + "] " + "\n [crimes \n " + this.crimes.join(", ") + "]";
    }
}

let vilain = new Supervilao("Coringa", "Batman", 47, 6767, "Abacaxi na pizza");
console.log(vilain.toString());
vilain.addPeri("alta");
vilain.addCrimes("Colocou purê de batata no hotdog");
vilain.addCrimes("Gosta de cuscuz paulista");
console.log(vilain.toString());

