<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAllBlogs, type GetAllBlogsResponse } from '../api/blog'
defineOptions({
  name: 'HomePage',
})
const router = useRouter()

// 总数据
const allData = ref<GetAllBlogsResponse>()

const handlePageChange = (current: number) => {
  pagination.value.current = current
}

interface PaginationProps {
  total: number
  current: number
  pageSize: number
  showTotal: boolean
}

// page
const pagination = ref<PaginationProps>({
  total: 0,
  current: 1,
  pageSize: 10,
  showTotal: true,
})

const getAllBlogsFunc = async () => {
  await getAllBlogs({
    pageSize: pagination.value.pageSize,
    pageNum: pagination.value.current,
  }).then(res => {
    if (res.code === 200) {
      allData.value = res
      pagination.value.total = res.total || 0
    }
  })
}

watchEffect(async () => {
  getAllBlogsFunc()
})
</script>

<template>
  <div class="home-container">
    <a-layout>
      <a-layout-header>
        <a-typography-title :heading="3">让我们开始创作吧!</a-typography-title>
      </a-layout-header>

      <a-layout-content>
        <a-space direction="vertical" size="large" fill>
          <a-card>
            <template #title>欢迎来到 BlogHub! 🎉</template>
            <template #extra>
              <a-button type="primary" @click="() => router.push('/publish')"
                >开始发布吧</a-button
              >
            </template>
          </a-card>

          <a-list
            :data="allData?.data"
            :max-height="500"
            :pagination-props="pagination"
            @pageChange="handlePageChange"
          >
            <template #header> 所有文章 </template>
            <template #empty>
              <a-empty description="暂无文章" />
            </template>
            <template #item="{ item }">
              <a-list-item>
                <a-list-item-meta :title="item.title" :description="item.desc">
                  <template #avatar>
                    <a-avatar shape="square">{{
                      item.title[0] || 'A'
                    }}</a-avatar>
                  </template>
                </a-list-item-meta>
                <template #actions>
                  <div>
                    <icon-heart /> {{ item.like_count }} <icon-message />
                    {{ item.comment_count }} <icon-eye /> {{ item.view_count }}
                  </div>

                  <icon-edit />
                  <icon-delete />
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-space>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<style scoped>
.home-container {
}

.arco-layout-header {
  padding: 0 20px;
  background: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.arco-layout-content {
  padding: 20px;
  background: var(--color-fill-2);
}

.arco-layout-footer {
  padding: 20px;
  text-align: center;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-border);
}
</style>
