<template>
  <div class="masonryItem card is-rounded todo-card" v-masonry-tile>
    <header class="card-header">
      <p class="card-header-title" v-show="!editing">{{ item.title }}</p>
      <div class="card-header-title" v-show="editing">
        <div class="field">
          <div class="control">
            <input
              class="input is-primary is-rounded"
              type="text"
              v-model="item.title"
              placeholder="Title"
            />
          </div>
        </div>
      </div>
      <a href="#" class="card-header-icon" aria-label="more options">
        <a
          href="#"
          class="button is-small is-primary is-rounded"
          v-bind:class="{ 'is-outlined': !item.done, '': item.done }"
          v-on:click="handleToggleDone()"
        >
          <span class="icon is-large">
            <font-awesome-icon icon="check" />
          </span>
        </a>
      </a>
    </header>
    <div class="card-content">
      <div class="content" v-show="!editing">
        <div class="field">
          <div class="control">
            {{ item.description }}
          </div>
        </div>
      </div>
      <div class="content" v-show="editing">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea is-primary is-rounded"
              placeholder="Primary textarea"
              v-model="item.description"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <a
              href="#"
              class="button is-small is-primary is-rounded is-outlined"
              v-show="!editing"
              v-on:click="handleEdit"
            >
              <span class="icon is-large">
                <font-awesome-icon icon="edit" />
              </span>
            </a>
            <a
              href="#"
              class="button is-small is-primary is-rounded is-outlined"
              v-show="editing"
              v-on:click="handleSave"
            >
              <span class="icon is-large">
                <font-awesome-icon icon="save" />
              </span>
            </a>
          </div>
          <div class="level-item">
            <a
              href="#"
              class="button is-small is-primary is-rounded is-outlined"
              v-on:click="handleDelete()"
            >
              <span class="icon is-large">
                <font-awesome-icon icon="trash" />
              </span>
            </a>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span class="is-size-7">{{ moment(item.created) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "ItemCard",
  props: {
    item: Object,
    updateItem: Function,
    deleteItem: Function
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    moment(date) {
      return moment(date).format("MM/DD/YYYY, h:mm:ss a");
    },
    handleEdit() {
      this.editing = true;
    },
    handleSave() {
      this.editing = false;
      this.updateItem(this.item.id, {
        title: this.item.title,
        description: this.item.description,
        done: this.item.done
      });
    },
    handleDelete() {
      this.deleteItem(this.item.id);
    },
    handleToggleDone() {
      this.updateItem(this.item.id, {
        title: this.item.title,
        description: this.item.description,
        done: !this.item.done
      });
    }
  }
};
</script>
