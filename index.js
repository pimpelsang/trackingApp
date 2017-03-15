const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();
    
router.get('/', function *(next) {
    this.body = 'I am tracking extension server!';
})

router.get('/:trackingCode', function *(next) {
    this.body = `I think you have tracking code ${this.params.trackingCode}`;
})


app.use(router.routes());
app.listen(8080);