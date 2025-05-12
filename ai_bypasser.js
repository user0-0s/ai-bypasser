// Simple synonyms with basic, kid-friendly words
const SYNONYMS = {
    'artificial': ['fake', 'made-up', 'computer'],
    'intelligence': ['smartness', 'brain', 'thinking'],
    'transforming': ['changing', 'fixing', 'making new'],
    'world': ['earth', 'place', 'people'],
    'automating': ['doing', 'helping', 'making easy'],
    'tasks': ['jobs', 'work', 'things'],
    'providing': ['giving', 'showing', 'sharing'],
    'insights': ['ideas', 'thoughts', 'tips'],
    'widely': ['often', 'a lot', 'many'],
    'used': ['tried', 'picked', 'done'],
    'industries': ['work', 'jobs', 'places'],
    'healthcare': ['doctors', 'health', 'care'],
    'finance': ['money', 'banks', 'cash'],
    'education': ['school', 'learning', 'classes'],
    'big': ['large', 'huge', 'great'],
    'good': ['nice', 'great', 'cool'],
    'help': ['aid', 'support', 'boost'],
    'make': ['build', 'create', 'do']
};

function getSynonym(word) {
    // Get a random simple synonym or keep the word
    word = word.toLowerCase();
    const synonyms = SYNONYMS[word];
    return synonyms ? synonyms[Math.floor(Math.random() * synonyms.length)] : word;
}

function varySentence(sentence) {
    // Simple changes to make it less robotic
    const words = sentence.split(' ');
    if (Math.random() < 0.3 && words.length > 6) {
        // Split long sentences for kids
        const mid = Math.floor(words.length / 2);
        return words.slice(0, mid).join(' ') + '. ' + words.slice(mid).join(' ') + '.';
    }
    if (Math.random() < 0.2) {
        // Add a friendly starter
        const starters = ['Wow, ', 'Hey, ', 'Look, '];
        return starters[Math.floor(Math.random() * starters.length)] + sentence.toLowerCase();
    }
    return sentence;
}

function paraphraseText(text) {
    // Split text into sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const paraphrased = sentences.map(sentence => {
        const words = sentence.trim().split(/\s+/);
        const newWords = words.map(word => {
            // Keep punctuation
            if (/[.,!?]/.test(word)) return word;
            // Swap with simple synonym (50% chance)
            if (Math.random() < 0.5) {
                const synonym = getSynonym(word);
                // Keep first letter case
                if (word[0] === word[0].toUpperCase()) {
                    return synonym.charAt(0).toUpperCase() + synonym.slice(1);
                }
                return synonym;
            }
            return word;
        });
        let newSentence = newWords.join(' ');
        newSentence = varySentence(newSentence);
        return newSentence;
    });
    // Clean up extra spaces and punctuation
    return paraphrased.join(' ').replace(/\s+/g, ' ').replace(/ ,/g, ',').replace(/ \./g, '.').trim();
}

function aiBypass(text) {
    // Main function to rewrite text
    if (!text.trim()) return "Error: Please add some text!";
    return paraphraseText(text);
}

// Example for testing
console.log("Original: Artificial intelligence is transforming the world.");
console.log("Paraphrased: " + aiBypass("Artificial intelligence is transforming the world."));
