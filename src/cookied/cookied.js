const uuid = require('uuid/v1');

// manageSession and parseCookies
const inMemorySessionDb = {};

//parseCookies
exports.parseCookies = function(req, res, next) {
  const c = req.headers['cookie'];
  req.hwCookies = {};
  if (c){
    c.split('; ').forEach(x => {
      const y = x.split('=');
      req.hwCookies[y[0]] = y[1];
    });
  };
  console.log('cookie', req.hwCookies);
	next();
};

//manageSession
exports.manageSession = function(req, res, next) {
  const sessionId = req.hwCookies['sessionId'];
  if (!sessionId || !inMemorySessionDb[sessionId]){
    const s = uuid();
    console.log("session generated: " + s);
    inMemorySessionDb[s] = {sessionId: s};
    res.set('Set-Cookie', "sessionId=" + s + "; HttpOnly");
    req.hwSession = inMemorySessionDb[s];
  }
  else if (inMemorySessionDb[sessionId]){
    console.log("session already exists: " + sessionId);
    req.hwSession = inMemorySessionDb[sessionId];
  }
  next();
};
