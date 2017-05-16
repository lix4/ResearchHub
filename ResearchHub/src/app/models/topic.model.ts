export class Topic {
    subject: string
    ids: Object[]

    constructor(obj?: any) {
        this.subject = obj && obj.subject || ""
        this.ids = obj && obj.ids || []
    }
}