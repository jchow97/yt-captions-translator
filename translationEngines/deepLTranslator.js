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
        const result = await fetch('https://api-free.deepl.com/v2/translate', options);
        const json = await result.json();
        const translation = json.translations[0];
        console.log(translation);
        return translation;
    }
    static async translateMultipleSentences(text, lang) {

    }
    static async translateLargeText(text, lang) {

    }

    async translateStub(text, lang) {
        const result = {
            "detected_source_language": "ZH",
            "text": "It's not yours.\nWho asked you to see so heavy\nAre you not convinced? It's useless to fight for love.\nAt the end of how to live with the old hurt embrace you finally have to understand.\nNow you will be very painful\nBut you'll get over it in a couple of days.\nDon't hug your knees and cry, God is not fair to you.\nI'm going to be stabbed at the end of the game\nHow do you stay alive?\nMemorize these eight tips\nRemember to keep your back straight\nNow that you're sorry, it's a foregone conclusion\nIt's better to be down for life.\nSympathy, comfort.\nThat's the worst way to go.\nIf you don't save yourself, you'll be dead for the rest of your life.\nIf you were smart, you'd have found a way out earlier, even if you had to take revenge.\nYou're a vertebrate. Why should you be afraid to dance alone?\nI used to misunderstand, pretend to be weak.\nThat they couldn't bear to kill.\nBut I've seen a man I once loved so passionately be so cruel.\nIn this day and age, maybe there's no more compassion.\nI'm going to be stabbed in the back when I'm done.\nHow do you keep from falling?\nMemorize these horoscopes.\nRemember to keep your back straight.\n\"Now that I'm sorry, it's a foregone conclusion.\nIt's better to be down for life.\nSympathy, comfort.\nThat's the worst way to go.\nIf you don't save yourself, you'll be dead for the rest of your life.\nIf you were smart, you'd have found a way out earlier, even if you had to take revenge.\nYou're a vertebrate. Why should you be afraid to dance alone?\nYou shouldn't wait for him to be nice to you.\nAfter all, you'll be old before you know it.\nYou'll be old before you know it. You'll be old before you know it. You'll be old before you know it.\nStand taller than he can see.\nI'm a dead man. I'm a dead man. I'm a dead man.\n\"Turn back soon.\nStand up straight again\nStraighten your backbone\nWho can dance without who?\nHe's not blessed enough to keep you safe.\nI'm betting on my future\nIf we go our separate ways\nWe'll see who won't make it\nLet's just say it's a good thing.\nThe first person to throw away the crutches is you.\nYou're the one who's busy living a good life.\n"
        }
        console.log(result.text);
        return result;
    }
}