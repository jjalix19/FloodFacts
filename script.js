// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Login/Logout Logic
function checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn');
    const username = localStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const welcomeMessage = document.getElementById('welcome-message');

    if (loggedIn && username) {
        if (loginLink) loginLink.textContent = 'Logout';
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
            welcomeMessage.innerHTML = `<p class="text-success">Welcome back, ${username}!</p>`;
        }
    } else {
        if (loginLink) loginLink.textContent = 'Login';
        if (welcomeMessage) welcomeMessage.style.display = 'none';
    }
}

if (document.getElementById('login-link')) {
    document.getElementById('login-link').addEventListener('click', function(e) {
        if (localStorage.getItem('loggedIn')) {
            // Logout
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            location.reload(); // Refresh to update navbar
        } else {
            // Go to login page (default behavior)
        }
    });
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username && password) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            window.location.href = 'index.html'; // Redirect to home
        } else {
            alert('Please enter both username and password.');
        }
    });
}

// Call on page load
checkLoginStatus();

// Weather API Integration
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const city = 'New York'; // Default city; can be made dynamic
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        document.getElementById('weather').innerHTML = `
            <div class="card-body">
                <h5>${city}</h5>
                <p>Temperature: ${temp}°C</p>
                <p>Humidity: ${humidity}%</p>
            </div>
        `;
    })
    .catch(error => {
        document.getElementById('weather').innerHTML = '<div class="card-body"><p>Error loading weather data.</p></div>';
    });

// Quiz Logic
const questions = [
    {
        question: "What should you do first during a flood?",
        options: ["Move to higher ground", "Call friends", "Turn on lights", "Drive through water"],
        answer: 0
    },
    {
        question: "Which item is essential in an emergency kit?",
        options: ["Extra clothes", "Water and food", "Books", "Candles"],
        answer: 1
    },
    {
        question: "What should you avoid during a flood?",
        options: ["Boiling water", "Using electrical appliances in water", "Elevating valuables", "Preparing a plan"],
        answer: 1
    },
    {
        question: "How can you stay informed about floods?",
        options: ["Ignore news", "Check weather apps", "Sleep", "Go outside"],
        answer: 1
    },
    {
        question: "After a flood, what should you do with contaminated water?",
        options: ["Drink it", "Boil it first", "Throw it away", "Ignore it"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerHTML = `<h4>${q.question}</h4>`;
    document.getElementById('options').innerHTML = q.options.map((opt, i) => 
        `<button class="btn btn-outline-primary m-1" onclick="checkAnswer(${i})">${opt}</button>`
    ).join('');
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) score++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = score;
    const feedback = score >= 4 ? "Great job! You're flood-ready." : "Review the tips and try again.";
    document.getElementById('feedback').textContent = feedback;
    localStorage.setItem('floodQuizScore', score); // Store score
}

loadQuestion(); // Start quiz