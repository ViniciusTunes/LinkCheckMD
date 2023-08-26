function criarArquivoMD() {
    const nome = document.getElementById('nome').value;
    const conteudo = document.getElementById('conteudo').value;

    if (nome.trim() === '') {
        alert('Digite um nome válido.');
        return;
    }

    if (conteudo.trim() === '') {
        alert('Digite um conteúdo válido.');
        return;
    }

    const conteudoMD = `# ${nome}\n\n${conteudo}`;

    const blob = new Blob([conteudoMD], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${nome}.md`;
    link.click();

    URL.revokeObjectURL(url);
}
