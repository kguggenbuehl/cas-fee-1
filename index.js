import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import open from 'open';

import {notesRoutes} from './routes/notesRoutes';

const app = express();

const router = express.Router();

app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/app.html",  {root: path.resolve() + '/public/'});
});
app.use("/notes", notesRoutes);

const hostname = '127.0.0.1';
const port = 3004;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    open(`http://${hostname}:${port}/`);
});