export class FirebaseFlatSnapshot {
    $key: string
    constructor(obj?: any) {
        if (obj && obj.$key) {
            this.$key = obj.$key
        }
    }
}

export class User extends FirebaseFlatSnapshot {
    photoUrl: string
    name: string
    bookmarks: [string]

    constructor(obj?: any) {
        super(obj)
        this.photoUrl = obj && obj.photoUrl || ""
        this.name = obj && obj.name || ""
        this.bookmarks = obj && obj.bookmarks || ""
    }
}