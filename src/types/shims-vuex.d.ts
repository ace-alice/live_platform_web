import { type Emitter, type } from 'mitt'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    mittBus: Emitter<any>
  }
}
