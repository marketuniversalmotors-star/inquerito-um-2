const form = document.getElementById('surveyForm');
const urlGoogleScript = 'https://script.google.com/macros/s/AKfycbz-KotxTxPs_lZOYBPU27kATinLz4YI8omrKQwWlxN2vPGqiRBjF1aDU0AJQ_V3VyiT/exec';

const urlParams = new URLSearchParams(window.location.search);
const scoreDado = urlParams.get('score');
const tokenDado = urlParams.get('token');

let formSubmetido = false;

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault(); 
        
        // Validação adicional de segurança para o nome obrigatório
        const nomeInput = document.getElementById('nome_empresa');
        if (!nomeInput || !nomeInput.value.trim()) {
            alert('Por favor, preencha o nome da empresa ou cliente.');
            nomeInput.focus();
            return;
        }

        formSubmetido = true; // Marca como submetido para não apagar ao sair
        
        const btn = form.querySelector('.submit-btn');
        btn.innerText = "A enviar..."; 
        
        const formData = new FormData(form);
        
        if (scoreDado) {
            formData.append('score', scoreDado);
        }
        if (tokenDado) {
            formData.append('token', tokenDado);
        }
        formData.append('tipo', 'porta'); // Garante que atualiza na aba "Cliente a Porta"
        
        fetch(urlGoogleScript, { 
            method: 'POST', 
            body: formData 
        })
        .then(response => {
            window.location.href = 'agradecimento.html';
        })
        .catch(error => {
            console.error('Erro:', error);
            btn.innerText = "Erro ao enviar. Tente novamente.";
            formSubmetido = false; // Permite reverter se falhar
        });
    });
}

// Se o utilizador abandonar a página (fechar o separador ou voltar atrás) sem submeter
window.addEventListener('beforeunload', () => {
    if (!formSubmetido && tokenDado) {
        const dadosAbandono = new FormData();
        dadosAbandono.append('action', 'delete');
        dadosAbandono.append('token', tokenDado);
        dadosAbandono.append('tipo', 'porta');
        
        navigator.sendBeacon(urlGoogleScript, dadosAbandono);
    }
});
