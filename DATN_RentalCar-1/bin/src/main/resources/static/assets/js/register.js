//back
document.addEventListener('DOMContentLoaded', () => {
    const backArrow = document.getElementById('back-arrow');
    backArrow.addEventListener('click', () => {
        window.location.href = '/';
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');
      const showRegisterLink = document.getElementById('show-register');
      const showLoginLink = document.getElementById('show-login');
    
      // hiện form đăng ký và đăng nhập
      showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
      });
      // hiện đăng nhập ẩn đăng kí
      showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
      });
    });