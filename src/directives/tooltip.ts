function handleClick(
  target: any,
  binding: { value: { width: number; message: string } },
) {
  const rect = target.getBoundingClientRect()
  const isHidden = rect.width > binding.value.width
  if (isHidden) {
    target.style.overflow = 'hidden'
    target.style.textOverflow = 'ellipsis'
    target.style.whiteSpace = 'nowrap'
  }
  function handle(e: any) {
    if (target && (isHidden || rect.width === 0)) {
      let ripple: any = document.querySelector('.tooltip-hover')

      if (!ripple) {
        ripple = document.createElement('span')
        ripple.className = 'tooltip-hover'
        ripple.innerText = binding.value.message
        document.body.append(ripple)
      }
      else {
        ripple.innerText = binding.value.message
      }

      ripple.style.top = `${e.pageY - 28}px`
      ripple.style.left = `${e.pageX + 6}px`
      return false
    }
  }

  if (!(target as any).context) {
    (target as any).context = {
      removeHandle: handle,
    }
  }
  else {
    (target as any).context.removeHandle = handle
  }

  return handle
}

function removeRipple() {
  const ripple = document.querySelector('.tooltip-hover')
  if (ripple && ripple.parentNode) {
    ripple.parentNode.removeChild(ripple)
  }
}

export default {
  mounted(el: any, binding: { value: { width: number; message: string } }) {
    el.addEventListener('mousemove', handleClick(el, binding), false)
    el.addEventListener('mouseleave', removeRipple, false)
  },
  updated(el: any, binding: { value: any }) {
    el.removeEventListener(
      'mouseenter',
      (el as any).context.removeHandle,
      false,
    )
    el.addEventListener('mouseenter', handleClick(el, binding), false)
    el.addEventListener('mouseleave', removeRipple, false)
  },
  unmounted(el: {
    [x: string]: any
    removeEventListener: (arg0: string, arg1: any, arg2: boolean) => void
  }) {
    el.removeEventListener('mouseenter', el.context.removeHandle, false)
    el.context = null
    delete el.context
    removeRipple()
    el.removeEventListener('mouseleave', removeRipple, false)
  },
}
