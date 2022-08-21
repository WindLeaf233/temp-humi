<template>
  <h4>温湿度变化</h4>
  <TempHumi></TempHumi>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const TempHumi = defineAsyncComponent(() => import('@/components/TempHumi'))
</script>
