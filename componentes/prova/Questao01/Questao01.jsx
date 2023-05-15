import React from "react";

// Não consegui completar. Tentei ainda fazer uma média mas não ficou completo.

const Questao01 = () =>{

    function Questao01x(){
        const alunos = [
            {nome: "Beta", notas: {ap1: 8.4, ap2: 5.4}},
            {nome: "Beto", notas: {ap1: 6.7, ap2: 3.5}},
            {nome: "Bete", notas: {ap1: 7.3, ap2: 9.2}}
        ]
        // Pega o objeto com os alunos e as médias e retorna usando o componente Questao01Y com a fução de media
        return Questao01y(alunos);
    }

    const Questao01y = (alunos) =>{
        // Função para tirar as médias pegando as notas pelo props
        function medias(n1, n2){
            return (
                <div>
                    <h1>Media: {(n1+n2)/2}</h1>
                </div>
            )
        }

        for(let i =0; i<alunos.lenght; i++){
            medias(alunos[i].notas.ap1, alunos[i].notas.ap2);
        }
    }

    return (
        <div>
            <h1>{Questao01x} AAAAAAA</h1>
        </div>
    );
}

export default Questao01