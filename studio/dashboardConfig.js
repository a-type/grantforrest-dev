export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5dc579ec573e167938c42369',
                  title: 'Sanity Studio',
                  name: 'grantforrest-dev-studio',
                  apiId: 'f762a858-2d52-412a-9cb1-f93293d2e736'
                },
                {
                  buildHookId: '5dc579ecdbe568b4450edac0',
                  title: 'Blog Website',
                  name: 'grantforrest-dev',
                  apiId: 'a86e5269-42b0-4f15-b962-76f6eb7b4047'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/a-type/grantforrest-dev',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://grantforrest-dev.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
