<template>
  <div class="random">
    <button @click="navigateToHome">
      Домой
    </button>
    <form @submit.prevent="getRandomMotivationNote">
      <button type="submit">Мотивироваться</button>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { MotivationNoteService } from "@/data/MotivationNoteService";

  @Component({})
  export default class RandomMotivationNotePage extends Vue {
    async getRandomMotivationNote() {
      await MotivationNoteService.getRandomMotivationNote();
      await this.$router.replace("/");
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
