<template>
    <v-app>
        <v-app-bar app style="background-color: brown">
            <v-tabs grow>
                <v-tab v-for="item in items" :key="item">
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
            items: ['Home', 'Schedule', 'Standings', 'Teams']
        }
    }
}
</script>

<style lang="scss">
.main {
    background-color: #03dac6;
}
</style>