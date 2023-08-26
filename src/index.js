// Importações NODE-JS.
import fs from "fs";
import chalk from "chalk";

// Método para pegar Arquivos Assíncrono > Promises - Then - Catch.
async function pegaArquivo(caminhodoArquivo) {
    try {
        const encoding = "utf-8";
        const texto = await fs.promises.readFile(caminhodoArquivo, encoding)
        return extrairLinks(texto);
    } catch (error) {
        throw new Error(chalk.red(error));
    }
}

export default pegaArquivo;

function extrairLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];

    const resultados = capturas.map(captura => ({
        [captura[1]]: captura[2]
    }));
    return resultados.length !== 0 ? resultados : "Não há links no arquivo.";
}