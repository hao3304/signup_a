<template>
  <div class="p-loading">
    <div class="circles">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "p-loading"
};
</script>
<style>
.p-loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circles {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  margin: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: loading 1.5s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.circle1 {
  background: #bac7f2;
}

.circle2 {
  background: #866cdd;
  animation-delay: 200ms;
}

.circle3 {
  background: #6fe3d4;
  animation-delay: 400ms;
}

@keyframes loading {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
