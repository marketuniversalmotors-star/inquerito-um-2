const urlGoogleScript = 'https://script.google.com/macros/s/AKfycbz-KotxTxPs_lZOYBPU27kATinLz4YI8omrKQwWlxN2vPGqiRBjF1aDU0AJQ_V3VyiT/exec';

function submitRating(score) {
    if (score <= 3) {
        const token = 'tok_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        
        const formData = new FormData();
        formData.append('score', score);
        formData.append('token', token);
        formData.append('tipo', 'porta'); // Envia para a aba "Cliente a Porta"
        
        fetch(urlGoogleScript, { method: 'POST', body: formData })
        .catch(err => console.error(err));

        window.location.href = `inquerito.html?score=${score}&token=${token}`;
    } else {
        document.getElementById('survey-section').style.display = 'none';
        document.getElementById('loading-msg').style.display = 'block';
        
        const formData = new FormData();
        formData.append('score', score);
        formData.append('tipo', 'porta'); // Envia para a aba "Cliente a Porta"
        
        fetch(urlGoogleScript, { method: 'POST', body: formData })
        .then(() => window.location.href = 'agradecimento.html')
        .catch(err => console.error(err));
    }
}
