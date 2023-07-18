let mockTranslation = [
    "Not yours,",
    "Who told you to take it so seriously?",
    "Are you unsatisfied? It's useless to fight for love and favor.",
    "In the end, how do you embrace old wounds and live on? You finally need to understand.",
    "Now you will feel a lot of pain,",
    "But if you endure for a few days, the knots will untie.",
    "Don't curl up, don't cry and complain, the heavens are not unfair to you.",
    "Endure the final blow before the end,",
    "How can you remain standing?",
    "Remember these eight words of advice,",
    "Keep your back straight and stand tall.",
    "Since regrets are already predetermined,",
    "Is it better to keep falling throughout your life?",
    "Seeking sympathy, seeking consolation,",
    "It's the worst strategy.",
    "If you don't help yourself, the remaining years are not guaranteed.",
    "If you're clever, you should have found an exit early on, even if there are grudges and revenge.",
    "Humans are vertebrates, so why fear dancing alone?",
    "I used to misunderstand and pretend to be weak,",
    "The other person couldn't bear to hurt me.",
    "But I've witnessed that someone who was once deeply in love can be so cruel.",
    "In this era, perhaps there is no more empathy.",
    "Endure the final blow before the end,",
    "How can you remain standing?",
    "Remember these eight words of advice,",
    "Keep your back straight and stand tall.",
    "Since regrets are already predetermined,",
    "Is it better to keep falling throughout your life?",
    "Seeking sympathy, seeking consolation,",
    "It's the worst strategy.",
    "If you don't help yourself, the remaining years are not guaranteed.",
    "If you're clever, you should have found an exit early on, even if there are grudges and revenge.",
    "Humans are vertebrates, so why fear dancing alone?",
    "You shouldn't wait for someone to treat you well,",
    "After all, time passes quickly.",
    "Use the strength to hold up the sky,",
    "Stand higher than his perspective.",
    "In the face of imminent death,",
    "Please turn back early.",
    "Stand up straight and tall,",
    "Keep your back straight and stand tall.",
    "Even if someone is no longer in your life, you can still dance.",
    "His fortune is meager, it doesn't hinder your well-being.",
    "Bet on your future,",
    "If each takes a different path,",
    "Wait and see who can't endure.",
    "Stand up straight and tall,",
    "First, throw away the crutch, that person is you.",
    "Busy living a good life, there's no need to appeal."
]

let requestCounter = 0
chrome.webRequest.onCompleted.addListener(
    async function (details) {
        if (details && requestCounter % 2 === 0) {
            console.log("Loading: ", details.url);
            const response = await fetch(details.url);
            let json = await response.json();
            for (let i = 0; i < json.events.length; i++) {

                // TODO: TRANSLATE AND RETURN AN ARRAY OF TRANSLATED STRINGS
                json.events[i].segs[0] = mockTranslation[i];
            }
            console.log(json.events);
        }
        requestCounter++;
    },
    {
        urls: ["*://*.youtube.com/api/timedtext*"],
    }
)