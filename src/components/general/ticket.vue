<template>
<div class="ticket">
  <h3>Ваш квиток!</h3>
  <div class="cardWrap">
    <div class="card cardLeft">
      <h1 v-html="movieDetails.name"></h1>
      <div class="movie-name">
        <h2>{{bookingDetails.showdate | date}}</h2>
        <span>Дата</span>
      </div>
      <div class="time">
        <h2>{{bookingDetails.daytime}}</h2>
        <span>Час</span>
      </div>
      <div class="row">
        <h2>{{bookingDetails.row}}</h2>
        <span>Ряд</span>
      </div>
      <div class="seat">
        <h2>{{bookingDetails.seat}}</h2>
        <span>Місце</span>
      </div>

    </div>
    <div class="card cardRight">
      <div class="number">
        <h3>{{bookingDetails.seat}}</h3>
        <span>Місце</span>
      </div>
      <svg ref="barcode" id="barcode"></svg>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import JsBarcode from 'jsbarcode'

export default {
  name: 'TicketComponent',
  filters: {
    date: date => new Date(date).toLocaleDateString('ru-Ru')
  },
  computed: {
    ...mapGetters(['bookingDetails', 'movieDetails'])
  },
  mounted() {
    JsBarcode(
      this.$refs.barcode,
      this.bookingDetails.ticketkey,
      {
        background: '#ecedef',
        height: 150
      });
  }
}
</script>


<style lang="scss">
.ticket {
  margin-top: 40px;
  h3 {
    text-align: center;
    font-size: 18px;
  }
  .cardWrap {
    display: flex;
    justify-content: center;
    margin: 40px auto;
    color: #fff;
    font-family: sans-serif;
  }

  .card {
    background: linear-gradient(to bottom, #3cb4e7 0%, #3cb4e7 26%, #ecedef 26%, #ecedef 100%);
    height: 200px;
    float: left;
    position: relative;
    padding: 1em;
  }

  .cardLeft {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 300px;
  }

  .cardRight {
    width: 250px;
    border-left: .18em dashed #fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      display: block;
      width: .9em;
      height: .9em;
      background: #fff;
      border-radius: 50%;
      left: -.5em;
    }
    &:before {
      top: -.4em;
    }
    &:after {
    bottom: -.4em;
    }
  }

  h1 {
    font-size: 1.1em;
    margin-top: 0;
    span {
      font-weight: normal;
    }
  }

  .movie-name, .time, .row, .seat {
    text-transform: uppercase;
    font-weight: normal;
    h2 {
      font-size: .9em;
      color: #525252;
      margin: 0;
     }
    span {
      font-size: .7em;
      color: #a2aeae;
    }
  }

  .movie-name {
    margin: 2em 0 0 0;
  }

  .time, .row {
    margin: .7em 0 0 0;
  }

  .seat {
    margin: .7em 0 0 1em;
  }

  .row, .seat {
    float: left;
  }

  .number {
    margin-top: 50px;
    text-align: center;
    text-transform: uppercase;
    h3 {
      color: #3cb4e7;
      margin: .9em 0 0 0;
      font-size: 35px;
      line-height: 35px;
    }
    span {
      display: block;
      color: #a2aeae;
    }
  }

  #barcode {
    height: 5em;
    width: 100%;
  }
}
</style>