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
                    <img class="cover-img" src="/static/images/folder.jpg">
                </router-link>
                    <div class="title-box">
                        <div class="title" v-text="item.docTitle"></div>
                        <div class="title" v-text="item.docTitle"></div>
                     
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
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
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
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
              
              
           
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
            <el-form-item v-if="!isNotImg" label="商圈图片">
                    <upload-file :path="zone.zoneCover"
                            :is-operate="isEdit"
                            :bg-path="false"
                            :id-name="'itemCover' + fileType"
                            @changeImg="changeImg"></upload-file>
            </el-form-item>
            
            
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isEditTradingArea = false">取 消</el-button>
                <el-button type="primary" @click="saveTradingArea">保 存</el-button>
          </div>
        </el-dialog>

        
        
    </div>
</div>
</template>
<script>
import $ from 'Jquery'
import sortable from 'sortablejs'
import uploadFile from '../../../components/common/uploadFile.vue'
import uploadMedia from '../../../components/common/uploadMedia.vue'
import swiperImg from '../../../components/common/swiper-img.vue'
import util from '../../../assets/common/util'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['fileType'],
    data() {
        return {
            dirDatas: [],
            sourceDatas: [],
            isCheck: false,
            showType: '1',
            isAddDir: false,
            addDirForm: {
                docType: '1',
                docTitle: '',
                docCover: '',
                docDesc: '',
                fileCode: '',
                docFolder: ''
            },
            isNotImg: false,
            isAddItem: false,
            isAddCity:false,
            isEditTradingArea:false,
            cityData: [],
            cityList: [],
            postList: [],
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
                cityCname:''
            },
            zoneTitle:'',
            zoneList:[],
            tradingAreaTypes:[],
            zonePageNumber: 1,
            zonePageSize: 15,
            zoneTotal: 0,
            items:[],
            fileName: '',
            addItemForm: {
                docType: '',
                docTitle: '',
                fileCode: '',
                docDesc: '',
                docCover: '',
                docFolder: ''
            },
            sourseTypes: [
                {
                    label: '图片',
                    value: '2'
                },
                {
                    label: '媒体',
                    value: '3'
                }
            ],
            checkedLabels: [],
            isselectVisible: false,
            nowDir: {},
            // 选中的图片
            selectDirList: [],
            selectItemList: [],
            bigImgs: [],
            dirPageNumber: 1,
            dirPageSize: 15,
            dirTotal: 0,
            itemPageNumber: 1,
            itemPageSize: 15,
            itemTotal: 0,
            isShow: {
              value: false
            },
            index: 0
        }
    },
    mounted () {
        if (this.$route.query.docCode) {
            this.showType = '2'
            this.getItems(this.$route.query.docCode)
        }

        this.getDirs()
        this.getCitys ()
        this.tradingAreaType()
        // this.getZoneList()
        
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            selectCity: 'getSelectCity',
            haveCityList:'getCityList'
        }),
        isEdit () {
          return this.userInfo.roleCodes.indexOf('platform_root') > -1 || this.userInfo.roleCodes.indexOf('platform_material_admin') > -1
        }
    },
    watch: {
       selectCity () {
        //    this.getZoneList()
       } 
    },
    methods: {
        ...mapActions([
            'setCityList'
       ]),
        setCheck () {
            this.isCheck = !this.isCheck
            this.selectDirList = []
            this.selectItemList = []
        },
        addDir () {
            this.addDirForm = {
                docType: '1',
                docTitle: '',
                docCover: '',
                docDesc: '',
                fileCode: '',
                docFolder: this.fileType
            }

            this.isAddDir = true
        },
        addItem () {
            this.isNotImg = false
            this.addItemForm = {
                docType: '',
                docTitle: '',
                fileCode: '',
                docDesc: '',
                docCover: '',
                docFolder: this.nowDir.docCode
            }

            this.isAddItem = true
        },
        addCity(){
            this.isNotImg = false
           
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
                this.postList = []
                return false
            }

            // 省份切换，城市变空
            this.base.cityCname = ''

            for (var i = 0, len = this.cityData.length; i < len; i++) {
                if (this.cityData[i].province == this.base.provinceName) {
                    this.cityList = this.cityData[i].citys
                    this.postList = this.cityData[i].posts
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
        this.isEditTradingArea = true
         
        },
        editTradingArea(){      // 商圈编辑
           this.zoneTitle = '编辑商圈'
           this.isEditTradingArea = true
        },
        saveTradingArea(){      // 商圈保存
           
           this.zone.cityCode = this.selectCity.code
           console.log(this.selectCity.code)
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
                } else {
                    this.$message.error(res.result.message)
                }
            }) 
           this.isEditTradingArea = false
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
                method: 'post',
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
        editDir (item) {
            this.addDirForm = Object.assign({}, item)
            this.isAddDir = true
        },
        editItem (item) {
            this.isNotImg = true
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeDirImg (data) {
            this.addDirForm.docCover = data.url
        },
        changeImg (data) {
            this.addItemForm.fileCode = data.url
        },
        changeImg(data){
            this.zone.zoneCover = data.url
        },
        coverChange (data) {
            this.addItemForm.docCover = data.url
        },
        confirmDir () {
            if (!this.addDirForm.docTitle) {
                this.$message({
                    message: '请填写目录名称！',
                    type: 'warning'
                })
                return false
            }

            // if (!this.addDirForm.docCover) {
            //     this.$message({
            //         message: '请添加目录封面！',
            //         type: 'warning'
            //     })
            //     return false
            // }
            if (this.fileType == 'e2_4') {
                this.addDirForm.remark = '1'
            }

            this.addDirForm.enterpriseCode = this.$route.query.enterpriseCode

            if (this.addDirForm.docCode) {
                this.updateDir()
            } else {
                this.insterDir()
            }
        },
        confirmItem () {
            if (!this.addItemForm.docTitle) {
                this.$message({
                    message: '请填写图片标题！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.fileCode) {
                this.$message({
                    message: '请添加图片封面！',
                    type: 'warning'
                })
                return false
            }

            if (this.fileType == 'e2_4') {
                this.addItemForm.remark = '1'
            }

            this.addItemForm.enterpriseCode = this.$route.query.enterpriseCode

            if (this.addItemForm.docCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        },
        selectDir (item) {
            var index = this.selectDirList.indexOf(item.docCode)
            if (index > -1) {
                this.selectDirList.splice(index, 1)
            } else {
                this.selectDirList.push(item.docCode)
            }
        },
        selectItem (item) {
            var index = this.selectItemList.indexOf(item.docCode)
            if (index > -1) {
                this.selectItemList.splice(index, 1)
            } else {
                this.selectItemList.push(item.docCode)
            }
        },
        showBigImg (item, index) {
            if (this.isCheck) {
                this.selectItem(item)
                return false
            }

            this.index = index
            this.isShow.value = true
        },
        showMedia (item) {
            if (this.isCheck) {
                this.selectItem(item)
            } else {
                window.open (item.fileCode, '_blank')
            }
        },
        showItems (item) {
            if (this.isCheck) {
                this.selectDir(item)
                return false
            }

            this.isCheck = false
            this.showType = '2'
            this.nowDir = item
            this.getItems()
        },
        showDir () {
            this.isCheck = false
            this.showType = '1'
        },
        itemPageChange (size) {
            this.itemPageNumber = size
            this.getItems()
        },
        getItems (docCode) {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    docFolder: docCode ? docCode : this.nowDir.docCode,
                    pageNumber: this.itemPageNumber,
                    pageSize: this.itemPageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.bigImgs = []
                    var arrs = []
                    this.itemTotal = Number(res.result.total)
                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                        arrs.push(item.fileCode)
                    })

                    this.bigImgs = arrs

                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        insterItem () {
            util.request({
                method: 'post',
                interface: 'materialFolderInsert',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.itemPageNumber = 1
                    this.getItems()
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateItem () {
            util.request({
                method: 'post',
                interface: 'materialFolderUpdate',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteItems () {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: {
                    docType: '2',
                    docCodes: this.selectItemList
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        deleteItem (code) {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: {
                    docType: '2',
                    docCodes: [code]
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        zonePageChange (size) {
            this.dirPageNumber = size
            this.getDirs()
        },
        getDirs () {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    docFolder: this.fileType,
                    pageNumber: this.dirPageNumber,
                    pageSize: this.dirPageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.dirTotal = Number(res.result.total)

                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                    })

                    this.dirDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        insterDir () {
            util.request({
                method: 'post',
                interface: 'materialFolderInsert',
                data: this.addDirForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.dirPageNumber = 1
                    this.getDirs()
                    this.isAddDir = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateDir () {
            util.request({
                method: 'post',
                interface: 'materialFolderUpdate',
                data: this.addDirForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.getDirs()
                    this.isAddDir = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteDirs () {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: {
                    docType: '1',
                    docCodes: this.selectDirList
                }
            }).then(res => {
                if (res.result.success == '1') {
                    if (res.result.result.length) {
                        this.$message({
                            message: '部分目录下有文件存在，未能删除！',
                            type: 'warning'
                        })
                    }
                    this.getDirs()
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteDir (code) {
            util.request({
                method: 'post',
                interface: 'materialFolderDelete',
                data: {
                    docType: '1',
                    docCodes: [code]
                }
            }).then(res => {
                if (res.result.success == '1') {
                    if (res.result.result.length) {
                        this.$message({
                            message: '该目录下有文件存在，未能删除！',
                            type: 'warning'
                        })
                    }
                    this.getDirs()
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteOpt () {
            if (!this.isCheck) {
                return false
            }

            this.$confirm('确定执行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.showType == '1') {
                    this.deleteDirs()
                } else {
                    this.deleteItems()
                }
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })     
            })
        },
        setImport () {
            if (!this.isCheck || this.showType == '1') {
                return false
            }
            this.checkedLabels = []
            this.isselectVisible = true
        },
        selectConfirm () {
            this.removeItem()
        },
        removeItem () {
            util.request({
                method: 'post',
                interface: 'materialMove',
                data: {
                    files: this.selectItemList,
                    dirs: this.checkedLabels
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isselectVisible = false
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        copyItem () {
            util.request({
                method: 'post',
                interface: 'materialCopy',
                data: {
                    files: this.selectItemList,
                    dirs: this.checkedLabels
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isselectVisible = false
                    this.isCheck = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        }
    },
    components: {
        uploadFile,
        uploadMedia,
        swiperImg
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
ol{
            
            white-space: nowrap;
        }
        ol li{
            padding: 10px 20px;
            display: inline-block;
            background:pink;
            white-space:nowrap;
        }
.el-tabs__content {
    overflow: visible;
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
            height: 50px;
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