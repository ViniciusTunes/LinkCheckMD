// Importações NODE-JS.
import pegaArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk";
import listaValidada from "./http-validacao.js";

// node src/cli.js .\arquivos\texto.md
const caminho = process.argv;

async function imprimeLista (valida, resultado, identificador = "") {
    
    if (valida) {
        console.log(chalk.yellow("Lista Validada: "),
        chalk.black.bgGreen(identificador), 
        await listaValidada(resultado));
        console.log(chalk.yellow('Operação concluída.'));

    } else {
        console.log(chalk.yellow("Lista de Links: "),
        chalk.black.bgGreen(identificador), resultado);
    }
}

async function processaTexto (argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === "valida";

    try {
        fs.lstatSync(caminho);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log(`Arquivo ou Diretório não existe.`);
            return;
        }
    }
        // Condição para quando o caminho for diretamente um Arquivo (ImprimeLista sem o nome dos Arquivos, pois é apenas um).
        if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(valida, resultado);
        
        // Condição para quando o caminho for um diretório sem selecionar nenhum Arquivo diretamente (ImprimeLista com o nome dos Arquivos).
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo)
        });
    }
}

processaTexto(caminho);