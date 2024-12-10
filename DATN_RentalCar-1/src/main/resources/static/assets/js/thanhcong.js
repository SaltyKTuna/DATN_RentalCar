function showPaymentSuccess() {
    const successMessage = document.getElementById('payment-success');
    successMessage.classList.remove('hidden');
    successMessage.style.opacity = 1;

    setTimeout(() => {
        successMessage.style.opacity = 0;
        successMessage.classList.add('hidden');
        fireworks.stop();
    }, 3000); 
}

const container = document.getElementById('fireworks-container');
const fireworks = new Fireworks(container, {
  opacity: 0.9,
});


showPaymentSuccess();
fireworks.start();