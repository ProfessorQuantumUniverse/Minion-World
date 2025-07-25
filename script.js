// Global Variables
let bananaCount = 0;
let currentFactIndex = 0;
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

// Minion quotes array
const minionQuotes = [
    "Bello! Poopaye? Bananaaaa!",
    "Para tu! Bananaaaa!",
    "Underwear! Hahaha!",
    "Poopaye! Gelato!",
    "Tank yu! Tank yu very much!",
    "Bee-do! Bee-do! Bee-do!",
    "Bottom! Hehehehe!",
    "Tulaliloo ti amo!",
    "Me want banana!",
    "Papoy! Kampai!",
    "Stupa! Stupa!",
    "Whaaat? Kanpai!",
    "Pwede na? Pwede na!",
    "La bodaaa!",
    "Bananaaaa... Potato!"
];

// Minion facts array
const minionFacts = [
    {
        icon: "🤓",
        title: "Wusstest du schon?",
        text: "Die Minions sprechen eine Mischung aus verschiedenen Sprachen, genannt 'Minionese'!"
    },
    {
        icon: "🍌",
        title: "Bananen-Fakt",
        text: "Minions sind evolutionär darauf programmiert, dem bösesten Anführer zu folgen - aber sie lieben Bananen noch mehr!"
    },
    {
        icon: "👁️",
        title: "Augen-Fakt",
        text: "Es gibt Minions mit einem Auge, zwei Augen, aber niemals mit drei Augen!"
    },
    {
        icon: "🎬",
        title: "Film-Fakt",
        text: "Der erste Minions-Film war einer der erfolgreichsten Animationsfilme aller Zeiten!"
    },
    {
        icon: "🧬",
        title: "Entstehungs-Fakt",
        text: "Minions existieren seit Millionen von Jahren und haben Dinosaurier, Pharaonen und Vampire bedient!"
    },
    {
        icon: "🎨",
        title: "Design-Fakt",
        text: "Die Minions wurden ursprünglich als Hintergrundcharaktere entworfen, wurden aber so beliebt, dass sie ihre eigenen Filme bekamen!"
    },
    {
        icon: "🎵",
        title: "Musik-Fakt",
        text: "Viele Minion-Wörter sind tatsächlich verfremdete Versionen echter Wörter aus verschiedenen Sprachen!"
    },
    {
        icon: "👥",
        title: "Anzahl-Fakt",
        text: "Es gibt angeblich über 10.400 Minions, aber nur etwa 899 haben individuelle Namen!"
    }
];

// Character information
const characterInfo = {
    kevin: {
        name: "Kevin",
        description: "Kevin ist der größte und verantwortungsbewussteste der drei Hauptminions. Er ist ein geborener Anführer und immer bereit, seine Freunde zu beschützen. Mit seiner Größe und seinem Mut führt er oft die gefährlichsten Missionen an.",
        traits: ["Mutig", "Verantwortungsvoll", "Loyal", "Abenteuerlustig"],
        favoriteFood: "Bananen-Smoothie",
        quote: "Bello! Kevin da boss!"
    },
    stuart: {
        name: "Stuart",
        description: "Stuart ist der rebellische Mittelgroße der Gruppe. Er liebt Musik, spielt Ukulele und ist immer für einen Scherz zu haben. Seine entspannte Art macht ihn zum perfekten Kumpel für jedes Abenteuer.",
        traits: ["Musikliebhaber", "Entspannt", "Lustig", "Kreativ"],
        favoriteFood: "Bananen-Chips",
        quote: "La-la-la! Music time!"
    },
    bob: {
        name: "Bob",
        description: "Bob ist der kleinste und süßeste der Hauptminions. Er ist ein echter Träumer und liebt seinen Teddybär Tim über alles. Trotz seiner geringen Größe hat er ein großes Herz und überrascht oft mit seinem Mut.",
        traits: ["Süß", "Träumerisch", "Loyal", "Überraschend mutig"],
        favoriteFood: "Bananen-Pudding",
        quote: "Bob love banana! And Tim!"
    },
    gru: {
        name: "Gru",
        description: "Gru ist der ehemalige Superschurke und jetzt liebevolle Vater und Chef der Minions. Von einem bösen Genius wurde er zu einem Familienvater, der die Welt rettet. Die Minions verehren ihn und folgen ihm überallhin.",
        traits: ["Fürsorglicher Vater", "Ex-Schurke", "Beschützer", "Lustig"],
        favoriteFood: "Kaffee und Kekse",
        quote: "Light bulb! I have an idea!"
    }
};

// Translation dictionary for Minion language
const minionDictionary = {
    "hallo": "bello",
    "banane": "bananaaaa",
    "danke": "tank yu",
    "liebe": "tulaliloo ti amo",
    "essen": "papoy",
    "trinken": "kampai",
    "freund": "amigo",
    "familie": "familia",
    "spaß": "fun fun",
    "party": "festa",
    "musik": "la-la-la",
    "tanzen": "dance dance",
    "süß": "cute cute",
    "lustig": "haha funny",
    "schön": "beautiful",
    "gut": "bueno",
    "schlecht": "no no no",
    "ja": "si si",
    "nein": "no no",
    "hilfe": "help help",
    "spiel": "game game",
    "arbeit": "work work",
    "pause": "break time",
    "feuer": "fire fire",
    "wasser": "agua",
    "haus": "casa",
    "auto": "car car",
    "flugzeug": "airplane",
    "boot": "boat boat"
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize memory game
    initializeMemoryGame();

    // Add eye following cursor effect
    addEyeFollowEffect();

    // Add floating animation to elements
    addFloatingAnimations();
});

// Banana Clicker Game
function clickBanana() {
    bananaCount++;
    document.getElementById('banana-count').textContent = bananaCount;
    
    // Add click animation
    const bananaButton = document.querySelector('.banana-click');
    bananaButton.style.transform = 'scale(1.3) rotate(15deg)';
    
    setTimeout(() => {
        bananaButton.style.transform = 'scale(1) rotate(0deg)';
    }, 150);

    // Add floating +1 animation
    createFloatingText('+1', bananaButton);

    // Play sound effect (simulated)
    playClickSound();

    // Check for milestones
    checkBananaMilestones();
}

function createFloatingText(text, element) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.position = 'absolute';
    floatingText.style.color = '#0066CC';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.fontSize = '1.5rem';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    floatingText.style.left = rect.left + rect.width / 2 + 'px';
    floatingText.style.top = rect.top + 'px';
    
    document.body.appendChild(floatingText);
    
    // Animate upward
    let position = 0;
    const animation = setInterval(() => {
        position -= 2;
        floatingText.style.transform = `translateY(${position}px)`;
        floatingText.style.opacity = 1 + position / 50;
        
        if (position <= -50) {
            clearInterval(animation);
            document.body.removeChild(floatingText);
        }
    }, 16);
}

function checkBananaMilestones() {
    if (bananaCount === 10) {
        showNotification('🎉 Wow! 10 Bananen! Du bist ein echter Minion!');
    } else if (bananaCount === 50) {
        showNotification('🍌 Incredible! 50 Bananen! Kevin wäre stolz!');
    } else if (bananaCount === 100) {
        showNotification('👑 BANANAKING! 100 Bananen! Du bist der ultimative Minion-Fan!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = '#FFD700';
    notification.style.color = '#0066CC';
    notification.style.padding = '1rem';
    notification.style.borderRadius = '10px';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '2000';
    notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Minion Language Translator
function translateToMinion() {
    const humanText = document.getElementById('human-text').value.toLowerCase().trim();
    const result = document.getElementById('minion-result');
    
    if (!humanText) {
        result.textContent = 'Bitte gib ein Wort ein!';
        return;
    }
    
    let translation = minionDictionary[humanText];
    
    if (!translation) {
        // Generate random minion-style translation
        const minionSounds = ['ba', 'po', 'pa', 'be', 'da', 'la', 'tu', 'na'];
        translation = '';
        for (let i = 0; i < humanText.length; i += 2) {
            translation += minionSounds[Math.floor(Math.random() * minionSounds.length)];
        }
        translation += '!';
    }
    
    result.textContent = translation;
    result.style.animation = 'pulse 0.5s ease';
    
    setTimeout(() => {
        result.style.animation = '';
    }, 500);
}

// Memory Game
function initializeMemoryGame() {
    const symbols = ['🍌', '👁️', '💙', '💛', '🎵', '🎯', '🎉', '⭐'];
    memoryCards = [...symbols, ...symbols]; // Duplicate for pairs
    shuffleArray(memoryCards);
}

function startMemoryGame() {
    const gameContainer = document.getElementById('memory-game');
    gameContainer.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    
    initializeMemoryGame();
    
    memoryCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.textContent = '?';
        card.addEventListener('click', () => flipCard(card, symbol));
        gameContainer.appendChild(card);
    });
}

function flipCard(card, symbol) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) {
        return;
    }
    
    card.classList.add('flipped');
    card.textContent = symbol;
    flippedCards.push({card, symbol});
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [first, second] = flippedCards;
    
    if (first.symbol === second.symbol) {
        first.card.classList.add('matched');
        second.card.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                showNotification('🎉 Glückwunsch! Du hast alle Paare gefunden!');
            }, 500);
        }
    } else {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
        first.card.textContent = '?';
        second.card.textContent = '?';
    }
    
    flippedCards = [];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Facts Navigation
function nextFact() {
    currentFactIndex = (currentFactIndex + 1) % minionFacts.length;
    showFact(currentFactIndex);
}

function previousFact() {
    currentFactIndex = (currentFactIndex - 1 + minionFacts.length) % minionFacts.length;
    showFact(currentFactIndex);
}

function randomFact() {
    currentFactIndex = Math.floor(Math.random() * minionFacts.length);
    showFact(currentFactIndex);
}

function showFact(index) {
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach(card => card.classList.remove('active'));
    
    const targetCard = document.getElementById(`fact-${index}`);
    if (targetCard) {
        targetCard.classList.add('active');
    } else {
        // Create new fact card if it doesn't exist
        createFactCard(index);
    }
}

function createFactCard(index) {
    const fact = minionFacts[index];
    const factContainer = document.querySelector('.facts-container');
    
    const factCard = document.createElement('div');
    factCard.className = 'fact-card active';
    factCard.id = `fact-${index}`;
    factCard.innerHTML = `
        <div class="fact-icon">${fact.icon}</div>
        <h3>${fact.title}</h3>
        <p>${fact.text}</p>
    `;
    
    factContainer.appendChild(factCard);
}

// Character Information
function showCharacterInfo(characterName) {
    const character = characterInfo[characterName];
    if (!character) return;
    
    const modalContent = `
        <h2>${character.name}</h2>
        <p><strong>Beschreibung:</strong> ${character.description}</p>
        <p><strong>Eigenschaften:</strong> ${character.traits.join(', ')}</p>
        <p><strong>Lieblingsessen:</strong> ${character.favoriteFood}</p>
        <p><strong>Lieblingszitat:</strong> "${character.quote}"</p>
    `;
    
    openModal('character', modalContent);
}

// Gallery Modal
function openModal(type, content = '') {
    const modal = document.getElementById('gallery-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (type === 'character') {
        modalBody.innerHTML = content;
    } else {
        // Gallery content
        const scenes = {
            image1: '<h3>Labor Chaos</h3><p>Die Minions haben wieder mal Grus Labor in ein komplettes Chaos verwandelt! 🧪💥</p>',
            image2: '<h3>Banana Party</h3><p>Die größte Bananen-Party aller Zeiten! Alle Minions feiern zusammen! 🍌🎉</p>',
            image3: '<h3>Minion Band</h3><p>Stuart und seine Freunde rocken die Bühne mit ihrer Minion-Band! 🎸🎵</p>',
            image4: '<h3>Superhelden Minions</h3><p>Unsere gelben Helden in Action! Sie retten die Welt... oder versuchen es zumindest! 🦸‍♂️⚡</p>'
        };
        modalBody.innerHTML = scenes[type] || '<p>Bild nicht gefunden!</p>';
    }
    
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

function closeModal() {
    const modal = document.getElementById('gallery-modal');
    modal.style.display = 'none';
}

// Quote Generator
function newQuote() {
    const quoteElement = document.getElementById('current-quote');
    const randomQuote = minionQuotes[Math.floor(Math.random() * minionQuotes.length)];
    
    quoteElement.style.opacity = '0';
    
    setTimeout(() => {
        quoteElement.textContent = `"${randomQuote}"`;
        quoteElement.style.opacity = '1';
    }, 300);
}

// Sound Effects (simulated)
function playMinionSound() {
    console.log('🔊 Minion sound: BANANAAAA!');
    // In a real implementation, you would play an actual audio file
    showNotification('🔊 BANANAAAA!');
}

function playClickSound() {
    console.log('🔊 Click sound effect');
    // Simulated click sound
}

// Eye Following Effect
function addEyeFollowEffect() {
    const pupils = document.querySelectorAll('.pupil');
    
    document.addEventListener('mousemove', (e) => {
        pupils.forEach(pupil => {
            const eye = pupil.parentElement;
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const deltaX = e.clientX - eyeCenterX;
            const deltaY = e.clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            
            const maxMovement = 3;
            const x = Math.cos(angle) * maxMovement;
            const y = Math.sin(angle) * maxMovement;
            
            pupil.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Floating Animations
function addFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.minion, .banana');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Hamburger Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'b':
        case 'B':
            if (e.ctrlKey) {
                e.preventDefault();
                clickBanana();
            }
            break;
        case 'ArrowLeft':
            if (e.ctrlKey) {
                e.preventDefault();
                previousFact();
            }
            break;
        case 'ArrowRight':
            if (e.ctrlKey) {
                e.preventDefault();
                nextFact();
            }
            break;
        case 'r':
        case 'R':
            if (e.ctrlKey) {
                e.preventDefault();
                randomFact();
            }
            break;
    }
});

// Easter Eggs
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    showNotification('🎉 EASTER EGG AKTIVIERT! 🍌 Alle Minions tanzen jetzt! 💃');
    
    const minions = document.querySelectorAll('.minion');
    minions.forEach(minion => {
        minion.style.animation = 'bounce 0.5s infinite, pulse 1s infinite';
    });
    
    setTimeout(() => {
        minions.forEach(minion => {
            minion.style.animation = 'bounce 2s infinite';
        });
    }, 5000);
}

// Performance optimization: Lazy loading for heavy animations
const lazyAnimations = () => {
    const heavyElements = document.querySelectorAll('.character-card, .game-card, .gallery-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                animationObserver.unobserve(entry.target);
            }
        });
    });
    
    heavyElements.forEach(element => {
        animationObserver.observe(element);
    });
};

// Initialize lazy animations
document.addEventListener('DOMContentLoaded', lazyAnimations);