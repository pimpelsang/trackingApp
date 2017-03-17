const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser');

const template = require('./template');
const db = require('./db');
const pipedrive = require('./pipedrive');

var router = KoaRouter();
router.get('/', function* (next) {
    this.body = 'Hi, I am tracking service!';
})

router.get('/setup', function* (next) {
    this.body = yield template.render('setup');
})

router.post('/setup', function* (next) {
    const apiToken = this.request.body.apiToken;
    const pipelineId = yield pipedrive.createPipeline(apiToken);

    yield db.storeIntegration(apiToken, pipelineId);

    this.body = yield template.render('setup', { pipelineId });
})

router.get('/:trackingCode', function* (next) {
    try {
        const { dealId, apiToken } = yield db.resolveTrackingCode(this.params.trackingCode);
        const data = yield pipedrive.gatherDealData(dealId, apiToken);

        this.body = yield template.render('tracking-page', data);
    }
    catch (err) {
        console.log(err);
        this.throw(404, 'not found');
    }
})

const app = new Koa();
app.use(KoaBodyParser());
app.use(router.routes());
app.listen(8080);