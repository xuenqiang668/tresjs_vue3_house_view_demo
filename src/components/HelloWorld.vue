<template>
  <TresMesh :position="[0, 0, 0]" ref="sphereRef" :scale="1" cast-shadow>
    <TresSphereGeometry :args="[25, 256, 256]" />
    <TresMeshStandardMaterial v-bind="pbrTexturePorxy" :side="2" :displacement-scale="0.2" />
  </TresMesh>
</template>

<script setup lang="ts">
import {
  ref,
  shallowRef,
  watch,
} from 'vue';

import gsap from 'gsap';

import {
  useRenderLoop,
  useTexture,
} from '@tresjs/core';

import { rooms } from './data.js';

const porps = defineProps({
  idx: Number
})

const pbrTexture = await useTexture({
  map: rooms[porps.idx].map,
});

const pbrTexturePorxy = shallowRef(pbrTexture)

const sphereRef = ref(null);

const { onLoop } = useRenderLoop();


onLoop(({ delta }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
  if ((sphereRef.value as any)) {
    // ((sphereRef.value as  any) as any).rotation.y += delta / 2;
  }
});


const gsapAnimateCameaNext = async () => {
  // 创建一个透明度控制对象
  const fadeObject = { opacity: 1, scale: 1 };
  // 设置材质透明度属性
  (sphereRef.value as any).material.transparent = true;
  // 淡出当前纹理
  gsap.to(fadeObject, {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    onUpdate: () => {
      (sphereRef.value as any).material.opacity = fadeObject.opacity;
      (sphereRef.value as any).scale.set(fadeObject.scale, fadeObject.scale, fadeObject.scale)
    },
    onComplete: () => {
      // 切换纹理
      useTexture({
        map: rooms[porps.idx].map,
      }).then(res => {
        (sphereRef.value as any).material.map = res.map;
        (sphereRef.value as any).material.needsUpdate = true;

        (sphereRef.value as any).scale.set(1, 1, 1)

        gsap.to(fadeObject, {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            (sphereRef.value as any).material.opacity = fadeObject.opacity;
          }
        });
      });



    }
  });
}


watch(() => porps.idx, async () => {
  // pbrTexturePorxy.value = await useTexture({
  //   map: rooms[porps.idx].map,
  // });

  gsapAnimateCameaNext()
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
