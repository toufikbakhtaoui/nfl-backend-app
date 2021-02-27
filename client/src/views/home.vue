<template>
    <div class="home">
        <game class="game"></game>
        <standing class="standing"></standing>
    </div>
</template>

<script>
import game from '../components/game'
import standing from '../components/standing'
export default {
    name: 'home',
    components: {
        game,
        standing,
    },
}
</script>
<style scoped>
.home {
    display: flex;
}

.game {
    width: 450px;
}

.standing {
    margin-left: 10px;
}
</style>