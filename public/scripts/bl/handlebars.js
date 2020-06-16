Handlebars.registerHelper('formatDateReadable', function (date) {
    const dateAsCalendar =moment(date).calendar({
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'MMMM Do YYYY'
    });
    return dateAsCalendar;
})

Handlebars.registerHelper('formatDateForInput', function (date) {
    const dateForInput = moment(date).format('YYYY-MM-DD');
    return dateForInput;
})

Handlebars.registerHelper('formatRating', function (rating) {
    let stars = '';
    for (let i = 0; i < rating; i++){
        stars += '<i class="fas fa-star"></i>';
    }
    return stars;
})

Handlebars.registerHelper('isSelected', function (value, id) {
    return value === id ? 'selected' : '';
});