<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/default.css'
import 'highlight.js/lib/common'
import { publishBlog, type PublishBlogProps } from '@/api/publish'
import { type ValidatedError, Message } from '@arco-design/web-vue'

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
)

const form = reactive<PublishBlogProps>({
  title: '',
  content: '',
  categories: [],
  desc: '',
})

const html = ref()

// loading
const loading = ref(false)

// 添加表单 ref
const formRef = ref()

watchEffect(() => {
  html.value = marked.parse(form.content)
})

function handleReaset() {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

async function handlePublish({
  values,
  errors,
}: {
  values: Record<
    keyof PublishBlogProps,
    PublishBlogProps[keyof PublishBlogProps]
  >
  errors: Record<string, ValidatedError> | undefined
}) {
  if (errors) {
    // 添加这个判断
    Message.error('请检查输入')
    return
  }

  try {
    loading.value = true
    const data = values as PublishBlogProps

    const parseContent = JSON.parse(JSON.stringify(data.content))
    const { code } = await publishBlog({
      ...data,
      content: parseContent,
    })
    if (code === 200) {
      Message.success('发布成功')
      handleReaset()
    } else {
      Message.error('发布失败')
    }
  } catch {
    Message.error('发布失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="publish-container">
    <a-layout>
      <a-layout-header>
        <a-typography-title :heading="3">发布文章</a-typography-title>
      </a-layout-header>

      <a-layout-content>
        <a-form
          :model="form"
          layout="vertical"
          @submit="handlePublish"
          ref="formRef"
        >
          <a-form-item
            field="title"
            label="文章标题"
            :rules="[{ required: true, message: '请输入文章标题' }]"
          >
            <a-input v-model="form.title" placeholder="请输入文章标题" />
          </a-form-item>
          <a-form-item
            field="desc"
            label="文章描述"
            :rules="[{ required: true, message: '请输入文章描述' }]"
          >
            <a-input v-model="form.desc" placeholder="请输入文章描述" />
          </a-form-item>
          <a-form-item
            field="categories"
            label="文章分类"
            :rules="[{ required: true, message: '请选择文章分类' }]"
          >
            <a-select
              v-model="form.categories"
              placeholder="请选择文章分类"
              multiple
              allow-create
            />
          </a-form-item>

          <div class="editor-container">
            <a-row :gutter="16" style="height: 100%">
              <!-- 左侧编辑区 -->
              <a-col :span="12">
                <a-form-item
                  field="content"
                  label="文章内容"
                  :rules="[{ required: true, message: '请输入文章内容' }]"
                >
                  <a-textarea
                    v-model="form.content"
                    placeholder="请输入文章内容"
                    :auto-size="{ minRows: 10, maxRows: 20 }"
                  />
                </a-form-item>
              </a-col>

              <!-- 右侧预览区 -->
              <a-col :span="12">
                <!--  -->
                <a-typography-text bold>预览</a-typography-text>
                <div class="markdown-body" v-html="html"></div>
              </a-col>
            </a-row>
          </div>
          <a-form-item>
            <a-space>
              <a-button @click="handleReaset()">重置</a-button>
              <a-button :disabled="true">保存草稿</a-button>
              <a-button :loading="loading" type="primary" html-type="submit"
                >发布</a-button
              >
            </a-space>
          </a-form-item>
        </a-form>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<style scoped lang="less">
.publish-container {
  height: 100%;
}

.markdown-body {
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
}
</style>
