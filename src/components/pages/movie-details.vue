<template>
  <div class="container">
    <div class="movie-details" v-if="movieDetails">
      <div class="movie-details__left-side">
        <div class="movie-details__poster" :style="{ backgroundImage: `url(${movieDetails.image})` }"></div>
        <div class="movie-details__additional-info" v-html="movieDetails.additional">
        </div>
      </div>
      <div class="movie-details__right-side">
        <div class="movie-details__name" v-html="movieDetails.name">
        </div>
        <div class="movie-details__description" v-html="movieDetails.description">
        </div>
        <template v-if="!bookingDetails">
          <div class="sessions">
            <div class="sessions__title">Обрати сеанс:</div>

            <div class="sessions__select-block" v-if="showsTimeByDate">
              <div class="sessions__date">
                <div
                  class="sessions__date-item badge"
                  v-for="(_, date) in showsTimeByDate"
                  :key="date"
                  :class="{'active': date === model.showdate}"
                  @click="selectDate(date)"
                >
                  {{ date | date}}
                </div>
              </div>

              <div class="sessions__time">
                <div
                  class="sessions__time-item badge"
                  v-for="time in showsTimeByDate[model.showdate]"
                  :key="time"
                  :class="{'active': time === model.daytime}"
                  @click="selectTime(time)"
                >
                  {{ time }}
                </div>
                <hall class="sessions__seats" v-model="seats"></hall>
              </div>
            </div>
          </div>
          <button
            :disabled="disabledButton"
            class="booking-button"
            @click="booking"
          >
            КУПИТИ
          </button>
        </template>
        <div v-else class="booking-result">
          <ticket></ticket>
          <button
            class="booking-button"
            @click="resetBookingDetails"
          >
            Oбрати інше місце
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Hall from '@/components/general/hall'
import Ticket from '@/components/general/ticket'

export default {
  name: 'MovieDetailsPage',
  components: { Hall, Ticket },
  data() {
    return {
      model: {
        movie_id: this.$route.params.id,
        daytime: '',
        showdate: '',
      },
      seats: {
        row: null,
        seat: null,
      }
    }
  },
  filters: {
    date: date => new Date(date).toLocaleDateString('ru-Ru')
  },
  watch: {
    showsTimeByDate(val) {
      if (!val) return
      this.model.showdate = Object.keys(val)[0]
      this.model.daytime = val[this.model.showdate][0]
    },
    model: {
      handler(val) {
        const hasEmptyValue = Object.values(val).some(value => !value)
        if (hasEmptyValue) return
        this.getPlaces(this.model)
      },
      deep: true,
    }
  },
  computed: {
    ...mapGetters(['movieDetails', 'showsByMovie', 'bookingDetails']),
    showsTimeByDate() {
      if (!this.showsByMovie) return null
      return this.showsByMovie.reduce(
        (result, show) => {
          result[show.showdate] = show.daytime.split(';')
          return result
        },
        {}
      );
    },
    disabledButton() {
      return Object.values({...this.model, ...this.seats}).some(value => !value)
    },
  },
  methods: {
    ...mapActions([
      'getMovieById',
      'getShowsByMovie',
      'getPlaces',
      'bookingTicket',
      'resetMovieDetails',
      'resetBookingDetails'
    ]),
    selectDate(date) {
      this.model.showdate = date
      this.model.daytime = this.showsTimeByDate[date][0]
      this.seats = { row: null, seat: null }
    },
    selectTime(time) {
      this.model.daytime = time
      this.seats = { row: null, seat: null }
    },
    async booking() {
      try {
        const {error_code, error_message} = await this.bookingTicket({...this.model, ...this.seats})
        if (error_code) {
          this.$toast.error(error_message)
          return
        }
        this.$toast.success('Квиток заброньований')
      } catch (err) {
        this.$toast.error('Не вдалося забронювати квиток')
      }
    }
  },
  created(){
    this.getMovieById(this.model.movie_id)
    this.getShowsByMovie(this.model.movie_id)
  },
  destroyed() {
    this.resetMovieDetails()
    this.resetBookingDetails()
  }
}
</script>

<style lang="scss">
.movie-details {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__poster {
    background-size: cover;
    background-position: center;
    width: 250px;
    height: 388px;
  }

  &__additional-info {
    ul {
      padding: 0;

      li {
        list-style-type: none;
        margin-bottom: 12px;
        font-size: .9em;
        color: #3e3e3e;
        line-height: 20px;
        word-wrap: break-word;
        display: flex;

        a {
          color: black;
          pointer-events: none;
        }
      }

      .key {
        font-weight: 600;
        margin-right: 5px;
        width: 105px;
        min-width: 105px;
      }
    }
  }

  &__name {
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    text-align: center;
    margin: 40px 0;
  }

  &__description {
    text-indent: 1.5em;
    font-size: 16px;
    line-height: 21px;
  }

  &__left-side {
    max-width: 250px;
  }

  &__right-side {
    padding-left: 40px;
    flex: 1 1 0;
  }

  .sessions {
    width: 100%;

    &__title {
      font-weight: bold;
      text-align: center;
      font-size: 20px;
      margin: 40px 0;
    }

    &__select-block {
      display: flex;
    }

    &__date {
      width: 150px;
    }

    &__time-item {
      display: inline-block;
    }

    &__seats {
      margin-top: 20px;
    }

    .badge {
      border: 1px solid #3cb4e7;
      width: fit-content;
      height: fit-content;
      padding: 5px;
      color: #3cb4e7;
      margin-bottom: 8px;
      margin-right: 8px;
      border-radius: 3px;
      cursor: pointer;

      &.active {
        background-color: #3cb4e7;
        color: #fff;
      }
    }
  }

  .booking-button {
    float: right;
    padding: 10px 15px;
    margin-top: 20px;
    background: #3cb4e7;
    border: none;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    text-transform: uppercase;

    &:disabled {
      background: rgba(#3cb4e7, 0.6);
    }
  }
}
</style>
