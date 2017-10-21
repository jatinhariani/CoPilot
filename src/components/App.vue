<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      section: 'Head'
    }
  },
  methods: {
    logout (component) {
      component.$auth.logout({
        redirect: '/login'
      })
    }
  }
}
</script>
