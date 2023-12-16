"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSchedule = void 0;
const node_cron_1 = require("node-cron");
const run_1 = require("../fn/run");
const options = {
    scheduled: true,
    timezone: 'America/Sao_Paulo',
};
const runSchedule = (0, node_cron_1.schedule)(
// todo dia 12h
// '0 12 * * *',
// a cada 10 segundos
'*/10 * * * * *', async () => {
    try {
        await (0, run_1.run)();
    }
    catch (error) {
        console.log(error);
    }
}, options);
exports.runSchedule = runSchedule;
