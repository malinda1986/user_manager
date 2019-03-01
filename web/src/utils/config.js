

module.exports = {
  siteName: 'Spark',
  copyright: 'Spark  © 2019 ',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  apiPath: 'http://localhost:8080',
  fixedHeader: true, // sticky primary layout header
  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      }
    ],
    defaultLanguage: 'en',
  },
}
