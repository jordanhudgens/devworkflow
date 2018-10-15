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

    <div v-if="selectedProjectLineItem" class="card-details-description">
      {{ selectedProjectLineItem.description }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectCardDetails',

  data() {
    return {
      updateLineItemUrl: "https://devworkflow-api.herokuapp.com/project_line_items/",
      selectedProjectLineItem: null
    }
  },

  beforeMount() {
    this.setSelectedItem();
  },

  beforeUpdate() {
    this.setSelectedItem();
  },

  props: {
    selectedItemTitle: String,
    project: Object
  },

  methods: {
    setSelectedItem() {
      this.selectedProjectLineItem = this.project.project_line_items.find(pli => {
        return pli.title === this.selectedItemTitle
      });
    },

    closeCard() {
      this.$emit("closeCard");
    },

    updateLineItem() {
      console.log("Updating...", this.selectedProjectLineItem.id)
      axios
        .patch(
        this.updateLineItemUrl + this.selectedProjectLineItem.id,
        {
          project_line_item: {
            description: "Updated content...",
            status: 'not_completed'
          }
        },
        { withCredentials: true },
      )
        .then(response => {
          console.log("Response for updating", response);
          this.closeCard();
        })
        .catch(error => {
          console.log('errorrr', error);
        });
    }
  }
}
</script>