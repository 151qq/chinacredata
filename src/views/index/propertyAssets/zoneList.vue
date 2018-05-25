<template>
    <div class="card-list-box">
        <div class="input-box">
            <input
                placeholder="请输入需查询条件"
                v-model="keyValue"
                @keyup.13="searchItem"
                class="input-search">
            <el-button class="search-btn" type="primary" icon="search" @click="searchItem">
              搜索
            </el-button>

            <el-button class="add-new-btn" type="primary" icon="plus" @click="addItem">增加</el-button>
        </div>
        
        <!-- 列表 -->
        <div class="clear"></div>
        <template v-if="sourceDatas.length">
            <section class="check-box" v-for="(item, index) in sourceDatas" :key="index">
                <!-- 选择框 -->
                <router-link class="sou-box"
                            target="_blank"
                            :to="{
                                name: 'assets-list',
                                query: {
                                    enterpriseCode: userInfo.enterpriseCode,
                                    zoneCode: item.zoneCode,
                                    cityName: item.cityName,
                                    cityCode: item.cityCode
                                }
                            }">
                    <div class="cover-box">
                        <img :src="item.zoneCover">
                    </div>
                    <div class="title-box">
                        <div class="title">{{item.zoneName}}</div>
                        <div class="time">
                            <span>
                                {{item.zoneTypeName}}
                            </span>
                            <span class="btn-box">
                                <i @click.prevent="editItem(item)" class="el-icon-document"></i>
                            </span>

                            <span class="btn-box">
                                <i @click.prevent="deleteItem(item.zoneCode)" class="el-icon-delete2"></i>
                            </span>
                        </div>
                    </div>
                </router-link>
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
        </template>
        <!-- 无内容 -->
        <section v-else class="no-img">
            当前城市暂无商圈，请更换或添加城市！！！
        </section>
        
        <!-- 添加弹窗 -->
        <el-dialog :title="operateText" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="商圈名称">
                <el-input v-model="addItemForm.zoneName"
                            :maxlength="20"
                            placeholder="请输入内容，最多12个字"></el-input>
            </el-form-item>
            <el-form-item label="商圈类型">
                <el-select v-model="addItemForm.zoneType"
                            filterable
                            placeholder="请选择">
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
                    placeholder="请输入内容"
                    :maxlength="140"
                    v-model="addItemForm.zoneDesc">
                </el-input>
                <div class="limit-box">剩余<a>{{140 - addItemForm.zoneDesc.length}}</a>字</div>
            </el-form-item>
            
            <el-form-item label="商圈图片">
                <upload-file :path="addItemForm.zoneCover"
                            :is-operate="true"
                            :bg-path="false"
                            :id-name="'zoneCover'"
                            @changeImg="changeImg"></upload-file>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">保 存</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import uploadFile from '../../../components/common/uploadFile.vue'
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            keyValue: '',
            // 获取
            sourceDatas: [],
            pageNumber: 1,
            pageSize: 15,
            total: 0,
            // 添加
            operateText: '添加',
            isAddItem: false,
            addItemForm: {
                enterpriseCode: '',
                zoneName:'',
                zoneType:'',
                zoneDesc:'',
                zoneCover:'',
                cityCname:'',
                zoneCode:'',
                cityCode:''
            },
            tradingAreaTypes: []
        }
    },
    mounted () {
        this.getItems()
        this.tradingAreaType()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            selectCity: 'getSelectCity'
        })
    },
    watch: {
       selectCity () {
           this.getItems()
       } 
    },
    methods: {
        searchItem () {
            this.getItems()
        },
        // 获取商圈类型
        tradingAreaType () {
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
        // 增删改查
        getItems () {
            if (!this.selectCity.cityCode) {
                return false
            }

            var formData = {
                cityCode: this.selectCity.cityCode,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            if (this.keyValue) {
                formData.zoneName = this.keyValue
            }

            util.request({
                method: 'get',
                interface: 'cityZoneList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.total = Number(res.result.total)
                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            }) 
        },
        insterItem () {
            util.request({
                method: 'post',
                interface: 'saveCityzone',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    // 重置分页 刷新列表 关闭弹窗
                    this.$message({
                        message: '恭喜你，保存成功！',
                        type: 'success'
                    })
                    this.pageNumber = 1
                    this.isAddItem = false
                    this.getItems()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateItem () {
            util.request({
                method: 'post',
                interface: 'cityZoneUp',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    // 刷新列表 关闭弹窗
                    this.$message({
                        message: '恭喜你，保存成功！',
                        type: 'success'
                    })
                    this.isAddItem = false
                    this.getItems(this.currentParentCode)
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteItem (code) {
            util.request({
                method: 'get',
                interface: 'cityZoneDel',
                data: {
                    zoneCode: code
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        pageChange (size) {
            this.itemPageNumber = size
            this.getItems()
        },
        // 添加 编辑
        addItem () {
            if (!this.selectCity.cityCode) {
                this.$message({
                    message: '请先在右上角新增城市！',
                    type: 'warning'
                })
                return false
            }

            this.operateText = '添加'
            this.addItemForm = {
                enterpriseCode: this.$route.query.enterpriseCode,
                zoneName:'',
                zoneType:'',
                zoneDesc:'',
                zoneCover:'',
                cityCname:'',
                zoneCode:'',
                cityCode: this.selectCity.cityCode
            }

            this.isAddItem = true
        },
        editItem (item) {
            this.operateText = '编辑'
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeImg (data) {
            this.addItemForm.zoneCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.zoneName) {
                this.$message({
                    message: '请输入商圈名称！',
                    type: 'warning'
                })
                return false
            }
            if (!this.addItemForm.zoneType) {
                this.$message({
                    message: '请选择商圈类型！',
                    type: 'warning'
                })
                return false
            }
            if (!this.addItemForm.zoneCover) {
                this.$message({
                    message: '请上传商圈图片！',
                    type: 'warning'
                })
                return false
            }

            if (this.addItemForm.zoneCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        }
    },
    components: {
        uploadFile
    }
}
</script>