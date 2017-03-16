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

exports.gatherData = function* (dealId, apiToken) {
    const pipedrive = new Pipedrive.Client(apiToken);

    // load all information
    const deal = yield promisify(pipedrive.Deals.get)(dealId);
    const stages = yield promisify(pipedrive.Stages.getAll)(deal.pipeline_id);
    const owner = deal.user_id;
    const customer = deal.person_id || deal.org_id; 

    // create limited data object
    return {
        company: {
            name: 'Paint Brothers Inc',
            // logo: 'https://dl.dropboxusercontent.com/u/20705/logo.png?dl=1'
        },
        deal: {
            title: deal.title,
            value: deal.valueFormatted,
            state: 'Drying'
        },
        customer: {
            name: customer.name,
            phone: pickFirst(customer.phone),
            email: pickFirst(customer.email)
        },
        owner: {
            name: owner.name,
            phone: owner.phone,
            email: owner.email
        },
        states: formatStates(stages, deal),
        notes: [
            { text: 'This is just a note from mechanic' },
            { image: 'http://www.ismautorepair.com/graphics/photos/shop-photos/auto-repair-gallery-01/photos/774/006.jpg' },
            { image: 'http://www.ismautorepair.com/graphics/photos/shop-photos/auto-repair-gallery-01/photos/774/009.jpg' },
        ]
    };
};

function formatStates(allStages, deal) {
    const stages = allStages.filter(stage => stage.pipeline_id === deal.pipeline_id);
    const activeIndex = stages.findIndex(stage => stage.id === deal.stage_id);

    return stages.map((stage, i) => ({
        name: stage.name,
        start: i === activeIndex ? deal.stage_change_time : null,
        active: i === activeIndex,
        done: i < activeIndex,
        upcoming: i > activeIndex
    }));
}

function pickFirst(phone) {
    return phone && phone.length ? phone[0].value : null;
}