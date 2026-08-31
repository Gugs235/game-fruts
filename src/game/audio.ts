export class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfx: GainNode | null = null;
  private music: GainNode | null = null;
  private musicTimer = 0;
  private musicStep = 0;
  muted = false;
  masterGain = 0.7;
  sfxGain = 0.8;
  musicGain = 0.22;

  unlock() {
    try {
      if (!this.ctx) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        try {
          this.ctx = new AC({ latencyHint: "interactive" });
        } catch {
          this.ctx = new AC();
        }
        this.master = this.ctx.createGain();
        this.sfx = this.ctx.createGain();
        this.music = this.ctx.createGain();
        this.sfx.connect(this.master);
        this.music.connect(this.master);
        this.master.connect(this.ctx.destination);
        this.applyGains();
      }
      if (this.ctx.state === "suspended") void this.ctx.resume();
    } catch {
      /* autoplay / missing Web Audio */
    }
  }

  resume() {
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }

  setMuted(v: boolean) {
    this.muted = v;
    this.applyGains();
  }

  private applyGains() {
    const t = this.ctx?.currentTime ?? 0;
    const mute = this.muted ? 0 : 1;
    this.master?.gain.setTargetAtTime(this.masterGain * mute, t, 0.03);
    this.sfx?.gain.setTargetAtTime(this.sfxGain, t, 0.03);
    this.music?.gain.setTargetAtTime(this.musicGain, t, 0.05);
  }

  private tone(freq: number, dur: number, type: OscillatorType, vol: number, slide = 0) {
    if (!this.ctx || !this.sfx || this.muted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(this.sfx);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  move() {
    this.tone(420 + Math.random() * 40, 0.05, "square", 0.04);
  }
  crate() {
    this.tone(180, 0.08, "triangle", 0.12, -40);
    this.tone(520, 0.06, "square", 0.05);
  }
  power() {
    this.tone(660, 0.1, "sawtooth", 0.08, 220);
    this.tone(880, 0.12, "square", 0.05);
  }
  hit() {
    this.tone(140, 0.14, "sawtooth", 0.16, -80);
    this.tone(90, 0.18, "triangle", 0.1);
  }
  kill() {
    this.tone(520, 0.12, "square", 0.1, 300);
    this.tone(780, 0.16, "triangle", 0.07);
  }
  hurt() {
    this.tone(220, 0.2, "sawtooth", 0.14, -160);
  }
  win() {
    this.tone(523, 0.16, "triangle", 0.12);
    this.tone(659, 0.18, "triangle", 0.1);
    this.tone(784, 0.28, "triangle", 0.1);
  }
  lose() {
    this.tone(196, 0.3, "sawtooth", 0.12, -80);
    this.tone(130, 0.4, "triangle", 0.1, -40);
  }
  pickup() {
    this.tone(880, 0.08, "square", 0.07, 200);
    this.tone(1320, 0.1, "triangle", 0.05);
  }

  tickMusic(dt: number, intense: boolean) {
    if (!this.ctx || !this.music || this.muted) return;
    this.musicTimer += dt;
    const stepDur = intense ? 0.22 : 0.32;
    if (this.musicTimer < stepDur) return;
    this.musicTimer = 0;
    const scale = intense ? [196, 233, 261, 311, 349, 311, 261, 233] : [262, 294, 330, 392, 330, 294, 262, 196];
    const freq = scale[this.musicStep % scale.length]!;
    this.musicStep++;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.045, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + stepDur * 0.9);
    osc.connect(g);
    g.connect(this.music);
    osc.start(t);
    osc.stop(t + stepDur);
  }
}
