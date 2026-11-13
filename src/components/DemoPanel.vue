<script setup>
import { computed, ref } from 'vue'

const count = ref(0)
const draft = ref('')
const tasks = ref([
  { id: 1, text: '用 npm run dev 启动开发服务器', done: true },
  { id: 2, text: '修改 App.vue 观察热更新', done: false },
  { id: 3, text: '运行 npm run build 生成静态文件', done: false },
])
let nextId = 4

const doneCount = computed(() => tasks.value.filter((task) => task.done).length)
const progress = computed(() =>
  tasks.value.length === 0 ? 0 : Math.round((doneCount.value / tasks.value.length) * 100),
)

function decrease() {
  if (count.value > 0) count.value -= 1
}

function increase() {
  count.value += 1
}

function reset() {
  count.value = 0
}

function addTask() {
  const text = draft.value.trim()
  if (!text) return
  tasks.value.push({ id: nextId++, text, done: false })
  draft.value = ''
}

function removeTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <div class="panel">
    <article class="card counter-card">
      <header class="card__head">
        <h3 class="card__title">响应式计数器</h3>
        <p class="card__hint">点击按钮，数字由 ref 驱动更新</p>
      </header>

      <p class="counter" aria-live="polite">
        <span class="counter__value">{{ count }}</span>
        <span class="counter__unit">次</span>
      </p>

      <div class="counter__actions">
        <button type="button" class="button button--square" aria-label="减少一次" @click="decrease">
          −
        </button>
        <button type="button" class="button button--primary" @click="increase">+1</button>
        <button type="button" class="button button--ghost" @click="reset">重置</button>
      </div>

      <p class="card__foot">计数状态保存在组件内，刷新页面后重置。</p>
    </article>

    <article class="card tasks-card">
      <header class="card__head">
        <h3 class="card__title">今日待办</h3>
        <p class="card__hint">已完成 {{ doneCount }} / {{ tasks.length }}</p>
      </header>

      <div class="progress" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" :aria-label="`已完成 ${progress}%`">
        <span class="progress__bar" :style="{ width: `${progress}%` }"></span>
      </div>

      <form class="task-form" @submit.prevent="addTask">
        <label class="sr-only" for="task-input">新的待办</label>
        <input
          id="task-input"
          v-model="draft"
          class="task-form__input"
          type="text"
          placeholder="添加一条待办，回车确认"
          autocomplete="off"
          maxlength="60"
        />
        <button class="button button--primary" type="submit" :disabled="!draft.trim()">添加</button>
      </form>

      <ul v-if="tasks.length" class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task" :class="{ 'task--done': task.done }">
          <label class="task__label">
            <input v-model="task.done" type="checkbox" class="task__check" />
            <span class="task__text">{{ task.text }}</span>
          </label>
          <button type="button" class="task__remove" :aria-label="`删除待办：${task.text}`" @click="removeTask(task.id)">
            ×
          </button>
        </li>
      </ul>
      <p v-else class="task-empty">暂无待办，添加一条试试。</p>
    </article>
  </div>
</template>
