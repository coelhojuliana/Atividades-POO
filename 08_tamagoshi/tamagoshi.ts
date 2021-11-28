const readline = require('readline-sync');
let input = () => readline.question();
let write = (x: any) => process.stdout.write("" + x);

class Pet{
    private age: number;
    private alive: boolean;
    private cleanMax: number;
    private diamonds: number;
    private energy: number;
    private energyMax: number;
    private hunger: number;
    private hungerMax: number;
    private shower: number;
    private nome: string;

    constructor(nome: string, energy: number, hunger: number, shower: number){
        this.nome = nome;
        this.energy = energy;
        this.hunger = hunger;
        this.shower = shower;

        this.energyMax = energy;
        this.hungerMax = hunger;
        this.cleanMax = shower;

        this.alive = true;
        this.diamonds = 0;
        this.age = 0;

    }

    comer(){
        if(this.testVivo() == false){
            console.log(this.nome + " está morto :(");
            return
        }
        this.diamonds += 0;
        this.age += 1;
        this.energy -= 1;
        if(this.energy <= 0){
            this.energy = 0;
            console.log(this.nome + " morreu de cansaço");
            return
        }
        this.hunger += 4;
        if(this.hunger > this.hungerMax){
            this.hunger = this.hungerMax;
        }
        this.shower -= 2;
        if(this.shower <= 0){
            this.shower = 0;
            console.log(this.nome + " morreu de sujeira");
            return
        }
    }

    brincar(){
        if(this.testVivo() == false){
            console.log(this.nome + " está morto :(");
            return
        }
        this.diamonds += 1;
        this.age += 1;
        this.energy -= 2;
        if(this.energy <= 0){
            this.energy = 0;
            console.log(this.nome + " morreu de cansaço");
            return
        }
        this.hunger -= 1;
        if(this.hunger <= 0){
            this.hunger = 0;
            console.log(this.nome + " morreu de fome");
            return
        }
        this.shower -= 3;
        if(this.shower <= 0){
            this.shower = 0;
            console.log(this.nome+ " morreu de sujeira");
            return
        }
    }

    banho(){
        if(this.testVivo() == false){
            console.log(this.nome + " está morto :(");
            return
        }
        this.shower = this.cleanMax;
        this.diamonds += 0;
        this.age += 2;
        this.energy -= 3;
        if(this.energy <= 0){
            this.energy = 0;
            console.log(this.nome + " morreu de cansaço");
            return
        }
        this.hunger -= 1;
        if(this.hunger <= 0){
            this.hunger = 0;
            console.log(this.nome + " morreu de fome");
            return
        }
    }

    dormir(){
        if(this.testVivo() == false){
            console.log(this.nome + " está morto :(");
            return
        }
        this.shower -= 0;
        this.diamonds += 0;
        if(this.energy > this.energyMax - 5){
            console.log(this.nome + " não está cansado");
            return
        }
        for(let i = this.energy; i < this.energyMax; i++){
            this.age += 1;
        }
        this.energy = this.energyMax;
        this.hunger -= 1;
        if(this.hunger <= 0){
            this.hunger = 0;
            console.log(this.nome + " morreu de fome");
            return
        }
    }

    testVivo(): boolean{
        if(this.energy == 0 || this.hunger == 0 || this.shower == 0){
            return false;
        }
        return true;
    }

    getClean(): number{
        return this.shower;
    }

    getCleanMax(): number{
        return this.cleanMax;
    }

    getEnergy(): number{
        return this.energy;
    }

    getEnergyMax(): number{
        return this.energyMax;
    }

    getHunger(): number{
        return this.hunger;
    }

    getHungerMax(): number{
        return this.hungerMax;
    }

    setClean(shower: number){
        this.shower = shower;
    }
    
    setEnergy(energy: number){
        this.energy = energy;
    }

    setHunger(hunger: number){
        this.hunger = hunger;
    }

    public toString(){
        if(this.alive == true){
            return this.nome + ": " + this.energy + "/" + this.energyMax + " de energia | " + this.hunger + "/" + this.hungerMax 
            + " de fome | " + this.shower + "/" + this.cleanMax + " de limpeza | " + this.diamonds + " de diamantes | " + this.age + " de idade";
        }
        return "RIP"
    }
}


class IO{

    help(){
        write("Comandos: \n");
        write(" init: <nome> <energia max> <fome max> <limpexa max> \n");
        write(" end: Termina o jogo \n");
        write(" eat: Alimenta o seu bichinho \n");
        write(" play: Brinca com seu bichinho \n");
        write(" clean: Banha seu bichinho \n");
        write(" sleep: Faz seu bichinho dormir \n");

    }

    add_pet(): Pet{
        write("Digite o nome do seu pet \n");
        let nome = input();
        write("Qual o nível de energia máxima do seu pet? \n");
        let energy = input();
        write("Qual o nível de fome máxima do seu pet? \n");
        let hunger = input();
        write("Qual o nível de limpeza máxima do seu pet? \n");
        let shower = input();

        let pet = new Pet(nome, energy, hunger, shower);

        return pet
    }

    shell(){
        let pet = this.add_pet();
        while(true){
            let line = input();
            let words = line.split(" ");
            if(words[0] == "end"){
                break;
            } else if(words[0] == "show"){
                write("" + pet + "\n");
            } else if(words[0] == "help"){
                this.help();
            } else if(words[0] == "init"){
                pet = new Pet(words[1], +words[2], +words[3], +words[4]);
                write("" + pet + "\n");
            } else if(words[0] == "play"){
                pet.brincar();
               
            } else if(words[0] == "sleep"){
                pet.dormir();
                
            } else if(words[0] == "eat"){
                pet.comer();
                
            } else if(words[0] == "clean"){
                pet.banho();
                
            } else{
                console.log("Comando inválido \n");
            }
        }
    }
}

let io = new IO();
io.shell();
