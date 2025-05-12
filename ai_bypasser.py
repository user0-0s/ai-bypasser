import random
import re

# Simple synonym dictionary (subset for portability)
SYNONYMS = {
    'artificial': ['synthetic', 'man-made', 'computerized'],
    'intelligence': ['intellect', 'smartness', 'cognition'],
    'transforming': ['changing', 'revolutionizing', 'altering'],
    'world': ['globe', 'planet', 'society'],
    'automating': ['streamlining', 'mechanizing', 'simplifying'],
    'tasks': ['duties', 'jobs', 'activities'],
    'providing': ['offering', 'supplying', 'delivering'],
    'insights': ['perspectives', 'knowledge', 'ideas'],
    'widely': ['extensively', 'broadly', 'commonly'],
    'used': ['employed', 'utilized', 'applied'],
    'industries': ['sectors', 'fields', 'areas'],
    'healthcare': ['medicine', 'health', 'medical'],
    'finance': ['banking', 'economics', 'financial'],
    'education': ['schooling', 'learning', 'academia']
}

def get_synonym(word):
    """Get a random synonym for a word if available."""
    word = word.lower()
    return random.choice(SYNONYMS.get(word, [word])) if word in SYNONYMS else word

def vary_sentence(sentence):
    """Add basic sentence variation."""
    if random.random() < 0.3 and len(sentence.split()) > 5:
        # Split long sentences
        words = sentence.split()
        mid = len(words) // 2
        return ' '.join(words[:mid]) + '. ' + ' '.join(words[mid:]) + '.'
    if random.random() < 0.2:
        # Add discourse marker
        markers = ['Interestingly, ', 'In fact, ', 'Notably, ']
        return random.choice(markers) + sentence.lower()
    return sentence

def paraphrase_text(text):
    """Paraphrase text to reduce AI detection."""
    # Split into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    paraphrased_sentences = []

    for sentence in sentences:
        words = sentence.split()
        new_words = []

        for word in words:
            # Preserve punctuation
            if word in '.,!?':
                new_words.append(word)
                continue
            # Replace with synonym (40% chance)
            if random.random() < 0.4:
                synonym = get_synonym(word)
                # Preserve capitalization
                if word[0].isupper():
                    synonym = synonym.capitalize()
                new_words.append(synonym)
            else:
                new_words.append(word)

        new_sentence = ' '.join(new_words)
        new_sentence = vary_sentence(new_sentence)
        paraphrased_sentences.append(new_sentence)

    # Join and clean up
    result = ' '.join(paraphrased_sentences)
    result = re.sub(r'\s+', ' ', result).replace(' ,', ',').replace(' .', '.')
    return result

def ai_bypass(text):
    """Main function to process text."""
    if not text.strip():
        return "Error: Input text is empty."
    return paraphrase_text(text)

# Example usage
if __name__ == "__main__":
    sample_text = "Artificial intelligence is transforming the world by automating tasks and providing insights."
    print("Original:", sample_text)
    print("Paraphrased:", ai_bypass(sample_text))
