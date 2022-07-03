declare type BrowserName = "chrome" | "firefox" | "opera" | "safari" | "edge" | "brave";
declare function isAndroid(): boolean;
declare function isIOS(): boolean;
declare function isMobile(): boolean;
/**
 * Detects the browser name
 * @returns {BrowserName} Browser name
 */
declare function detectBrowser(): BrowserName | undefined;
export { isAndroid, isIOS, isMobile, detectBrowser };
