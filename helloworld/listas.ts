let l1:number[] = [2, 3, 4];
console.log(l1);

/* let l2:string[] = ["dora", "lara", "jona"];
console.log(l2); */
 
// iteração 
console.log("tamanho da lista:", l1.length);

console.log("índices da lista:")
for(let i=0; i<l1.length; i++){
    console.log(i, l1[i])
} 
console.log("-----------------------")

//for...in usa os índices da lista 
console.log("índices da lista usando in:")
for(let j in l1){
    console.log(j, l1[j]);
}
console.log("-----------------------")

// for...of usa os valores e nao os indices
console.log("valores da lista usando of:")
 for(let elemento of l1){
     console.log(elemento);
 } 
 console.log("-----------------------")

//operacoes com listas

//inserir elementos
let lista:number[] = [5, 10, 15, 20];
console.log("nova lista:", lista);
lista.push(25);
console.log("lista com a adição:", lista)

// tirar elementos
lista.splice(2, 1);
console.log("lista com os valores tirados:", lista) 