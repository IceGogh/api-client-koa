<template>
  <div id="params">
    <a-spin :spinning="requestStatus" tip="Requesting...">
      <div class="url-area">
        <div class="method">
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="GET">GET</a-menu-item>
              <a-menu-item key="POST">POST</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              {{methodType}}
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <input type="text" v-model="queryUrl" />
        <div class="send" @click="sendFn">
          <span>
            <a-button type="primary" :loading="requestStatus">发送</a-button>
          </span>
        </div>
      </div>
      <div class="option-area">
        <div class="title">
          <span
            :class="{selected: headerSelectStatus }"
            @click="selectOpt('headerSelectStatus')"
          >Header</span>
          <span :class="{selected: bodySelectStatus }" @click="selectOpt('bodySelectStatus')">Body</span>
          <div class="add-btn">
            <span v-if="headerSelectStatus" @click="addOpt('headersArr')">Add Header</span>
            <span v-if="bodySelectStatus" @click="addOpt('paramsArr')">Add Body</span>
          </div>
        </div>
        <div class="param">
          <template v-if="headerSelectStatus">
            <h4>header</h4>
            <div
              class="item clearfix"
              v-for="(item,key) in headersArr"
              :key="'h' + key"
              @mouseenter="hoverItemFn('h' + key)"
              @mouseleave="hoverItemFn('')"
            >
              <i class="ns-font ns-require-true" :class="{ opacity0: !item.require }"></i>
              <i class="ns-font ns-wenhao" @click="showName(item.comment)"></i>
              <span class="type">{{item.type}}</span>
              <div class="keyin">
                <span class="key">Key</span>
                <input type="text" v-model="item.name" />
                <span class="value">Value</span>
                <input type="text" v-model="item.default" />
              </div>
              <a-icon
                type="close"
                v-show="hoverStatus === ('h' + key)"
                @click="deleteItemFn(key, 'headersArr')"
              />
            </div>
          </template>
          <hr v-if="headerSelectStatus && bodySelectStatus" />
          <template v-if="bodySelectStatus">
            <h4>Body</h4>
            <div
              class="item clearfix"
              v-for="(item,key) in paramsArr"
              :key="'p' + key"
              @mouseenter="hoverItemFn('p' + key)"
              @mouseleave="hoverItemFn('')"
            >
              <i class="ns-font ns-require-true" :class="{ opacity0: !item.require }"></i>
              <i class="ns-font ns-wenhao" @click="showName(item.comment)"></i>
              <span class="type">{{item.type}}</span>
              <div class="keyin">
                <span class="key">Key</span>
                <input type="text" v-model="item.name" />
                <span class="value">Value</span>
                <input type="text" v-model="item.default" />
              </div>
              <a-icon
                type="close"
                v-show="hoverStatus === ('p' + key)"
                @click="deleteItemFn(key, 'paramsArr')"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="response-area">
        <div class="title">
          <span>Response</span>
        </div>
        <div class="response-data">
          <pre v-if="responseData">{{responseData}}</pre>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { rewrite_api } from '~/api/methods'
export default {
  data() {
    return {
      queryUrl: 'https://code.tiankele.cn/ajax.php',
      requestStatus: false,
      hoverStatus: '',
      methodType: 'POST',
      headerSelectStatus: true,
      bodySelectStatus: true,
      paramsArr: [
        {
          comment: '',
          default: 'im tiankele ~~~',
          name: 'name',
          require: false,
          type: 'string'
        }
      ],
      headersArr: [
        {
          comment: '',
          default: 'application/x-www-form-urlencoded',
          name: 'Content-Type',
          require: false,
          type: 'string'
        }
      ],
      responseData: ''
    }
  },
  beforeMount() {},
  watch: {
    api(v) {
      if (v) {
      }
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    clearFn() {
      this.paramsArr = []
      this.responseData = ''
    },
    hoverItemFn(e) {
      this.hoverStatus = e
    },
    deleteItemFn(e, key) {
      const arr = this[key]
      arr.splice(e, 1)
      this[key] = arr
    },
    handleMenuClick(e) {
      this.methodType = e['key']
    },
    addOpt(arr) {
      this[arr] = this[arr].concat([
        {
          comment: '',
          default: '',
          name: '',
          require: false,
          type: 'string'
        }
      ])
    },
    selectOpt(type) {
      this[type] = !this[type]
    },
    queryCmd(api) {},
    sendFn() {
      const headers = {}
      const params = {}
      this.requestStatus = true
      this.headersArr.forEach(e => {
        if (e['name']) {
          Object.assign(headers, {
            ['designX-' + e['name']]: e['default']
          })
        }
      })
      this.paramsArr.forEach(e => {
        if (e['name']) {
          Object.assign(params, {
            [e['name']]: e['default']
          })
        }
      })
      const d = JSON.stringify({
        headers,
        params
      })
      rewrite_api(this.queryUrl, d, this.methodType)
        .then(s => {
          this.requestStatus = false
          this.responseData = s
        })
        .catch(e => {
          this.requestStatus = false
        })
    },
    showName(message) {}
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/base.scss';
.ns-require-true {
  color: red;
}
.ns-wenhao {
  color: rgb(240, 240, 32);
}
#params {
  display: flex;
  flex-direction: column;
  width: calc(100% - 340px);
  height: 100vh;
  float: left;
  background: #fff;
  padding: 40px;
  overflow-y: auto;
  box-sizing: border-box;
  .ant-spin-container {
    > div {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 15px 0px rgba(194, 196, 237, 0.4);
      border-radius: 3px;
    }
    > .url-area {
      height: 40px;
      margin-bottom: 40px;
      .method {
        width: 100px;
        height: 40px;
        line-height: 40px;
        color: #cdca32;
        text-align: center;
        float: left;
      }
      input {
        display: block;
        float: left;
        width: calc(100% - 200px);
        height: 40px;
        line-height: 40px;
        color: #666;
        border: 0;
        text-indent: 10px;
      }
      .send {
        float: right;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        // background: #409eff;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        span {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 40px;
          line-height: 40px;
          button {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
    > .option-area {
      min-height: 240px;
      overflow-y: auto;
      margin-bottom: 40px;
      > .title {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 2px solid #f0f0f0;
        span {
          display: inline-block;
          padding: 0 12px;
          cursor: pointer;
        }
        .selected {
          color: rgb(240, 240, 32);
          font-weight: 500;
        }
        .add-btn {
          height: 40px;
          float: right;
        }
      }
      > .param {
        padding: 30px;
        .item {
          margin-bottom: 4px;
        }
        i {
          display: block;
          float: left;
          height: 30px;
          line-height: 30px;
          width: 20px;
        }
        .ns-wenhao {
          cursor: pointer;
        }
        .type {
          width: 50px;
          height: 30px;
          line-height: 30px;
          display: block;
          float: left;
          text-transform: capitalize;
          font-style: italic;
          color: #f47023;
        }
        .keyin {
          float: left;
          width: calc(100% - 110px);
          span,
          input {
            display: block;
            float: left;
            height: 30px;
            line-height: 30px;
          }
          span {
            text-align: right;
            width: 50px;
            color: #bdbdbd;
            margin-left: 10px;
          }
          input {
            margin-left: 10px;
            width: calc(50% - 105px);
            color: #666;
            text-indent: 10px;
            border: 1px solid rgb(206, 203, 203);
          }
        }
      }
    }
    > .response-area {
      > .title {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 2px solid #f0f0f0;
        span {
          display: inline-block;
          padding: 0 12px;
          font-size: 18px;
          font-weight: 600;
          color: rgba(189, 189, 189, 1);
        }
      }
      .response-data {
        min-height: 220px;
        overflow-y: auto;
      }
      pre {
        display: block;
        padding: 20px;
        color: #666;
        line-height: 20px;
        font-size: 14px;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
}
</style>
