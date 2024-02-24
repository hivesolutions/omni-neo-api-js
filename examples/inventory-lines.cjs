const yonius = require("yonius");
const dotenv = require("dotenv");
const omni = require("..");

const inventoryLines = async () => {
    await yonius.load();
    const api = new omni.API();
    const result = await api.listInventoryLines();
    console.info(result);
};

dotenv.config();
inventoryLines();
