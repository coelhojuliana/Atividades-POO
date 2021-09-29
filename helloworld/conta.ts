function depositar(conta:any, valor:number):void{
    conta.saldo += valor;
}

function sacar(conta:any, valor:number):boolean{
    if(valor <= conta.saldo){
        conta.saldo -= valor;
        return true;
    }else{
        console.log("Operação rescusada: Saldo insuficiente")
        return false;
    }
}

function criar_conta(nome_titular:any, saldo:number):any{
    return {
        "nome_titular": nome_titular,
        "saldo": saldo,
    }
}

let conta = criar_conta("titular", 800);

depositar(conta, 10);
console.log("Depositou 10 - Saldo:", conta.saldo)

sacar(conta, 5);
console.log("Sacou 5 - Saldo:", conta.saldo)

sacar(conta, 15);
console.log("Depositou 15 - Saldo:", conta.saldo)