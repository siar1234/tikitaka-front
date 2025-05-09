// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./en";
import ko from "./ko";
import ar from "./ar";
import bn from "./bn";
import cs from "./cs";
import da from "./da";
import de from "./de";
import el from "./el";
import es from "./es";
import fi from "./fi";
import fr from "./fr";
import he from "./he";
import hi from "./hi";
import hu from "./hu";
import id from "./id";
import ja from "./ja";
import ms from "./ms";
import italian from "./it";
import nl from "./nl";
import no from "./no";
import pa from "./pa";
import pl from "./pl";
import pt from "./pt";
import ro from "./ro";
import ru from "./ru";
import sv from "./sv";
import th from "./th";
import tr from "./tr";
import uk from "./uk";
import ur from "./ur";
import vi from "./vi";
import zh from "./zh"; // optional, for auto-detection
//import Backend from 'i18next-http-backend'; // optional, for loading translations from external files

// Set up the translations for different languages
i18n
    .use(LanguageDetector) // detect user's language (optional)
    // .use(Backend) // optional: load translation files (you can also hardcode translations)
    .use(initReactI18next) // Initialize react-i18next
    .init({
        fallbackLng: 'ko', // default language
        debug: true, // Enable debugging (useful during development)
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        resources: {
            ar: ar,
            en: en,
            ko: ko,
            bn: bn,
            cs: cs,
            da: da,
            de: de,
            el: el,
            es: es,
            fi: fi,
            fr: fr,
            he: he,
            hi: hi,
            hu: hu,
            id: id,
            it: italian,
            ja: ja,
            ms: ms,
            nl: nl,
            no: no,
            pa: pa,
            pl: pl,
            pt: pt,
            ro: ro,
            ru: ru,
            sv: sv,
            th: th,
            tr: tr,
            uk: uk,
            ur: ur,
            vi: vi,
            zh: zh
        },
    });

export default i18n;
