module.exports = {
  apps : [{
    name: 'agario-ffa',
    script: './ffa/index.js',
    namespace: 'gamemode',
    watch: false
  }, {
    name: 'agario-team',
    script: './team/index.js',
    namespace: 'gamemode',
    watch: false
  }, {
    name: 'agario-experimental',
    script: './experimental/index.js',
    namespace: 'gamemode',
    watch: false
  }, {
    name: 'agario-rainbow',
    script: './rainbow/index.js',
    namespace: 'gamemode',
    watch: false
  }]
};
