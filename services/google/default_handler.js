const defaultHandler = {}

defaultHandler.welcome = (agent) => {
    agent.add(`Welcome to Express.JS webhook!`);
}

defaultHandler.fallback = (agent) => {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

module.exports = defaultHandler;
