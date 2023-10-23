const yonius = require("yonius");
const omni = require("..");

const inventoryLines = async () => {
    await yonius.load();
    const api = new omni.API();
    const result = await api.listInventoryLines();
    console.info(result);
};

inventoryLines();
