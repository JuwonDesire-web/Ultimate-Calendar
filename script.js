// Calendar functionality
let currentDate = new Date();

function renderCalendar() {
    const daysContainer = document.getElementById('days');
    const currentMonthYear = document.getElementById('currentMonthYear');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    currentMonthYear.textContent = `${getMonthName(month)} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    daysContainer.innerHTML = '';
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        if (date.getMonth() !== month) {
            dayElement.classList.add('other-month');
        }
        
        if (date.toDateString() === new Date().toDateString()) {
            dayElement.classList.add('today');
        }
        
        dayElement.innerHTML = `
            <div class="day-number">${date.getDate()}</div>
            <div class="day-events"></div>
        `;
        
        daysContainer.appendChild(dayElement);
    }
}

function getMonthName(monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}

// Navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Sidebar functionality
function addToList(listId, inputId) {
    const list = document.getElementById(listId);
    const input = document.getElementById(inputId);
    const text = input.value.trim();
    
    if (text) {
        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li);
        input.value = '';
    }
}

document.getElementById('addImportantDate').addEventListener('click', () => {
    addToList('importantDates', 'newImportantDate');
});

document.getElementById('addBirthdayHoliday').addEventListener('click', () => {
    addToList('birthdaysHolidays', 'newBirthdayHoliday');
});

// Habit tracking
let habits = [];

function renderHabits() {
    const habitsContainer = document.getElementById('habits');
    habitsContainer.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const habitElement = document.createElement('div');
        habitElement.className = 'habit';
        habitElement.innerHTML = `
            <span class="habit-name">${habit.name}</span>
            <div class="habit-tracker">
                ${Array.from({length: 7}, (_, i) => `
                    <div class="habit-day ${habit.days[i] ? 'completed' : ''}" data-habit="${index}" data-day="${i}"></div>
                `).join('')}
            </div>
        `;
        habitsContainer.appendChild(habitElement);
    });
    
    // Add event listeners to habit days
    document.querySelectorAll('.habit-day').forEach(day => {
        day.addEventListener('click', (e) => {
            const habitIndex = parseInt(e.target.dataset.habit);
            const dayIndex = parseInt(e.target.dataset.day);
            habits[habitIndex].days[dayIndex] = !habits[habitIndex].days[dayIndex];
            renderHabits();
        });
    });
}

document.getElementById('addHabit').addEventListener('click', () => {
    const input = document.getElementById('newHabit');
    const habitName = input.value.trim();
    
    if (habitName) {
        habits.push({ name: habitName, days: Array(7).fill(false) });
        renderHabits();
        input.value = '';
    }
});

// Motivational quotes
const quotes = [
    "\"The only way to do great work is to love what you do.\" – Steve Jobs",
    "\"Believe you can and you're halfway there.\" – Theodore Roosevelt",
    "\"The future belongs to those who believe in the beauty of their dreams.\" – Eleanor Roosevelt",
    "\"You miss 100% of the shots you don't take.\" – Wayne Gretzky",
    "\"The best way to predict the future is to create it.\" – Peter Drucker",
    "\"Don't watch the clock; do what it does. Keep going.\" – Sam Levenson",
    "\"The only limit to our realization of tomorrow will be our doubts of today.\" – Franklin D. Roosevelt",
    "\"Keep your face always toward the sunshine—and shadows will fall behind you.\" – Walt Whitman"
];

document.getElementById('newQuote').addEventListener('click', () => {
    const quoteElement = document.getElementById('quote');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
});

// Initialize
renderCalendar();
renderHabits();
