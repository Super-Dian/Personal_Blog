import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '个人博客',
  description: '一个记录技术学习历程的个人博客',
  lang: 'zh-CN',
  base: '/Personal_Blog/',

  head: [
    ['link', { rel: 'icon', href: '/Personal_Blog/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '个人博客',

    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/guide/' },
      {
        text: '技术笔记',
        items: [
          { text: 'Web 开发', link: '/notes/web-dev' },
          { text: 'Linux 基础', link: '/notes/linux-basics' },
          { text: 'Git 使用', link: '/notes/git-usage' },
        ]
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '开始使用', link: '/guide/' },
          ]
        }
      ],
      '/notes/': [
        {
          text: '技术笔记',
          items: [
            { text: 'Web 开发环境', link: '/notes/web-dev' },
            { text: 'Linux 基础操作', link: '/notes/linux-basics' },
            { text: 'Git 版本管理', link: '/notes/git-usage' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Super-Dian/Personal_Blog' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2026 个人博客'
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