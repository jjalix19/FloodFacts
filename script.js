// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
 
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
