/* eslint-disable @typescript-eslint/no-var-requires */

// Don't open the browser during development
process.env.BROWSER = 'none';

const CracoAntDesignPlugin = require('craco-antd');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          'src/common/styles/antd.customize.less'
        )
      }
    }
  ]
};
