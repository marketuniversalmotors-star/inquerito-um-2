const urlGoogleScript = 'https://script.google.com/macros/s/AKfycbwDTn6WLDk7vOIVTTQ8NK2XCzofFWL_WdmT1lL92sdkpDrEf_E2vhNKFdnfgtkW-vTv/exec';

function submitRating(score) {
    if (score <= 3) {
        // Esconde os botões e mostra o aviso de carregamento
        document.getElementById('survey-section').style.display = 'none';
        document.getElementById('loading-msg').style.display = 'block';
        
        const formData = new FormData();
        formData.append('score', score);
        
        // Envia para o Excel e avança
        fetch(urlGoogleScript, { method: 'POST', body: formData })
        .then(() => window.location.href = 'agradecimento.html')
        .catch(err => console.error(err));
    } else {
        // Redireciona para o inquérito e envia a nota no URL
        window.location.href = 'inquerito.html?score=' + score;
    }
}