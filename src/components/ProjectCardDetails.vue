<template>
  <div class="project-details-card">
    <div class="card-header">
      <div class="title">
        {{ selectedItemTitle }}
      </div>

      <div class="close-icon">
        <a @click.prevent="closeCard">
          <i class="fas fa-times-circle"></i>
        </a>
      </div>
    </div>

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
  },

  methods: {
    closeCard() {
      this.$emit("closeCard");
    }
  }
}
</script>