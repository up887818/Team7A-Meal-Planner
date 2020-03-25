// QUnit testing
'use strict';

QUnit.Module("Server Testing")

QUnit.test(
  "User can log in"

  function(assert) {
    // requiring the server file starts the server
    require("server.js");

    const done = assert.async();

    let testData = {
      "username": "afluger0@cornell.edu",
      "password": "94db3a83deba80c97aa2bdbc9beb1f2526fd306e320781bf6bd360632046019d"
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
  "Server can register account"

  function(assert) {
    // requiring the server file starts the server
    require("server.js");

    const done = assert.async();

    let testData = {
      "firstname": "Test",
      "lastname": "Data",
      "email": "testing@gmail.com",
      "password": "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090"
    }

    sessionStorage.setItem("register_details", testData);
    // hashing represents "abc123"

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
  "Server can login using new account"

  function(assert) {
    // requiring the server file starts the server
    require("server.js");

    const done = assert.async();

    let testData = {
      // same data as previous test
      "email": "testing@gmail.com",
      "password": "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090"
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