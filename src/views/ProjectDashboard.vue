<template>
  <div>
    Project Dashboard
    <modal name="new-project">
      hello, world!
    </modal>

    <div class="project-cards-wrapper">
      <div class="new-project" @click="newProject">
        <div class='title'>New Project</div>

        <div class="icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>

      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="metadata">
          <div class='title'>
            {{ project.title }}
          </div>

          <div class="main-objective">
            {{ project.mainObjective }}
          </div>
        </div>

        <div class="line-items">
          <div class="line-item">Wireframes</div>
          <div class="line-item">Sitemap</div>
          <div class="line-item">User Stories</div>
          <div class="line-item">UML Diagrams</div>
          <div class="line-item">Hi-Res Designs</div>
          <div class="line-item">Logo/Images</div>
          <div class="line-item">Frontend Implementation</div>
          <div class="line-item">Backend API</div>
          <div class="line-item">Automated Tests</div>
          <div class="line-item">Deployment</div>
        </div>
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
  },
  methods: {
    newProject() {
      this.$modal.show('new-project');
    }
  }
}
</script>

<style lang="scss">
@import url('./../styles/project-dashboard.scss');
@import url('./../styles/project-card.scss');
@import url('./../styles/modal.scss');
</style>