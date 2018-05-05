<template>
    <div class="source-box">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="'写字楼'" :name="'office'">
                <office-list></office-list>
            </el-tab-pane>
            <el-tab-pane :label="'购物中心'" :name="'mall'">
                <!-- <mall-list></mall-list> -->
            </el-tab-pane>
            <!-- <el-tab-pane :label="'长租公寓'" :name="'apartment'">
                <item-list :file-type="'apartment'"></item-list>
            </el-tab-pane>
            <el-tab-pane :label="'酒店'" :name="'hotel'">
                <item-list :file-type="'hotel'"></item-list>
            </el-tab-pane>
            <el-tab-pane :label="'仓储物流'" :name="'logistics'">
                <item-list :file-type="'logistics'"></item-list>
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import officeList from './officeList'
import mallList from './mallList'

export default {
    data() {
        return {
            activeName: 'office'
        }
    },
    mounted () {
    },
    methods: {
    },
    components: {
        officeList,
        mallList
    }
}
</script>