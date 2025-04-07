export function textByLocale(textData, localeCode) {
    return textData[localeCode] ?? textData["default"];
}

export function textByDocumentLocale(textData) {
    const localeCode = navigator.language.split('-')[0];
    return textByLocale(textData, localeCode);
}