document.addEventListener('DOMContentLoaded', () => {
    const subscribe_form = document.querySelector(".subscribe-form");
    const unsubscribe_form = document.querySelector(".unsubscribe-form");
    const email_input = document.querySelector(".email-input");
    const thank_you = document.querySelector(".thank-you");
    const unsubscribe = document.querySelector(".unsubscribe-input");
    const unsubscribe_message = document.querySelector(".unsubscribe-message");

    function addToEmailList(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    
        if (email && emailRegex.test(email)) {
            console.log('Valid email: ' + email);
    
            return fetch('https://script.google.com/macros/s/AKfycbzAzKLtGdWuKHP8lZbhHgAYnEaNoGZ0X03pVdQ6wMAhzefgVguwovq3iCG2i_Ka-Pu7oA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: [email, 'add'] }),
                mode: 'no-cors'
            })
            .then(() => {
                console.log('Request sent successfully (no-cors mode)');
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
        } else {
            return Promise.reject('Invalid email address');
        }
    }
    function deleteFromEmailList(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    
        if (email && emailRegex.test(email)) {
            console.log('Valid email: ' + email);
    
            return fetch('https://script.google.com/macros/s/AKfycbzAzKLtGdWuKHP8lZbhHgAYnEaNoGZ0X03pVdQ6wMAhzefgVguwovq3iCG2i_Ka-Pu7oA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: [email, 'delete'] }),
                mode: 'no-cors'
            })
            .then(() => {
                console.log('Request sent successfully (no-cors mode)');
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
        } else {
            return Promise.reject('Invalid email address');
        }
    }
    
    subscribe_form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = email_input.value;
    
        addToEmailList(email)
            .then(() => {
                email_input.value = ''; 
                thank_you.style.display = "block";
                thank_you.textContent = "You have been added! Thanks for subscribing to our email list!";
            })
            .catch((error) => {
                console.error(error);
                thank_you.style.display = "block";
                thank_you.textContent = "Please enter a valid email address.";
                thank_you.style.color = "red";
            });
    });
    unsubscribe_form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = unsubscribe.value;
    
        deleteFromEmailList(email)
            .then(() => {
                unsubscribe.value = ''; 
                unsubscribe_message.style.display = "block";
                unsubscribe_message.textContent = "You have been unsubscribed from our newsletter. We're sorry to see you go!";
            })
            .catch((error) => {
                console.error(error);
                unsubscribe_message.style.display = "block";
                unsubscribe_message.textContent = "Please enter a valid email address.";
                unsubscribe_message.style.color = "red";
            });
    });
});
