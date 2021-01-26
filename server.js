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
  let { id, name, content } = ctx.request.body;
  posts.push({ id, name, content });
  ctx.body = posts;
  return await next();
});

router.get("/posts/:id", async (ctx, next) => {
  id = ctx.params.id;
  let post = posts.find((post) => post.id === id);
  ctx.body = post;
  return await next();
});
App.use(router.routes()).use(router.allowedMethods());
App.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);
