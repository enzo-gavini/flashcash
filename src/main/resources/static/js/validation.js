// Form Validation and Enhancement Script

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

// Add validation feedback
function showValidation(input, isValid, message) {
    const parent = input.closest('.form-floating') || input.parentElement;
    const existingFeedback = parent.querySelector('.invalid-feedback, .valid-feedback');

    if (existingFeedback) {
        existingFeedback.remove();
    }

    input.classList.remove('is-invalid', 'is-valid');

    if (isValid) {
        input.classList.add('is-valid');
    } else if (message) {
        input.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
        parent.appendChild(feedback);
    }
}

// Sign-in form validation
function initSignInValidation() {
    const form = document.querySelector('.form-signin');
    if (!form) return;

    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const isValid = validateEmail(this.value);
            showValidation(this, isValid, isValid ? '' : 'Please enter a valid email address');
        });

        emailInput.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                const isValid = validateEmail(this.value);
                showValidation(this, isValid, isValid ? '' : 'Please enter a valid email address');
            }
        });
    }

    // Password validation
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            const isValid = this.value.length >= 6;
            showValidation(this, isValid, isValid ? '' : 'Password must be at least 6 characters');
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        let isValid = true;

        if (emailInput && !validateEmail(emailInput.value)) {
            showValidation(emailInput, false, 'Please enter a valid email address');
            isValid = false;
        }

        if (passwordInput && passwordInput.value.length < 6) {
            showValidation(passwordInput, false, 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            return false;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="spinner"></span> Signing in...';

            // Re-enable after 5 seconds (in case of error)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 5000);
        }
    });
}

// Sign-up form validation
function initSignUpValidation() {
    const form = document.querySelector('form[action*="signup"]');
    if (!form) return;

    const firstNameInput = form.querySelector('#firstName');
    const lastNameInput = form.querySelector('#lastName');
    const emailInput = form.querySelector('#email');
    const passwordInput = form.querySelector('#password');
    const confirmPasswordInput = form.querySelector('#confirmPassword');
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

    // Name validation
    [firstNameInput, lastNameInput].forEach(input => {
        if (!input) return;

        input.addEventListener('blur', function() {
            const isValid = this.value.trim().length >= 2;
            showValidation(this, isValid, isValid ? '' : 'Name must be at least 2 characters');
        });
    });

    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const isValid = validateEmail(this.value);
            showValidation(this, isValid, isValid ? '' : 'Please enter a valid email address');
        });

        emailInput.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                const isValid = validateEmail(this.value);
                showValidation(this, isValid, isValid ? '' : 'Please enter a valid email address');
            }
        });
    }

    // Password validation with strength indicator
    if (passwordInput) {
        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        const parent = passwordInput.closest('.form-floating') || passwordInput.parentElement;
        parent.appendChild(strengthIndicator);

        passwordInput.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            strengthIndicator.className = 'password-strength ' + strength;

            const isValid = this.value.length >= 8;
            if (this.value.length > 0) {
                showValidation(this, isValid, isValid ? '' : 'Password must be at least 8 characters');
            }

            // Re-validate confirm password if it has a value
            if (confirmPasswordInput && confirmPasswordInput.value) {
                const passwordsMatch = this.value === confirmPasswordInput.value;
                showValidation(confirmPasswordInput, passwordsMatch, passwordsMatch ? '' : 'Passwords do not match');
            }
        });

        passwordInput.addEventListener('blur', function() {
            const isValid = this.value.length >= 8;
            showValidation(this, isValid, isValid ? '' : 'Password must be at least 8 characters');
        });
    }

    // Confirm password validation
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const passwordsMatch = this.value === passwordInput.value;
            showValidation(this, passwordsMatch, passwordsMatch ? '' : 'Passwords do not match');
        });

        confirmPasswordInput.addEventListener('blur', function() {
            const passwordsMatch = this.value === passwordInput.value;
            showValidation(this, passwordsMatch, passwordsMatch ? '' : 'Passwords do not match');
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        let isValid = true;

        // Validate first name
        if (firstNameInput && firstNameInput.value.trim().length < 2) {
            showValidation(firstNameInput, false, 'First name must be at least 2 characters');
            isValid = false;
        }

        // Validate last name
        if (lastNameInput && lastNameInput.value.trim().length < 2) {
            showValidation(lastNameInput, false, 'Last name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        if (emailInput && !validateEmail(emailInput.value)) {
            showValidation(emailInput, false, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (passwordInput && passwordInput.value.length < 8) {
            showValidation(passwordInput, false, 'Password must be at least 8 characters');
            isValid = false;
        }

        // Validate password match
        if (confirmPasswordInput && passwordInput && confirmPasswordInput.value !== passwordInput.value) {
            showValidation(confirmPasswordInput, false, 'Passwords do not match');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            return false;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent || submitBtn.value;

            if (submitBtn.tagName === 'BUTTON') {
                submitBtn.innerHTML = '<span class="spinner"></span> Creating account...';
            } else {
                submitBtn.value = 'Creating account...';
            }

            // Re-enable after 5 seconds (in case of error)
            setTimeout(() => {
                submitBtn.disabled = false;
                if (submitBtn.tagName === 'BUTTON') {
                    submitBtn.textContent = originalText;
                } else {
                    submitBtn.value = originalText;
                }
            }, 5000);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initSignInValidation();
    initSignUpValidation();
});
