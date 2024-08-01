import GamaSource from "../../core/GamaSource";
import GameAudio from "./GameAudio";

export default class AudioPlayer {

    private sources: GameAudio[] = [];
    private currentSourceIndex: number = -1;

    constructor(sources: string[] | string, volume: number = 50, auto: boolean = false) {

        if (typeof sources === 'string') {
            sources = [sources];
        }

        sources.forEach((source) => {

            const audio = GamaSource.ASSETS.get(source) as GameAudio | undefined;

            if (audio) 
                this.sources.push(audio);

            else
                console.error(`The audio ${source} was not found`);
            
        });

        this.currentSourceIndex = this.sources.length > 0 ? this.sources.length - 1 : -1;

        this.setVolume(volume)
        this.setAutoPlay(auto)
    }

    public setEventEnd(event: () => void) {
        const source = this.getCurrentSource()
        
        if (source)
            source.onEnded(event);
    }

    public async playTo(start: number, end?: number) {
        const source = this.getCurrentSource()
        
        if (source)
            await source.playTo(start, end);
    }

    public async play() {
        const source = this.getCurrentSource()
        
        if (source)
            await source.play();
    }

    public setAutoPlay(auto: boolean) {
        const source = this.getCurrentSource()
        
        if (source)
            source.setAutoPlay(auto);
    }

    public pause() {
        const source = this.getCurrentSource()
        
        if (source)
            source.pause();
    }

    public pauseAll() {

        for (let index = 0; index < this.sources.length; index++) {
            
            this.sources[index].pause();
            
        }

    }

    public setVolume(volume: number) {
        const source = this.getCurrentSource()
        
        if (source)
            source.setVolume(volume);
    }

    public getVolume() {
        const source = this.getCurrentSource()
        
        if (source)
            source.getVolume();
    }

    public getDuration() {
        const source = this.getCurrentSource()
        
        if (source)
            source.getDuration();
    }

    public setCurrentSource(index: number) {

        if (index >= 0 && index < this.sources.length) {
            this.currentSourceIndex = index;
        }
    }

    public getCurrentSourceIndex(): number {
        return this.currentSourceIndex;
    }

    public getCurrentSource(): GameAudio | null {
        
        if (this.currentSourceIndex)
            return this.sources[this.currentSourceIndex]

        return null

    }
}
