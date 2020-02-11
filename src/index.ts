import Express from 'express';

const port = 8080; // default port to listen

const app = Express()

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})