<template>
    <section class="map-box-show">
        <div id="containerhouse" :style="{height: mapH}"></div>
    </section>
</template>
<script>
export default {
    props: ['pointStr', 'mapHeight'],
    data () {
        return {
            map: '',
            mapH: '',
        }
    },
    mounted () {
        this.mapH = this.mapHeight ? this.mapHeight : '120px'
        this.initMap()
    },
    methods: {
        initMap () {
            if (!this.map) {
                var map = new window.BMap.Map('containerhouse')
                this.map = map
                var point = new window.BMap.Point(116.409, 39.918)
                map.centerAndZoom(point, 15)
            }

            if (this.pointStr) {
                setTimeout(() => {
                    this.drawMap()
                }, 0)
            }
        },
        drawMap () {
            var pointArr = this.pointStr.split(',')
            var point = new window.BMap.Point(pointArr[0], pointArr[1])
            this.map.clearOverlays()
            var marker = new BMap.Marker(point)
            this.map.panTo(point)
            this.map.addOverlay(marker)
        }
    }
}
</script>
<style lang="scss">
.map-box-show {
    #containerhouse {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>