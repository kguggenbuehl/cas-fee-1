Handlebars.registerHelper('formatDateReadable', function (date) {
    return moment(date).calendar({
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'MMMM Do YYYY'
    });
})

Handlebars.registerHelper('formatDateForInput', function (date) {
    return moment(date).format('YYYY-MM-DD');
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