<template>
  <div class="motivation-notes">
    <h1>Заметки о мотивации</h1>
    <button @click="navigateToRandom" id="random_button">
      Случайная заметка о мотивации
    </button>
    <button @click="navigateToFind" id="find_string_button">
      Мотивироваться по строке
    </button>
    <button @click="navigateToFindById" id="find_id_button">
      Мотивироваться по номеру
    </button>
    <ul id="notes">
      <li
        class="motivation-notes__item"
        v-for="motivationNote of motivationNotes"
        :key="motivationNote.id"
        @click="navigateToNote(motivationNote)"
      >
        Заметка о мотивации: {{ motivationNote.id }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MotivationNoteService } from "@/data/MotivationNoteService";
  import MotivationNote from "../../model/MotivationNote";

  @Component({})
  export default class MotivationNotePage extends Vue {
    motivationNotes: MotivationNote[] = [];
    error: Error | null = null;

    async mounted() {
      try {
        this.motivationNotes = MotivationNoteService.getNotes();
      } catch (e) {
        this.error = e;
      }
    }

    navigateToNote(motivationNote: MotivationNote) {
      this.$router.push({ path: `/note/${motivationNote.id}` });
    }

    navigateToRandom() {
      this.$router.push({ path: `/random` });
    }

    navigateToFind() {
      this.$router.push({ path: `/find` });
    }

    navigateToFindById() {
      this.$router.push({ path: `/id` });
    }
  }
</script>

<style scoped>
  .motivation-notes__item {
    font-size: 16px;
    color: blue;
    cursor: pointer;
  }
</style>
