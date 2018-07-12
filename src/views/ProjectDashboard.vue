<template>
  <div>
    Project Dashboard

    <div v-for="project in projects" :key="project.id" class="project-card">
      <div>
        {{ project.title }}
      </div>

      <div>
        {{ project.mainObjective }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDashboard',
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'First Project',
          mainObjective: 'Content for the main objective'
        },
        {
          id: 2,
          title: 'Second Project',
          mainObjective: 'Content for the main objective for project 2'
        },
        {
          id: 3,
          title: 'Third Project',
          mainObjective: 'Content for the main objective for project 3 and testing out a little longer main objective to see what that looks like'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import url('./../styles/project-card.scss');
</style>