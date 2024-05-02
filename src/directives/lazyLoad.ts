const heightAndWidth = ref<{
  [key: string]: {
    dHeight: string
    dWidth: string
  }
}>({})

const isInit = ref<any>({})

const ob = new IntersectionObserver(
  (entries: any[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (
          !isInit.value[entry.target.attributes['tag-code']?.value || 'data']
        ) {
          entry.target.call()
        }
        isInit.value[entry.target.attributes['tag-code']?.value || 'data']
          = true
      }
    }
  },
  {
    rootMargin: '60px',
  },
)

export default {
  mounted(
    el: any,
    binding: { value: { width: string; height: string; call: () => void } },
  ) {
    el.call = binding.value.call
    heightAndWidth.value[el.attributes['tag-code']?.value || 'data'] = {
      dHeight: '100%',
      dWidth: '100%',
    }
    if (binding.value) {
      heightAndWidth.value[el.attributes['tag-code']?.value || 'data'].dHeight = binding.value.height
      heightAndWidth.value[el.attributes['tag-code']?.value || 'data'].dWidth = binding.value.width
    }
    el.style.minWidth
            = heightAndWidth.value[
        el.attributes['tag-code']?.value || 'data'
      ].dWidth
    el.style.minHeight
            = heightAndWidth.value[
        el.attributes['tag-code']?.value || 'data'
      ].dHeight
    ob.observe(el)
  },
  unmounted(
    el: any,
  ) {
    ob.unobserve(el)
    delete isInit.value[el.attributes['tag-code']?.value || 'data']
    delete heightAndWidth.value[el.attributes['tag-code']?.value || 'data']
  },
}
