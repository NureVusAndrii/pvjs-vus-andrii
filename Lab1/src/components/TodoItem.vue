<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps(['task'])
const emit = defineEmits(['remove', 'update'])

const isEditing = ref(false)
const editedText = ref(props.task.text)
const editInput = ref(null)

const startEdit = async () => {
  isEditing.value = true
  await nextTick()
  editInput.value.focus()
}

const save = () => {
  if (editedText.value.trim()) {
    emit('update', { ...props.task, text: editedText.value })
    isEditing.value = false
  }
}

const cancel = () => {
  editedText.value = props.task.text
  isEditing.value = false
}
</script>

<template>
  <li class="task-item" :class="{ completed: task.completed }">
    <label v-if="!isEditing" class="checkbox-container">
      <input type="checkbox" :checked="task.completed"
             @change="$emit('update', { ...task, completed: !task.completed })" />
      <span class="checkmark"></span>
    </label>

    <div class="task-text">
      <span v-if="!isEditing" @dblclick="startEdit">{{ task.text }}</span>
      <input
          v-else
          v-model="editedText"
          @keyup.enter="save"
          @keyup.esc="cancel"
          class="edit-mode-input"
          ref="editInput"
      />
    </div>

    <div class="task-actions">
      <template v-if="!isEditing">
        <button class="icon-btn edit-btn" @click="startEdit">✎</button>
        <button class="icon-btn delete-btn" @click="$emit('remove', task.id)">✕</button>
      </template>

      <template v-else>
        <button class="icon-btn confirm-btn" @click="save" title="Зберегти">✓</button>
        <button class="icon-btn cancel-btn" @click="cancel" title="Скасувати">↺</button>
      </template>
    </div>
  </li>
</template>