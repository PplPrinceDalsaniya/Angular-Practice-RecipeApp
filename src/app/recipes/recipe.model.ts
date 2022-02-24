export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public addedAt: Date;

    constructor(name: string, desc: string, iPath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = iPath;
        this.addedAt = new Date();
    }
}