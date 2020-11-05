const docgen = require('react-docgen-typescript')

const options = {
  savePropValueAsString: true,
  propFilter: {
    skipPropsWithName: ['table'],
    skipPropsWithoutDoc: true
  }
}

const tsParser = docgen.withCustomConfig('./tsconfig.json', [options])

module.exports = {
  title: 'Enhanced-antd-table',
  components: 'src/components/**/*.{jsx,tsx}',
  sections: [
    { name: 'Introduction', content: './src/docs/intro.md' },
    {
      name: 'Usage',
      components: 'src/components/Table.tsx'
    }
  ],
  usageMode: 'expand',
  sortProps: (props) => props,
  propsParser: tsParser.parse
}
