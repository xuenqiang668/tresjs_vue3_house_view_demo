<script setup lang="ts">
import { shallowRef } from 'vue';

import {
  KeyboardControls,
  OrbitControls,
} from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';

import TexturedBall from './components/HelloWorld.vue';

const isOrbit = shallowRef(true)
const model = () => {
  isOrbit.value = !isOrbit.value
}

const idx = shallowRef(0)

const checkedIdx = (i) => {
  idx.value = i
}

</script>

<template>
  <div class="container">
    <button class="btn" @click="model">checked</button>
    <button class="btn btn1" @click="checkedIdx(0)">living</button>
    <button class="btn btn2" @click="checkedIdx(1)">bed</button>
    <button class="btn btn3" @click="checkedIdx(2)">study</button>
    <TresCanvas clear-color="#82DBC5" shadows alpha window-size power-preference="high-performance">
      <OrbitControls v-if="isOrbit" :target="[0, 0, 0]" />
      <KeyboardControls v-else :target="[0, 0, 0]"></KeyboardControls>
      <TresPerspectiveCamera :position="[0, 0, 2]" :fov="65" :aspect="1" :near="0.1" :far="1000" />
      <Suspense>
        <TexturedBall :idx="idx" />
      </Suspense>
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>
</template>

<style scope>
.container {
  position: relative;
}

.btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999
}

.btn1 {
  left: 200px
}

.btn2 {
  left: 300px
}

.btn3 {
  left: 400px
}
</style>