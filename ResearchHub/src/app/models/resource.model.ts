import { Review } from "./review.model";

export class FirebaseFlatSnapshot {
    $key: string
    constructor(obj?: any) {
        if (obj && obj.$key) {
            this.$key = obj.$key
        }
    }
}


export class Rsource extends FirebaseFlatSnapshot {
    title: string
    author: string
    date_posted: Date
    posted_by: string
    url: string
    abstraction: string
    subjects: string[]
    tags: string[]
    review: Review[];
    sourceKey: string

    constructor(obj?: any) {
        super(obj)
        this.title = obj && obj.title || ""
        this.sourceKey = obj && obj.sourceKey || ""
    }
}