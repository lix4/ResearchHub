import { Review } from "./review.model";

export class FirebaseFlatSnapshot {
    $key: string
    constructor(obj?: any) {
        if (obj && obj.$key) {
            this.$key = obj.$key
        }
    }
}


export class Resource extends FirebaseFlatSnapshot {
    title: string
    author: string
    date_posted: Date
    posted_by: string
    url: string
    abstraction: string
    subjects: string[]
    tags: string[]
    reviews: Review[]

    constructor(obj?: any) {
        super(obj)
        this.title = obj && obj.title || ""
        this.author = obj && obj.author || ""
        this.date_posted = obj && obj.date_posted || ""
        this.posted_by = obj && obj.posted_by || ""
        this.url = obj && obj.url || ""
        this.abstraction = obj && obj.abstraction || ""
        this.subjects = obj && obj.subjects || ""
        this.tags = obj && obj.tags || ""
        this.reviews = obj && obj.reviews || ""
    }
}