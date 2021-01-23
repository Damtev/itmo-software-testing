<template>
  <div class="random">
    <button @click="navigateToHome" id="back_home">
      Домой
    </button>
    <form @submit.prevent="getRandomMotivationNote" id="get_random">
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
