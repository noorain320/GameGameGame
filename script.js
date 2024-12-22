// Expanded game data for different themes
const themes = {
    fruits: [
        { word: "apple", hint: "A common red or green fruit." },
        { word: "banana", hint: "A long yellow fruit." },
        // { word: "cherry", hint: "A small, red fruit often found in pairs." },
        // { word: "grape", hint: "A small, round fruit that grows in clusters." },
        // { word: "orange", hint: "A citrus fruit with a thick skin." },
        // { word: "mango", hint: "A tropical fruit with a stone in the middle." },
        // { word: "watermelon", hint: "A large, juicy fruit with a green rind." },
        { word: "pineapple", hint: "A tropical fruit with spiky skin." }
    ],
    animals: [
        { word: "elephant", hint: "The largest land animal." },
        { word: "tiger", hint: "A large striped carnivorous mammal." },
        { word: "dolphin", hint: "A marine mammal known for its intelligence." },
        { word: "giraffe", hint: "The tallest land animal with a long neck." },
        { word: "kangaroo", hint: "An animal native to Australia known for hopping." },
        { word: "lion", hint: "The king of the jungle." },
        { word: "zebra", hint: "A black-and-white striped animal." },
        { word: "koala", hint: "An Australian marsupial known for its large ears." }
    ],
    colors: [
        { word: "red", hint: "The color of an apple or a stop sign." },
        { word: "blue", hint: "The color of the sky on a clear day." },
        { word: "green", hint: "The color of grass or trees." },
        { word: "yellow", hint: "The color of the sun." },
        { word: "purple", hint: "A color between red and blue." },
        { word: "orange", hint: "A citrus color." },
        { word: "pink", hint: "A light red color, often associated with flowers." },
        { word: "brown", hint: "The color of wood or earth." }
    ]
};

let currentLevel = 0;
let playerScore = 0;
let currentPuzzle = null;
let currentTheme = null;
let userAnswer = '';

// Elements
const levelElement = document.getElementById("level");
const puzzleElement = document.getElementById("word-puzzle");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit-answer");
const messageElement = document.getElementById("message");
const progressElement = document.getElementById("progress");
const previousLevelButton = document.getElementById("previous-level");
const homeButton = document.getElementById("home-button");
const homeButtonPopup = document.getElementById("home-button-popup");
const storyElement = document.getElementById("story");
const hintButton = document.getElementById("hint-button");
const celebrationPopup = document.getElementById("celebration-popup");

// Initialize the game
function startGame() {
    showHomePage();
}

// Show the home page (theme selection)
function showHomePage() {
    document.querySelector('.theme-selection').style.display = 'flex';
    document.querySelector('.game-info').style.display = 'none';
    document.querySelector('.puzzle-container').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    levelElement.textContent = '1';
    progressElement.textContent = '0%';
    document.getElementById("score").textContent = playerScore;
    homeButton.style.display = 'none';  // Hide the home button initially
}

// Select theme
function selectTheme(theme) {
    currentTheme = theme;
    currentLevel = 0;
    loadPuzzle();
    updateUI();
    document.querySelector('.theme-selection').style.display = 'none';
    document.querySelector('.game-info').style.display = 'block';
    document.querySelector('.puzzle-container').style.display = 'block';
    document.querySelector('.controls').style.display = 'block';
    homeButton.style.display = 'block';  // Show home button after theme selection
    previousLevelButton.style.display = 'none';  // Hide back button initially
    document.body.classList.add(theme);
}

// Load the puzzle for the current level
function loadPuzzle() {
    if (currentLevel >= themes[currentTheme].length) {
        showCelebration();
        return;
    }

    currentPuzzle = themes[currentTheme][currentLevel];
    puzzleElement.textContent = scrambleWord(currentPuzzle.word);
    hintButton.style.display = 'block';
    messageElement.textContent = '';
    answerInput.value = '';
}

// Scramble the word for the puzzle
function scrambleWord(word) {
    let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    return scrambled;
}

// Submit answer and move to the next level
function checkAnswer() {
    if (answerInput.value.toLowerCase() === currentPuzzle.word.toLowerCase()) {
        playerScore += 10;
        loadNextLevel();
    } else {
        messageElement.textContent = `Oops! Try again.`;
        messageElement.style.color = 'red';
    }
}

// Load the next level
function loadNextLevel() {
    currentLevel++;
    if (currentLevel >= themes[currentTheme].length) {
        showCelebration();
    } else {
        loadPuzzle();
        updateUI();
    }
}

// Show hint for the current puzzle
function provideHint() {
    messageElement.textContent = `Hint: ${currentPuzzle.hint}`;
    messageElement.style.color = 'blue';
}

// Update the UI based on current level and progress
function updateUI() {
    levelElement.textContent = currentLevel + 1;
    progressElement.textContent = `${Math.round((currentLevel / themes[currentTheme].length) * 100)}%`;
    homeButton.style.display = 'block';
    previousLevelButton.style.display = currentLevel > 0 ? 'block' : 'none';  // Show back button after first question
}

// Show the celebratory pop-up
function showCelebration() {
    celebrationPopup.style.display = 'flex';
    messageElement.style.display = 'none';
}

// Event Listeners
document.getElementById('fruits').addEventListener('click', () => selectTheme('fruits'));
document.getElementById('animals').addEventListener('click', () => selectTheme('animals'));
document.getElementById('colors').addEventListener('click', () => selectTheme('colors'));
submitButton.addEventListener('click', checkAnswer);
hintButton.addEventListener('click', provideHint);
homeButton.addEventListener('click', showHomePage);
homeButtonPopup.addEventListener('click', showHomePage);
previousLevelButton.addEventListener('click', () => {
    currentLevel--;
    loadPuzzle();
    updateUI();
});

startGame();
