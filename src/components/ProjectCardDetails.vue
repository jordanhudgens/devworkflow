<template>
  <div class="project-details-card">
    <div class="content">
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

      <div v-if="loading">
        <i class="fas fa-spinner"></i>
      </div>

      <div v-else-if="selectedProjectLineItem">
        <!-- Start of description edit process  -->
        <div v-if="!descriptionEditMode" class="card-details-description" @click.prevent="editDescription">
          <div v-if="selectedProjectLineItem.description">
            {{ selectedProjectLineItem.description }}
          </div>

          <div v-else class="placeholder-text">
            Description goes here
          </div>
        </div>

        <div v-else class="form-wrapper">
          <input v-model="selectedProjectLineItem.description" placeholder="Description goes here" class="full-width-element">
          <a @click.prevent="descriptionEditMode = false" class="cancel">
            <i class="fas fa-times"></i> Cancel
          </a>
        </div>
        <!-- End of description edit process  -->

        <div class="spacer20"></div>

        <div class="list-wrapper">
          <h3 class="teal">
            <i class="fas fa-clipboard-list"></i> Checklist
          </h3>

          <div v-if="listItems.length === 0" class="placeholder-text">
            No checklist items added yet
          </div>
          <div class="list-item">

          </div>
        </div>

      </div>
    </div>

    <div class="status">
      <p-check class="p-switch p-fill" color="success" v-model="selectedProjectLineItem.completed">Completed?</p-check>
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
      loading: true,
      selectedProjectLineItem: {},
      descriptionEditMode: false,
      listItems: []
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
    editDescription() {
      this.descriptionEditMode = true;
    },

    setSelectedItem() {
      this.selectedProjectLineItem = this.project.project_line_items.find(pli => {
        return pli.title === this.selectedItemTitle
      });
      this.loading = false;
    },

    closeCard() {
      this.selectedProjectLineItem = {}
      this.$emit("closeCard");
    },

    updateLineItem() {
      axios
        .patch(
        this.updateLineItemUrl + this.selectedProjectLineItem.id,
        {
          project_line_item: {
            description: this.selectedProjectLineItem.description,
            completed: this.selectedProjectLineItem.completed
          }
        },
        { withCredentials: true },
      )
        .then(response => {
          this.$emit('updateProjectLineItem', response.data);
          this.closeCard();
        })
        .catch(error => {
          console.log('errorrr', error);
        });
    }
  }
}
</script>