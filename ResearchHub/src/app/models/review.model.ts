export class FirebaseFlatSnapshot {
    $key: string
    constructor(obj?: any) {
        if (obj && obj.$key) {
            this.$key = obj.$key
        }
    }
}

export class Review extends FirebaseFlatSnapshot {
    rating: number
    review: string
    author: string

    constructor(obj?: any) {
        super(obj)
        this.rating = obj && obj.rating || ""
        this.review = obj && obj.review || ""
        this.author = obj && obj.author || ""
    }
}