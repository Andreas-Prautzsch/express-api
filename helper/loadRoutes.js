const fs = require('fs');
const path = require('path');

function loadRoutes(app) {
    const routesPath = path.join(__dirname, '..', 'routes');

    fs.readdirSync(routesPath).forEach(file => {
        // Skip non-JavaScript files
        if (path.extname(file) !== '.js') return;

        const routePath = path.join(routesPath, file);
        const route = require(routePath);

        // Use the route, removing the file extension
        const routeName = '/' + file.replace('.js', '');
        app.use(routeName, route);
    });
}

module.exports = loadRoutes;