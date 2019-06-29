const presets = [
    [
        '@babel/env',
        {
            useBuiltIns: 'usage',
            corejs: 3
        }
    ],
    ['@babel/react']
];

const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-styled-components'
];
if (process.env.NODE_ENV !== 'production') {
    plugins.push('babel-plugin-dynamic-import-node');
}

module.exports = {
    presets,
    plugins
};
