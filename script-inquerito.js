const form = document.getElementById('surveyForm');
const urlGoogleScript = 'https://script.google.com/macros/s/AKfycbwDTn6WLDk7vOIVTTQ8NK2XCzofFWL_WdmT1lL92sdkpDrEf_E2vhNKFdnfgtkW-vTv/exec';

// Apanha o score (4 ou 5) que veio da página anterior pelo URL
const urlParams = new URLSearchParams(window.location.search);
const scoreDado = urlParams.get('score');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault(); 
        
        const btn = form.querySelector('.submit-btn');
        btn.innerText = "A enviar..."; 
        
        const formData = new FormData(form);
        
        // Injeta o score capturado na submissão para o Excel
        if (scoreDado) {
            formData.append('score', scoreDado);
        }
        
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