const mongoose = require("mongoose");

const revokedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    revoked_at: {
        type: Date,
        default: Date.now,
    },
});

const RevokedTokens = mongoose.model("RevokedTokens", revokedTokenSchema);
module.exports = RevokedTokens;
// const cron = require('node-cron');
// const moment = require('moment');

// // Đặt cron job để xóa các token thu hồi đã quá hạn (ví dụ, xóa mỗi ngày)
// cron.schedule('0 0 * * *', async () => {
//     const expirationPeriod = 7;  // Token hết hạn sau 7 ngày
//     const dateThreshold = moment().subtract(expirationPeriod, 'days').toDate();

//     // Xóa các token đã thu hồi và hết hạn
//     await RevokedTokens.deleteMany({ revoked_at: { $lt: dateThreshold } });
//     console.log(`Expired revoked tokens older than ${expirationPeriod} days have been deleted.`);
// });
