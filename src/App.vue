<script setup>
import { onMounted, ref } from 'vue'
import DemoPanel from './components/DemoPanel.vue'

const repoUrl = 'https://github.com/wanghao1530/super-agent'
const theme = ref('light')
const year = new Date().getFullYear()

const features = [
  {
    icon: '⚡',
    title: 'Vite 构建',
    text: '开发时毫秒级冷启动与热更新，npm run build 输出可直接托管的静态文件。',
  },
  {
    icon: '🧩',
    title: '组合式 API',
    text: '使用 <script setup> 与 ref / computed 组织状态，逻辑按功能聚合，易于复用。',
  },
  {
    icon: '🌓',
    title: '主题切换',
    text: '浅色与深色主题基于 CSS 变量实现，选择会写入 localStorage，刷新后保留。',
  },
  {
    icon: '📱',
    title: '自适应布局',
    text: '桌面端双栏、移动端单栏，配合流式字号与间距，在小屏幕上同样易读。',
  },
]

function applyTheme(next) {
  theme.value = next
  document.documentElement.dataset.theme = next
  document.documentElement.style.colorScheme = next
  try {
    localStorage.setItem('sa-theme', next)
  } catch {
    // Storage can be unavailable in private mode; the page still works.
  }
}

function toggleTheme() {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

onMounted(() => {
  let saved = null
  try {
    saved = localStorage.getItem('sa-theme')
  } catch {
    // Ignore unavailable storage.
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved ?? (prefersDark ? 'dark' : 'light'))
})
</script>

<template>
  <div class="page" id="top">
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Super Agent 首页">
        <span class="brand__mark" aria-hidden="true">SA</span>
        <span class="brand__name">Super Agent</span>
      </a>

      <nav class="topnav" aria-label="主导航">
        <a href="#playground">交互 Demo</a>
        <a href="#features">特性</a>
        <a :href="repoUrl" target="_blank" rel="noreferrer">GitHub</a>
      </nav>

      <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
        :title="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
        @click="toggleTheme"
      >
        <span aria-hidden="true">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
      </button>
    </header>

    <main>
      <section class="hero">
        <p class="hero__eyebrow">Vue 3 · Vite · 纯静态部署</p>
        <h1 class="hero__title">
          一个干净、可直接运行的
          <span class="hero__accent">Vue 静态页面</span>
          示例
        </h1>
        <p class="hero__lead">
          super-agent 仓库的初始化 Demo：单文件组件、响应式状态与主题切换都已就绪。
          修改 <code>src/App.vue</code> 保存即可看到热更新，执行 <code>npm run build</code>
          即可得到可托管的静态产物。
        </p>
        <div class="hero__actions">
          <a class="button button--primary" href="#playground">试试交互 Demo</a>
          <a class="button button--ghost" :href="repoUrl" target="_blank" rel="noreferrer">
            查看源码
          </a>
        </div>
        <ul class="hero__facts" aria-label="项目要点">
          <li><strong>0</strong><span>运行时依赖</span></li>
          <li><strong>2</strong><span>示例交互</span></li>
          <li><strong>1</strong><span>静态产物目录</span></li>
        </ul>
      </section>

      <section id="playground" class="section">
        <div class="section__head">
          <p class="section__eyebrow">Playground</p>
          <h2 class="section__title">交互 Demo</h2>
          <p class="section__lead">
            下面的计数器与待办清单全部由 Vue 的响应式状态驱动，代码见
            <code>src/components/DemoPanel.vue</code>。
          </p>
        </div>
        <DemoPanel />
      </section>

      <section id="features" class="section">
        <div class="section__head">
          <p class="section__eyebrow">Features</p>
          <h2 class="section__title">这个 Demo 包含什么</h2>
        </div>
        <ul class="feature-grid">
          <li v-for="feature in features" :key="feature.title" class="feature-card">
            <span class="feature-card__icon" aria-hidden="true">{{ feature.icon }}</span>
            <h3 class="feature-card__title">{{ feature.title }}</h3>
            <p class="feature-card__text">{{ feature.text }}</p>
          </li>
        </ul>
      </section>
    </main>

    <footer class="footer">
      <p>Built with Vue 3 + Vite · © {{ year }} Super Agent</p>
      <a :href="repoUrl" target="_blank" rel="noreferrer">github.com/wanghao1530/super-agent</a>
    </footer>
  </div>
</template>
