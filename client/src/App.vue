<template>
    <v-app>
        <v-app-bar app style="background-color: black">
            <v-tabs grow>
                <v-tab style="color:#8E2528" v-for="item in items" :key="item">
                    <router-link :to="{ name: `${item}` }">{{ item }}</router-link>
                </v-tab>
            </v-tabs>
        </v-app-bar>
        <v-main class="main">
            <v-container fluid class="container">
                 <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import store from './store'
export default {
    name: 'app',
    provide: {
        store
    },
    data() {
        return {
            items: ['Home', 'Stats', 'Pantheon', 'Teams']
        }
    }
}
</script>

<style lang="scss">
.main {
    //background-color: #03dac6;
    background-color: #FDFCF5;
}
</style>
