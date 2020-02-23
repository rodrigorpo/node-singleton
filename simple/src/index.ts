import ServerHandler from './configs/ServerHandler'

const serverHandler = new ServerHandler();

(async () => {
    await serverHandler.init()
})()
