// QUnit testing
'use strict';

QUnit.module("Server Testing")

QUnit.test(
  "User can log in",

  function(assert) {
    // requiring the server file starts the server
    require("server.js");

    const done = assert.async();

    let testData = {
      "username": "afluger0@cornell.edu",
      "password": "4d866bbe29ad7fc592c78b380897495d"
      // hashing represents "ultrices32"
      // this is usually hashed on the client end for security
    }

    sessionStorage.setItem("login_details", JSON.stringify(testData));

    const options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/login',
    };
    const req = http.request(options, function(res) {
      assert.qeual(res.statusCode, 200, "If it's working the status should be 200");
      let str = '';

      res.on('data', function(chunk) {
        str += chunk;
      });

      res.on('end', function() {
        let userId = localStorage.getItem("user_id");
        assert.equal(userId, 1, "Server has received correct user ID from database");
      });
    });

    req.on('error', function(e) {
      assert.ok(false);
      done();
    });

    req.end();
  }
);

QUnit.test(
  "Server can register account",

  function(assert) {
    // requiring the server file starts the server
    require("server.js");

    const done = assert.async();

    let testData = {
      "firstname": "Test",
      "lastname": "Data",
      "email": "testing@gmail.com",
      "password": "e99a18c428cb38d5f260853678922e03"
      // hashing represents "abc123"
    }

    sessionStorage.setItem("register_details", testData);

    const options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/register',
    };

    const req = http.request(options, function(res) {
      assert.qeual(res.statusCode, 200, "If it's working the status should be 200");
      let str = '';

      res.on('data', function(chunk) {
        str += chunk;
      });

      res.on('end', function() {
        assert.equal(str.trim(), "true", "Server has received no error from database");
      });
    });

    req.on('error', function(e) {
      assert.ok(false);
      done();
    });

    req.end();
  }

);

QUnit.test(
  "Server can login using new account",

  function(assert) {
    // requiring the server file starts the server
    require("server.js");

    const done = assert.async();

    let testData = {
      // same data as previous test
      "email": "testing@gmail.com",
      "password": "e99a18c428cb38d5f260853678922e03"
    }

    sessionStorage.setItem("login_details", testData);

    const options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/auth',
    };

    const req = http.request(options, function(res) {
      assert.qeual(res.statusCode, 200, "If it's working the status should be 200");
      let str = '';

      res.on('data', function(chunk) {
        str += chunk;
      });

      res.on('end', function() {
        let userId = localStorage.getItem("user_id");
        assert.equal(userId, 11, "Server has received correct user ID from database");
      });
    });

    req.on('error', function(e) {
      assert.ok(false);
      done();
    });

    req.end();
  }

);

// async function runTests() {
//   const browser = await puppeteer.launch();
//
//   const ipAdd = ip.address();
//   console.log(ipAdd);
//
//   try {
//     const page = await browser.newPage();
//     await page.waitFor(1000);
//
//     await page.goto(`${ipAdd}:8080/`);
//     await page.waitFor(1000);
//     //homepage, waits 1000ms to make sure its loaded
//
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     await browser.close();
//   }
//   //close browser
// }