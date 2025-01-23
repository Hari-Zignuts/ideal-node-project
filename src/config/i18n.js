const i18n = require("i18n");
const path = require("path");

/**
 * This module sets up the i18n configuration for internationalization.
 * It configures the locales, the directory for the translation files,
 * the default locale, and other options such as auto-reloading and object notation.
 * The i18n function is registered globally for easy access throughout the application.
 */

i18n.configure({
  locales: ["en", "hi", "gu"], // setup some locales - other locales default to en silently
  directory: path.join(__dirname, "../locales"), // translation files are in this directory
  defaultLocale: "en", // default locale
  autoReload: true, // reload locale files if they are changed
  syncFiles: true, // if you want to reload the locale files
  objectNotation: true, // allows to use nested translation keys
  register: global, // registers the i18n function globally
});

module.exports = i18n;
