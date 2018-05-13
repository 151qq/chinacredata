<template>
    <section class="big-cards-box">
      <router-link class="card-box"
                   target="_blank"
                   v-for="(item, index) in assetsList"
                   :to="getPath(item)">
          <div class="card-img">
              <img v-if="item.securityCover" :src="item.securityCover">
          </div>

          <div class="card-content">
              <div class="card-title">{{item.securityName}}</div>
              <div class="card-desc">比例：{{item.assetRatio}}</div>
          </div>
      </router-link>
    
      <div class="clear"></div>
      <el-pagination
          v-if="total"
          class="page-box"
          @current-change="pageChange"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total">
      </el-pagination>

      <div v-if="!assetsList.length"
            class="null-box">
        暂无证券！
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
export default {
    props: ['propertyCode'],
    data () {
        return {
          assetsList: [],
          pageSize: 5,
          pageNumber: 1,
          total: 0
        }
    },
    mounted () {
      this.getAssets()
    },
    methods: {
        getAssets () {
          var formData = {
              enterpriseCode: this.$route.query.enterpriseCode,
              propertyCode: this.propertyCode,
              pageSize: this.pageSize,
              pageNumber: this.pageNumber
          }

          util.request({
              method: 'get',
              interface: 'securityAsset',
              data: formData
          }).then(res => {
              if (res.result.success == '1') {
                this.total = Number(res.result.total)
                this.assetsList = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        getPath (item) {
            var pathData = {
                name: '',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode
                }
            }

            if (item.securityType == 'security_type_1') {
                pathData.name = 'management-detail'
                pathData.query.assetManagementProductCode = item.securityCode
            }

            if (item.securityType == 'security_type_2') {
                pathData.name = 'reits-detail'
                pathData.query.foreignReitsCode = item.securityCode
            }

            return pathData
        },
        changePage (size) {
          this.pageNumber = size
          this.getAssets()
        }
    }
}
</script>