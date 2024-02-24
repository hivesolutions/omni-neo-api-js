const yonius = require("yonius");
const dotenv = require("dotenv");
const omni = require("..");

const returns = async () => {
    await yonius.load();
    const api = new omni.API();
    const returns = await api.listReturns();
    const _return = await api.getReturn(returns[0].object_id);
    const returnLine = _return.return_lines[0];
    console.info(`Return Line: ${_return.identifier} (${_return.object_id})`);
    console.info(`${returnLine.merchandise.name} ${returnLine.quantity}x`);
};

dotenv.config();
returns();
