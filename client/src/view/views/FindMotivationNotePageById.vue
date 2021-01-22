<template>
  <div class="find">
    <button @click="navigateToHome">
      Домой
    </button>
    <form @submit.prevent="findMotivationNotes">
      <label>
        Номер заметки:
        <input v-model="noteId" type="number" />
      </label>
      <button type="submit">Найти заметку по номеру</button>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MotivationNoteService } from "@/data/MotivationNoteService";

  @Component({})
  export default class FindMotivationNotePage extends Vue {
    noteId: number | null = null;

    async findMotivationNotes() {
      if (this.noteId) {
        await MotivationNoteService.findMotivationNoteById(this.noteId);
        await this.$router.replace("/");
      }
    }

    navigateToHome() {
      this.$router.push({ path: `/` });
    }
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
</style>
