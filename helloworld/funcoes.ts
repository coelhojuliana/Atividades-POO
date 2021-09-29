// Minha funcao teste
console.log("Função de teste:");
function frutas(fruta:string, qtd:number):any{
    console.log("Há", qtd, fruta, "na cesta.");
}

frutas("banana", 16); 
console.log("---------------------------");

// funcao do vid
console.log("Função de adição simples com 2+3: ");
function adicionar(a:number, b:number):number{
    return a+b;
}
console.log(adicionar(2,3)); 
console.log("---------------------------");

// funcao dentro de variavel
console.log("Função de adição 1+2 dentro da variável: ");
let adicionar1 = function (a:number, b:number):number {
    return a+b;
}

console.log(adicionar1(1,2)) 
console.log("--------------------------");

// arrow function
console.log("Função de adição 5+4 com flecha: ");
let adicionar2 = (a:number, b:number):number =>{
    return a+b;
}
console.log(adicionar2(5, 4)); 
console.log("--------------------------");

//mais simplezinha 
console.log("Função de adição 2+3 com flecha mais simples: ");
let adicionar3 = (a:number, b:number):number => (a+b);
console.log(adicionar3(2,3)) 