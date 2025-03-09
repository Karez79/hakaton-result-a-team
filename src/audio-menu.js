let audio = false
let audioContext = null

export function initAudio() {
  document.addEventListener('click', () => {
    audio = true
    if(!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
  }, {once: true})
}

export function playSound(frequency = 440, duration = 0.1) {
  if(!audio || !audioContext) {
    return
  }
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.type = 'sine'
  gainNode.gain.value = 0.1
  oscillator.frequency.value = frequency

  oscillator.start()
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  oscillator.stop(audioContext.currentTime + duration)
}