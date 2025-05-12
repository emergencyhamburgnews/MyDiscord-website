
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const introSection = document.getElementById('introSection');
    const questionContainer = document.getElementById('questionContainer');
    const allQuestionsContainer = document.getElementById('allQuestions');
    const submitButton = document.getElementById('submitButton');
    const completionMessage = document.getElementById('completionMessage');
    const timerElement = document.getElementById('timer');

    let timeLeft = 30 * 60;
    let timerInterval;
    let lastSubmissionDate = localStorage.getItem('lastAdminSubmission');

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 300) {
            timerElement.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
        timeLeft--;
    }

    function showAllQuestions() {
        let questionsHtml = '';
        questions.forEach((question, index) => {
            questionsHtml += `
                <div class="application-question">
                    <div class="question-number">Question ${index + 1} of ${questions.length}</div>
                    <div class="question-text">${question}</div>
                    ${question.length > 100 ? 
                        `<textarea class="answer-input textarea" id="answer-${index}" placeholder="Enter your answer here..."></textarea>` : 
                        `<input type="text" class="answer-input" id="answer-${index}" placeholder="Enter your answer here...">`}
                </div>
            `;
        });
        allQuestionsContainer.innerHTML = questionsHtml;
    }

    async function submitToDiscord() {
        const answers = [];
        const unansweredQuestions = [];

        for (let i = 0; i < questions.length; i++) {
            const input = document.getElementById(`answer-${i}`);
            const answer = input?.value?.trim() || '';
            
            if (!answer) {
                unansweredQuestions.push(`Question ${i + 1}`);
            }
            answers.push(answer);
        }

        if (unansweredQuestions.length > 0) {
            return { success: false, unanswered: unansweredQuestions };
        }

        const webhookUrl = 'https://discordapp.com/api/webhooks/1371473852260946010/ndqsvRDxuVQ2TwhTLwwlJhFe4rwWfo-Wy14MqlbHqvdcc-CIze8BSdZZSHc_g4mTMzeX';
        
        // Create chunks of 25 questions each (Discord has a field limit)
        const chunks = [];
        for (let i = 0; i < questions.length; i += 25) {
            chunks.push(questions.slice(i, i + 25).map((q, idx) => ({
                name: `Q${i + idx + 1}: ${q}`,
                value: answers[i + idx] || 'No answer provided',
                inline: false
            })));
        }

        try {
            // Send each chunk as a separate embed
            for (let i = 0; i < chunks.length; i++) {
                const message = {
                    content: i === 0 ? '<@&1369250776903450685>' : '',
                    embeds: [{
                        title: `New Admin Application (Part ${i + 1}/${chunks.length})`,
                        color: 0x1E3A8A,
                        fields: chunks[i],
                        timestamp: new Date().toISOString()
                    }]
                };

                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(message)
                });

                if (!response.ok) {
                    throw new Error('Failed to send to Discord');
                }

                // Add a small delay between messages to prevent rate limiting
                if (i < chunks.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            return { success: true };
        } catch (error) {
            console.error('Error:', error);
            return { success: false, error: true };
        }
    }

    if (startButton) {
        startButton.addEventListener('click', () => {
            if (lastSubmissionDate) {
                const daysSinceLastSubmission = (Date.now() - new Date(lastSubmissionDate)) / (1000 * 60 * 60 * 24);
                if (daysSinceLastSubmission < 5) {
                    const nextDate = new Date(new Date(lastSubmissionDate).getTime() + (5 * 24 * 60 * 60 * 1000));
                    alert(`You must wait 5 days between submissions. You can submit again on ${nextDate.toLocaleDateString()}`);
                    return;
                }
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
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            const result = await submitToDiscord();
            
            if (!result.success) {
                if (result.unanswered) {
                    let messageElement = document.getElementById('submit-message');
                    if (!messageElement) {
                        messageElement = document.createElement('div');
                        messageElement.id = 'submit-message';
                        messageElement.className = 'alert alert-warning';
                        questionContainer.insertBefore(messageElement, submitButton);
                    }
                    messageElement.innerHTML = `
                        <div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div>
                        <div class="alert-content">
                            <p>Please answer the following questions:</p>
                            <ul>${result.unanswered.map(q => `<li>${q}</li>`).join('')}</ul>
                        </div>
                    `;
                    messageElement.style.display = 'flex';
                } else {
                    alert('Error submitting application. Please try again.');
                }
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Application';
                return;
            }

            localStorage.setItem('lastAdminSubmission', new Date().toISOString());
            completionMessage.style.display = 'block';
            questionContainer.style.display = 'none';
            clearInterval(timerInterval);
        });
    }
});
