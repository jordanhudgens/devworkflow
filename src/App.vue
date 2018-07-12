<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Project Dashboard</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('./styles/common.scss');
</style>
