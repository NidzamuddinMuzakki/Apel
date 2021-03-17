const tailwindcss = require("tailwindcss");
module.exports = {
    plugins: [
        require('postcss-cli-simple'),
        tailwindcss("./tailwind.config.js"),
        require("autoprefixer")
    ]
};