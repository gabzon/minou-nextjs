const fs = require('fs');
const path = require('path');

// Identify paths
const srcDir = path.join(process.cwd(), '.open-next');
const destDir = path.join(process.cwd(), '.open-next', 'assets');

// List of items to copy from root .open-next build to the assets folder
// This ensures that when we deploy the 'assets' folder, the worker and its dependencies are included
const itemsToCopy = [
    { src: 'worker.js', dest: '_worker.js' },     // Rename worker.js to _worker.js for Pages Advanced Mode
    { src: 'cloudflare', dest: 'cloudflare' },
    { src: 'middleware', dest: 'middleware' },
    { src: 'server-functions', dest: 'server-functions' },
    { src: '.build', dest: '.build' },
    { src: 'cache', dest: 'cache' }
];

console.log('🏗️  Restructuring .open-next output for Cloudflare Pages...');

if (!fs.existsSync(destDir)) {
    console.error('❌ Error: .open-next/assets directory not found. Did the build run?');
    process.exit(1);
}

itemsToCopy.forEach(item => {
    const source = path.join(srcDir, item.src);
    const destination = path.join(destDir, item.dest);

    if (fs.existsSync(source)) {
        console.log(`   Copying ${item.src} -> assets/${item.dest}`);
        try {
            fs.cpSync(source, destination, { recursive: true, force: true });
        } catch (err) {
            console.error(`   ❌ Failed to copy ${item.src}:`, err.message);
            process.exit(1);
        }
    } else {
        // Optional items are just skipped, but warn for critical ones
        if (item.src === 'worker.js') {
            console.warn(`   ⚠️  Warning: worker.js not found in .open-next!`);
        }
    }
});

// Generate _routes.json to exclude static assets from being handled by the worker
// This ensures Cloudflare serves them directly from the CDN
const routesConfig = {
    version: 1,
    include: ["/*"],
    exclude: ["/_next/static/*", "/favicon.ico"]
};

const routesPath = path.join(destDir, '_routes.json');
fs.writeFileSync(routesPath, JSON.stringify(routesConfig, null, 2));
console.log('   Generated _routes.json to bypass worker for static assets');

console.log('✅ Structure updated successfully. Ready for deployment.');
