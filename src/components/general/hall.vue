<template>
  <div class="hall" v-if="formattedPlaces">
    <div class="hall__screen">ЕКРАН</div>
    <div class="hall__row" v-for="line in formattedPlaces" :key="line.row">
      <span class="hall__row-number">{{ line.row }}</span>
      <div
        v-for="place in line.seats"
        :key="place.seat"
        class="hall__row-seat"
        :class="{
          'disabled': !place.is_free,
          'selected': value.row === line.row && value.seat === place.seat
        }"
        @click="selectSeat(line.row, place.seat)"
      >
      </div>
    </div>
  </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'

export default {
  name: 'Hall',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    ...mapGetters(['places']),
    formattedPlaces() {
      if (!this.places) return null
      const newArray = this.places.map(item => ({ row: item[0].row, seats: item[1] }))
      newArray.sort((a, b) => a.row < b.row ? -1 : 1)
      return newArray
    }
  },
  methods: {
    selectSeat(row, seat) {
      this.$emit('input', { row, seat })
    }
  }
}
</script>

<style lang="scss">
.hall {
  &__row {
    display: flex;
    margin-bottom: 10px;
    align-items: center;

    &-number {
      display: inline-block;
      width: 25px;
    }

    &-seat {
      padding: 8px 5px;
      border: 1px solid #3cb4e7;
      border-radius: 3px;
      cursor: pointer;
      margin-right: 5px;

      &.selected {
        background-color: #3cb4e7;
      }

      &.disabled {
        pointer-events: none;
        background: #ededed;
      }
    }
  }

  &__screen {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    color: #b9b9b9;
  }
}
</style>
