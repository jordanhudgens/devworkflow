<template>
  <div>
    <div class="metadata">
      <div class='title'>
        {{ project.title }}
      </div>

      <div class="main-objective">
        {{ project.main_objective }}
      </div>
    </div>

    <div class="line-items">

      <div class="line-item">
        <span class="completed-circle"></span>
        <span class="title">
          Wireframes
        </span>
      </div>

      <div class="line-item">
        <span class="incompleted-circle"></span>
        <span class="title">
          Sitemap
        </span>
      </div>

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
</template>

<script>
export default {
  name: 'ProjectCard',

  data() {
    return {
    }
  },

  props: {
    project: Object
  }
}
</script>