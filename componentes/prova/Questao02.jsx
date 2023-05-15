import React from "react";

function Questao02 () {
    let imagens = {
        img01: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        img02: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    }

    // Função para mudar o estado da imagem. Trocando o img01 por img02 e vice versa
    const mudarimagem = () =>{
        setImagem(state => state === 'img01' ? 'img02': 'img01');
    }

    const [imagem, setImagem] = React.useState('img01');

    return (
        <div>
            <div>
                {/* utilizando a função de mudança no botao. Quando tem a ação de clique, useState verifica o estado do índice e troca pelo outro */}
                <button onClick={mudarimagem}>Trocar para {imagem=== 'img01' ? 'img02': 'img01'}</button>
            </div>
            <div style={{marginTop: '30px'}}>
                <img src={imagens[imagem]} style={{width: '20%'}}/>
            </div>
        </div>
    );
}

export default Questao02