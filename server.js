const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-parser");
const _ = require("lodash");
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

//get all posts
router.get("/posts", async (ctx, next) => {
  ctx.body = posts;
  return await next();
});
// add post
router.post("/posts", async (ctx, next) => {
  let { id, name, content } = ctx.request.body;
  posts.push({ id, name, content });
  ctx.body = posts;
  return await next();
});
//get post by id
router.get("/posts/:id", async (ctx, next) => {
  let id = ctx.params.id;
  let post = posts.find((post) => post.id === id);
  ctx.body = post;
  return await next();
});
//remove post by id
router.delete("/posts/:id", async (ctx, next) => {
  ctx.body = _.remove(posts, (p) => p.id === ctx.params.id);
  console.log(posts);
  return await next();
});

//update a post by id

router.put("/posts/:id", async (ctx, next) => {
  let id = ctx.params.id;
  let post = posts.find((post) => post.id === id);
  post.name = ctx.request.body.name;
  ctx.body = posts;
  return await next();
});
App.use(router.routes()).use(router.allowedMethods());
App.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);
