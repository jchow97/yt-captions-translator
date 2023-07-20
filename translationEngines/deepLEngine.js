import * as deepl from 'deepl-node';

const authKey = "a5390ea4-46e4-cc12-dbfc-6b52c03d0e0c:fx";
const translator = new deepl.Translator(authKey);
const targetLanguages = {
    bulgarian: 'BG',
    czech: 'CS',
    danish: 'DA',
    german: 'DE',
    greek: 'EL',
    english: 'EN',
    englishBritish: 'EN-GB',
    englishUS: 'EN-US',
    spanish: 'ES',
    estonian: 'ET',
    finnish: 'FI',
    french: 'FR',
    hungarian: 'HU',
    indonesian: 'ID',
    italian: 'IT',
    japanese: 'JA',
    korean: 'KO',
    lithuanian: 'LT',
    latvian: 'LV',
    norwegian: 'NB',
    dutch: 'NL',
    polish: 'PL',
    portugueseBR: 'PT-BR',
    portugueseNonBR: 'PT-PT',
    romanian: 'RO',
    russian: 'RU',
    slovak: 'SK',
    slovenian: 'SL',
    swedish: 'SV',
    turkish: 'TR',
    ukrainian: 'UK',
    chinese: 'ZH'
}

async function translateCaptions(text, lang){
    const result = await translator.translateText(text, null, lang);
    console.log(result.text);
    return result;
}