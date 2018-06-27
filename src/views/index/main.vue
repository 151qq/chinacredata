<template>
    <section>
        <web-header></web-header>
        <section class="mid-body-box">
            <router-view></router-view>
        </section>
        
        <web-footer></web-footer>
    </section>
</template>
<script>
import webHeader from '../../components/common/header.vue'
import webFooter from '../../components/common/footer.vue'

export default {
    data () {
        return {}
    },
    components: {
        webHeader,
        webFooter
    }
}
</script>
<style lang="scss">
.mid-body-box {
    min-height: 500px;
}

.null-register {
    text-align: center;
    font-size: 14px;
    color: #999999;
    padding-top: 200px;
}
</style>