Handlebars.registerHelper('formatDate', function (date) {
    const dateAsCalendar = moment(date).format('MMMM Do YYYY');
    return dateAsCalendar;
})