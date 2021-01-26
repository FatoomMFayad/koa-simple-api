const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-parser");
const App = new Koa();
const PORT = 4000;
const router = new Router();
// App.use(async (ctx, next) => {
//   console.log(`${ctx.method} ${ctx.method} ${new Date()}`);
//   return await next();
// });

// App.use(async (ctx, next) => {
//   console.log(`2nd middleware`);
//   return await next();
// });

// App.use(async (ctx) => {
//   ctx.body = { msg: "hello World!!!" };
// });
App.use(bodyParser());
const posts = [
  {
    id: "1",
    name: "Nodejs Developer",
    content: "Fatoom M Fayad",
  },
  {
    id: "2",
    name: ":Laravel Developer",
    content: "Hanan M Fayad",
  },
];

//create a root route
router.get("/api/hello", async (ctx, next) => {
  ctx.body = { msg: "hello World!!!" };
  return await next();
});

router.get("/posts", async (ctx, next) => {
  ctx.body = posts;
  return await next();
});

router.post("/posts", async (ctx, next) => {
  // const post = ctx.req.body.;
  let { id, name, content } = ctx.request.body;
  // if (!id) {
  //   ctx.throw(400, "id is required field");
  // }
  // if (!name) {
  //   ctx.throw(400, "name is required field");
  // }
  posts.push({ id, name, content });
  ctx.body = posts;
  return await next();
});
App.use(router.routes()).use(router.allowedMethods());
App.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);
