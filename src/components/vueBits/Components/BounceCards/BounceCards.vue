<template>
  <div
    :class="['relative flex items-center justify-center', className]"
    :style="{
      width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth,
      height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight,
    }"
  >
    <div
      v-for="(src, idx) in images"
      :key="idx"
      ref="cardRefs"
      class="absolute w-[200px] h-[280px] opacity-0 cursor-grab active:cursor-grabbing pixel-corners"
      :style="{ transform: transformStyles[idx] ?? 'none' }"
      @mouseenter="() => pushSiblings(idx)"
      @mouseleave="resetSiblings"
    >
      <img
        class="absolute inset-0 w-full h-full object-contain z-[2] transition-opacity duration-700 ease-out pointer-events-none"
        :src="src"
        :alt="`card-${idx}`"
        :style="{ opacity: imageLoaded[idx] ? 1 : 0 }"
        @load="() => onImageLoad(idx)"
        @error="() => onImageError(idx)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export interface BounceCardsProps {
  className?: string
  images?: string[]
  links?: string[]
  containerWidth?: number | string
  containerHeight?: number | string
  animationDelay?: number
  animationStagger?: number
  easeType?: string
  transformStyles?: string[]
  enableHover?: boolean
}

const props = withDefaults(defineProps<BounceCardsProps>(), {
  className: '',
  images: () => [],
  links: () => [],
  containerWidth: 400,
  containerHeight: 400,
  animationDelay: 0.5,
  animationStagger: 0.06,
  easeType: 'elastic.out(1, 0.8)',
  transformStyles: () => [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover: true,
})

const imageLoaded = ref(new Array(props.images.length).fill(false))
const cardRefs = ref<HTMLElement[]>([])
const draggables = ref<any[]>([])
const isDragging = ref<boolean[]>(new Array(props.images.length).fill(false))
const wasDragged = ref<boolean[]>(new Array(props.images.length).fill(false))

const getNoRotationTransform = (transformStr: string): string => {
  const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
  if (hasRotate) {
    return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
  } else if (transformStr === 'none') {
    return 'rotate(0deg)'
  } else {
    return `${transformStr} rotate(0deg)`
  }
}

const getPushedTransform = (baseTransform: string, offsetX: number): string => {
  const translateRegex = /translate\(([-0-9.]+)px\)/
  const match = baseTransform.match(translateRegex)
  if (match) {
    const currentX = parseFloat(match[1])
    const newX = currentX + offsetX
    return baseTransform.replace(translateRegex, `translate(${newX}px)`)
  } else {
    return baseTransform === 'none'
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`
  }
}

const pushSiblings = (hoveredIdx: number) => {
  if (!props.enableHover || isDragging.value[hoveredIdx]) return

  props.images.forEach((_, i) => {
    if (isDragging.value[i]) return
    gsap.killTweensOf(cardRefs.value[i])

    const baseTransform = props.transformStyles[i] || 'none'

    if (i === hoveredIdx) {
      const noRotationTransform = getNoRotationTransform(baseTransform)
      gsap.to(cardRefs.value[i], {
        transform: noRotationTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      })
    } else {
      const offsetX = i < hoveredIdx ? -160 : 160
      const pushedTransform = getPushedTransform(baseTransform, offsetX)
      const distance = Math.abs(hoveredIdx - i)
      const delay = distance * 0.05

      gsap.to(cardRefs.value[i], {
        transform: pushedTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        delay,
        overwrite: 'auto',
      })
    }
  })
}

const resetSiblings = () => {
  if (!props.enableHover) return

  props.images.forEach((_, i) => {
    if (isDragging.value[i]) return
    gsap.killTweensOf(cardRefs.value[i])
    const baseTransform = props.transformStyles[i] || 'none'
    gsap.to(cardRefs.value[i], {
      transform: baseTransform,
      duration: 0.4,
      ease: 'back.out(1.4)',
      overwrite: 'auto',
    })
  })
}

const onImageLoad = (idx: number) => {
  imageLoaded.value[idx] = true
}

const onImageError = (idx: number) => {
  imageLoaded.value[idx] = true
}

const playEntranceAnimation = () => {
  gsap.killTweensOf(cardRefs.value)
  gsap.set(cardRefs.value, { opacity: 0, scale: 0 })

  gsap.fromTo(
    cardRefs.value,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      stagger: props.animationStagger,
      ease: props.easeType,
      delay: props.animationDelay,
      onComplete: initializeDraggables,
    },
  )
}

const initializeDraggables = () => {
  cardRefs.value.forEach((card, idx) => {
    if (card) {
      const draggable = Draggable.create(card, {
        type: 'x,y',
        inertia: false,
        zIndexBoost: false,
        dragClickables: false,
        onPress: function () {
          wasDragged.value[idx] = false
        },
        onDragStart: function () {
          isDragging.value[idx] = true
          wasDragged.value[idx] = true
          gsap.to(this.target, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out',
          })
        },
        onDragEnd: function () {
          isDragging.value[idx] = false
          // Snap back to original position (x:0, y:0 relative to transform origin)
          gsap.to(this.target, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          })
        },
        onClick: function () {
          if (!wasDragged.value[idx] && props.links[idx]) {
            window.open(props.links[idx], '_blank')
          }
        },
      })
      draggables.value[idx] = draggable[0]
    }
  })
}

onMounted(playEntranceAnimation)
watch(
  () => props.images,
  async () => {
    await nextTick()
    gsap.set(cardRefs.value, { opacity: 0, scale: 0 })
    playEntranceAnimation()
  },
)

onUnmounted(() => {
  gsap.killTweensOf(cardRefs.value)
  draggables.value.forEach((draggable) => {
    if (draggable) {
      draggable.kill()
    }
  })
})
</script>

<style scoped>
/* Pixel-art style rounded corners like Balatro cards */
.pixel-corners {
  clip-path: polygon(
    /* Top-left corner */ 2% 6px,
    4px 6px,
    4px 4px,
    6px 4px,
    6px 2%,
    /* Top-right corner */ calc(100% - 6px) 2%,
    calc(100% - 6px) 4px,
    calc(100% - 4px) 4px,
    calc(100% - 4px) 6px,
    calc(100% - 2%) 6px,
    /* Bottom-right corner */ calc(100% - 2%) calc(100% - 6px),
    calc(100% - 4px) calc(100% - 6px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 6px) calc(100% - 4px),
    calc(100% - 6px) calc(100% - 2%),
    /* Bottom-left corner */ 6px calc(100% - 2%),
    6px calc(100% - 4px),
    4px calc(100% - 4px),
    4px calc(100% - 6px),
    2% calc(100% - 6px)
  );
}

.shimmer-container {
  background: linear-gradient(
    110deg,
    transparent 40%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 60%
  );
  background-size: 600% 600%;
  background-position: -600% 0;
  animation: shimmer-sweep 6s infinite;
}

@keyframes shimmer-sweep {
  0% {
    background-position: -600% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
