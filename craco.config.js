const CracoLessPlugin = require('craco-less');

module.exports = function({ env }) {
    return {
      plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        },
      ],
    };
}