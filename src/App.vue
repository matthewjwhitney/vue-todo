<template>
  <div id="app">
    <section class="hero has-background-blue-gradient is-fullheight">
      <div class="hero-head">
        <NavBar subtitle="To Do"/>
      </div>
      <div class="hero-body">
        <div
          v-masonry
          transition-duration="0.3s"
          item-selector=".masonryItem"
          fit-width="true"
          column-width="1"
        >
          <NewItemCard v-bind:addItem="addItem"/>
          <ItemCard
            v-for="item in items"
            v-bind:key="item.id"
            v-bind:item="item"
            v-bind:updateItem="updateItem"
            v-bind:deleteItem="deleteItem"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ItemCard from "./components/ItemCard.vue";
import NewItemCard from "./components/NewItemCard.vue";

export default {
  name: "app",
  components: {
    NavBar,
    ItemCard,
    NewItemCard
  },

  data() {
    return {
      items: [],
      url: "https://todo-api.cogb.us/items",
      headers: {
        "Content-Type": "application/json",
        "candidate-uuid": "7b70cad8-d751-4c69-8984-72a366c42a22"
      }
    };
  },

  mounted() {
    this.getItems();
  },

  methods: {
    async getItems() {
      try {
        const response = await fetch(`${this.url}/`, {
          method: "GET",
          headers: this.headers
        });
        const data = await response.json();
        this.items = data.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async addItem(newItem) {
      console.log(newItem);
      try {
        const response = await fetch(this.url, {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: this.headers
        });
        const data = await response.json();
        console.log(data);
        this.items = [...this.items, data].sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async updateItem(id, updatedItem) {
      try {
        const response = await fetch(`${this.url}/${id}`, {
          method: "PUT",
          body: JSON.stringify(updatedItem),
          headers: this.headers
        });
        const data = await response.json();
        this.items = this.items.map(item => (item.id === id ? data : item));
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async deleteItem(id) {
      try {
        await fetch(`${this.url}/${id}`, {
          method: "DELETE",
          headers: this.headers
        });
        this.items = this.items.filter(item => item.id !== id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&display=swap");

//!IMPORTANT bulma sass variable overrides must be BEFORE the bulma import!
$myndshft-orange: #ee5f31;
$primary: $myndshft-orange;
$light: #d5d4ff;

$card-background-color: #050f31;
$card-color: $light;
$card-header-color: $light;
$card-shadow: 0;

$input-color: $light;

$radius-rounded: 16px;

@import "~bulma/bulma";

//!IMPORTANT bulma class overrides must be AFTER the bulma import!
html {
  overflow: auto;
}

.is-rounded {
  border-radius: $radius-rounded !important;
}

//nested selectors in a custom 'todo-card' css class so that the overrides don't affect the usage of the bulma classes elsewhere in the app
.todo-card {
  width: 17em;
  margin: 0.5em;
  border: 1px solid $light;

  .card-content {
    padding: 0.75em 1em;
  }
  .content {
    min-height: 64px;
  }
  .button.is-primary.is-outlined:focus {
    background-color: transparent;
    color: $myndshft-orange;
  }
  .input {
    background-color: transparent;
  }
  .textarea {
    min-height: 4em !important;
    background-color: transparent;
  }
  .card-header-title {
    min-height: 4em;
  }
}
#app {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.has-background-blue-gradient {
  background-image: linear-gradient(85deg, #010e28 0%, #1934f8 100%);
}
.hero-body {
  -webkit-box-align: start !important;
  -ms-flex-align: start !important;
  align-items: start !important;
}
</style>
