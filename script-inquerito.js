const form = document.getElementById('surveyForm');
const urlGoogleScript = 'https://script.google.com/macros/s/AKfycbz-KotxTxPs_lZOYBPU27kATinLz4YI8omrKQwWlxN2vPGqiRBjF1aDU0AJQ_V3VyiT/exec';

const urlParams = new URLSearchParams(window.location.search);
const scoreDado = urlParams.get('score');
const tokenDado = urlParams.get('token');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault(); 
        
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
        });
    });
}
