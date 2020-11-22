<template>
    <ul class="p-0">
        <li v-for="(item, i) in this.mekanlar" v-bind:key="i" class="card card-body mb-2">
                    <span class="mekanAciklama badge p-3 font-italic font-weight-bold" :class="'badge-'+item.color" style="text-align: left">
                        <font-awesome-icon :icon="item.icon" class="mr-1"/>
                        <span v-if="!durum && !item.hepMiKapali">Çalışma Saatleri Dışında</span>
                        <span v-if="durum && !item.hepMiKapali">{{item.aciklama}}</span>
                        <span v-if="item.hepMiKapali">{{item.aciklama}}</span>
                    </span>
            <ul>
                <li class="mekanAdi text-left" v-for="(mekanAdi, j) in item.mekan" v-bind:key="j">
                    {{mekanAdi}}
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Mekanlar",
        props:{
            mekanlar: {
                type: Array,
                required: true
            },
            durum: {
                type: Boolean,
                required: true
            },
        },
    }
</script>

<style scoped>

</style>