const express = require('express');
const app = express();

app.get('/', (reeq, res, next) => {
    res.send("hello");
})

port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})