// --- Global State ---
let bananaCount = 0;
let currentFactIndex = 0;
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

// --- Data ---
const characters = {
    kevin: { name: "Kevin", description: "Der Anführer. Groß, verantwortungsbewusst und immer bereit für ein Abenteuer.", trait: "Mutig", quote: "Bello! Kevin da boss!", avatar: "kevin.png" },
    stuart: { name: "Stuart", description: "Der Rebell. Liebt Musik, seine Ukulele und ist immer für einen Scherz zu haben.", trait: "Musikalisch", quote: "La-la-la! Music time!", avatar: "stuart.png" },
    bob: { name: "Bob", description: "Der Süße. Klein, unschuldig und liebt seinen Teddybär Tim über alles.", trait: "Liebenswert", quote: "Bob love banana! And Tim!", avatar: "bob.png" },
    gru: { name: "Gru", description: "Der Boss. Ehemals Superschurke, jetzt liebevoller Vater und Anführer der Minions.", trait: "Genial", quote: "Light bulb! I have an idea!", avatar: "gru.png" },
};

const minionSounds = {
    "Bello!": "bello.mp3",
    "Poopaye!": "poopaye.mp3",
    "Banana!": "banana.mp3",
    "Bee-do": "bee-do.mp3",
    "Haha!": "haha.mp3",
    "Whaaat?": "what.mp3",
};

const minionFacts = [
    { icon: "🤓", text: "Die Minions sprechen 'Minionese', eine Mischung aus vielen echten Sprachen." },
    { icon: "🍌", text: "Minions sind genetisch darauf programmiert, Bananen zu lieben." },
    { icon: "👁️", text: "Es gibt Minions mit einem oder zwei Augen, aber niemals mit drei." },
    { icon: "🎬", text: "Die Minions waren ursprünglich nur Nebencharaktere, wurden aber zu Stars." },
    { icon: "🧬", text: "Minions existieren seit Anbeginn der Zeit und haben schon Dinosauriern gedient." },
];

const galleryItems = [
    { id: 'lab', title: "Labor-Chaos", description: "Wenn die Minions versuchen, bei der Arbeit zu 'helfen'.", image: "lab.jpg" },
    { id: 'party', title: "Bananen-Party", description: "Die ultimative Feier mit der Lieblingsfrucht aller.", image: "party.jpg" },
    { id: 'band', title: "Minion Rockband", description: "Stuart und seine Freunde rocken die Bühne.", image: "band.jpg" },
    { id: 'superhero', title: "Super-Minions", description: "Bereit, die Welt zu retten... oder zumindest für Chaos zu sorgen.", image: "superhero.jpg" },
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    populateCharacters();
    populateSoundboard();
    populateGallery();
    populateFacts();
    setMinionOfTheDay();
    startMemoryGame();
    setupEventListeners();
    animateHeroMinions();
    startBananaRain();
});

// --- Population Functions ---
function populateCharacters() {
    const grid = document.querySelector('.character-grid');
    grid.innerHTML = Object.keys(characters).map(key => {
        const char = characters[key];
        return `
            <div class="character-card" onclick="showCharacterInfo('${key}')">
                <div class="character-avatar" style="background-image: url('${char.avatar}')"></div>
                <h3>${char.name}</h3>
                <p>${char.description.split('.')[0]}.</p>
            </div>
        `;
    }).join('');
}

function populateSoundboard() {
    const grid = document.getElementById('soundboard-grid');
    grid.innerHTML = Object.keys(minionSounds).map(sound => `
        <button class="sound-button" onclick="playSound('${minionSounds[sound]}')">${sound}</button>
    `).join('');
}

function populateGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = galleryItems.map(item => `
        <div class="gallery-item" onclick="openModal('${item.id}')">
            <img src="${item.image}" alt="${item.title}">
            <div class="overlay"><h3>${item.title}</h3></div>
        </div>
    `).join('');
}

function populateFacts() {
    const container = document.getElementById('fact-card-container');
    container.innerHTML = minionFacts.map(fact => `
        <div class="fact-card">
            <div class="fact-icon">${fact.icon}</div>
            <p>${fact.text}</p>
        </div>
    `).join('');
    showFact(0);
}

// --- Core Functionality ---

// Minion of the Day
function setMinionOfTheDay() {
    const today = new Date().getDay();
    const minionKeys = Object.keys(characters);
    const motdKey = minionKeys[today % minionKeys.length];
    const motd = characters[motdKey];

    document.getElementById('motd-avatar').style.backgroundImage = `url('${motd.avatar}')`;
    document.getElementById('motd-name').textContent = motd.name;
    document.getElementById('motd-description').textContent = motd.description;
    document.getElementById('motd-trait').textContent = `Eigenschaft: ${motd.trait}`;
    document.getElementById('motd-quote').textContent = `Zitat: "${motd.quote}"`;
}

// Banana Clicker Game
function clickBanana() {
    bananaCount++;
    document.getElementById('banana-count').textContent = bananaCount;
    createFloatingText('+1', document.querySelector('.banana-click'));
    if (bananaCount % 25 === 0) {
        triggerConfetti();
        showNotification(`🍌 Wow! ${bananaCount} Bananen! 🍌`);
    }
}

// Minion Translator
function translateToMinion() {
    const input = document.getElementById('human-text').value;
    const resultDiv = document.getElementById('minion-result');
    const words = input.toLowerCase().split(' ');
    const minionDictionary = { "hallo": "bello", "banane": "banana", "danke": "tank yu", "ich": "me", "liebe": "tiamo" };
    const translation = words.map(word => minionDictionary[word] || 'babo').join(' ') + '!';
    resultDiv.textContent = translation;
}

// Memory Game
function startMemoryGame() {
    const symbols = ['🍌', '👁️', '💙', '💛', '🎵', '🎯', '🎉', '⭐'];
    memoryCards = [...symbols, ...symbols];
    shuffleArray(memoryCards);

    const gameContainer = document.getElementById('memory-game');
    gameContainer.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;

    memoryCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.innerHTML = `<div class="card-face card-front">?</div><div class="card-face card-back">${symbol}</div>`;
        card.addEventListener('click', () => flipCard(card));
        gameContainer.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length >= 2) return;
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) setTimeout(checkMatch, 1000);
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstSymbol = memoryCards[firstCard.dataset.index];
    const secondSymbol = memoryCards[secondCard.dataset.index];

    if (firstSymbol === secondSymbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === 8) showNotification('🎉 Memory-Meister!');
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    flippedCards = [];
}

// Facts Carousel
function nextFact() {
    currentFactIndex = (currentFactIndex + 1) % minionFacts.length;
    showFact(currentFactIndex);
}

function previousFact() {
    currentFactIndex = (currentFactIndex - 1 + minionFacts.length) % minionFacts.length;
    showFact(currentFactIndex);
}

function showFact(index) {
    const container = document.getElementById('fact-card-container');
    container.style.transform = `translateX(-${index * 100}%)`;
}

// --- UI & Effects ---

// Modal
function openModal(id) {
    const item = galleryItems.find(i => i.id === id) || characters[id];
    if (!item) return;

    const modal = document.getElementById('gallery-modal');
    document.getElementById('modal-image-container').innerHTML = `<img src="${item.image || item.avatar}" alt="${item.title || item.name}">`;
    document.getElementById('modal-title').textContent = item.title || item.name;
    document.getElementById('modal-description').textContent = item.description;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('gallery-modal').style.display = 'none';
}

// Animations
function animateHeroMinions() {
    const container = document.querySelector('.hero-minions');
    for (let i = 0; i < 5; i++) {
        const minion = document.createElement('div');
        minion.className = 'animated-minion';
        minion.style.left = `${Math.random() * 90}%`;
        minion.style.animationDuration = `${Math.random() * 5 + 5}s`;
        container.appendChild(minion);
    }
}

function startBananaRain() {
    const container = document.getElementById('banana-rain');
    for (let i = 0; i < 20; i++) {
        const banana = document.createElement('div');
        banana.className = 'banana';
        banana.textContent = '🍌';
        banana.style.left = `${Math.random() * 100}vw`;
        banana.style.animationDuration = `${Math.random() * 3 + 2}s`;
        banana.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(banana);
    }
}

function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDelay = `${Math.random() * 0.1}s`;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

function createFloatingText(text, element) {
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.textContent = text;
    document.body.appendChild(floatingText);

    const rect = element.getBoundingClientRect();
    floatingText.style.left = `${rect.left + rect.width / 2}px`;
    floatingText.style.top = `${rect.top}px`;

    setTimeout(() => floatingText.remove(), 1000);
}

// --- Utilities ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playSound(soundFile) {
    // In a real application, this would use the Web Audio API
    console.log(`Playing sound: ${soundFile}`);
    showNotification(`🔊 Sound: ${soundFile.split('.')[0]}`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// --- Event Listeners ---
function setupEventListeners() {
    // Smooth scrolling
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Hide navbar on scroll
    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            document.querySelector('.navbar').style.top = "-80px";
        } else {
            document.querySelector('.navbar').style.top = "0";
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}