<template>
<div class="source-box">
    <div class="image-su-box">
        <!-- 控制操作 -->
        <section class="btns-op">
            <div class="up-box">
                <img  @click="addCity" src="../../../assets/images/add-icon.png" title="新增城市">
            </div>
            <span></span>
            <div class="up-box">
                <img  @click="addTradingArea" src="../../../assets/images/add-icon.png" title="新增商圈">
             </div>
        </section>
        
        <!-- 商圈列表 -->
        <div class="clear"></div>
        <template>
            <section v-for="(item, index) in zoneList"
                        v-if="zoneList.length"
                        class="check-box">
                
                <section class="sou-box">
                <router-link class="cover-box"
                             target="_blank"
                             :to="{
                                name: 'propertyAssetsSource',
                                query: {
                                    enterpriseCode: item.enterpriseCode
                                }
                             }">
                        <img class="cover-img" :src="item.zoneCover">
                </router-link>
                    <div class="title-box">
                        <div class="title" v-text="item.zoneName"></div>
                        <div class="title" v-text="item.zoneTypeName"></div>
                        <div class="time">
                            <span class="btn-box">
                                <i @click.stop="editTradingArea(item)" class="el-icon-document"></i>
                            </span>

                            <span class="btn-box">
                                <i @click.stop="delTradingArea(item.zoneCode)" class="el-icon-delete2"></i>
                            </span>
                        </div>
                    </div>
                </section>
            </section>
            <section v-if="!zoneList.length" class="no-img">
                当前暂无商圈，请添加商圈！！！
            </section>
            <div class="clear"></div>
            <el-pagination
                v-if="zoneTotal"
                class="page-box"
                @current-change="zonePageChange"
                layout="prev, pager, next"
                :page-size="zonePageSize"
                :total="zoneTotal">
            </el-pagination>
        </template>
        
        
        

        <!-- 新增城市-->
        <el-dialog title="新增城市" :visible.sync="isAddCity">
          <el-form :label-position="'left'" label-width="80px">
              <el-form-item label="省份">
                <el-select v-model="base.provinceName"
                                    class="input-box"
                                    @change="provinceChange"
                                    filterable placeholder="请选择">
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
                <el-select v-model="base.cityCname"
                                    class="input-box"
                                    filterable placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                              v-for="(item, index) in cityList"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>
                        
            </el-form-item>
           
           <el-form-item label="城市拼音简称">
                <el-input
                    type="text"
                    v-model="base.cityEname">
                </el-input>
            </el-form-item>
            
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddCity = false">取 消</el-button>
                <el-button type="primary" @click="saveCity">保 存</el-button>
          </div>
        </el-dialog>

         <el-dialog :title="zoneTitle" :visible.sync="isEditTradingArea">
          <el-form :label-position="'left'" label-width="80px">
              
              
           
           <el-form-item label="商圈名称">
                <el-input
                    type="text"
                    v-model="zone.zoneName">
                </el-input>
            </el-form-item>
            <el-form-item label="商圈类型">
                <el-select v-model="zone.zoneType"
                                    class="input-box"
                                    @change="provinceChange"
                                    filterable placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                              v-for="(item, index) in tradingAreaTypes"
                              :key="index"
                              :label="item.dictKeyValue"
                              :value="item.dictKeyCode">
                            </el-option>
                        </el-select>
                        
            </el-form-item>
            <el-form-item label="商圈描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容,最多140个字"
                    :maxlength="140"
                    v-model="zone.zoneDesc">
                </el-input>
            </el-form-item>
            <el-form-item label="商圈图片">
                    <upload-file :path="zone.zoneCover"
                            :is-operate="isEdit"
                            :bg-path="false"
                            :id-name="zone.zoneCover"
                            @changeImg="changeImg"></upload-file>
            </el-form-item>
            
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isEditTradingArea = false">取 消</el-button>
                <el-button type="primary" @click="saveZone">保 存</el-button>
          </div>
        </el-dialog>

        
        
    </div>
</div>
</template>
<script>
import $ from 'Jquery'
import uploadFile from '../../../components/common/uploadFile.vue'
import util from '../../../assets/common/util'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            isAddCity:false,
            isEditTradingArea:false,
            cityData: [],
            cityList: [],
            base:{
                cityCname:'',
                provinceName:'',
                cityEname:''
            },
            zone:{
                zoneName:'',
                zoneType:'',
                zoneDesc:'',
                zoneCover:'',
                cityCname:'',
                zoneCode:'',
                cityCode:''
            },
            zoneTitle:'',
            zoneList:[],
            tradingAreaTypes:[],
            zonePageNumber: 1,
            zonePageSize: 15,
            zoneTotal: 0,
        }
    },
    mounted () {
        this.getCitys ()
        this.tradingAreaType()
        this.getZoneList()
        
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            selectCity: 'getSelectCity'
        }),
        isEdit () {
          return this.userInfo.roleCodes.indexOf('platform_root') > -1 || this.userInfo.roleCodes.indexOf('platform_material_admin') > -1
        }
    },
    watch: {
       selectCity () {
           this.getZoneList()
       } 
    },
    methods: {
        ...mapActions([
            'setCityList'
       ]),
        addCity(){
            this.isAddCity= true
            this.base.cityCname = ''
            this.base.provinceName = ''
            this.base.cityEname = ''
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
            if (!this.base.provinceName) {
                this.cityList = []
                return false
            }

            // 省份切换，城市变空
            this.base.cityCname = ''

            for (var i = 0, len = this.cityData.length; i < len; i++) {
                if (this.cityData[i].province == this.base.provinceName) {
                    this.cityList = this.cityData[i].citys
                    break
                }
            }
        },
        haveCitys(){     // 当前已有的城市
           util.request({
                method: 'post',
                interface: 'haveCity',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    
                    var list = []
                    res.result.result.forEach((item) => {
                      var jsonObj = {
                        name:item.cityCname,
                        code:item.cityCode
                      }
                      list.push(jsonObj)
                       
                    })
                    this.setCityList(list)
                } else {
                    this.$message.error(res.result.message)
                }
            })
    },
        saveCity(){          // 新增城市
            if (!this.base.provinceName) {
                this.$message({
                    message: '请选择省份！',
                    type: 'warning'
                })
                return false
            }
            if (!this.base.cityCname) {
                this.$message({
                    message: '请选择城市名称！',
                    type: 'warning'
                })
                return false
            }
            if (!this.base.cityEname) {
                this.$message({
                    message: '请输入城市拼音简称！',
                    type: 'warning'
                })
                return false
            }

            util.request({
                method: 'post',
                interface: 'saveCity',
                data: this.base
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                        message: '恭喜你，保存成功！',
                        type: 'success'
                    })
                    this.haveCitys()
                } else {
                    this.$message.error(res.result.message)
                }
                this.isAddCity = false
            })    
        },
        addTradingArea(){   // 新增商圈
        this.zoneTitle = '新增商圈'
        this.zone = {
                zoneName:'',
                zoneType:'',
                zoneDesc:'',
                zoneCover:'',
                cityCname:'',
                zoneCode:'',
                cityCode:''
            }
        this.isEditTradingArea = true
         
        },
        editTradingArea(item){      // 商圈编辑
           this.zoneTitle = '编辑商圈'
        this.zone.zoneName = item.zoneName
        this.zone.zoneType = item.zoneType
        this.zone.zoneDesc = item.zoneDesc
        this.zone.zoneCover = item.zoneCover
        this.zone.zoneCode = item.zoneCode
        this.zone.cityCode = item.cityCode
           this.isEditTradingArea = true

        },
        saveTradingArea(){      // 商圈保存
           this.zone.cityCode = this.selectCity.code
           if (!this.zone.cityCode) {
                this.$message({
                    message: '城市编码为空！',
                    type: 'warning'
                })
                return false
            }
            if (!this.zone.zoneName) {
                this.$message({
                    message: '请输入商圈名称！',
                    type: 'warning'
                })
                return false
            }
            if (!this.zone.zoneType) {
                this.$message({
                    message: '请选择商圈类型！',
                    type: 'warning'
                })
                return false
            }
            if (!this.zone.zoneCover) {
                this.$message({
                    message: '请上传商圈图片！',
                    type: 'warning'
                })
                return false
            }
           util.request({
                method: 'post',
                interface: 'saveCityzone',
                data: this.zone
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                        message: '恭喜你，保存成功！',
                        type: 'success'
                    })
                    this.getZoneList()
                } else {
                    this.$message.error(res.result.message)
                }
            }) 
           this.isEditTradingArea = false
        },
        delTradingArea(zoneCode){    // 商圈删除
          util.request({
                method: 'get',
                interface: 'cityZoneDel',
                data: {
                    zoneCode:zoneCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                   this.$message({
                        message: '恭喜你，删除成功！',
                        type: 'success'
                    })
                     this.getZoneList()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        upTradingArea(){       // 商圈编辑
        if (!this.zone.cityCode) {
                this.$message({
                    message: '城市编码为空！',
                    type: 'warning'
                })
                return false
            }
            if (!this.zone.zoneName) {
                this.$message({
                    message: '请输入商圈名称！',
                    type: 'warning'
                })
                return false
            }
            if (!this.zone.zoneType) {
                this.$message({
                    message: '请选择商圈类型！',
                    type: 'warning'
                })
                return false
            }
            if (!this.zone.zoneCover) {
                this.$message({
                    message: '请上传商圈图片！',
                    type: 'warning'
                })
                return false
            }
         util.request({
                method: 'get',
                interface: 'cityZoneUp',
                data: this.zone
            }).then(res => {
                if (res.result.success == '1') {
                   this.$message({
                        message: '恭喜你，更新成功！',
                        type: 'success'
                    })
                    this.getZoneList()
                } else {
                    this.$message.error(res.result.message)
                }
                this.isEditTradingArea = false
            })
        },
        saveZone(){
          if(this.zoneTitle == '新增商圈'){
              console.log('ko')
            this.saveTradingArea()
          }else if(this.zoneTitle == '编辑商圈'){
              console.log('ko2')
             this.upTradingArea()
          }
        },
        tradingAreaType(){          // 获取商圈类型
            util.request({
                method: 'get',
                interface: 'findDictionaryByType',
                data: {
                    typeCode:'zone_type'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.tradingAreaTypes = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            }) 
        },
        zonePageChange (size) {
            this.zonePageNumber = size
            this.getZoneList()
        },
        getZoneList(){     // 获取商圈列表
          util.request({
                method: 'get',
                interface: 'cityZoneList',
                data: {
                    cityCode:this.selectCity.code,
                    pageSize:this.zonePageSize,
                    pageNumber:this.zonePageNumber
                }
            }).then(res => {
                if (res.result.success == '1') {
                 this.zoneList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            }) 
        },
        changeImg(data){
            this.zone.zoneCover = data.url
        },
    },
    components: {
        uploadFile
    }
}
</script>
<style lang="scss">
.source-box {
    position: relative;
    width: 1020px;
    min-height: 500px;
    margin: 80px auto 40px;

    .el-dialog--small {
        width: 490px;
    }

    .el-dialog__body {
        padding: 20px 20px 0 20px;

        .el-form-item {
            margin-bottom: 10px;
        }
    }

    .set-btn {
        position: absolute;
        right: 8px;
        top: 7px;
        width: 72px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        color: #20A0FF;
        border: 1px solid #20A0FF;
        border-radius: 3px;
        cursor: pointer;
        z-index: 1997;

        &:hover {
            opacity: 0.8;
        }
    }

    .btns-op {
        position: fixed;
        right: 10px;
        top: 160px;
        width: 43px;
        border: 1px solid #D3DCE6;
        border-radius: 3px;
        background: #F8FBFF;
        box-sizing: border-box;
        padding: 0 5px;
        text-align: center;
        line-height: 0;

        img {
            display: inline-block;
            margin: 13px 0;
            cursor: pointer;
            padding: 0 5px;

            &:hover {
                opacity: 0.7;
            }
        }

        .up-box {
            position: relative;
            height: 27px;

            img {
                display: block;
                width: 14px;
                height: 14px;
                margin: 13px auto;
                padding: 0;
            }

            input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 27px;
                opacity: 0.01;
            }
        }

        .disable {
            opacity: 0.5;
            cursor: no-drop;
        }

        span {
            display: block;
            height: 1px;
            background: #D3DCE6;
        }
    }

    .dia-s-body {
        overflow: hidden;

        .el-checkbox {
            float: left;
            width: 145px;
            margin: 0 5px 20px 0;

            .el-checkbox__inner {
                margin-right: 7px;
            }
        }
    }

    .el-tabs__header {
        border: none;
    }

    .el-tabs__item {
        color: #000000;

        &:hover {
            color: #20A0FF;
        }
    }

    .is-active {
        color: #20A0FF;
    }

    .no-img {
        text-align: center;
        line-height: 160px;
        font-size: 20px;
        color: #999999;
    }
}

.image-su-box {
    position: relative;

    .page-box {
        margin-top: 10px;
    }

    .go-back {
        height: 30px;
        position: fixed;
        right: 10px;
        top: 100px;
        padding: 0 15px;
    }

    .check-box {
        position: relative;
        float: left;
        width: 170px;
        margin-right: 20px;
        margin-bottom: 20px;

        .select-box {
            position: absolute;
            left: 15px;
            top: 15px;
            width: 16px;
            height: 16px;
            cursor: pointer;
            background: url(../../../assets/images/check-icon.png) center no-repeat;

            &.active {
                background: url(../../../assets/images/check-now.png) center no-repeat;
            }
        }
    }

    .sou-box {
        border: 1px solid #D3DCE6;
        border-radius: 3px;

        .cover-box {
            height: 130px;
            overflow: hidden;
            cursor: pointer;
            
            .cover-img {
                display: block;
                width: 100%;
                min-height: 130px;
            }
        }

        .media-play {
            position: relative;

            .bg-box {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 130px;
                background: #000000;
                opacity: 0.5;
            }

            .play-btn {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 80px;
                height: 80px;
                margin: -40px 0 0 -40px;
            }
        }

        .title-box {
            padding: 5px 10px;
            border-top: 1px solid #D3DCE6;
            height: 70px;
            box-sizing: border-box;
            
            .title {
                display: block;
                font-size: 14px;
                line-height: 20px;
                height: 20px;
                border: none;
                color: #000000;
            }

            .time {
                display: block;
                font-size: 12px;
                line-height: 20px;
                color: #999999;
            }

            .btn-box {
               float: right;
               font-size: 14px;
               color: #333333;
               margin-left: 5px;

               i, label {
                    cursor: pointer;
               }
            }
        }
    }
}
</style>