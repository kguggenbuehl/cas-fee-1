Handlebars.registerHelper('formatDateReadable', function (date) {
    const dateAsCalendar = moment(date).format('MMMM Do YYYY');
    return dateAsCalendar;
})

Handlebars.registerHelper('formatDateForInput', function (date) {
    const dateForInput = moment(date).format('YYYY-MM-DD');
    return dateForInput;
})

Handlebars.registerHelper('isSelected', function (value, id) {
    return value === id ? 'selected' : '';
});