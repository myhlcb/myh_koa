const http = require('http');

class Application {
  constructor() {
    this.middleWares = [];
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }

  use(fn) {
    this.middleWares.push(fn);
  }

  // eslint-disable-next-line class-methods-use-this
  compose(middleWares) {
    const disPatch = (index) => {
      if (index === middleWares.length) {
        return Promise.resolve();
      }
      const fn = middleWares[index];
      return Promise.resolve(fn({}, () => disPatch(index + 1)));
    };
    return disPatch(0);
  }

  callback() {
    const handleRequest = (req, res) => {
      this.compose(this.middleWares).then(() => res.end('hello koa'));
    };
    return handleRequest;
  }
}
module.exports = Application;
