"use strict";

const home = {};

home.welcome = (db) => {
    return (req, res) => {
        res.status(200).json({ message: "Welcome to google voice services" });
    }
};

module.exports = home;
