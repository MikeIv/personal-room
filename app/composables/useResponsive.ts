import { ref, onMounted, onUnmounted } from "vue";

export const useResponsive = () => {
  const isMobile = ref(false);
  const isTabled = ref(false);
  const isDesktop = ref(false);

  const updateWidth = () => {
    isMobile.value = window.innerWidth < 768;
    isTabled.value = window.innerWidth > 767 && window.innerWidth < 1240;
    isDesktop.value = window.innerWidth > 1239;
  };

  onMounted(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
  });

  return {
    isMobile,
    isTabled,
    isDesktop,
  };
};
