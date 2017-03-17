const Pipedrive = require('pipedrive');
const promisify = require("es6-promisify");

exports.createPipeline = function*(apiToken) {
    const pipedrive = new Pipedrive.Client(apiToken);

    const name = 'work [public]';
    const stages = ['queued', 'work in progress', 'ready'];
    
    const pipeline = yield promisify(pipedrive.Pipelines.add)({ name: name });

    for (let stage of stages) {
        yield promisify(pipedrive.Stages.add)({ name: stage, pipeline_id: pipeline.id });
    }

    return pipeline.id;
}

exports.gatherDealData = function* (dealId, apiToken) {
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