document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            const reportForm = document.getElementById('reportForm');
    const unbanForm = document.getElementById('unbanForm');

    // Explicitly set the server join URLs directly on the elements
    const serverButtons = document.querySelectorAll('a.btn-primary, .social-link[aria-label="Roblox"]');
    serverButtons.forEach(button => {
        button.href = 'https://www.roblox.com/games/start?placeId=7711635737&launchData=joinCode%3D72kaqjm0';
        button.setAttribute('target', '_blank');
    });

    // Set Discord URLs
    const discordButtons = document.querySelectorAll('a.btn-discord, a.btn-secondary:not(.btn-lg), .social-link[aria-label="Discord"]');
    discordButtons.forEach(button => {
        button.href = 'https://discord.gg/Ausrp25';
        button.setAttribute('target', '_blank');
    });

    // Special case for the Join Server Now button in private-server.html
    const joinServerBtn = document.getElementById('joinServerBtn');
    if (joinServerBtn) {
        joinServerBtn.href = 'https://www.roblox.com/games/start?placeId=7711635737&launchData=joinCode%3D72kaqjm0';
        joinServerBtn.setAttribute('target', '_blank');

        // Remove any click listeners that might be preventing default behavior
        const newJoinBtn = joinServerBtn.cloneNode(true);
        joinServerBtn.parentNode.replaceChild(newJoinBtn, joinServerBtn);
    }

    // Replace all YouTube icons with TikTok
    const youtubeLinks = document.querySelectorAll('.social-link[aria-label="YouTube"]');
    youtubeLinks.forEach(link => {
        link.setAttribute('aria-label', 'TikTok');
        const icon = link.querySelector('i');
        if (icon) {
            icon.className = icon.className.replace('fa-youtube', 'fa-tiktok');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-toggle')) {
                navMenu.classList.remove('active');

                // Reset icon
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // Mobile dropdown toggles
    if (dropdownToggles) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.closest('.nav-item');
                    parent.classList.toggle('active');

                    // Toggle dropdown icon
                    const icon = this.querySelector('.dropdown-icon');
                    if (icon) {
                        icon.classList.toggle('fa-chevron-down');
                        icon.classList.toggle('fa-chevron-up');
                    }
                }
            });
        });
    }

    // Handle violation dropdown in report form
    const setupViolationDropdown = function() {
    const violationSelect = document.getElementById('violation');
    const otherViolationGroup = document.getElementById('otherViolationGroup');

        if (violationSelect && otherViolationGroup) {
    const otherViolationInput = document.getElementById('otherViolation');

            // Add change event listener
        violationSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherViolationGroup.style.display = 'block';
                    if (otherViolationInput) {
                otherViolationInput.setAttribute('required', 'required');
            }
                        } else {
                    otherViolationGroup.style.display = 'none';
                    if (otherViolationInput) {
                        otherViolationInput.removeAttribute('required');
                        otherViolationInput.value = '';
    }
                    }
            });

            // Check initial value
            if (violationSelect.value === 'other') {
                otherViolationGroup.style.display = 'block';
                if (otherViolationInput) {
                    otherViolationInput.setAttribute('required', 'required');
                }
            }
        }
                    };

    // Call the setup function for the violation dropdown
    setupViolationDropdown();

    // Roblox username validation function
    function isValidRobloxUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    }

    // Report Player form handling
    if (reportForm) {
        console.log("Report form found, adding event listener");

        // Create message element if it doesn't exist
        let messageElement = document.getElementById('form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'form-message';
            messageElement.style.display = 'none';
            messageElement.className = 'alert';
            reportForm.parentNode.insertBefore(messageElement, reportForm);
        }

        reportForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log("Report form submitted");

            const submitBtn = reportForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(reportForm);
            const username = formData.get('username');
            let violation = formData.get('violation');
            const details = formData.get('details');
            const submitMethod = formData.get('submitMethod');

            // If "other" is selected, use the otherViolation value
            if (violation === 'other' && otherViolationInput && otherViolationInput.value) {
                violation = 'Other: ' + otherViolationInput.value;
            }

            console.log("Form data:", { username, violation, details, submitMethod });

            // Form validation
            if (!username || !isValidRobloxUsername(username)) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please enter a valid Roblox username (3-20 characters, letters, numbers, and underscores only)</p></div>';
                    messageElement.className = 'alert alert-warning';
                    messageElement.style.display = 'flex';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
                return;
    }

            if (!violation) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please select a violation type</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
    }

            if (!details || details.length < 10) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please provide more details about the incident</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            if (!submitMethod) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please select how you want to submit this report</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            // Process form submission
            try {
                let success = false;

                if (submitMethod === 'discord') {
                    console.log("Sending to Discord webhook");
                    // Send to Discord webhook
                    const webhookUrl = 'https://discordapp.com/api/webhooks/1369248820357234738/u-9-9CtrxtY7xM2UoZVkM-dzLjS_Hi7c6gDO39YD0-_wLjJY4wkYJwkxZN7UQdXpEKdA';
                    const message = {
                        content: '<@&1369250776903450685>', // Mention role
                        embeds: [{
                            title: 'New Player Report',
                            color: 0x1E3A8A,
                            fields: [
                                { name: 'Username', value: username, inline: true },
                                { name: 'Violation Type', value: violation, inline: true },
                                { name: 'Details', value: details }
                            ],
                            timestamp: new Date().toISOString()
                        }]
                    };

                    console.log("Discord payload:", JSON.stringify(message));
                    try {
                        const response = await fetch(webhookUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(message)
                        });

                        console.log("Discord response status:", response.status);

                        if (response.ok) {
                            console.log("Discord webhook success");
                            success = true;
                        } else {
                            const errorText = await response.text();
                            console.error("Discord webhook error:", errorText);
                            success = false;
                        }
                    } catch (webhookError) {
                        console.error("Discord webhook fetch error:", webhookError);
                        success = false;
                    }

                } else if (submitMethod === 'email') {
                    console.log("Sending via Formspree");
                    // Send via Formspree
                    try {
                        const response = await fetch('https://formspree.io/f/moveylzy', {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                        });

                        console.log("Formspree response status:", response.status);
                        if (response.ok) {
                            console.log("Formspree success");
                            success = true;
                        } else {
                            const errorData = await response.json();
                            console.error("Formspree error:", errorData);
                            success = false;
                        }
                    } catch (formspreeError) {
                        console.error("Formspree fetch error:", formspreeError);
                        success = false;
                    }
                }

                if (success) {
                    messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-check-circle"></i></div><div class="alert-content"><p>Report submitted successfully! Thank you for helping us maintain a fair gaming environment.</p></div>';
                    messageElement.className = 'alert alert-info';
                    messageElement.style.display = 'flex';
                    reportForm.reset();
                } else {
                    messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>There was a problem submitting your report. Please try again later.</p></div>';
                    messageElement.className = 'alert alert-warning';
                    messageElement.style.display = 'flex';
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>There was a problem submitting your report. Please try again later.</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // Unban Request form handling
    if (unbanForm) {
        console.log("Unban form found, adding event listener");

        // Create message element if it doesn't exist
        let messageElement = document.getElementById('unban-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'unban-message';
            messageElement.style.display = 'none';
            messageElement.className = 'alert';
            unbanForm.parentNode.insertBefore(messageElement, unbanForm);
        }

        unbanForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log("Unban form submitted");

            const submitBtn = unbanForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(unbanForm);
            const username = formData.get('username');
            const banReason = formData.get('banReason');
            const explanation = formData.get('explanation');
            const submitMethod = formData.get('submitMethod');

            console.log("Form data:", { username, banReason, explanation, submitMethod });

            // Form validation
            if (!username || !isValidRobloxUsername(username)) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please enter a valid Roblox username (3-20 characters, letters, numbers, and underscores only)</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            if (!banReason || banReason.length < 5) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please provide the reason for your ban</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            if (!explanation || explanation.length < 20) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please provide a detailed explanation for your unban request</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            if (!submitMethod) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please select how you want to submit this request</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            // Process form submission
            try {
                let success = false;

                if (submitMethod === 'discord') {
                    console.log("Sending to Discord webhook");
                    // Send to Discord webhook
                    const webhookUrl = 'https://discordapp.com/api/webhooks/1369599654328799232/uu8PWgzGU5uaGuIQXJbq2kpVGf9-RY-U79tYhJlh8q048essAv7GdkT9chJPtdANJmD3';
                    const message = {
                        content: '<@&1369250776903450685>', // Mention role
                        embeds: [{
                            title: 'New Unban Request',
                            color: 0x1E3A8A,
                            fields: [
                                { name: 'Username', value: username, inline: true },
                                { name: 'Ban Reason', value: banReason, inline: true },
                                { name: 'Explanation', value: explanation }
                            ],
                            timestamp: new Date().toISOString()
                        }]
                    };

                    console.log("Discord payload:", JSON.stringify(message));

                    try {
                        const response = await fetch(webhookUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(message)
                        });

                        console.log("Discord response status:", response.status);

                        if (response.ok) {
                            console.log("Discord webhook success");
                            success = true;
                        } else {
                            const errorText = await response.text();
                            console.error("Discord webhook error:", errorText);
                            success = false;
                        }
                    } catch (webhookError) {
                        console.error("Discord webhook fetch error:", webhookError);
                        success = false;
                    }

                } else if (submitMethod === 'email') {
                    console.log("Sending via Formspree");
                    // Send via Formspree
                    try {
                        const response = await fetch('https://formspree.io/f/moveylzy', {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                        });

                        console.log("Formspree response status:", response.status);

                        if (response.ok) {
                            console.log("Formspree success");
                            success = true;
                        } else {
                            const errorData = await response.json();
                            console.error("Formspree error:", errorData);
                            success = false;
                        }
                    } catch (formspreeError) {
                        console.error("Formspree fetch error:", formspreeError);
                        success = false;
                    }
                }

                if (success) {
                    messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-check-circle"></i></div><div class="alert-content"><p>Unban request submitted successfully! We will review your request and get back to you soon.</p></div>';
                    messageElement.className = 'alert alert-info';
                    messageElement.style.display = 'flex';
                    unbanForm.reset();
                } else {
                    messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>There was a problem submitting your request. Please try again later.</p></div>';
                    messageElement.className = 'alert alert-warning';
                    messageElement.style.display = 'flex';
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>There was a problem submitting your request. Please try again later.</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
    // Handle violation dropdown change
    const violationSelect = document.getElementById('violation');
    const otherViolationGroup = document.getElementById('otherViolationGroup');

    if (violationSelect && otherViolationGroup) {
        violationSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherViolationGroup.style.display = 'block';
            } else {
                otherViolationGroup.style.display = 'none';
            }
        });
    }
});




