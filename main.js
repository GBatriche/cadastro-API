document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cep');
    const formulario = document.getElementById('formulario');

    cepInput.addEventListener('blur', function () {
        const cep = cepInput.value.trim();

        if (cep.length !== 8 || isNaN(cep)) {
            alert("Digite um CEP válido!");
            return;
        }

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar o CEP');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    throw new Error('CEP não encontrado');
                }

                document.getElementById('rua').value = data.logradouro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            })
            .catch(error => {
                console.error('Erro:', error);
                alert(error.message);
            });
    });

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const dados = {
            nome: document.getElementById('nome').value,
            cep: document.getElementById('cep').value,
            rua: document.getElementById('rua').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            numero: document.getElementById('numero').value,
        };

        localStorage.setItem('formularioCadastro', JSON.stringify(dados));
        alert("Dados salvos com sucesso no localStorage!");
    });
});
