<template>
  <div class="preloader">
    <div class="fancy-spinner">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style lang="scss">
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3000;

  .fancy-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;

    div {
      position: absolute;
      width: 9rem;
      height: 9rem;
      border-radius: 50%;

      &.ring {
        border-width: 0.7rem;
        border-style: solid;
        border-color: transparent;
        animation: 2s fancy infinite alternate;

        &:nth-child(1) {
          border-left-color: #3cb4e7;
          border-right-color: #3cb4e7;
        }

        &:nth-child(2) {
          border-top-color: #3cb4e7;
          border-bottom-color: #3cb4e7;
          animation-delay: 1s;
        }
      }

      &.dot {
        width: 1rem;
        height: 1rem;
        background: #3cb4e7;
      }
    }
  }

  @keyframes fancy {
    to {
      transform: rotate(360deg) scale(0.5);
    }
  }
}
</style>