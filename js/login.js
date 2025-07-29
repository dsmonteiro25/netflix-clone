// Funcionalidade para os labels flutuantes
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value) {
                this.setAttribute('data-filled', 'true');
            } else {
                this.removeAttribute('data-filled');
            }
        });
    });

    // Simular login (apenas para demonstração)
    document.querySelector('.login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            alert('Login simulado com sucesso!\nEmail: ' + email);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Botão de código de acesso
    document.querySelector('.access-code-button').addEventListener('click', function() {
        alert('Funcionalidade de código de acesso em desenvolvimento.');
    });

    // Funcionalidade adicional: validação em tempo real
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });
    
    passwordInput.addEventListener('blur', function() {
        validatePassword(this.value);
    });
});

// Função para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    
    if (email && !emailRegex.test(email) && !phoneRegex.test(email)) {
        showFieldError('email', 'Por favor, insira um email válido ou número de telefone.');
        return false;
    } else {
        clearFieldError('email');
        return true;
    }
}

// Função para validar senha
function validatePassword(password) {
    if (password && password.length < 4) {
        showFieldError('password', 'A senha deve ter entre 4 e 60 caracteres.');
        return false;
    } else {
        clearFieldError('password');
        return true;
    }
}

// Função para mostrar erro no campo
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const inputGroup = field.parentElement;
    
    clearFieldError(fieldId);
    
    field.style.border = '1px solid #e87c03';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#e87c03';
    errorElement.style.fontSize = '13px';
    errorElement.style.marginTop = '6px';
    errorElement.textContent = message;
    
    inputGroup.appendChild(errorElement);
}

// Função para limpar erro do campo
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const inputGroup = field.parentElement;
    const existingError = inputGroup.querySelector('.field-error');
    
    field.style.border = 'none';
    
    if (existingError) {
        existingError.remove();
    }
}