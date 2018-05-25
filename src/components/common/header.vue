<template>
  <section>
    <section class="header-web">
      <router-link class="logo-box" :to="{name: 'zone-list'}"><img src="../../assets/images/logo.png"></router-link>

      <div class="nav-box">
        <router-link  :to="{
                        name: 'zone-list'
                      }"
                      v-if="isRoot || isProperty">
          物业资产
        </router-link>
        <router-link  :to="{
                        name: 'exchange-list'
                      }"
                      v-if="isRoot || isAssets">
          资管产品
        </router-link>
        <router-link :to="{ name: 'enterprise'}"
                      v-if="isRoot || isEnterprise">
          企业信息
        </router-link>
      </div>

      <div class="member-box">
        <el-dropdown>
          <span class="el-dropdown-link">
            您好
            <span>{{userInfo.userCnName}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="logout">
                <img src="../../assets/images/logout.png">
                退出登录
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="select-city-box"
            v-if="selectCity.cityName && $route.name === 'zone-list'">
        <span @click="addCity">
          {{selectCity.cityName}}
          &nbsp;<i class="el-icon-caret-bottom"></i>
        </span>
        <div class="city-drop-box" v-if="cityList.length">
          <span :class="selectCity.cityName == item.cityCname ? 'nowColor' : ''"
                @click="setCity(item)"
                v-for="(item, index) in cityList">
            {{item.cityCname}}
          </span>

          <div class="clear"></div>
          <el-pagination
              v-if="total"
              class="page-box"
              @current-change="pageChange"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total">
          </el-pagination>
        </div>
      </div>

      <div class="select-city-box"
            v-if="$route.query.cityName">
        <span>
          {{$route.query.cityName}}
          &nbsp;<i class="el-icon-caret-bottom"></i>
        </span>
      </div>

      <div class="select-city-box"
            v-if="selectExchange.exchangeName && $route.name === 'securit-list'">
        <span>
          {{selectExchange.exchangeName}}
          &nbsp;<i class="el-icon-caret-bottom"></i>
        </span>
        <div class="city-drop-box">
          <span :class="selectExchange.exchangeName == item.exchangeName ? 'nowColor' : ''"
                @click="setExchange(item)"
                v-for="(item, index) in exchangeList">
            {{item.exchangeName}}
          </span>

          <div class="clear"></div>
          <el-pagination
              v-if="totalE"
              class="page-box"
              @current-change="pageEChange"
              layout="prev, pager, next"
              :page-size="pageESize"
              :total="totalE">
          </el-pagination>
        </div>
      </div>
    </section>

    <el-dialog title="新增城市" :visible.sync="isAddCity">
      <el-form :label-position="'left'" label-width="80px">
          <el-form-item label="省份">
            <el-select v-model="cityBase.provinceName"
                        class="input-box"
                        @change="provinceChange"
                        filterable
                        placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in cityData"
                  :key="index"
                  :label="item.province"
                  :value="item.province">
                </el-option>
            </el-select>         
        </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="cityBase.cityCname"
                        class="input-box"
                        filterable
                        placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in citys"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="拼音简称">
            <el-input
                type="text"
                @change="checkFont"
                v-model="cityBase.cityEname">
            </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="isAddCity = false">取 消</el-button>
            <el-button type="primary" @click="saveCity">保 存</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import util from '../../assets/common/util'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      roleCodes: [],
      isAddCity:false,
      cityData: [],
      citys: [],
      cityBase: {
          cityCname:'',
          provinceName:'',
          cityEname:''
      },
      pageNumber: 1,
      pageSize: 20,
      total: 0,
      exchangeList: [],
      pageENumber: 1,
      pageESize: 20,
      totalE: 0
    }
  },
  created () {
    this.getUserInfo()
    this.haveCitys()
    this.getCitys()

    if (this.$route.name === 'securit-list') {
      this.getExchangeList()
    }
  },
  watch: {
    $route () {
      if (this.$route.name === 'securit-list') {
        this.getExchangeList()
      } else {
        return false
      }
    }
  },
  computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
        selectCity: 'getSelectCity',
        cityList:'getCityList',
        selectExchange: 'getSelectExchange',
      }),
      isRoot () {
        return this.roleCodes.indexOf('platform_root') > -1
      },
      isAssets () {
        return this.roleCodes.indexOf('platform_assets') > -1
      },
      isProperty () {
        return this.roleCodes.indexOf('platform_property') > -1
      },
      isEnterprise () {
        return this.roleCodes.indexOf('platform_enterprise') > -1
      }
  },
  methods: {
    ...mapActions([
      'setUserInfo',
      'setSelectCity',
      'setCityList',
      'setSelectExchange'
    ]),
    checkFont (value) {

      if (/[^a-zA-Z]+/.test(value)) {
        setTimeout(() => {
          this.cityBase.cityEname = value.replace(/[^a-zA-Z]+/, '')
        }, 0)
      }
    },
    getExchangeList () {
        var formData = {
            pageSize: this.pageESize,
            pageNumber: this.pageENumber
        }

        util.request({
            method: 'get',
            interface: 'exchangeInfoList',
            data: formData
        }).then(res => {
            if (res.result.success == '1') {
                this.totalE = Number(res.result.total)
                this.exchangeList = res.result.result
            } else {
                this.$message.error(res.result.message)
            }
        })
    },
    pageEChange (size) {
        this.pageENumber = size
        this.getExchangeList()
    },
    setExchange (exchange) {
      this.setSelectExchange({
        exchangeName: exchange.exchangeName,
        exchangeCode: exchange.exchangeCode
      })
    },
    setCity (city) {
      this.setSelectCity({
        cityName: city.cityCname,
        cityCode: city.cityCode
      })
    },
    pageChange (size) {
        this.pageNumber = size
        this.haveCitys()
    },
    // 当前已有的城市
    haveCitys(){
      util.request({
          method: 'get',
          interface: 'haveCity',
          data: {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }
      }).then(res => {
          if (res.result.success == '1') {
            var datas = res.result.result
            this.total = Number(res.result.total)
            this.setCityList(datas.length ? datas : [])

            console.log(this.selectCity, 'selectCity')

            // 没有城市定位全国
            if (datas.length) {
              // 有定位选定为，没定位有北京选北京，没北京，选第一个
              for (var i = 0, len = datas.length; i < len; i++) {
                  if (datas[i].cityCname.indexOf(this.selectCity.cityName) > -1) {
                      this.setSelectCity({
                        cityName: datas[i].cityCname,
                        cityCode: datas[i].cityCode
                      })
                      return
                      break
                  }

                  
              }

              for (var i = 0, len = datas.length; i < len; i++) {
                  if (datas[i].cityCname.indexOf('北京') > -1) {
                      this.setSelectCity({
                        cityName: datas[i].cityCname,
                        cityCode: datas[i].cityCode
                      })

                      return
                      break
                  }
              }

              this.setSelectCity({
                cityName: datas[0].cityCname,
                cityCode: datas[0].cityCode
              })
            } else {
              this.setSelectCity({
                cityName: '新增',
                cityCode: ''
              })
            }
          } else {
            this.$message.error(res.result.message)
          }
      })
    },
    addCity () {
      this.cityBase = {
          cityCname:'',
          provinceName:'',
          cityEname:''
      }

      this.isAddCity= true
    },
    getCitys () {
      util.request({
          method: 'get',
          interface: 'getCitys',
          data: {}
      }).then(res => {
          if (res.result.success == '1') {
              this.cityData = res.result.results
          } else {
              this.$message.error(res.result.message)
          }
      })
    },
    provinceChange () {
        if (!this.cityBase.provinceName) {
            this.cityList = []
            return false
        }

        // 省份切换，城市变空
        this.cityBase.cityCname = ''

        for (var i = 0, len = this.cityData.length; i < len; i++) {
            if (this.cityData[i].province == this.cityBase.provinceName) {
                this.citys = this.cityData[i].citys
                break
            }
        }
    },
    // 新增城市
    saveCity () {
        if (!this.cityBase.provinceName) {
            this.$message({
                message: '请选择省份！',
                type: 'warning'
            })
            return false
        }
        if (!this.cityBase.cityCname) {
            this.$message({
                message: '请选择城市名称！',
                type: 'warning'
            })
            return false
        }
        if (!this.cityBase.cityEname) {
            this.$message({
                message: '请输入城市拼音简称！',
                type: 'warning'
            })
            return false
        }

        util.request({
            method: 'post',
            interface: 'saveCity',
            data: this.cityBase
        }).then(res => {
            if (res.result.success == '1') {
                this.$message({
                    message: '恭喜你，保存成功！',
                    type: 'success'
                })
                this.isAddCity = false

                this.setSelectCity({
                  cityName: this.cityBase.cityCname,
                  cityCode: ''
                })

                this.haveCitys()
            } else {
                this.$message.error(res.result.message)
            }
        })    
    },
    getUserInfo () {
      util.request({
        method: 'get',
        interface: 'getUserInfo',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          if (res.result.result.enterpriseCode) {
            var roleCodes = []
            res.result.result.roleDefs.forEach((item) => {
                roleCodes.push(item.roleCode)
            })

            this.roleCodes = roleCodes

            res.result.result.roleCodes = roleCodes.concat([])
            // 是否注册企业
            this.setUserInfo(res.result.result)
            this.$emit('loadPage', '1')
          } else {
            this.$emit('loadPage', '0')
          }
        } else {
          this.$message.error(res.result.message)
        }
      })
    },
    logout () {
      util.request({
        method: 'post',
        interface: 'logout',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          this.$router.replace({name: 'login'})
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .el-dropdown-menu__item {
    font-size: 14px;

    img {
      float: left;
      width: 16px;
      height: 16px;
      margin: 10px 10px 0 2px;
    }

    div {
      line-height: 36px;
      overflow: hidden;
    }
  }

  .el-dropdown-menu {
    min-width: 120px;
  }

  .el-dropdown-link {
    color: #ffffff;
    cursor: pointer;
  }

  .header-web {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #000000;
    color: #fff;
    padding: 0 20px;
    z-index: 2000;
    box-sizing: border-box;

    .logo-box {
      float: left;
      margin-top: 10px;
      margin-right: 26px;

      img {
        height: 30px;
      }
    }

    .nav-box {
      float: left;

      a {
        display: inline-block;
        font-size: 13px;
        color: #A4A4A4;
        line-height: 50px;
        margin-right: 30px;

        &:hover {
          color: #ffffff;
        }
      }

      .router-link-active {
        color: #ffffff;
      }
    }

    .select-city-box {
      float: right;
      margin-left: 20px;
      font-size: 14px;
      color: #4db3ff;
      cursor: pointer;

      .city-drop-box {
        display: none;
        max-width: 600px;
        min-width: 300px;
        position: fixed;
        top: 50px;
        right: 0;
        background: #ffffff;
        padding: 15px 15px 0;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.12);

        span {
          float: left;
          cursor: pointer;
          color: #000000;
          line-height: 30px;
          margin-right: 10px;

          &:hover {
            color: #4db3ff;
          }
        }

        .nowColor {
          color: #4db3ff;
        }
      }

      &:hover {
        .city-drop-box {
          display: block;
        }
      }
    }

    .member-box {
      float: right;
      margin-left: 20px;

      .member-show-message {
        font-size: 14px;
        line-height: 50px;
        color: #A4A4A4;
        cursor: pointer;
      }

      .img-box {
        float: left;
        width: 24px;
        height: 24px;
        margin: 13px 20px 0 0;
        border-radius: 50%;
        overflow: hidden;
        line-height: 0;
        background: url(../../assets/images/head-icon.png) left top no-repeat;
        background-size: 100% auto;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
        }
      }
    }


    .line-box {
      float: right;
      width: 1px;
      height: 20px;
      margin: 15px 0;
      background: #555555;
    }
  }
</style>

