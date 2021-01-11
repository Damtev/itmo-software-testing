<template>
  <div class="about">
    <button @click="navigateToHome">
      Домой
    </button>
    <MotivationNoteProfile :motivation-note-id="motivationNoteId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MotivationNoteProfile from "../components/MotivationNoteProfile.vue";

@Component({
  components: { MotivationNoteProfile }
})
export default class MotivationNoteDetailPage extends Vue {
  motivationNoteId!: number;

  created() {
    this.motivationNoteId = Number.parseInt(this.$route.params.id);
  }

  navigateToHome() {
    this.$router.push({ path: `/` });
  }
}
</script>
