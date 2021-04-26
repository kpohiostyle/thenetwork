<template>
  <div class="side-profile">
    <!-- <img :src="account.picture" alt="" class="rounded-circle"> -->
    <div class="mt-5">
      <span class="login-toggle">
        <img
          :src="user.picture"
          alt="user photo"

          class="rounded-circle user-photo"
        />
        <p class="font-weight-bold text-center">{{ user.name }}</p>
        <p class="font-weight-lighter">{{ user.class }}</p>
        <button
          class="btn btn-outline-info text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >

            <span class="mx-3 text-black-50">options</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
// import { accountService } from '../services/AccountService'
// import { useRoute } from 'vue-router'
export default {
  name: 'SideProfile',
  props: {
    sideprofile: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      dropOpen: false,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
      // activeProfile: computed(() => AppState.activeProfile)
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  background-color: transparent;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.list-group-item{
    background-color: transparent;
}
.list-group-item:hover{
    background-color: rgb(255, 119, 142);
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.user-photo {
  max-width: 100%;
  height: auto;
}
</style>
