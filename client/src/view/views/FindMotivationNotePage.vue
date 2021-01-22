<template>
  <div class="find">
    <button @click="navigateToHome">
      Домой
    </button>
    <form @submit.prevent="findMotivationNotes">
      <label>
        Подстрока заметки:
        <input v-model="noteSubstring" type="text" />
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
