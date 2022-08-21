<template>
  <TempHumi></TempHumi>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const TempHumi = defineAsyncComponent(() => import('@/components/TempHumi'))
</script>
