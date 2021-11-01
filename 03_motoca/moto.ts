class Pessoa{
    nome: string;
    idade: number;
  
    constructor(nome: string, idade: number){
      this.nome = nome;
      this.idade = idade;
    }
  
    toString(): string {
      return `Pessoa ${this.nome}:${this.idade}`;
  }
  }
  
  class Motinha{
    private pessoa: Pessoa | null;
    power: number;
    tempo: number;
  
    constructor(pessoa: Pessoa | null, power: number, tempo: number){
      this.pessoa = pessoa;
      this.power = power;
      this.tempo = tempo;
    }
  
    comprar(tempo: number){
      this.tempo += tempo;
    }
  
    andar(tempo: number){
      if(this.pessoa != null){
        if(this.pessoa.idade >= 10){
          console.log("grande demais");
          return
        }
        if(this.tempo == 0){
          console.log("Não pode andar porque tá sem tempo");
          return
        }
        if(tempo > this.tempo){
          console.log("Andou",this.tempo, "e o tempo acabou");
          this.tempo = 0;
          return
        }
        this.tempo -= tempo;
        return
      }
      console.log("Quer andar como sem criança??");
      return
    }
  
    buzinar(){
      if(this.pessoa == null){
        console.log("Não tem ninguém para buzinar");
        return
      }
      let potencia: number;
      potencia = this.power;
      let res = "p";
      for(let i = 0; i < potencia; i++){
        res += "e";
      }
      res += "m";
      console.log(res);
    }
  
    in(pessoa: Pessoa): boolean{ // subir
      if(this.pessoa != null){
        console.log("A moto está ocupada");
        return false;
      }
      this.pessoa = pessoa;
      return true;
    }
    out(): Pessoa | null{
      if(this.pessoa == null){
        console.log("Não tem ninguém na moto");
        return null
      }
      let pessoa = this.pessoa;
      this.pessoa = null;
      return pessoa;
    }
  
    toString(): string {
      return `Motinha ${this.pessoa}:${this.power}:${this.tempo}`;
    }
  }
  
  //RODANDO OS TESTES --------------------------------------------------------------------
  console.log("1# Subindo e Buzinando --------------");
  let pessoa = new Pessoa("marcos", 4);
  let moto = new Motinha(null, 1, 0);
  
  console.log("Mostrar --- ", moto);
  moto.buzinar();
  moto.in(pessoa);
  console.log("Mostrar --- ", moto);
  moto.buzinar();
  pessoa = new Pessoa("marisa", 2);
  moto.in(pessoa);
  console.log("Mostrar --- ", moto);
  console.log("-------------------------------------");

  console.log("2# Subindo e Buzinando --------------");
  moto = new Motinha(null, 5, 0);
  console.log("Mostrar --- ", moto);
  pessoa = new Pessoa("marcos", 4);
  moto.in(pessoa);
  console.log("Mostrar --- ", moto);
  moto.buzinar();
  console.log("-------------------------------------");

  console.log("3# Subindo e Trocando --------------");
  pessoa = new Pessoa("heitor", 6);
  moto = new Motinha(null, 7, 0);
  moto.in(pessoa);
  console.log("Mostrar --- ", moto);
  moto.out();
  moto.out();
  pessoa = new Pessoa("suzana", 8);
  moto.in(pessoa);
  console.log("Mostrar --- ", moto);
  console.log("-------------------------------------");
  
  console.log("4# Passeando --------------");
  pessoa = new Pessoa("suzana", 8);
  moto = new Motinha(null, 7, 0);
  moto.in(pessoa);
  moto.andar(10);
  moto.comprar(40);
  console.log("Mostrar --- ", moto);
  moto.andar(20);
  console.log("Mostrar --- ", moto);
  console.log("-------------------------------------");

  console.log("5# Nem grande nem pequeno --------------");
  moto = new Motinha(null, 7, 0);
  pessoa = new Pessoa("andreina", 23);
  moto.comprar(20);
  moto.in(pessoa);
  moto.andar(15);
  console.log("Mostrar --- ", moto);
  console.log("-------------------------------------");

  console.log("6# Sem tempo, irmão --------------");  
  moto = new Motinha(null, 7, 0);
  pessoa = new Pessoa("andreina", 6);
  moto.comprar(20);
  moto.in(pessoa);
  moto.andar(15);
  console.log("Mostrar --- ", moto);
  moto.andar(10);
