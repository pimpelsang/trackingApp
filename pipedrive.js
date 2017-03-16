const Pipedrive = require('pipedrive');
const promisify = require("es6-promisify");

const demoData = {
    company: {
        name: 'Paint Brothers Inc',
        // logo: 'https://dl.dropboxusercontent.com/u/20705/logo.png?dl=1'
    },
    deal: {
        title: 'Repair Audi AFG332',
        value: '850 €',
        state: 'Drying'
    },
    customer: {
        name: 'Peter Joa',
        phone: '+55 352352352',
        email: 'peeter.joa@gmail.com'
    },
    owner: {
        name: 'Jon Don',
        phone: '+52 52564564',
        email: 'jon@repaint-factory.com'
    },
    states: [
        { name: 'Car received', start: '9:00 on 21.02.2017', done: true },
        { name: 'Cleaning', start: '10:00 on 21.02.2017', done: true },
        { name: 'Painting', start: '12:00 on 21.02.2017', done: true },
        { name: 'Drying', start: '15:20 on 21.02.2017', active: true },
        { name: 'Finished', upcoming: true },
        { name: 'Delivered', upcoming: true }
    ],
    notes: [
        { text: 'This is just a note from mechanic' },
        { image: 'http://www.ismautorepair.com/graphics/photos/shop-photos/auto-repair-gallery-01/photos/774/006.jpg' },
        { image: 'http://www.ismautorepair.com/graphics/photos/shop-photos/auto-repair-gallery-01/photos/774/009.jpg' },
    ]
};

exports.gatherData = (dealId, apiToken) => new Promise((resolve, reject) => {
    // const pipedrive = new Pipedrive.Client(apiToken, { strictMode: true });

    // const deal = yield promisify(pipedrive.Deals.get)(dealId);
    // const stages = yield promisify(pipedrive.Stages.getAll)(deal.pipeline_id);
    // const owner = yield promisify(pipedrive.User.get)(deal.user_is);

    // if (deal.person_id) {
    //     const customer = yield promisify(pipedrive.Person.get)(deal.person_id);
    // } else {
    //     const customer = yield promisify(pipedrive.Organization.get)(deal.org_id);
    // }

    resolve(demoData);
});