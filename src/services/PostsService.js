import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
    AppState.previous = res.data.newer
    AppState.next = res.data.older
  }

  async getByQuery(data) {
    const res = await api.get('api/posts?query=' + data)
    AppState.posts = res.data.posts
  }

  async getByPage(data) {
    const res = await api.get('api/posts?page=' + data)
    AppState.posts = res.data.posts
  }

  async getProfile(id) {
    const res = await api.get('api/posts/' + id)
    AppState.activeProject = res.data
  }

  // async getMyPosts() {
  //   const res = await api.get(`api/posts?creatorId=${AppState.account.id}`)
  //   AppState.myPosts = res.data
  // }

  async getProfileById(id) {
    const res = await api.get(`api/posts?creatorId=${id}`)
    AppState.activePosts = res.data
  }

  async create(data) {
    const res = await api.post('api/posts', data)
    router.push({ name: 'PostDetails', params: { id: res.data.id } })
    // this.getAll()
  }
}

export const postsService = new PostsService()
