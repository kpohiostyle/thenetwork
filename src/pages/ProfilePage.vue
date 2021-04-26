<template>
  <div class="container-fluid">
    <div class="row d-flex">
      <div class="col-sm-7 project-header shadow mt-4" v-if="state.activeProfile">
        <div>
          <img class="cover-img" :src="state.activeProfile.coverImg" alt="">
        </div>
        <div class="d-flex flex-column inline">
          <img class="rounded-circle small-img" :src="state.activeProfile.picture" alt="Creator image">
          <h5>
            {{ state.activeProfile.name }}
          </h5>
          <h3>
            <i class="fas fa-github-alt"></i><i class="fas fa-linkedin"></i>
          </h3>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-7 shadow" v-if="state.activeProfile">
        <form @submit.prevent="addPost">
          <div class="form-group">
            <textarea type="text"
                      class="form-control mt-3"
                      name="body"
                      id="body"
                      rows="5"
                      cols="80"
                      aria-describedby="helpId"
                      placeholder="Share whats happening..."
                      v-model="state.newPost.body"
            >
            </textarea>
          </div>

          <button class="btn btn-success" type="submit">
            <i class="fas fa-plus    "></i>
          </button>
        </form>
        <button>
          Delete
        </button>
      </div>
    </div>
  </div>
  <!-- Projects: {{ state.activeProjects.length }} -->
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { accountService } from '../services/AccountService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      newPost: {},
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      activeProfile: computed(() => AppState.activeProfile)
    })
    onMounted(async() => {
      await postsService.getProfileById(route.params.id)
      await accountService.getProfile(route.params.id)
    })
    return {
      state,
      async create() {
        try {
          await postsService.create(state.newPost)
          state.newPost = {}
          Notification.toast('Successfully Created Post', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
      // will need to add a delete button
    }
  }
}
</script>

<style scoped>
.cover-img{
    width: 100%;
    max-height: 10vh
}
.small-img {
  max-width: 100px;
  position: relative;
  top:-2rem;

}
</style>
