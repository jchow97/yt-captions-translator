export default class DeepLTranslator {
    constructor() {
        this.authKey = "DeepL-Auth-Key a5390ea4-46e4-cc12-dbfc-6b52c03d0e0c:fx";
    }

    async translateBasic(text, lang) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.authKey
            },
            body: JSON.stringify(
                {
                    "text": [text],
                    "target_lang": lang
                }
            )
        }
        const result = await fetch('https://api-free.deepl.com/v2/translate',options);
        const json = await result.json();
        const translation = json.translations[0];
        console.log(translation);
        return translation;
    }
    static async translateMultipleSentences(text, lang) {

    }
    static async translateLargeText(text, lang) {

    }

    // static async translateCaptionsStub(text, lang) {
    //     const result = "It's not yours.\n" +
    //         "Who asked you to see so heavy\n" +
    //         "Are you not convinced? It's useless to fight for love.\n" +
    //         "At the end of how to live with the old hurt embrace you finally have to understand.\n" +
    //         "Now you will be very painful\n" +
    //         "But for a few days, you'll get over it.\n" +
    //         "Don't hug your knees and cry, God is not fair to you.\n" +
    //         "I'm going to be stabbed at the end of the game\n" +
    //         "How do you stay alive?\n" +
    //         "Memorize these eight tips\n" +
    //         "Remember to keep your back straight\n" +
    //         "Now that you're sorry, it's a foregone conclusion\n" +
    //         "It's better to be down for life.\n" +
    //         "Sympathy, comfort.\n" +
    //         "That's the worst way to go.\n" +
    //         "If you don't save yourself, you'll be dead for the rest of your life.\n" +
    //         "If you were smart, you'd have found a way out earlier, even if you had to take revenge.\n" +
    //         "You're a vertebrate. Why should you be afraid to dance alone?\n" +
    //         "I used to misunderstand, pretend to be weak.\n" +
    //         "That they couldn't bear to kill.\n" +
    //         "But I've seen a man I once loved so passionately be so cruel.\n" +
    //         "In this day and age, maybe there's no more compassion.\n" +
    //         "I'm going to be stabbed in the back when I'm done.\n" +
    //         "How do you keep from falling?\n" +
    //         "Memorize these horoscopes.\n" +
    //         "Remember to keep your back straight.\n" +
    //         "Now that I'm sorry, it's a foregone conclusion.\n" +
    //         "It's better to be down for life.\n" +
    //         "Sympathy, comfort.\n" +
    //         "That's the worst way to go.\n" +
    //         "If you don't save yourself, you'll be dead for the rest of your life.\n" +
    //         "If you were smart, you'd have found a way out earlier, even if you had to take revenge.\n" +
    //         "You're a vertebrate. Why should you be afraid to dance alone?\n" +
    //         "You shouldn't wait for him to be nice to you.\n" +
    //         "After all, you'll be old before you know it.\n" +
    //         "You'll be old before you know it. You'll be old before you know it. You'll be old before you know it.\n" +
    //         "Stand taller than he can see.\n" +
    //         "I'm a dead man. I'm a dead man. I'm a dead man.\n" +
    //         "\"Turn back soon.\n" +
    //         "Stand up straight again\n" +
    //         "Straighten your backbone\n" +
    //         "Who can dance without who?\n" +
    //         "He's not blessed enough to keep you safe.\n" +
    //         "I'm betting on my future\n" +
    //         "If we go our separate ways\n" +
    //         "We'll see who won't make it\n" +
    //         "Let's just say it's a good thing.\n" +
    //         "The first person to throw away the crutches is you.\n" +
    //         "You're the one who's busy living a good life."
    //     console.log(result.text);
    //     return result;
    // }
}