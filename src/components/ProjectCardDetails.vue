<template>
  <div class="project-details-card">
    <div class="content">
      <div class="card-header">
        <div class="title">
          {{ selectedProjectItemTitle }}
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
      <p-check class="p-switch p-fill" color="success" v-model="selectedProjectLineItem.completed">Completed?</p-check>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'ProjectCardDetails',

  data() {
    return {
      updateLineItemUrl: "https://devworkflow-api.herokuapp.com/project_line_items/",
      loading: true,
      selectedProjectLineItem: {},
      descriptionEditMode: false,
      listItems: [],
      listItemForms: []
    }
  },

  beforeMount() {
    this.setSelectedItem();
  },

  beforeUpdate() {
    this.setSelectedItem();
  },

  watch: {
    selectedProjectLineItem: function(oldVal, newVal) {
      this.getListItems(oldVal.id);
    }
  },

  props: {
    selectedItemTitle: String,
    project: Object
  },

  computed: {
    ...mapState([
      'selectedProjectItemTitle'
    ]),
  },

  methods: {
    addListItem() {
      console.log("Adding list item")
      this.listItemForms.push({ title: 'asdfsdf' })
    },

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

    getListItems(projectLineItemId) {
      this.listItems = [];

      axios
        .get(`https://devworkflow-api.herokuapp.com/project_line_items/${projectLineItemId}`, { withCredentials: true })
        .then(response => {
          this.listItems.push(...response.data.project_line_item.check_list_items);
        })
        .catch(error => {
          console.log(error);
        });
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