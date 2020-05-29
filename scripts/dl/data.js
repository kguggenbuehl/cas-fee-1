export default function staticTodos(){
    const todos = [
        {"id": "01", "title": "Lorem ipsum dolor sit amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 3, "finishdate": new Date("January 31 2020 12:30"),"finished": false, "createdate": new Date("January 31 2019 12:30")},
        {"id": "02", "title": "ipsum dolor sit ", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 2, "finishdate": new Date("January 10 2020 12:30"),"finished": false, "createdate": new Date("January 20 2019 12:30")},
        {"id": "03", "title": "Lorem  dolor amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 5, "finishdate": new Date("January 20 2020 12:30"),"finished": true, "createdate": new Date("January 10 2019 12:30")}
    ];
    return todos;
}