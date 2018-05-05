<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <office-base @change="baseChange"></office-base>
          <div class="line-bold"></div>

          <!-- 产品图片 -->
          <el-collapse-item class="float-form-box" title="物业相册" name="2">
            <upload-list :img-lists="imgList"
                          :id-name="'officeAlbum'"
                          :is-edit="isEdit && baseData.officeStatus == '2'"
                          :pro-cover="baseData.officeCover"
                          @changeImg="changeImg"
                          @setImg="setImg"
                          @deleteImg="deleteImg"></upload-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 业主信息 -->
          <el-collapse-item class="float-form-box" title="业主信息" name="3">
            <owner-list :base="baseData"></owner-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 交易历史 -->
          <el-collapse-item class="float-form-box" title="交易历史" name="4">
            <trade-list :base="baseData"></trade-list>
          </el-collapse-item>


          
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import officeBase from './formAlist/officeBase'
import ownerList from './formAlist/ownerList'
import tradeList from './formAlist/tradeList'
import uploadList from '../../../components/common/upload-list'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            activeNames: ['1'],
            imgList: [],
            sourceData: [],
            baseData: '',
            tradeData: []
        }
    },
    mounted () {
        var officeColl = localStorage.getItem("officeColl")
        if (officeColl) {
            this.activeNames = officeColl.split(',')
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          if (this.$route.query.enterpriseCode == this.userInfo.enterpriseCode) {
            return true
          } else {
            return false
          }
        }
    },
    methods: {
        baseChange (result) {
          this.baseData = result.officeInfo
          this.tradeData = result.htmlPage ? result.htmlPage : []
          this.getItems(this.baseData.officeAlbum)
        },
        getItems (docCode) {
            util.request({
                method: 'get',
                interface: 'listPage',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    docFolder: docCode,
                    pageNumber: 1,
                    pageSize: 1000
                }
            }).then(res => {
                if (res.result.success == '1') {
                    var arrs = []
                    res.result.result.forEach((item) => {
                        item.docCreateTime = item.docCreateTime.split(' ')[0]
                        arrs.push(item.fileCode)
                    })

                    this.imgList = arrs
                    this.sourceData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        changeImg (url) {
          var addItemForm = {
              enterpriseCode: this.$route.query.enterpriseCode,
              docType: '2',
              docTitle: this.baseData.officeCname + '-' + (this.imgList.length + 1),
              fileCode: url,
              docDesc: this.baseData.officeCname + '-' + (this.imgList.length + 1),
              docCover: '',
              docFolder: this.baseData.officeAlbum
          }

          util.request({
              method: 'post',
              interface: 'materialFolderInsert',
              data: addItemForm
          }).then(res => {
              if (res.result.success == '1') {
                  this.getItems(this.baseData.officeAlbum)
              } else {
                  this.$message.error(res.result.message)
              }
          })       
        },
        deleteImg (index) {
          util.request({
              method: 'post',
              interface: 'materialFolderDelete',
              data: {
                  docType: '2',
                  docCodes: [this.sourceData[index].docCode]
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.getItems(this.baseData.officeAlbum)
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        setImg (url) {
          util.request({
              method: 'get',
              interface: 'saveofficeCover',
              data: {
                  officeCode: this.$route.query.officeCode,
                  officeCover: url
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.baseData.officeCover = url
                  this.$refs.baseForm.base.officeCover = url
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        collChange () {
            localStorage.setItem("officeColl", this.activeNames)
        }
    },
    components: {
        officeBase,
        ownerList,
        tradeList,
        uploadList
    }
}
</script>