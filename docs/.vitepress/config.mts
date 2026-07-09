import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '软件开发工具实践',
  description: '记录 Web 静态站点从开发、配置到部署的完整实践过程',
  lang: 'zh-CN',
  base: '/Personal_Blog/',

  head: [
    ['link', { rel: 'icon', href: '/Personal_Blog/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '软件开发工具实践',

    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/guide/' },
      {
        text: '实验记录',
        items: [
          { text: '网络软件基础', link: '/notes/network-basics' },
          { text: 'Web 开发环境', link: '/notes/web-dev' },
          { text: '代码编辑器与 Markdown', link: '/notes/vscode-markdown' },
          { text: 'Web 静态站点构建', link: '/notes/site-build' },
          { text: '虚拟机安装与使用', link: '/notes/virtualbox-ubuntu' },
          { text: 'Linux 环境配置', link: '/notes/linux-basics' },
          { text: '远程登录管理', link: '/notes/ssh-remote' },
          { text: '软件部署', link: '/notes/deploy' },
          { text: 'Git 版本管理', link: '/notes/git-usage' },
        ]
      },
      { text: '小组分工', link: '/guide/team' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '项目说明',
          items: [
            { text: '开始使用', link: '/guide/' },
            { text: '小组分工与成果说明', link: '/guide/team' },
          ]
        }
      ],
      '/notes/': [
        {
          text: '课程实验记录',
          items: [
            { text: '实验一：网络软件基础', link: '/notes/network-basics' },
            { text: '实验二：Web 开发环境', link: '/notes/web-dev' },
            { text: '实验三：代码编辑器与 Markdown', link: '/notes/vscode-markdown' },
            { text: '实验四：Web 静态站点构建', link: '/notes/site-build' },
            { text: '实验五：虚拟机安装与使用', link: '/notes/virtualbox-ubuntu' },
            { text: '实验六：Linux 环境配置', link: '/notes/linux-basics' },
            { text: '实验七：远程登录管理', link: '/notes/ssh-remote' },
            { text: '实验八：软件部署', link: '/notes/deploy' },
          ]
        },
        {
          text: '补充专题',
          items: [
            { text: 'Git 版本管理', link: '/notes/git-usage' },
            { text: 'VitePress 构建', link: '/notes/vitepress-build' },
            { text: '服务器部署', link: '/notes/deployment-server' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Super-Dian/Personal_Blog' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2026 软件开发工具实践小组'
    },

    search: {
      provider: 'local'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新于',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  }
})
