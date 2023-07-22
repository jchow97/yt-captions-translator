import * as deepl from 'deepl-node';

export default class DeepLTranslator {
    constructor() {
        const authKey = "a5390ea4-46e4-cc12-dbfc-6b52c03d0e0c:fx";
        const translator = new deepl.Translator(authKey);
    }

    static async translateCaptions(text, lang) {
        const result = text; // stub
        // const result = await translator.translateText(text, null, lang);
        console.log(result.text);
        return result;
    }
}