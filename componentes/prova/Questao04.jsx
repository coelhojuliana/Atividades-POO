

import React from "react";

function Quest4(){
    return(
        <div>
            <div style={{padding: '3%'}}>
            Explicando a ajuda do uso de contextos para resolver um problema de PROPS DRILLING
Um problema de PROPS DRILLING se dá quando as regras de hierarquia entre componentes pais e filhos impede
o funcionamento de uma função/aplicação. Dado que o problema se dá quando uma informação de um pai não pode ser acessada
pelo filho de um filho, a utilização de um contexto pode fazer com que essas informações fiquem disponíveis para os outros
componentes que não possuem acesso direto. A criação de um contexto se dá pela criação de uma alternativa para prover as informações
aos componentes consumidores que, por conta da hierarquia de props, não conseguem acessar diretamente a fonte das informações.
            </div>
            {/* Imagem esta na pasta da prova. nome é contexto.png */}
            <img src="./contexto.png" alt="" style={{width: '20%'}}/>
        </div>
    );
}

export default Quest4