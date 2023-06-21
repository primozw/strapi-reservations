import { getNamedFormat, filterProps } from './utils';
import { IntlFormatError } from './error';
var NUMBER_FORMAT_OPTIONS = [
    'style',
    'currency',
    'currencyDisplay',
    'unit',
    'unitDisplay',
    'useGrouping',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    // ES2020 NumberFormat
    'compactDisplay',
    'currencyDisplay',
    'currencySign',
    'notation',
    'signDisplay',
    'unit',
    'unitDisplay',
    'numberingSystem',
];
export function getFormatter(_a, getNumberFormat, options) {
    var locale = _a.locale, formats = _a.formats, onError = _a.onError;
    if (options === void 0) { options = {}; }
    var format = options.format;
    var defaults = ((format &&
        getNamedFormat(formats, 'number', format, onError)) ||
        {});
    var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
    return getNumberFormat(locale, filteredOptions);
}
export function formatNumber(config, getNumberFormat, value, options) {
    if (options === void 0) { options = {}; }
    try {
        return getFormatter(config, getNumberFormat, options).format(value);
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting number.', config.locale, e));
    }
    return String(value);
}
export function formatNumberToParts(config, getNumberFormat, value, options) {
    if (options === void 0) { options = {}; }
    try {
        return getFormatter(config, getNumberFormat, options).formatToParts(value);
    }
    catch (e) {
        config.onError(new IntlFormatError('Error formatting number.', config.locale, e));
    }
    return [];
}
