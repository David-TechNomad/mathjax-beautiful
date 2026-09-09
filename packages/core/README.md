# Vue MathJax Beautiful

🚀 精简、高效的 Vue 3 数学公式编辑器组件库

## 特性

- 🧮 **专业公式编辑** - 基于 MathJax 引擎，支持完整的 LaTeX 语法
- 🎨 **丰富符号面板** - 240+ 数学符号和 38 个常用公式模板
- 👀 **实时预览** - 所见即所得的公式编辑体验
- 📝 **富文本编辑** - 支持粗体、斜体、下划线等文本格式
- 🌍 **国际化支持** - 内置中文和英文界面
- 🚀 **Vue 3 + TypeScript** - 现代化的技术栈
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔧 **易于集成** - 简单的 API 设计，轻松集成到现有项目
- ⚡ **工具函数** - 丰富的 LaTeX 处理工具函数

## 安装

```bash
npm install vue-mathjax-beautiful
```

或使用 yarn：

```bash
yarn add vue-mathjax-beautiful
```

或使用 pnpm：

```bash
pnpm add vue-mathjax-beautiful
```

## 快速开始

### 基本使用

```vue
<template>
  <div>
    <!-- 公式编辑器弹窗 -->
    <VueMathjaxBeautiful
      v-model="showDialog"
      :existing-latex="formula"
      title="数学公式编辑器"
      @insert="handleInsert"
      @cancel="handleCancel"
    />
    
    <!-- 富文本编辑器 -->
    <VueMathjaxEditor 
      v-model="content"
      placeholder="开始编写您的内容，支持数学公式..."
      :min-height="'300px'"
      @change="handleContentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  VueMathjaxBeautiful, 
  VueMathjaxEditor,
  initMathJax 
} from 'vue-mathjax-beautiful'

const showDialog = ref(false)
const formula = ref('E = mc^2')
const content = ref('')

// 初始化 MathJax
onMounted(async () => {
  await initMathJax()
})

const handleInsert = (latex: string) => {
  formula.value = latex
  showDialog.value = false
}

const handleCancel = () => {
  showDialog.value = false
}

const handleContentChange = (value: string) => {
  console.log('Content changed:', value)
}
</script>
```

### 全局注册

```typescript
import { createApp } from 'vue'
import VueMathjaxBeautiful from 'vue-mathjax-beautiful'
import App from './App.vue'

const app = createApp(App)
app.use(VueMathjaxBeautiful)
app.mount('#app')
```

## API 文档

### VueMathjaxBeautiful (公式编辑器)

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `v-model` | `boolean` | `false` | 控制弹窗显示状态 |
| `title` | `string` | `"公式编辑器"` | 弹窗标题文字 |
| `subtitle` | `string` | `""` | 弹窗副标题文字 |
| `placeholder` | `string` | `""` | 输入框占位符文本 |
| `inline-mode` | `boolean` | `false` | 是否启用内联模式 |
| `existing-latex` | `string` | `""` | 预设的LaTeX代码 |
| `show-theme-toggle` | `boolean` | `true` | 是否显示主题切换按钮 |
| `symbol-width` | `number \| string` | 不传 | 符号按钮固定宽度（如 `40`、`"2.5rem"`），默认随容器自适应 |
| `symbol-height` | `number \| string` | 不传 | 符号按钮固定高度（默认内联跟随宽度、弹窗 `50px`） |
| `symbol-gap` | `number \| string` | `8` | 符号按钮间距 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@insert` | `(latex: string)` | 公式插入时触发 |
| `@cancel` | `()` | 取消操作时触发 |

### VueMathjaxEditor (富文本编辑器)

#### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `v-model` | `string` | `""` | 绑定的内容值 |
| `placeholder` | `string` | `""` | 占位符文本 |
| `min-height` | `string` | `"200px"` | 最小高度 |
| `width` | `string` | `"100%"` | 编辑器宽度 |
| `readonly` | `boolean` | `false` | 只读模式 |
| `show-toolbar` | `boolean` | `true` | 是否显示工具栏 |
| `theme` | `string` | `"default"` | 主题名称 |
| `auto-focus` | `boolean` | `false` | 是否自动聚焦 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@change` | `(value: string)` | 内容变化时触发 |
| `@focus` | `()` | 编辑器获得焦点时触发 |
| `@blur` | `()` | 编辑器失去焦点时触发 |
| `@ready` | `()` | 编辑器准备就绪时触发 |
| `@error` | `(error: any)` | 发生错误时触发 |

## 工具函数 API

Vue MathJax Beautiful 提供了丰富的 LaTeX 处理工具函数，您可以在项目中直接使用：

### 核心转换函数

```typescript
import { 
  initMathJax,
  convertLatexToSvg,
  batchConvertLatex,
  extractLatexFromSvg 
} from 'vue-mathjax-beautiful'

// 初始化 MathJax 引擎
await initMathJax()

// 将 LaTeX 转换为 SVG
const svgContent = await convertLatexToSvg('$E = mc^2$')

// 批量转换
const contents = [{ content: '$x^2$' }, { content: '$y^3$' }]
const converted = await batchConvertLatex(contents)

// 从 SVG 提取 LaTeX
const latex = extractLatexFromSvg('<svg data-latex="E=mc^2">...</svg>')
```

### 匹配和检测函数

```typescript
import { 
  matchLatex,
  hasLatexFormula,
  type MatchLatexResult 
} from 'vue-mathjax-beautiful'

const text = '这是一个公式: $E=mc^2$ 和另一个: $$\\int_0^1 x dx$$'

// 检测是否包含公式
if (hasLatexFormula(text)) {
  // 获取所有公式匹配信息
  const matches: MatchLatexResult[] = matchLatex(text)
  
  matches.forEach(match => {
    console.log('公式内容:', match.content)
    console.log('类型:', match.isInline ? '行内' : '独立')
    console.log('位置:', match.start, '-', match.end)
  })
}
```

### DOM 操作函数

```typescript
import { clearMathTags } from 'vue-mathjax-beautiful'

// 清理 DOM 元素中的特定数学标签
const element = document.getElementById('content')
clearMathTags(element, 'mjx-container')
```

## 类型定义

```typescript
// 导入类型定义
import type {
  MatchLatexResult,
  Symbol,
  Category,
  Locale,
  Messages
} from 'vue-mathjax-beautiful'

// LaTeX 匹配结果
interface MatchLatexResult {
  formula: string      // 原始公式文本
  content: string      // 公式内容
  start: number        // 起始位置
  end: number          // 结束位置
  wrapper: string      // 处理后的公式
  isInline: boolean    // 是否为行内公式
}

// 数学符号
interface Symbol {
  latex: string
  symbol: string
  description: LocalizedText
}

// 符号分类
interface Category {
  name: string
  title: LocalizedText
  symbols: Symbol[]
}
```

## 完整示例

### Vue 3 组合式 API

```vue
<template>
  <div class="math-editor-container">
    <!-- 富文本编辑器 -->
    <VueMathjaxEditor
      v-model="content"
      :min-height="'300px'"
      :readonly="isReadonly"
      placeholder="开始编写您的数学内容..."
      @change="handleContentChange"
      @ready="handleEditorReady"
    />

    <!-- 公式编辑器弹窗 -->
    <VueMathjaxBeautiful
      v-model="showFormulaDialog"
      :existing-latex="selectedFormula"
      title="高级公式编辑器"
      @insert="handleFormulaInsert"
      @cancel="handleCancel"
    />
    
    <!-- 操作按钮 -->
    <div class="toolbar">
      <button @click="openFormulaEditor">插入公式</button>
      <button @click="toggleReadonly">切换只读</button>
      <button @click="analyzeFormulas">分析公式</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  VueMathjaxEditor, 
  VueMathjaxBeautiful,
  initMathJax, 
  matchLatex,
  hasLatexFormula,
  type MatchLatexResult
} from 'vue-mathjax-beautiful'

// 响应式数据
const content = ref('')
const showFormulaDialog = ref(false)
const selectedFormula = ref('')
const isReadonly = ref(false)

// 初始化 MathJax
onMounted(async () => {
  try {
    await initMathJax()
    console.log('MathJax 初始化成功')
  } catch (error) {
    console.error('MathJax 初始化失败:', error)
  }
})

// 事件处理函数
const handleContentChange = (value: string) => {
  content.value = value
  console.log('内容变化:', value)
}

const handleEditorReady = () => {
  console.log('编辑器准备就绪')
}

const handleFormulaInsert = (latex: string) => {
  // 将公式插入到内容中
  content.value += `$${latex}$`
  showFormulaDialog.value = false
}

const handleCancel = () => {
  showFormulaDialog.value = false
}

const openFormulaEditor = () => {
  selectedFormula.value = 'E = mc^2'
  showFormulaDialog.value = true
}

const toggleReadonly = () => {
  isReadonly.value = !isReadonly.value
}

const analyzeFormulas = () => {
  if (hasLatexFormula(content.value)) {
    const matches: MatchLatexResult[] = matchLatex(content.value)
    console.log('找到的公式:', matches)
    
    matches.forEach((match, index) => {
      console.log(`公式 ${index + 1}:`, {
        content: match.content,
        type: match.isInline ? '行内' : '独立',
        position: `${match.start}-${match.end}`
      })
    })
  } else {
    console.log('内容中没有找到公式')
  }
}
</script>

<style scoped>
.math-editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.toolbar {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
```

### Options API

```vue
<template>
  <div>
    <VueMathjaxEditor 
      v-model="content"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { VueMathjaxEditor, initMathJax } from 'vue-mathjax-beautiful'

export default {
  components: {
    VueMathjaxEditor
  },
  
  data() {
    return {
      content: ''
    }
  },
  
  async mounted() {
    await initMathJax()
  },
  
  methods: {
    handleChange(value) {
      this.content = value
    }
  }
}
</script>
```

## 国际化

组件内置中英文支持，您也可以自定义语言：

```typescript
import { useI18n } from 'vue-mathjax-beautiful'

const { t, setLocale } = useI18n()

// 切换语言
setLocale('en-US') // 或 'zh-CN'

// 使用翻译
console.log(t('common.save'))
```

## 浏览器兼容性

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新详情。 