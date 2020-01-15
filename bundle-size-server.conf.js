module.exports = {
  bundles: [
    {
      name: 'server.js',
      maxSize: '35Kb'
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
      name: 'pages-home.server.bundle.*.js',
      maxSize: '5K'
    }
  ]
};
