export default function () {
    const inputWraps = $('.js-file-input-wrap');

    inputWraps.each((i, el) => {
        const wrap = $(el);
        const input = wrap.find('.js-file-input');
        const labelText = wrap.find('.js-file-input-text');
        const defaultText = labelText.text();

        const getFileName = () => {
            const name = input.val().split(/\\|\//).pop();
            return name.length > 15
            ? `...${name.substr(name.length - 15)}`
            : name;
        };

        if (input.val()) {
            labelText.text(getFileName());
        }

        input.on('change', (evt) => {
            const truncated = getFileName();

            if (truncated.length) {
                labelText.text(truncated);
            } else {
                labelText.text(defaultText);
            }
        });
    });
};
