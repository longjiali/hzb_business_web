<template>
  <div>
    <div class="data-collection">
      <template>
        <slot name='collectionTitle'></slot>
      </template>
      <transition name="draw">
        <div class='data-collection-item' v-show='boxSata'>
          <slot name='collectionCentent'></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boxSata: {
      type: Boolean,
      default: false
    }
  }
};
</script>