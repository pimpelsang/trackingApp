const deal = {
    title: 'Auto AHB352 diil',
    value: 244,
    valueFormatted: '244 €',

    // viewing customer
    organization: {},
    person: {},

    // who manages sales
    owner: {
        name: '',
        photo: '',
        phone: '',
        email: ''
    }
}

exports.findDeal = (trackingCode) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(deal);
    }, 100);
});