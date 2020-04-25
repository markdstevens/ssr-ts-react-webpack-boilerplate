module.exports = {
  client: [
    {
      name: 'client.js',
      maxSize: '85 Kb'
    },
    {
      name: 'vendors.client*',
      maxSize: '3.2M'
    },
    {
      name: 'main.*.css',
      maxSize: '140 Kb'
    },
    {
      name: 'manifest.json',
      maxSize: '5K'
    },
    {
      name: 'pages-home.client.bundle.*.js',
      maxSize: '5K'
    },
    {
      name: 'precache-manifest.*.js',
      maxSize: '810 bytes'
    },
    {
      name: 'service-worker.js',
      maxSize: '559 b'
    },
    {
      name: 'views-name.client.bundle.*.js',
      maxSize: '85 Kb'
    },
    {
      name: 'strings-en-US.client.bundle.*.js',
      maxSize: '1 Kb'
    }
  ],
  server: [
    {
      name: 'server.js',
      maxSize: '88 Kb'
    },
    {
      name: 'loadable-stats.json',
      maxSize: '5K'
    },
    {
      name: 'manifest.json',
      maxSize: '5K'
    },
    {
      name: 'views-name.server.bundle.*.js',
      maxSize: '5 kb'
    },
    {
      name: 'strings-en-US.server.bundle.*.js',
      maxSize: '1 Kb'
    }
  ]
};
