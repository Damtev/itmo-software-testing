<template>
  <div class="find">
    <button @click="navigateToHome" id="back_home">
      Домой
    </button>
    <form @submit.prevent="findMotivationNotes" id="find_note_by_substring">
      <label>
        Подстрока заметки:
        <input v-model="noteSubstring" type="text" id="input_text" />
      </label>
      <button type="submit">Найти мотивацию</button>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MotivationNoteService } from "@/data/MotivationNoteService";

  @Component({})
  export default class FindMotivationNotePage extends Vue {
    noteSubstring: string | null = null;

    async findMotivationNotes() {
      if (this.noteSubstring) {
        await MotivationNoteService.findMotivationNotes(this.noteSubstring);
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
