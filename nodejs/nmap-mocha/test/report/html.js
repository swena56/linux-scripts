require("mocha-allure-reporter");

module.exports = {
  template: (content) => { 
    return `
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.css" />
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
  },

  jsonBlock: (content) => { 
    return `<pre>${JSON.stringify(content, null,'\t')}</pre>`;
  },
};