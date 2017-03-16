const demoResponse = {
    dealId: 21,
    apiToken: '6ce5c6c5f424e56e891cda15422a9ab66831fe79'
};

exports.resolveTrackingCode = (trackingCode) => new Promise((resolve, reject) => {
    resolve(demoResponse);
});