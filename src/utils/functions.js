export const getArrFromNum = num => Array.from({ length: num }, (_, index) => index + 1);

export const getDeviceFontSizeCSS = (selector, fontSize) => {
    const desktopFontSize = fontSize?.desktop;
    const tabletFontSize = fontSize?.tablet || desktopFontSize;
    const mobileFontSize = fontSize?.mobile || tabletFontSize;

    return `${selector}{
        font-size: ${desktopFontSize}px;
    }
    @media (max-width: 768px) {
        ${selector}{
            ${`font-size: ${tabletFontSize}px;`}
        }
    }
    @media (max-width: 576px) {
        ${selector}{
            ${`font-size: ${mobileFontSize}px;`}
        }
    }`.replace(/\s+/g, ' ').trim()
}