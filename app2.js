const Koa = require('./koa');

// console.log(Koa, 11111);
const app = new Koa();
// console.log(app, 11111);
// const Router = require('koa-router');

// const router = new Router();
const f1 = (ctx, next) => {
  console.log(next, 3333333);
  console.log('f1 start');
  ctx.body = `hello ${ctx.body}`;
  next();
  console.log('f1 end');
};

const f2 = async (ctx, next) => {
  console.log('f2 start');
  await next();
  console.log(ctx.body, 1111111);
  ctx.body = `hello ${ctx.body}`;

  console.log('f2 end');
};
const f3 = (ctx, next) => {
  console.log('f3 start');
  ctx.body = `hello ${ctx.body}`;
  next();
  console.log('f3 end');
};

app.use(f1);
app.use(f2);
app.use(f3);
// router.get('/', (ctx) => {
//   ctx.body = 'world';
// });
// app.use(router.routes());
app.listen(3000);
