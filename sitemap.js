const axios = require('axios');
const fs = require('fs');
const path = require('path');

const URL = 'https://step-4-jobs-portal.now.sh';
const SITEMAP_LOCATION = path.join(process.cwd(), 'src/generated/sitemap.xml');

const ROUTES = [
  '/',
  '/jobs',
];

axios.get('https://demo4776583.mockable.io/jobs')
  .then(resp => {
    resp.data.forEach(job => {
      ROUTES.push(`/job/${job.slug}/${job.jobId}`);
    });
    main();
  });

function main() {
  const sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ROUTES.map(route => {
      return `<url>
      <loc>${URL}${route}</loc>
    </url>
    `
    }).reduce((acc, item) => {
      return acc + item;
    }, '')}
  </urlset>
  `;
  fs.writeFileSync(SITEMAP_LOCATION, sitemap);
}
