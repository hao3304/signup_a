<template>
  <div :class="b()"></div>
</template>

<script>
export default {
  name: "tab-nav"
};
</script>

<style lang="less" scoped>
.tab-nav {
  display: none;
  z-index: 100;
  width: 50px;
  background-color: #3f51b5 !important;
  border-color: #3f51b5 !important;
  color: #fff !important;
  box-shadow: rgba(0, 0, 0, 0.12) 0 0.05rem 0.3rem,
    rgba(0, 0, 0, 0.15) 0 0.05rem 0.2rem;
}
</style>
