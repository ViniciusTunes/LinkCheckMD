import chalk from "chalk";

function extraiLinks (arrayLinks) {
    return arrayLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function checarStatus (listaURLs) {
    const arrayStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url, {method: "HEAD"})
                return `${response.status} - ${response.statusText}`;
            } catch (erro) {
                return tratamentoDeErros(erro);
            }
        })
    )
    return arrayStatus;
}

export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checarStatus(links);
    
    return listaDeLinks.map((objeto, indice) => ({
            ...objeto,
            status: status[indice]
        }))       
}

function tratamentoDeErros (erro) {
    if (erro.cause.code === "ENOTFOUND") {
        return "Link não Encontrado."
    } else {
        return "Ocorreu algum erro.";
    }
}
  