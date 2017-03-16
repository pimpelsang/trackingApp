const Koa = require('koa');
const KoaRouter = require('koa-router');
const template = require('./template');
const db = require('./db');

const app = new Koa();
app.context.db = db;

var router = KoaRouter();
router.get('/', function* (next) {
    this.body = 'Hi, I am tracking service!';
})

router.get('/:trackingCode', function* (next) {
    try {
        const deal = yield this.db.findDeal(this.params.trackingCode);

        this.body = template.render(deal);
    }
    catch (err) {
        this.throw('deal not found', 404);
    }
})

app.use(router.routes());
app.listen(8080);