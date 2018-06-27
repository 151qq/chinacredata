<template>
  <div class="input-out-search" @click.stop="showModel">
    <div class="input-in">
      <div class="title-input-box">
        <el-input 
          placeholder="请输入内容"
          :disabled="!!disabled"
          v-model="searchData[mName]"
          class="title-input"
          @change="getMess"
          >
        </el-input>
      </div>
      <div class="mess-box" v-show="messDate.length !== 0 && isShow">
        <a v-for="item in messDate" class="nav-r" @click.stop="setSelect(item)">{{ item[sName] }}</a>
      </div>
    </div>

    <router-link class="nav-btn el-icon-information"
                    v-if="searchData[mCode] && sName == 'enterpriseNameReg'"
                    target="_blank"
                    :to="{
                      name: 'enterprise-info',
                      query: {
                        enterpriseCode: searchData[mCode]
                      }
                    }"></router-link>

    <a class="nav-btn el-icon-information"
                    v-if="searchData[mCode] && sName == 'officeName'"
                    target="_blank"
                    :href="domainFont + 'propertyAssets/officeDetail?officeCode=' + searchData[mCode]"></a>
    
    <a class="nav-btn el-icon-information"
                    v-if="searchData[mCode] && sName == 'mallName'"
                    target="_blank"
                    :href="domainFont + 'propertyAssets/mallDetail?mallCode=' + searchData[mCode]"></a>

    <span  class="nav-btn nav-disabled el-icon-information"
                    v-if="!searchData[mCode]"></span>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util'

export default {
  props: ['disabled','searchData', 'mCode', 'mName', 'mType', 'sCode', 'sName', 'sType', 'fetchSuggestions'],
  data () {
    return {
      domainFont: 'http://enterprisedev.chinacredata.com/',
      isShow: false,
      messDate: []
    }
  },
  created () {
    var _self = this
    $('body').click(function () {
      _self.messDate = []
      _self.isShow = false
    })
  },
  methods: {
    getMess (value) {
      if (value === '') {
        this.messDate = []
        this.searchData[this.mCode] = ''
        return false
      }
      this.fetchSuggestions(value, (datas) => {
        this.messDate = datas
      })
    },
    showModel () {
      this.isShow = true
    },
    hideMess (e) {
      this.isShow = false
    },
    setSelect (item) {
      if (this.mCode) {
          this.searchData[this.mCode] = item[this.sCode]
      }
      if (this.mName) {
          this.searchData[this.mName] = item[this.sName]
      }
      if (this.mType) {
          this.searchData[this.mType] = item[this.sType]
      }
      this.isShow = false
    }
  }
}
</script>
<style lang="scss">
.input-out-search {
  width: 100%;
  display: flex;

  .input-in {
    flex: 1;
    position: relative;

    .title-input-box {
      .title-input {
        width: 100%;

        input {
            width: 100%;
            height: 30px;
        }
      }
    }

    .mess-box {
      position: absolute;
      left: 0;
      top: 30px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 3px;
      padding: 5px 0;
      border: 1px solid #C0CCDA;
      text-align: left;
      background: #ffffff;
      z-index: 10;
      
      .nav-r {
        display: block;
        padding: 0 10px;
        font-size: 14px;
        line-height: 24px;
        color: #333333;
        cursor: pointer;

        &:hover {
          background: #C0CCDA;
        }
      }
    }
  }

  .nav-btn {
      width: 30px;
      font-size: 18px;
      line-height: 30px;
      text-align: right;
      color: #333333;
  }

  .nav-disabled {
      color: #999999;
  }
}
</style>