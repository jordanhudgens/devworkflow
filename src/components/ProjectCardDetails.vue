<template>
  <div class="project-details-card">
    <h2>
      {{ selectedItemTitle }}
    </h2>

    <div class="card-details-description">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCardDetails',

  data() {
    return {
    }
  },

  computed: {
    description: function() {
      const filteredDescription = this.project.project_line_items.find(pli => {
        return pli.title === this.selectedItemTitle
      });

      if (filteredDescription) {
        return filteredDescription.description;
      } else {
        return "";
      }
    }
  },

  props: {
    selectedItemTitle: String,
    project: Object
  }
}
</script>