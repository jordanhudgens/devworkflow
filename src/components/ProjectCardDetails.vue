<template>
  <div class="project-details-card">
    <div class="content">
      <div class="card-header">
        <div class="title">
          {{ currentProjectItem.title }}
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

      <div>
        <!-- Start of description edit process  -->
        <div v-if="!descriptionEditMode" class="card-details-description" @click.prevent="editDescription">
          <div v-if="currentProjectItem.description">
            {{ currentProjectItem.description }}
          </div>

          <div v-else class="placeholder-text">
            Description goes here
          </div>
        </div>

        <div v-else class="form-wrapper">
          <input v-model="currentProjectItem.description" placeholder="Description goes here" class="full-width-element">
          <a @click.prevent="descriptionEditMode = false" class="cancel">
            <i class="fas fa-times"></i> Cancel
          </a>
        </div>
        <!-- End of description edit process  -->

        <!-- Start of check list  -->
        <div class="spacer20"></div>

        <div class="list-wrapper">
          <div class="header">
            <h3 class="teal">
              <i class="fas fa-clipboard-list"></i> Checklist
            </h3>

            <a class="link" @click.prevent="toggleNewCheckListItemForm">
              <h3 class="teal">
                <i class="fas fa-plus-circle"></i>
              </h3>
            </a>
          </div>

          <div v-if="currentProjectItem.check_list_items.length > 0">
            <div v-for="listItem in currentProjectItem.check_list_items" :key="listItem.id" class="list-item">
              {{ listItem.title }}
            </div>
          </div>
          <div v-else class="placeholder-text">
            No checklist items added yet
          </div>

          <div v-if="getNewCheckListItemFormStatus" class="form-element">
            <form @submit.prevent="addToCheckListItems">
              <input type="text" placeholder="Content here">
            </form>
          </div>

        </div>
        <!-- end of check list  -->

      </div>
    </div>

    <div class="status">
      <p-check class="p-switch p-fill" color="success" v-model="currentProjectItem.completed">Completed?</p-check>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'ProjectCardDetails',

  data() {
    return {
      descriptionEditMode: false,
    }
  },

  computed: {
    ...mapGetters([
      'currentProjectItem',
      'currentCheckListItems',
      'getNewCheckListItemFormStatus'
    ]),
  },

  methods: {
    ...mapMutations([
      'CLEAR_SELECTED_PROJECT_ITEM',
      'ADD_TO_CHECK_LIST_ITEMS',
      'TOGGLE_NEW_CHECK_LIST_ITEM_FORM_STATUS'
    ]),

    ...mapActions([
      'updateProductLineItem',
      'createCheckListItem'
    ]),

    toggleNewCheckListItemForm() {
      this.TOGGLE_NEW_CHECK_LIST_ITEM_FORM_STATUS();
    },

    addToCheckListItems(event) {
      // TODO
      // Overall:
      // Remove the save feature and have it save automatically for each element.
      // 
      // Check list item:
      // Render the check list items from the API when details are opened
      // Set back to base state when card is closed
      // Validation to ensure that an empty string can't be submitted
      // this.ADD_TO_CHECK_LIST_ITEMS(event.target[0].value);
      this.createCheckListItem(event.target[0].value);
    },

    editDescription() {
      this.descriptionEditMode = true;
    },

    closeCard() {
      this.CLEAR_SELECTED_PROJECT_ITEM()
    },

    updateLineItem() {
      this.updateProductLineItem();
    }
  }
}
</script>