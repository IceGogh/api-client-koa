<template>
  <div id="side-bar">
    <h4>Module</h4>
    <ul>
      <li
        v-for="(item, key) in $api.moduleObj"
        :key="key"
        class="disable-select"
        :class="$api.selectMo === key ? 'selectMo' : ''"
        @click="switchMo(key)"
      >{{key}}</li>
    </ul>
  </div>
</template>

<script>
import E from '~/api/emiter'
export default {
  inject: ['$api'],
  methods: {
    switchMo(m) {
      if (m === this.$api.selectMo) {
        return false
      }
      E.$emit('changeMo')
      this.$parent.changeMo(m)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/base.scss';
#side-bar {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  float: left;
  width: $sideBarWt;
  height: 100vh;
  background: linear-gradient(
    to right,
    rgb(22, 22, 22) 0%,
    rgb(56, 56, 56) 100%
  );
  > h4 {
    text-indent: 20px;
    color: #fff;
    height: 80px;
    line-height: 80px;
    font-style: italic;
    font-size: 30px;
  }
  ul {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    overflow-y: auto;
  }
  li {
    height: 44px;
    line-height: 44px;
    color: rgb(241, 236, 236);
    text-indent: 10px;
    font-size: 18px;
    border-left: 3px solid transparent;
    transition: .2s all;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      background: rgba(10, 10, 10, 0.3);
    }
    &.selectMo {
      color: $selectColor;
      border-color: rgb(255, 0, 212);
      background: rgba(10, 10, 10, 0.5);
    }
  }
}
</style>
