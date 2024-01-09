import gsap from 'gsap';

class PlayTimer {
  tween: gsap.core.Tween;
  time: number = 0;
  events: any;
  isPlay: boolean = false;
  isComplete: boolean = false;
  lastIndex: number = 0;
  // constructor - khoi tao luon timer
  constructor(duration: number, events: any) {
    this.tween = gsap.to(this, {
      time: duration,
      duration: duration / 1000,
      ease: 'none',
      paused: true,
    });
    this.events = events ?? [];
    this.tween
      .eventCallback('onStart', () => {
        this.isComplete = false;
      })
      .eventCallback('onUpdate', () => {
        console.log('onUpdate:', this.time);
        this.onTimeTicker();
      })
      .eventCallback('onComplete', () => {
        this.isComplete = true;
      });
  }
  //play
  play() {
    this.tween.play();
  }
  //pause
  pause() {
    this.tween.pause();
  }
  //run any frame
  private onTimeTicker() {
    const lastItem = this.events.findLastIndex((e: any) => e.time <= this.time);
    const tempIndex = Math.min(lastItem + 1, this.events.length);
    if (tempIndex > this.lastIndex) {
      const a = this.events.slice(this.lastIndex, tempIndex);
      for (let index = 0; index < a.length; index++) {
        // const element = a[index];
        // EventCore.emit(element.event, element.data, 'response', element);
      }
      this.lastIndex = tempIndex;
    }
  }
}
