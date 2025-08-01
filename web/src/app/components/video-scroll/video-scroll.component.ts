import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-video-scroll',
  standalone: false,
  templateUrl: './video-scroll.component.html',
  styleUrl: './video-scroll.component.scss'
})
export class VideoScrollComponent implements AfterViewInit {



  ngAfterViewInit(): void {

    setTimeout(() => {
      const video: HTMLVideoElement = document.getElementById('scroll-video') as HTMLVideoElement;
      video.load();
      video.currentTime = 0;
      // Clean up any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      this.whenVideoReady(video, this.setupVideoScrollAnimation(video));

    }, 100);
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }


  whenVideoReady(video: HTMLVideoElement, callback: any) {
    if (video.readyState >= 4) {
      // HAVE_ENOUGH_DATA
      callback();
    } else {
      video.addEventListener('loadedmetadata', callback);
    }
  }


  setupVideoScrollAnimation(video: HTMLVideoElement): void {

    gsap.registerPlugin(ScrollTrigger);

    video.addEventListener('loadeddata', () => {
      // const duration = video.duration;

      gsap.to(
        video,
        {
          currentTime: video.duration || 1,
          defaults: { duration: 1 },
          ease: "none",
          scrollTrigger: {
            trigger: '#container',
            start: "top top",
            end: "bottom+=1000 center", // extend the scroll distance
            // end: "bottom+=2000 top", // extend the scroll distance
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            // markers: true // For debugging only
          }
        }
      );
    });


  }

}
