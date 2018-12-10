<template>
  <div class="project-details-card">
    <div class="content">
      <div class="card-header">
        <div class="title">
          {{ currentProjectItem.title }}
        </div>

        <div class="action-icons">
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
          <!-- TODO  -->
          <!-- If cancel is pressed, switch back to previous value of description  -->
          <form @submit.prevent="updateDescription">
            <input ref="description" @keyup="handleDescriptionChange" :value="currentProjectItem.description" placeholder="Description goes here" class="full-width-element">
          </form>
          <a @click.prevent="cancelDescriptionEdit" class="cancel">
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
                <i v-if="!getNewCheckListItemFormStatus" class="fas fa-plus-circle"></i>
                <i v-else class="fas fa-times-circle"></i>
              </h3>
            </a>
          </div>

          <div v-if="currentProjectItem.check_list_items && currentProjectItem.check_list_items.length > 0">
            <div v-for="listItem in currentProjectItem.check_list_items" :key="listItem.id" class="list-item">
              <a @click.prevent="toggleCheckListItemCompleteStatus(listItem)">
                <p-check name="check" color="success" v-model="listItem.completed">{{ listItem.title }}</p-check>
              </a>
            </div>
          </div>
          <div v-else class="placeholder-text">
            No checklist items added yet
          </div>

          <div v-if="getNewCheckListItemFormStatus" class="form-element">
            <form @submit.prevent="addToCheckListItems">
              <input ref="checkListInput" type="text" placeholder="Checklist item" required>
            </form>
          </div>

        </div>
        <!-- end of check list  -->

        <!-- TODO  -->
        <!-- image uploads  -->
        <!-- https://github.com/rowanwins/vue-dropzone  -->

        <div v-if="currentDropzoneOptions" class="img-list-wrapper">
          <vue2Dropzone ref="itemImgDropzone" id="item-img-dropzone" :options="currentDropzoneOptions"></vue2Dropzone>
        </div>

      </div>
    </div>

    <div class="status">
      <a @click.prevent="toggleSelectedProjectItemCompleteState">
        <p-check class="p-switch p-fill" color="success" v-model="currentProjectItem.completed">Completed?</p-check>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

// TODO
// Fix thumb width issue where 'remove' box takes up too much room
// Enable the ability to delete from the server
// Render out images above the uploader, deletion and ability to zoom (modal)

export default {
  name: 'ProjectCardDetails',

  data() {
    return {
      descriptionEditMode: false,
    }
  },

  components: {
    vue2Dropzone
  },

  computed: {
    ...mapGetters([
      'currentProjectItem',
      'currentCheckListItems',
      'getNewCheckListItemFormStatus',
      'getTemporaryDescription',
      'currentDropzoneOptions'
    ]),
  },

  methods: {
    ...mapMutations([
      'CLEAR_SELECTED_PROJECT_ITEM',
      'ADD_TO_CHECK_LIST_ITEMS',
      'TOGGLE_NEW_CHECK_LIST_ITEM_FORM_STATUS',
      'TOGGLE_SELECTED_ITEM_COMPLETE_STATUS',
      'UPDATE_SELECTED_PROJECT_ITEM_DESCRIPTION',
      'SET_TEMPORARY_DESCRIPTION'
    ]),

    ...mapActions([
      'updateProductLineItem',
      'createCheckListItem',
      'updateCheckListItemCompleteStatus',
      'retrieveListItemCompletionStatus'
    ]),

    toggleNewCheckListItemForm() {
      this.TOGGLE_NEW_CHECK_LIST_ITEM_FORM_STATUS();
      if (this.getNewCheckListItemFormStatus) {
        this.$nextTick(() => this.$refs.checkListInput.focus())
      }
    },

    toggleCheckListItemCompleteStatus(listItem) {
      this.updateCheckListItemCompleteStatus(listItem);
    },

    addToCheckListItems(event) {
      this.createCheckListItem(event.target[0].value);
      event.target[0].value = "";
    },

    editDescription() {
      this.descriptionEditMode = true;

      if (this.descriptionEditMode) {
        this.$nextTick(() => this.$refs.description.focus())
      }
    },

    cancelDescriptionEdit(event) {
      this.descriptionEditMode = false;
    },

    closeCard() {
      this.CLEAR_SELECTED_PROJECT_ITEM()
    },

    toggleSelectedProjectItemCompleteState() {
      this.TOGGLE_SELECTED_ITEM_COMPLETE_STATUS();
      this.updateProductLineItem();
    },

    updateLineItem() {
      this.updateProductLineItem();
    },

    handleDescriptionChange(event) {
      this.SET_TEMPORARY_DESCRIPTION(event.target.value);
    },

    updateDescription() {
      this.UPDATE_SELECTED_PROJECT_ITEM_DESCRIPTION(this.getTemporaryDescription);
      this.updateProductLineItem();
      this.descriptionEditMode = false;
    }
  }
}
</script>