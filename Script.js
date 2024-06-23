document.addEventListener('DOMContentLoaded', function() {
    const converters = [
        {input1: 'kg', input2: 'pounds', factor: 2.20462},
        {input1: 'km', input2: 'miles', factor: 0.621371},
        {input1: 'celsius', input2: 'fahrenheit', factor: null}
    ];

    converters.forEach(converter => {
        const input1 = document.getElementById(converter.input1);
        const input2 = document.getElementById(converter.input2);

        input1.addEventListener('input', debounce(() => convert(input1, input2, converter, true), 10));
        input2.addEventListener('input', debounce(() => convert(input2, input1, converter, false), 10));
    });

    function convert(from, to, converter, forward) {
        const value = parseFloat(from.value);
        if (isNaN(value)) {
            to.value = '';
            return;
        }

        let result;
        if (converter.factor) {
            result = forward ? value * converter.factor : value / converter.factor;
        } else {
            // Temperature conversion
            result = forward ? (value * 9/5) + 32 : (value - 32) * 5/9;
        }

        to.value = result.toFixed(2);
    }

    // Debounce function to limit how often the conversion runs
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});