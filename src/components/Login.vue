<template>
  <div class="container container-table">
    <div class="row vertical-10p">
      <div class="container">
        <img src="/static/img/logo.png" class="center-block logo">
        <div class="text-center col-md-4 col-sm-offset-4">
          <form class="ui form loginForm"  @submit.prevent="checkCreds">

            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
              <input class="form-control" name="email" placeholder="Email" type="email" v-model="email">
            </div>

            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
            </div>
            <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Login</button>
          </form>
          <div v-if=response class="text-red"><p>{{response}}</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      email: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds () {
      const {email, password} = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      this.$auth.login({
        data: { email, password },
        success: function () {
          console.log('success')
          this.$store.commit('TOGGLE_LOADING')
        },
        error: function () {
          console.log('error')
          this.$store.commit('TOGGLE_LOADING')
        },
        rememberMe: true,
        redirect: '/',
        fetchUser: true
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
