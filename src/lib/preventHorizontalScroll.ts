/**
 * Previene el scroll horizontal accidental en dispositivos móviles
 * Especialmente útil para iOS Safari donde los gestos pueden activar
 * navegación hacia atrás/adelante o scroll horizontal no deseado
 */

let isHorizontalScrollPrevented = false;

interface TouchEventWithDirection extends TouchEvent {
  _direction?: 'horizontal' | 'vertical' | 'unknown';
}

export function initPreventHorizontalScroll() {
  if (isHorizontalScrollPrevented || typeof window === 'undefined') return;
  
  let startX = 0;
  let startY = 0;
  let isTracking = false;

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      isTracking = true;
    }
  };

  const handleTouchMove = (event: TouchEventWithDirection) => {
    if (!isTracking || event.touches.length !== 1) return;

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);

    // Determinar dirección del gesto basado en el delta más grande
    if (deltaX > 10 || deltaY > 10) {
      if (deltaX > deltaY) {
        // Movimiento principalmente horizontal
        event._direction = 'horizontal';
        
        // Prevenir scroll horizontal si:
        // 1. El movimiento es principalmente horizontal
        // 2. No estamos en un elemento con scroll horizontal permitido
        const target = event.target as Element;
        const hasHorizontalScroll = target.closest('.overflow-x-auto, .overflow-x-scroll, [data-allow-horizontal-scroll]');
        
        if (!hasHorizontalScroll) {
          event.preventDefault();
        }
      } else {
        // Movimiento principalmente vertical - permitir
        event._direction = 'vertical';
      }
      isTracking = false; // Parar tracking después de determinar dirección
    }
  };

  const handleTouchEnd = () => {
    isTracking = false;
  };

  // Añadir listeners con passive: false para poder llamar preventDefault
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });

  isHorizontalScrollPrevented = true;

  // Retornar función cleanup
  return () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    isHorizontalScrollPrevented = false;
  };
}

// Auto-inicializar en dispositivos móviles
if (typeof window !== 'undefined' && 'ontouchstart' in window) {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreventHorizontalScroll);
  } else {
    initPreventHorizontalScroll();
  }
}