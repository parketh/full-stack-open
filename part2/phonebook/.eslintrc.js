module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'browser': true,
        'es2021': true
    },
    'extends': ['eslint:recommended', 'airbnb'],
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ]
    },
    'globals': {
        'process': true
    }
}
