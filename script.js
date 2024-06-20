document.getElementById('generate').addEventListener('click', generateArt);

const stories = {
    random: [
        "In a world filled with vibrant colors and intricate shapes, a story of beauty and mystery unfolds.",
        "Each shape represents a unique perspective, woven together in a tapestry of creativity.",
        "As the colors dance across the canvas, they tell a tale of passion and imagination.",
        "Amidst the randomness, a pattern emerges, revealing the harmony within chaos.",
        "The art speaks silently, inviting the viewer to ponder its hidden meanings and secrets.",
        "From every corner of the canvas, inspiration blooms, touching hearts and minds alike.",
        "The canvas mirrors the unpredictable nature of life, where beauty emerges from unpredicted corners.",
        "Each shape carries a story untold, waiting for curious eyes to unravel its mystery.",
        "As the colors blend and swirl, they create a symphony of emotions, whispering stories of the soul.",
        "In the dance of hues, echoes of dreams and aspirations resonate, painting the canvas of life."
    ],
    love: [
        "In hues of deep reds and gentle pinks, the art whispers tales of love and devotion.",
        "Each shape embodies a tender moment, painted with strokes of affection and warmth.",
        "The colors blend like hearts entwined, sharing a timeless story of companionship.",
        "Amidst the canvas, love blooms in every brushstroke, capturing the essence of romance.",
        "From every angle, the art reflects the beauty of love, filling the heart with joy.",
        "Each stroke of color represents a chapter in the love story, unfolding with grace and passion.",
        "As hues mingle, they narrate the journey of hearts united, celebrating love in its purest form.",
        "The canvas becomes a mirror of emotions, where love shines brightest in every shade.",
        "Like a symphony, the art harmonizes the hues of affection, painting a portrait of everlasting love.",
        "In the embrace of colors, love finds expression, weaving tales of enchantment and bliss."
    ],
    cool: [
        "Cool shades of blue and serene greens create a calming atmosphere.",
        "The gentle curves and soft hues invite tranquility and introspection.",
        "As the colors blend harmoniously, they evoke a sense of peace and balance.",
        "Each shape whispers serenity, like ripples on a tranquil pond.",
        "The art breathes calmness, offering a moment of quiet reflection.",
        "In the cool embrace of colors, thoughts wander freely, finding solace in the art's embrace.",
        "As hues dance across the canvas, they paint a serene landscape of quiet contemplation.",
        "Each stroke of color mirrors the serenity of nature, inviting the mind to wander through peaceful realms.",
        "Cool shades create a sanctuary of calm, where the soul finds respite from the hustle of life.",
        "In the soft embrace of hues, the art becomes a haven of peace, soothing the spirit with its gentle touch."
    ],
    grayscale: [
        "In shades of gray, the art speaks in whispers, revealing subtle nuances.",
        "Each shape and line tells a story of depth and understated elegance.",
        "The monochrome palette invites exploration of light and shadow.",
        "Amidst the grayscale canvas, a tale of simplicity and sophistication unfolds.",
        "The art whispers softly, drawing the viewer into a world of muted contrasts.",
        "As shades interplay, they create a canvas of timeless beauty, where simplicity resonates with grace.",
        "In the absence of color, the art unveils the power of subtlety, weaving a narrative of quiet strength.",
        "Each stroke of gray paints a portrait of elegance, capturing the essence of understated beauty.",
        "Like whispers in silence, the hues of gray unveil stories untold, echoing through the canvas.",
        "Through shades of gray, the art reveals the richness of contrast, where every shade holds its own story."
    ]
}

function generateArt() {
    const artContainer = document.getElementById('art-container');
    artContainer.innerHTML = '';

    const intensity = document.getElementById('intensity').value;
    const mood = document.getElementById('mood').value;

    let numShapes;
    switch (intensity) {
        case 'low':
            numShapes = 20;
            break;
        case 'medium':
            numShapes = 50;
            break;
        case 'high':
            numShapes = 100;
            break;
        default:
            numShapes = 50;
            break;
    }

    const colors = generateColors(mood);
    const borderColor = generateBorderColor(mood);

    // Set abstract border
    artContainer.style.borderImage = generateRandomGradient();
    artContainer.style.borderColor = borderColor;
    artContainer.style.backgroundColor = `${colors[Math.floor(Math.random() * colors.length)]}30`; //color code plus added opacity
    
    const maxSize = 100;
    const minSize = 20; 

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        let size = Math.random() * (maxSize - minSize) + minSize;
        let left = Math.random() * (artContainer.offsetWidth - size);
        let top = Math.random() * (artContainer.offsetHeight - size);

        // Check for overlapping
        let overlap = false;
        do {
            overlap = false;
            for (let j = 0; j < artContainer.children.length; j++) {
                const existingShape = artContainer.children[j];
                const existingRect = existingShape.getBoundingClientRect();
                const newRect = { left, top, right: left + size, bottom: top + size };

                if (!(newRect.right < existingRect.left || 
                      newRect.left > existingRect.right || 
                      newRect.bottom < existingRect.top || 
                      newRect.top > existingRect.bottom)) {
                    overlap = true;
                    left = Math.random() * (artContainer.offsetWidth - size);
                    top = Math.random() * (artContainer.offsetHeight - size);
                    break;
                }
            }
        } while (overlap);

        shape.style.position = 'absolute';
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}px`;
        shape.style.top = `${top}px`;
        shape.style.backgroundColor = color;
        shape.style.borderRadius = `${Math.random() * 50}% ${Math.random() * 50}%`;
        
        artContainer.appendChild(shape);
    }

    // Removing previous story
    const previousStory = document.getElementById('story');
    if (previousStory) {
        previousStory.parentNode.removeChild(previousStory);
    }

    // Generate random story based on mood
    const randomIndex = Math.floor(Math.random() * stories[mood].length);
    const story = stories[mood][randomIndex];

    const storyElement = document.createElement('p');
    storyElement.id = "story"
    storyElement.textContent = story;
    storyElement.style.textAlign = 'center';
    storyElement.style.marginTop = '20px';
    storyElement.style.fontStyle = 'italic';

    // Append story element below the art container
    const container = document.querySelector('.container');
    container.appendChild(storyElement);
}

function generateColors(mood) {
    switch (mood) {
        case 'love':
            return ['#FF6347', '#FF4500', '#FF7F50', '#FFA07A'];
        case 'cool':
            return ['#00BFFF', '#1E90FF', '#87CEEB', '#20B2AA', '#00CED1'];
        case 'grayscale':
            return ['#E0E0E0', '#D3D3D3', '#C0C0C0', '#A9A9A9', '#808080'];
        default:
            return ['#FF6F61', '#FFB74D', '#FFD54F', '#81C784', '#4FC3F7', '#BA68C8'];
    }
}

function generateBorderColor(mood) {
    switch (mood) {
        case 'love':
            return '#FF6347';
        case 'cool':
            return '#87CEEB';
        case 'grayscale':
            return '#D3D3D3';
        default:
            return '#FFB74D';
    }
}

function generateRandomGradient() {
    const directions = ['to left', 'to right', 'to top', 'to bottom', 'to top left', 'to top right', 'to bottom left', 'to bottom right'];
    const colors = ['#FF6F61', '#FFB74D', '#FFD54F', '#81C784', '#4FC3F7', '#BA68C8'];
    
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const colorStops = Array.from({ length: 3 }, () => colors[Math.floor(Math.random() * colors.length)]).join(', ');

    return `linear-gradient(${direction}, ${colorStops}) 1`;
}