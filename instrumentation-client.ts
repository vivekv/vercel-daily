import { onCLS, onINP, onLCP } from 'web-vitals'

onLCP((metric) => {
  console.log('LCP:', metric.value, 'ms', 'Target: <2500ms')
})

onINP((metric) => {
  console.log('INP:', metric.value, 'ms', 'Target: <200ms')
})

onCLS((metric) => {
  console.log('CLS:', metric.value, 'Target: <0.1')
})