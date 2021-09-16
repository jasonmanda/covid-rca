export class Covid {
    covid: ICovid;
    public totalCas: number;
    public totalDeces: number;
    public totalVaccin: number;

}

export interface ICovid {
    codeVille: string;
    ville: string;
    totalCas: number;
    totalDeces: number;
    totalVaccin: number;
}