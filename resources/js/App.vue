<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>


<script lang="ts">
    import {computed} from "vue";
    import {useRouter} from "vue-router";


    export default {
        setup(){
            const defaultLayout = "default";
            const {currentRoute} = useRouter();
            const layout = computed(
                () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
            );

            return{
                layout
            }
        }
    }
</script>
