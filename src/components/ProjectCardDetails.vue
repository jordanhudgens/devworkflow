<template>
  <div class="project-details-card">
    <div class="card-header">
      <div class="title">
        {{ selectedItemTitle }}
      </div>

      <div class="action-icons">
        <div class="update-icon">
          <a @click.prevent="updateLineItem">
            <i class="fas fa-save"></i>
          </a>
        </div>

        <div class="close-icon">
          <a @click.prevent="closeCard">
            <i class="fas fa-times-circle"></i>
          </a>
        </div>
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
      updateLineItemUrl: "https://devworkflow-api.herokuapp.com/project_line_items/"
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
    },

    updateLineItem() {
      // axios
      //   .patch(
      //   this.updateLineItemUrl,
      //   {
      //     project_line_item: {
      //       description: "Updated content...",
      //       status: 'not_completed'
      //     }
      //   },
      //   { withCredentials: true },
      // )
      //   .then(response => {
      //     console.log("Response for updating", response);
      //   })
      //   .catch(error => {
      //     console.log('errorrr', error);
      //   });
    }
  }
}
</script>