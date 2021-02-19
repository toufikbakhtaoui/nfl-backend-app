<template>
<div class="home">
    <game></game>
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
     standing
 }
}
</script>
<style scoped>
.home {
    display: flex;
}

.standing {
    height: auto;
    width: 50%;
    margin-left: 10px;
}
</style>