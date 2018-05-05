<template>
    <div class="image-su-box">
        <!-- 控制操作 -->
        <section class="btns-op" v-if="true">
            <!-- 控制导出 -->
            <img :class="isCheck ? '' : 'disable'"
                src="../../../assets/images/import-icon.png"
                @click="setImport">
            <span></span>
            <!-- 控制增加 -->
            <div class="up-box">
                <img  @click="addItem" src="../../../assets/images/adds-icon.png">
            </div>
        </section>
        
        <!-- 目录 -->
        <div class="clear"></div>
        <!-- 内容 -->
        <template v-if="sourceDatas.length">
            <router-link v-for="(item, index) in sourceDatas"
                        class="check-box"
                        :to="{
                            name: "office-detail",
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                officeCode: item.officeCode
                            }
                        }">
                <section v-if="isCheck" @click.stop="selectItem(item)"
                            class="select-box"
                            :class="selectItemList.indexOf(item.officeCode) > -1 ? 'active' : ''"></section>
                
                <section class="sou-box">
                    <!-- 图片 -->
                    <div class="cover-box">
                        <img class="cover-img" :src="item.officeCover">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.officeName"></div>
                        <span class="time">
                            <span class="btn-box" v-if="true">
                                <i @click="editItem(item)" class="el-icon-document"></i>
                            </span>
                        </span>
                    </div>
                </section>
            </router-link>
        </template>
        <section v-if="!sourceDatas.length" class="no-img">
            暂无内容！！！
        </section>
        
        <div class="clear"></div>
        <el-pagination
            v-if="total"
            class="page-box"
            @current-change="pageChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
        <div class="clear"></div>

        <el-dialog title="资产" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <div class="map-show-box">
                <map-show :point-str="addItemForm.officeGps" :map-height="'140px'" ref="mapShow"></map-show>
            </div>
            <el-form-item label="物业检索">
                <search-box :city="selectCity.officeAddr" @mapChange="mapChange"></search-box>
            </el-form-item>
            <el-form-item label="物业简称">
                <el-input v-model="addItemForm.officeName"
                          placeholder="请输入内容,最多20个字"
                          :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="物业照片">
                <upload-file :path="addItemForm.officeCover"
                        :is-operate="true"
                        :bg-path="false"
                        :id-name="'itemCover' + fileType"
                        @changeImg="changeItem"></upload-file>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">保 存</el-button>
          </div>
        </el-dialog>

        <!-- 移动 -->
        <el-dialog title="移动" :visible.sync="isselectVisible">
            <section class="dia-s-body">
                <section v-for="(item, index) in zoneDatas" 
                        :index="index"
                        @click.stop="selectZone(item)"
                        class="select-item-box"
                        :class="checkedLabel == item.zoneCode ? 'active' : ''">
                    {{item.zoneName}}        
                </section>
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
          
            <div slot="footer" class="dialog-footer">
                <el-button @click="isselectVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import uploadFile from '../../../components/common/uploadFile.vue'
import searchBox from '../../../components/common/search-box.vue'
import mapShow from '../../../components/common/map-show.vue'
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'

export default {
    props: ['fileType'],
    data() {
        return {
            sourceDatas: [],
            isCheck: false,
            isAddItem: false,
            addItemForm: {
                zoneCode: '',
                officeAddr: '',
                officeGps: '',
                officeName: '',
                officeCover: ''
            },
            checkedLabels: [],
            isselectVisible: false,
            // 选中的图片
            selectItemList: [],
            pageNumber: 1,
            pageSize: 15,
            total: 0
        }
    },
    mounted () {
        this.getItems()
        this.getZones()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            selectCity: 'getSelectCity'
        })
    },
    methods: {
        setCheck () {
            this.isCheck = !this.isCheck
            this.selectItemList = []
        },
        addItem () {
            this.addItemForm = {
                zoneCode: this.$route.query.zoneCode,
                officeAddr: '',
                officeGps: '',
                officeName: '',
                officeCover: ''
            }

            this.$refs['mapShow'].drawMap()
            this.isAddItem = true
        },
        mapChange (mapInfo) {
            this.addItemForm.officeAddr = mapInfo.title
            this.addItemForm.officeGps = mapInfo.point.lng + ',' + mapInfo.point.lat
            setTimeout(() => {
                this.$refs['mapShow'].drawMap()
            }, 0)
        },
        editItem (item) {
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeItem (data) {
            this.addItemForm.officeCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.officeAddr) {
                this.$message({
                    message: '请填写物业检索！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.officeName) {
                this.$message({
                    message: '请填写物业简称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.officeCover) {
                this.$message({
                    message: '请添加物业照片！',
                    type: 'warning'
                })
                return false
            }

            this.addItemForm.enterpriseCode = this.$route.query.enterpriseCode

            if (this.addItemForm.officeCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        },
        selectItem (item) {
            var index = this.selectItemList.indexOf(item.officeCode)
            if (index > -1) {
                this.selectItemList.splice(index, 1)
            } else {
                this.selectItemList.push(item.officeCode)
            }
        },
        getItems () {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    zoneCode: this.$route.query.zoneCode,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        pageChange (size) {
            this.pageNumber = size
            this.getItems()
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
        // 选择商圈操作
        setImport () {
            if (!this.isCheck) {
                return false
            }
            this.checkedLabels = []
            this.isselectVisible = true
        },
        selectZone (item) {
            this.checkedLabel = item.zoneCode
        },
        getZones () {
            var formData = {
                cityCode: this.selectCity.cityCode,
                pageSize: this.zonePageSize,
                pageNumber: this.zonePageNumber
            }

            util.request({
                method: 'get',
                interface: 'cityZoneList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.zoneTotal = Number(res.result.total)
                    this.zoneDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            }) 
        },
        zonePageChange (size) {
            this.zonePageNumber = size
            this.getZones()
        },
        selectConfirm () {
            this.removeItem()
        },
        removeItem () {
            util.request({
                method: 'post',
                interface: 'materialMove',
                data: {
                    officeCodes: this.selectItemList,
                    zoneCode: this.checkedLabel
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
        searchBox
    }
}
</script>