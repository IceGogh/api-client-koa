<template>
  <div id="second-bar">
    <h5>Controller</h5>
    <ul>
      <li
        v-for="item in $api.moduleObj[$api.selectMo]"
        :key="item.value"
        :class="$api.selectController === item.value ? 'selectController' : ''"
      >
        <div class="cont-li" @click="switchController(item.value)">
          <i
            class="ns-font"
            :class="$api.selectController === item.value ? 'ns-item-open' : 'ns-item-pending'"
          ></i>
          <span>{{item.name}}</span>
        </div>
        <ol :class="$api.selectController === item.value ? 'htAuto' : 'ht0'">
          <li
            v-for="(cmd,index) in $api.cmdList"
            :key="cmd.value"
            @click="queryCmd(cmd.value, index)"
            :class="selectCmd === cmd.value ? 'selectCmd' : ''"
          >
            <i class="ns-font ns-gou" :class="selectCmd === cmd.value ? '' : 'opacity0'"></i>
            <span>{{cmd.name ? cmd.name : '[未命名]'}}</span>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
import E from '~/api/emiter'
export default {
  inject: ['$api'],
  data() {
    return {
      selectCmd: ''
    }
  },
  methods: {
    switchController(c) {
      if (c === this.$api.selectController) {
        this.$parent.changeController('')
      } else {
        this.$parent.changeController(c)
      }
    },
    queryCmd(api, i) {
      this.selectCmd = api
      E.$emit('queryCmd', api)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/base.scss';
#second-bar {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  float: left;
  width: $secondBarWt;
  height: 100vh;
  background: linear-gradient(
    to right,
    rgb(129, 128, 128) 0%,
    rgb(175, 167, 167) 100%
  );
  > h5 {
    text-align: center;
    color: #fff;
    height: 80px;
    line-height: 80px;
    font-style: italic;
    font-size: 24px;
  }
  ul {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    overflow-y: auto;
    $liHt: 36px;
    > li {
      position: relative;
      min-height: $liHt;
      line-height: $liHt;
      color: rgb(241, 236, 236);
      background: rgba(241, 240, 254, 0.1);
      cursor: pointer;
      &:hover {
        background: rgba(78, 75, 75, 0.1);
      }
      &.selectController {
        background: rgba(44, 43, 43, 0.4);
        .cont-li span {
          color: $selectColor;
        }
      }
      .cont-li {
        height: $liHt;
        > i {
          position: absolute;
          width: $liHt;
          height: $liHt;
          line-height: $liHt;
          text-align: center;
          font-size: 12px;
          color: #fff;
        }
        > span {
          display: block;
          margin-left: $liHt;
          height: $liHt;
          line-height: $liHt;
        }
      }
    }
    ol {
      transition: 0.3s all;
      overflow: hidden;
      &.ht0 {
        height: 0;
      }
      &.htAuto {
        height: auto;
      }
      li {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-style: 'oblique';
        overflow: hidden;
        text-overflow: ellipsis;
        i {
          display: block;
          width: 30px;
          height: 30px;
          float: left;
          font-size: 12px;
          margin-left: 12px;
        }
        span {
          width: 152px;
          display: block;
          height: 30px;
          line-height: 30px;
          float: left;
        }
        &.selectCmd {
          color: rgb(205, 202, 50);
        }
      }
    }
  }
}
</style>
