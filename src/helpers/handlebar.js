const Handlebar = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'bi bi-chevron-bar-expand',
            desc: 'bi bi-sort-down',
            asc: 'bi bi-sort-down-alt',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];

        const address = Handlebar.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const outPut = `<a href="${address}">
                        <i class="${icon}"></i>
                        </a>`;

        return new Handlebar.SafeString(outPut);
    },
};
