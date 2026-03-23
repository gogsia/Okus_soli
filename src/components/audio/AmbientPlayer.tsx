'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useMood } from '@/components/mood/MoodProvider';
import { AmbientToggle } from './AmbientToggle';

const MOOD_TRACKS: Record<string, string> = {
  DAWN_CRISP: '/audio/ambient-morning.ogg',
  MIDDAY_FULL: '/audio/ambient-terrace.ogg',
  AMBER_HOUR: '/audio/ambient-terrace.ogg',
  NOCTURNE: '/audio/ambient-night.ogg',
};

const FALLBACK_TRACKS: Record<string, string> = {
  DAWN_CRISP: '/audio/ambient-morning.mp3',
  MIDDAY_FULL: '/audio/ambient-terrace.mp3',
  AMBER_HOUR: '/audio/ambient-terrace.mp3',
  NOCTURNE: '/audio/ambient-night.mp3',
};

function doFadeIn(audio: HTMLAudioElement, fadeRef: React.RefObject<number>, target = 0.3, duration = 2000) {
  const start = performance.now();
  const from = audio.volume;
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    audio.volume = from + (target - from) * progress;
    if (progress < 1) fadeRef.current = requestAnimationFrame(step);
  };
  fadeRef.current = requestAnimationFrame(step);
}

function doFadeOut(audio: HTMLAudioElement, fadeRef: React.RefObject<number>, onComplete?: () => void, duration = 1500) {
  const start = performance.now();
  const from = audio.volume;
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    audio.volume = from * (1 - progress);
    if (progress < 1) {
      fadeRef.current = requestAnimationFrame(step);
    } else if (onComplete) {
      onComplete();
    } else {
      audio.pause();
    }
  };
  fadeRef.current = requestAnimationFrame(step);
}

export function AmbientPlayer() {
  const mood = useMood();
  const [enabled, setEnabled] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number>(0);

  const toggle = useCallback(() => {
    if (initialized) {
      const audio = audioRef.current;
      if (!audio) return;
      if (enabled) {
        doFadeOut(audio, fadeRef);
        setEnabled(false);
      } else {
        audio.play().catch(() => {});
        doFadeIn(audio, fadeRef);
        setEnabled(true);
      }
      return;
    }

    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    setInitialized(true);

    const canPlayOgg = audio.canPlayType('audio/ogg; codecs=opus');
    audio.src = canPlayOgg ? MOOD_TRACKS[mood] : FALLBACK_TRACKS[mood];

    audio.play().catch(() => {});
    doFadeIn(audio, fadeRef);
    setEnabled(true);
  }, [initialized, mood, enabled]);

  // Crossfade on mood change
  useEffect(() => {
    if (!initialized || !enabled) return;
    const audio = audioRef.current;
    if (!audio) return;

    const canPlayOgg = audio.canPlayType('audio/ogg; codecs=opus');
    const newSrc = canPlayOgg ? MOOD_TRACKS[mood] : FALLBACK_TRACKS[mood];

    if (audio.src.endsWith(newSrc.split('/').pop() || '')) return;

    doFadeOut(audio, fadeRef, () => {
      audio.src = newSrc;
      audio.play().catch(() => {});
      doFadeIn(audio, fadeRef);
    });
  }, [mood, initialized, enabled]);

  // Cleanup
  useEffect(() => {
    const fade = fadeRef;
    return () => {
      cancelAnimationFrame(fade.current);
      audioRef.current?.pause();
    };
  }, []);

  return <AmbientToggle onToggle={toggle} enabled={enabled} />;
}
