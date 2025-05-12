document.addEventListener('DOMContentLoaded', function() {
    // Like system
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    let likes = parseInt(localStorage.getItem('videoLikes') || '0');
    let hasLiked = localStorage.getItem('hasLiked') === 'true';

    // Always show total likes count
    const updateLikeDisplay = () => {
        if (likeCount) {
            likeCount.textContent = likes;
            localStorage.setItem('videoLikes', likes.toString());
        }
    };

    // Update initial like count and button state
    if (likeButton && likeCount) {
        updateLikeDisplay();
        if (hasLiked) {
            likeButton.classList.add('liked');
        }

        likeButton.addEventListener('click', function() {
            if (hasLiked) {
                likes--;
                hasLiked = false;
                likeButton.classList.remove('liked');
            } else {
                likes++;
                hasLiked = true;
                likeButton.classList.add('liked');
            }
            likeCount.textContent = likes;
            localStorage.setItem('videoLikes', likes.toString());
            localStorage.setItem('hasLiked', hasLiked.toString());
        });
    }

    const onlineCount = document.getElementById('onlineCount');
    const totalCount = document.getElementById('totalCount');

    // Discord member count
    async function updateDiscordStats() {
        try {
            const response = await fetch('https://discord.com/api/guilds/1358340466315362415/widget.json');
            const data = await response.json();

            if (onlineCount && totalCount) {
                const realMembers = data.members.filter(member => !member.bot);
                onlineCount.textContent = realMembers.length;
                totalCount.textContent = realMembers.length;

                // Update member list if it exists
                const memberListElement = document.getElementById('memberList');
                if (memberListElement) {
                    memberListElement.innerHTML = realMembers.map(member => `
                        <div class="member-item">
                            <img src="${member.avatar_url}" alt="${member.username}" class="member-avatar">
                            <span class="member-name">${member.username}</span>
                            <span class="member-status ${member.status}"></span>
                        </div>
                    `).join('');
                }
            }
        } catch (error) {
            console.error('Error fetching Discord stats:', error);
            if (onlineCount) onlineCount.textContent = "0";
            if (totalCount) totalCount.textContent = "0";
        }
    }

    // Discord member count
    async function updateDiscordStats() {
        try {
            const response = await fetch('https://discord.com/api/guilds/1358340466315362415/widget.json');
            const data = await response.json();

            if (onlineCount && totalCount) {
                const realMembers = data.members.filter(member => !member.bot);
                onlineCount.textContent = realMembers.length;
                totalCount.textContent = realMembers.length;

                // Update member list if it exists
                const memberListElement = document.getElementById('memberList');
                if (memberListElement) {
                    memberListElement.innerHTML = realMembers.map(member => `
                        <div class="member-item">
                            <img src="${member.avatar_url}" alt="${member.username}" class="member-avatar">
                            <span class="member-name">${member.username}</span>
                            <span class="member-status ${member.status}"></span>
                        </div>
                    `).join('');
                }
            }
        } catch (error) {
            console.error('Error fetching Discord stats:', error);
            if (onlineCount) onlineCount.textContent = "N/A";
            if (totalCount) totalCount.textContent = "N/A";
        }
    }

    // Update Discord stats every 5 minutes
    if (onlineCount || totalCount) {
        updateDiscordStats();
        setInterval(updateDiscordStats, 300000);
    }

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
        button.href = 'https://www.roblox.com/games/start?placeId=7711635737&launchData=joinCode%3Dpgisejpb';
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
        joinServerBtn.href = 'https://www.roblox.com/games/start?placeId=7711635737&launchData=joinCode%3Dpgisejpb';
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
            let violationFromSelect = formData.get('violation'); // Original value from the dropdown ("other", "hacking", etc.)
            let processedViolationValue = violationFromSelect; // This will be the value used for logic and sending
            const details = formData.get('details');
            const submitMethod = formData.get('submitMethod');
            const otherViolationInput = document.getElementById('otherViolation'); // Get the "Specify Violation" input field

            // Handle "Other" violation type
            if (violationFromSelect === 'other') {
                if (otherViolationInput && otherViolationInput.value.trim() !== '') {
                    const specifiedText = otherViolationInput.value.trim();
                    processedViolationValue = 'Other: ' + specifiedText; // Update for JS logic and Discord
                    formData.set('violation', processedViolationValue);   // IMPORTANT: Update formData for Formspree/email
                } else {
                    // "Other" is selected, but the specification is empty. This is an error.
                    messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please specify the violation if you select "Other".</p></div>';
                    messageElement.className = 'alert alert-warning';
                    messageElement.style.display = 'flex';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return; // Stop the submission
                }
            }

            console.log("Form data:", { username, violation: processedViolationValue, details, submitMethod });

            // Form validation
            if (!username || !isValidRobloxUsername(username)) {
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please enter a valid Roblox username (3-20 characters, letters, numbers, and underscores only)</p></div>';
                    messageElement.className = 'alert alert-warning';
                    messageElement.style.display = 'flex';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
                return;
    }

            // Use processedViolationValue for validation.
            // If "Other" was selected and text was empty, we returned above.
            // This check now primarily ensures a non-"Other" option was selected or "Other" was processed.
            if (!processedViolationValue || (violationFromSelect !== 'other' && processedViolationValue === 'other')) {
                // This condition handles if processedViolationValue is empty OR
                // if original selection was 'other' but it wasn't processed (e.g. input field missing - though unlikely with above check)
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please select or specify a valid violation type.</p></div>';
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
                                { name: 'Violation Type', value: processedViolationValue, inline: true }, // Use the processed value
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
                    // Send via Formspree - formData is already updated with the correct "violation" value
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






// Admin Application Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const adminForm = document.querySelector('.admin-application');
    if (!adminForm) return;

    const startButton = document.getElementById('startButton');
    const questionContainer = document.getElementById('questionContainer');
    const completionMessage = document.getElementById('completionMessage');
    const timerElement = document.getElementById('timer');
    const allQuestionsContainer = document.getElementById('allQuestions');
    const submitButton = document.getElementById('submitButton');
    const introSection = document.getElementById('introSection');

    let timeLeft = 30 * 60; // 30 minutes in seconds
    let timerInterval;
    let lastSubmissionDate = localStorage.getItem('lastAdminSubmission');
    let username = '';

    // Check if user can submit
    function canSubmit() {
        if (!lastSubmissionDate) return true;
        const daysSinceLastSubmission = (Date.now() - new Date(lastSubmissionDate)) / (1000 * 60 * 60 * 24);
        return daysSinceLastSubmission >= 5;
    }

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 300) { // 5 minutes warning
            timerElement.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitApplication();
        }
        timeLeft--;
    }

    function showAllQuestions() {
        if (!allQuestionsContainer || !questions) return;

        allQuestionsContainer.style.maxHeight = 'none';
        allQuestionsContainer.style.overflow = 'visible';

        let questionsHtml = '';
        questions.forEach((question, index) => {
            const needsTextarea = question.length > 100;
            questionsHtml += `
                <div class="application-question">
                    <div class="question-number">Question ${index + 1} of ${questions.length}</div>
                    <div class="question-text">${question}</div>
                    ${needsTextarea ? 
                        `<textarea class="answer-input textarea" id="answer-${index}" placeholder="Enter your answer here..."></textarea>` : 
                        `<input type="text" class="answer-input" id="answer-${index}" placeholder="Enter your answer here...">`}
                </div>
            `;
        });

        allQuestionsContainer.innerHTML = questionsHtml;

        // Add event listener for username field
        const usernameField = document.getElementById('answer-0');
        if (usernameField) {
            usernameField.addEventListener('input', (e) => {
                username = e.target.value;
                if (username) {
                    questions.forEach((question, index) => {
                        if (index > 0) {
                            const questionElement = document.querySelector(`#answer-${index}`).previousElementSibling;
                            if (questionElement) {
                                questionElement.textContent = question.replace('[username]', username);
                            }
                        }
                    });
                }
            });
        }
    }

    /**
     * Updates the personalized questions on the page by replacing the [username]
     * placeholder with the user's actual username.
     */
    function updatePersonalizedQuestions() {
        // Loop through each question (excluding the first one which is the username field)
        questions.forEach((question, index) => {
            if (index > 0) {
                // Get the question element
                const questionElement = document.querySelector(`#answer-${index}`).parentElement.querySelector('.question-text');

                // Replace the [username] placeholder with the user's actual username
                questionElement.textContent = question.replace('[username]', username);
            }
        });
    }

    /**
     * Submits the admin application to Discord
     * @returns {Promise<boolean>} True if submission was successful, false otherwise
     */
    async function submitToDiscord() {
        const answers = [];
        let answeredQuestions = 0;
        let unansweredQuestions = [];

        // Loop through each question and get the answer
        for (let i = 0; i < questions.length; i++) {
            const answer = document.getElementById(`answer-${i}`)?.value || '';
            if (answer.trim()) {
                answeredQuestions++;
                answers.push(answer);
            } else {
                unansweredQuestions.push(`Question ${i + 1}: ${questions[i]}`);
                answers.push('Not answered');
            }
        }

        // Check if there are any unanswered questions
        if (unansweredQuestions.length > 0) {
            let errorMessage = document.getElementById('application-error');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.id = 'application-error';
                errorMessage.className = 'alert alert-warning';
                questionContainer.insertBefore(errorMessage, allQuestionsContainer);
            }
            errorMessage.innerHTML = `
                <div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div>
                <div class="alert-content">
                    <p>Please answer the following questions:</p>
                    <ul>${unansweredQuestions.map(q => `<li>${q}</li>`).join('')}</ul>
                </div>
            `;
            errorMessage.style.display = 'flex';
            return false;
        }

        // Get the Discord webhook URL
        const webhookUrl = 'https://discordapp.com/api/webhooks/1371473852260946010/ndqsvRDxuVQ2TwhTLwwlJhFe4rwWfo-Wy14MqlbHqvdcc-CIze8BSdZZSHc_g4mTMzeX';

        // Check if there was a timeout
        const isTimeout = timeLeft <= 0;

        try {
            // Create the Discord message
            const message = {
                content: '<@&1369250776903450685>',
                embeds: [{
                    title: `Admin Application ${isTimeout ? '(TIMED OUT)' : ''}`,
                    color: isTimeout ? 0xFF0000 : 0x00FF00,
                    fields: questions.map((q, i) => ({
                        name: `Q${i + 1}: ${q}`,
                        value: answers[i] || 'Not answered',
                        inline: false
                    })),
                    footer: {
                        text: `Completed ${answeredQuestions}/${questions.length} questions`
                    },
                    timestamp: new Date().toISOString()
                }]
            };

            // Send the message to Discord
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });

            // Check if the submission was successful
            if (!response.ok) {
                throw new Error('Failed to send to Discord');
            }

            return true;
        } catch (error) {
            console.error('Error submitting to Discord:', error);
            return false;
        }
    }

    /**
     * Checks if the user has submitted an application in the past 5 days
     * @returns {boolean} True if the user can submit, false otherwise
     */
    function canSubmit() {
        if (!lastSubmissionDate) return true;
        const daysSinceLastSubmission = (Date.now() - new Date(lastSubmissionDate)) / (1000 * 60 * 60 * 24);
        return daysSinceLastSubmission >= 5;
    }

    function submitApplication() {
        questionContainer.style.display = 'none';
        completionMessage.style.display = 'block';
        // Here you could add code to send the answers to your server
        console.log('Application answers:', answers);
    }

    if (startButton) {
        startButton.addEventListener('click', () => {
            if (!canSubmit()) {
                const nextDate = new Date(new Date(lastSubmissionDate).getTime() + (5 * 24 * 60 * 60 * 1000));
                alert(`You must wait 5 days between submissions. You can submit again on ${nextDate.toLocaleDateString()}`);
                return;
            }

            introSection.style.display = 'none';
            questionContainer.style.display = 'block';
            showAllQuestions();
            timerInterval = setInterval(updateTimer, 1000);
            updateTimer();
        });
    }

    if (submitButton) {
        submitButton.addEventListener('click', async () => {
            try {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

                // Create or get message element
                let messageElement = document.getElementById('submit-message');if (!messageElement) {
                    messageElement = document.createElement('div');
                    messageElement.id = 'submit-message';
                    messageElement.className = 'alert';
                    questionContainer.insertBefore(messageElement, submitButton);
                }

                const success = await submitToDiscord();
                if (success === false) {
                    messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Please fill in all required fields before submitting.</p></div>';
                    messageElement.className = 'alert alert-warning';
                    messageElement.style.display = 'flex';
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Submit Application';
                    return;
                }

                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-check-circle"></i></div><div class="alert-content"><p>Application submitted successfully!</p></div>';
                messageElement.className = 'alert alert-info';
                messageElement.style.display = 'flex';

                localStorage.setItem('lastAdminSubmission', new Date().toISOString());
                setTimeout(() => {
                    completionMessage.style.display = 'block';
                    questionContainer.style.display = 'none';
                    clearInterval(timerInterval);
                }, 2000);
            } catch (error) {
                console.error('Submission error:', error);
                let messageElement = document.getElementById('submit-message');
                if (!messageElement) {
                    messageElement = document.createElement('div');
                    messageElement.id = 'submit-message';
                    messageElement.className = 'alert';
                    questionContainer.insertBefore(messageElement, submitButton);
                }
                messageElement.innerHTML = '<div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div><div class="alert-content"><p>Error submitting application. Please try again.</p></div>';
                messageElement.className = 'alert alert-warning';
                messageElement.style.display = 'flex';
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Application';
            }
        });
    }
});