<template lang="">
  <div class="col-sm-7 shadow m-3">
    <div class="d-flex inline-block mt-2">
      <router-link :to="{name: 'ProfilePage', params: {id: post.creatorId}}">
        <img class="rounded-circle small-img " :src="post.creator.picture" alt="Creator Photo">
      </router-link>

      <div class="row">
        <div class="col-12">
          <h6>{{ post.creator.name }}</h6>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12">
        <h6>{{ post.createdAt }}</h6>
      </div>
    </div> -->
    <div class="row">
      <div class="col-12">
        <p>{{ post.body }}</p>
      </div>
      <div class="row">
        <div class="col-12">
          <img :src="post.imgUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'

export default {
  name: 'PostComponent',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      route
    }
  }
}
</script>
<style lang="scss" scoped>
img{
    max-width: 50%
}
.small-img{
  width: 10vh;
}

</style>
