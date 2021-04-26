<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="col-sm-3 side-bar">
      <SideProfile />
    </div>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.side-bar{
  background-color: pink;
}
@media only screen and (max-width: 575px){
 .side-bar{
   display:none;
 }
}
</style>
