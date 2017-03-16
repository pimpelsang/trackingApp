const Koa = require('koa');
const KoaRouter = require('koa-router');

const template = require('./template');
const db = require('./db');
const pipedrive = require('./pipedrive');

const app = new Koa();

var router = KoaRouter();
router.get('/', function* (next) {
    this.body = 'Hi, I am tracking service!';
})

router.get('/:trackingCode', function* (next) {
    try {
        const {dealId, apiToken} = yield db.resolveTrackingCode(this.params.trackingCode);



        // todo: convert to data object
        const data = yield pipedrive.gatherData(dealId, apiToken);
        
        this.body = template.render(data);
    }
    catch (err) {
        this.throw('deal not found', 404);
    }
})

app.use(router.routes());
app.listen(8080);