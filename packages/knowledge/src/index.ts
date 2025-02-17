import {DocumentCsv} from "./documents/csv";
import {Meta, Part} from "./documents";

type PartEvaluateLine = {
    context: string;
    statement: string;
    expect: string;
}

type MyPart = Part<Meta, PartEvaluateLine>;

const evaluate = new DocumentCsv<MyPart>();
evaluate.load('evaluate.csv').then((result) => {
    if (result) {
        console.log('Document loaded successfully.');
        console.log(evaluate.meta);
    } else {
        console.log('Failed to load document.');
    }
})