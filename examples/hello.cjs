const yonius = require("yonius");
const dotenv = require("dotenv");
const omni = require("..");

const hello = async () => {
    await yonius.load();
    const api = new omni.API();
    const result = await api.selfUser();
    console.info(result);
};

dotenv.config();
hello();
