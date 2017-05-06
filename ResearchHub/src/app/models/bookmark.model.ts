export class FirebaseFlatSnapshot {
    $key: string
    constructor(obj?: any) {
        if (obj && obj.$key) {
            this.$key = obj.$key
        }
    }
}

export class Bookmark extends FirebaseFlatSnapshot {
    title: string
    sourceKey: string

    constructor(obj?: any) {
        super(obj)
        this.title = obj && obj.title || ""
        this.sourceKey = obj && obj.sourceKey || ""
    }
}