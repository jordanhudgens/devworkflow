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

            <a class="link" @click.prevent="addListItem">
              <h3 class="teal">
                <i class="fas fa-plus-circle"></i>
              </h3>
            </a>
          </div>

          <div v-if="listItems.length > 0">
            <div v-for="listItem in listItems" :key="listItem.id" class="list-item">
              {{ listItem.title }}
            </div>
          </div>
          <div v-else class="placeholder-text">
            No checklist items added yet
          </div>

          <div v-if="listItemForms.length > 0">
            <div v-for="(listItemForm, idx) in listItemForms" :key="idx" class="form-element">
              <input type="text" placeholder="Content here">
              <!-- TODO <ListItemForm :formElements="formElements" :id="idx" @update="updateListItemValues" />  -->
            </div>
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
      listItems: [],
      listItemForms: []
    }
  },

  computed: {
    ...mapGetters([
      'currentProjectItem'
    ]),
  },

  methods: {
    ...mapMutations([
      'CLEAR_SELECTED_PROJECT_ITEM'
    ]),

    ...mapActions([
      'updateProductLineItem',
    ]),

    addListItem() {
      this.listItemForms.push({ title: 'asdfsdf' })
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