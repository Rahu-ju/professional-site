// a small script to send ajax request using vanilla js to send mail to me.

        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');
            const alertContainer = document.getElementById('alert-container');

            // Get CSRF token
            function getCsrfToken() {
              const csrfInput = document.querySelector('[name=csrfmiddlewaretoken]');
              return csrfInput ? csrfInput.value : null;
            }
            const csrftoken = getCsrfToken();

            // Show alert message
            function showAlert(message, type) {
                alertContainer.innerHTML = `
                    <div class="relative px-4 py-3 mb-4 rounded-lg ${
                        type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' :
                        type === 'danger' ? 'bg-red-100 border border-red-400 text-red-700' :
                        type === 'warning' ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' :
                        type === 'info' ? 'bg-blue-100 border border-blue-400 text-blue-700' :
                        'bg-gray-100 border border-gray-400 text-gray-700'
                        }" role="alert">
                        ${message}
                        <button type="button" class="absolute top-0 right-0 px-4 py-3 text-2xl leading-none hover:opacity-75" onclick="this.parentElement.remove()">
                            &times;
                        </button>
                    </div>
                `;
            }

            // Handle form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();

                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };

                // Show loading state
                submitBtn.disabled = true;
                btnText.classList.add('hidden');
                btnSpinner.classList.remove('hidden');

                try {
                    // Send AJAX request
                    const response = await fetch('contact/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (response.ok && data.status === 'success') {
                        showAlert(data.message, 'success');
                        form.reset();
                    } else {
                        showAlert(data.message, 'danger');
                    }
                } catch (error) {
                    showAlert('An error occurred. Please try again.', 'danger');
                    // console.log('Error:', error);
                } finally {
                    // Hide loading state
                    submitBtn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                }
            });
        });
