const prefixPattern = '[A-Za-z][A-Za-z0-9_-]*';

const syntaxRegex = new RegExp(
    `\\{\\{(?:(${prefixPattern}):)?([^{}|]+)(?:\\|[^{}]*)?\\}\\}|` +
    `\\[\\[(?:(${prefixPattern}):)?([^\\]|]+)(?:\\|[^\\[\\]]*)?\\]\\]`,
    'i'
);

function getCodeRanges(content) {
    const ranges = [];
    let index = 0;

    while (index < content.length) {
        if (content[index] !== '`') {
            index++;
            continue;
        }

        let length = 1;
        while (content[index + length] === '`') length++;

        const closingStart = content.indexOf('`'.repeat(length), index + length);
        if (closingStart !== -1) {
            ranges.push([index, closingStart + length]);
            index = closingStart + length;
        } else {
            index += length;
        }
    }

    return ranges;
}

function findSyntaxMatch(content) {
    const codeRanges = getCodeRanges(content);
    const matcher = new RegExp(syntaxRegex.source, `${syntaxRegex.flags}g`);
    let match;

    while ((match = matcher.exec(content)) !== null) {
        const isInCode = codeRanges.some(([start, end]) => match.index >= start && match.index < end);
        if (!isInCode) return match;
    }

    return null;
}

module.exports = { findSyntaxMatch };
