<template>
  <div>
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
      return this.project.project_line_items.find(pli => {
        return pli.title === this.selectedItemTitle
      }).description
    }
  },

  props: {
    selectedItemTitle: String,
    project: Object
  }
}
</script>

<style scoped>

</style>