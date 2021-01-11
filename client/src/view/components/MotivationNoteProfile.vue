<template>
  <div>
    <div v-if="!!motivationNote">
      <h1>Заметка о мотивации номер {{ motivationNote.id }}</h1>
      <p>{{ motivationNote.text }}</p>
    </div>
    <div v-else>
      <p>Error: {{ this.error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MotivationNote from "../../model/MotivationNote";
import { MotivationNoteService } from "@/data/MotivationNoteService";

@Component
export default class MotivationNoteProfile extends Vue {
  @Prop() motivationNoteId!: number;

  motivationNote: MotivationNote | null = null;
  error: Error | null = null;

  async mounted() {
    try {
      this.motivationNote = await MotivationNoteService.getMotivationNoteById(
        this.motivationNoteId
      );
    } catch (e) {
      // error
    }
  }
}
</script>
