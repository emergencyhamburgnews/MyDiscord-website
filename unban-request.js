// Unban Request Form Handling
const unbanForm = document.getElementById('unbanForm');

// Add a message container for feedback
let unbanMsg = document.createElement('div');
unbanMsg.id = 'unbanMsg';
unbanMsg.style.margin = '1rem 0';
unbanForm.parentNode.insertBefore(unbanMsg, unbanForm);

unbanForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    unbanMsg.textContent = 'Your form is sending...';
    unbanMsg.style.color = '#012C66';

    const formData = {
        username: document.getElementById('unban-username').value,
        banReason: document.getElementById('ban-reason').value,
        explanation: document.getElementById('unban-explanation').value,
        submitMethod: document.querySelector('input[name="submitMethod"]:checked').value
    };

    // Validate Roblox username (basic validation)
    if (!isValidRobloxUsername(formData.username)) {
        unbanMsg.textContent = 'Please enter a valid Roblox username';
        unbanMsg.style.color = 'red';
        return;
    }

    try {
        if (formData.submitMethod === 'discord') {
            await sendToDiscordUnban(formData);
        } else {
            await sendToEmailUnban(formData);
        }

        unbanMsg.textContent = '✅ Unban request submitted successfully!';
        unbanMsg.style.color = 'green';
        unbanForm.reset();
    } catch (error) {
        unbanMsg.textContent = '❌ Error submitting unban request. Please try again.';
        unbanMsg.style.color = 'red';
        console.error('Error:', error);
    }
});

// Roblox username validation
function isValidRobloxUsername(username) {
    // Basic Roblox username validation
    // Username must be 3-20 characters long and can contain letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

// Send unban request to Discord webhook
async function sendToDiscordUnban(formData) {
    // Use the provided Discord webhook URL
    const webhookUrl = 'https://discordapp.com/api/webhooks/1369248820357234738/u-9-9CtrxtY7xM2UoZVkM-dzLjS_Hi7c6gDO39YD0-_wLjJY4wkYJwkxZN7UQdXpEKdA';
    
    const message = {
        content: '<@&1369250776903450685>',
        embeds: [{
            title: 'New Unban Request',
            color: 0x012C66,
            fields: [
                {
                    name: 'Username',
                    value: formData.username,
                    inline: true
                },
                {
                    name: 'Ban Reason',
                    value: formData.banReason,
                    inline: true
                },
                {
                    name: 'Explanation',
                    value: formData.explanation
                }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    });

    if (!response.ok) {
        throw new Error('Failed to send to Discord');
    }
}

// Send unban request via email (placeholder function)
async function sendToEmailUnban(formData) {
    // Implement your email sending logic here
    // This could be through a server-side endpoint or email service
    console.log('Sending unban request email:', formData);
} 