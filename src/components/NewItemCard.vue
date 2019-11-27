<template>
  <div class="masonryItem card is-rounded todo-card" v-masonry-tile>
    <header class="card-header">
      <div class="card-header-title">
        <div class="field">
          <div class="control">
            <input
              class="input is-primary is-rounded"
              type="text"
              v-model="title"
              placeholder="New Title"
            />
          </div>
        </div>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="control">
          <textarea
            class="textarea is-primary is-rounded"
            placeholder="New Description"
            v-model="description"
          ></textarea>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <a
              href="#"
              class="button is-small is-primary is-rounded is-outlined"
              v-on:click="handleSave"
            >
              <span class="icon is-large">
                <font-awesome-icon icon="save" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewItemCard",
  props: {
    addItem: Function
  },
  data() {
    return {
      title: "",
      description: "",
      done: false
    };
  },
  methods: {
    handleSave() {
      this.addItem({
        title: this.title,
        description: this.description,
        done: this.done
      });
      this.title = "";
      this.description = "";
      this.done = false;
    }
  }
};
</script>
