import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from '@/plugins/axios'
import Swal from 'sweetalert2'
// 在 pinia 引用路由時不能使用 vue-router 的 useRouter，會是 undefined
// 所以引用 @/plugins/router
import router from '@/plugins/router'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const role = ref(0)

  // 判斷是否登入
  const isLogin = computed(() => {
    // 大於 0 => 有 token 存在於 store
    return token.value.length > 0
  })
  // 判斷登入者是否為管理員
  const isAdmin = computed(() => {
    return role.value === 1
  })
  // 大頭貼
  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/256/${account.value}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`
  })

  // 使用者登入
  const login = async (form) => {
    try {
      // 請求連接 axios (api 為自訂義的 axios，即連接到後端 http://localhost:4000/users/login )
      // 網址使用相對路徑即可，EX: '/users/login'
      const { data } = await api.post('/users/login', form)
      // 取得後端驗證處理後 form 內各項資料
      token.value = data.result.token
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登入成功'
      })
      // 跳回首頁
      router.push('/')
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 使用者登出 + 清空資料
  const logout = async () => {
    try {
      await apiAuth.delete('/users/logout')
      token.value = ''
      account.value = ''
      role.value = 0
      cart.value = 0
      // 跳回首頁
      router.push('/')
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登出成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const getUser = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/me')
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
    } catch (error) {
      logout()
    }
  }

  const editCart = async ({ _id, quantity }) => {
    if (token.value.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: '請先登入'
      })
      router.push('/login')
      return
    }
    try {
      const { data } = await apiAuth.post('/users/cart', { p_id: _id, quantity })
      cart.value = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '成功加入購物車'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const checkout = async () => {
    try {
      await apiAuth.post('/orders')
      cart.value = 0
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '結帳成功'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  return {
    token,
    account,
    email,
    cart,
    role,
    login,
    logout,
    isLogin,
    isAdmin,
    avatar,
    getUser,
    editCart,
    checkout
  }
},
{
  persist: {
    key: '220103',
    paths: ['token']
  }
})
