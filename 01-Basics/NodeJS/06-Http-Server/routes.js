const fs = require("fs");

const requestHandler = (req, res) => {
  console.log("HTTP SERVER");

  const url = req.url;
  const method = req.method;
  const headers = req.headers;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>NodeJS</title></head>");
    res.write("<body>");
    res.write("<form method='POST' action='/message'>");
    res.write("<input type='text' name='message' />");
    res.write("<button type='submit'>Submit</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    // Listen to data received
    req.on("data", (chunk) => {
      console.log("DATA received (chunk):", chunk);
      body.push(chunk);
    });
    // Listen to data finished
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("Parsed Body:", parsedBody);

      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("./messages/messages.txt", message);
      fs.writeFile("./messages/messages.txt", message, (error) => {
        if (!error) {
          res.statusCode = 302; // for redirect
          res.setHeader("Location", "/");
          return res.end();
        }
        console.error(error);
      });
    });
  }

  // Send Request
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>NodeJS</title></head>");
  res.write("<body><h1>Hello World!</h1></body>");
  res.write("</html>");
  res.end();

  // console.log("URL:", url);
  // console.log("METHOD:", method);
  // console.log("HEADERS:", headers);
  // process.exit();
};

module.exports = { requestHandler };
